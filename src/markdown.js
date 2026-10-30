import { createHash } from 'node:crypto';
import MarkdownIt from 'markdown-it';
import { bundledLanguagesInfo, createHighlighter } from 'shiki';
import { slugify } from './note.js';

const markdown = new MarkdownIt({ html: false, linkify: true });
const highlighterPromise = createHighlighter({ themes: ['github-light'], langs: [] });
const languagesByAlias = new Map();
const loadedLanguages = new Set();

for (const language of bundledLanguagesInfo) {
  languagesByAlias.set(language.id, language.id);
  for (const alias of language.aliases ?? []) languagesByAlias.set(alias, language.id);
}

const blockTokenTypes = new Set([
  'heading_open',
  'paragraph_open',
  'list_item_open',
  'blockquote_open',
  'fence',
  'code_block',
]);

function shortHash(type, value, occurrence) {
  const content = value.trim().replace(/\s+/g, ' ');
  return createHash('sha256').update(`${type}\0${content}\0${occurrence}`).digest('hex').slice(0, 12);
}

function tokenText(token) {
  if (!token.children) return token.content;
  return token.children
    .filter((child) => ['text', 'code_inline', 'image', 'html_inline'].includes(child.type))
    .map((child) => child.content)
    .join('');
}

function blockContent(token, tokens, index) {
  if (token.type === 'heading_open' || token.type === 'paragraph_open') {
    return tokens[index + 1]?.content ?? '';
  }
  if (token.type === 'fence' || token.type === 'code_block') return token.content;

  const closingType = token.type.replace('_open', '_close');
  const content = [];
  let depth = 0;
  for (let position = index; position < tokens.length; position += 1) {
    const current = tokens[position];
    if (current.type === token.type) depth += 1;
    if (current.type === closingType) {
      depth -= 1;
      if (depth === 0) break;
    } else if (depth > 0 && ['inline', 'fence', 'code_block'].includes(current.type)) {
      content.push(current.content);
    }
  }
  return content.join('\n');
}

async function highlight(token) {
  const highlighter = await highlighterPromise;
  const requestedLanguage = token.info.trim().split(/\s+/, 1)[0].toLowerCase();
  const language = languagesByAlias.get(requestedLanguage);

  if (language && !loadedLanguages.has(language)) {
    await highlighter.loadLanguage(language);
    loadedLanguages.add(language);
  }

  return highlighter.codeToHtml(token.content, {
    lang: language ?? 'text',
    theme: 'github-light',
  });
}

function rewriteNoteLinks(tokens) {
  for (const token of tokens) {
    if (token.type !== 'inline' || !token.children) continue;

    for (const child of token.children) {
      if (child.type !== 'link_open') continue;
      const href = child.attrGet('href');
      if (
        !href
        || href.startsWith('/')
        || /^[a-z][a-z\d+.-]*:/i.test(href)
      ) continue;

      const suffixIndex = href.search(/[?#]/);
      const pathname = suffixIndex === -1 ? href : href.slice(0, suffixIndex);
      if (!/\.md$/i.test(pathname)) continue;
      const suffix = suffixIndex === -1 ? '' : href.slice(suffixIndex);
      child.attrSet('href', `${pathname.slice(0, -3)}.html${suffix}`);
    }
  }
}

export async function renderMarkdown(source) {
  const env = {};
  const tokens = markdown.parse(source, env);
  rewriteNoteLinks(tokens);
  const headings = [];
  const slugCounts = new Map();
  let titleBlockId = null;
  const blockOccurrences = new Map();
  let titleHeadingIndex = -1;

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (!blockTokenTypes.has(token.type)) continue;

    const content = blockContent(token, tokens, index);
    const occurrenceKey = `${token.type}\0${content.trim().replace(/\s+/g, ' ')}`;
    const occurrence = (blockOccurrences.get(occurrenceKey) ?? 0) + 1;
    blockOccurrences.set(occurrenceKey, occurrence);
    const blockId = shortHash(token.type, content, occurrence);
    if (token.type === 'fence' || token.type === 'code_block') {
      const highlighted = await highlight(token);
      token.type = 'html_block';
      token.nesting = 0;
      token.tag = '';
      token.content = highlighted.replace(/^<pre\b/, `<pre data-block-id="${blockId}"`);
      continue;
    }

    token.attrSet('data-block-id', blockId);
    if (token.type !== 'heading_open') continue;

    const inline = tokens[index + 1];
    const text = inline?.type === 'inline' ? tokenText(inline).trim() : '';
    if (token.tag === 'h1' && titleHeadingIndex === -1) {
      titleBlockId = blockId;
      titleHeadingIndex = index;
      continue;
    }

    if (token.tag === 'h1') continue;
    const baseSlug = slugify(text);
    const count = (slugCounts.get(baseSlug) ?? 0) + 1;
    slugCounts.set(baseSlug, count);
    const id = count === 1 ? baseSlug : `${baseSlug}-${count}`;
    token.attrSet('id', id);
    headings.push({ id, text, level: Number(token.tag.slice(1)) });
  }

  if (titleHeadingIndex !== -1) {
    let closeIndex = titleHeadingIndex + 1;
    while (closeIndex < tokens.length && tokens[closeIndex].type !== 'heading_close') closeIndex += 1;
    tokens.splice(titleHeadingIndex, closeIndex - titleHeadingIndex + 1);
  }

  return {
    html: markdown.renderer.render(tokens, markdown.options, env),
    headings,
    titleBlockId,
  };
}
