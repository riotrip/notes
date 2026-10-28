import path from 'node:path';
import matter from 'gray-matter';

export function slugify(value) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '') || 'uncategorized';
}

function categoryFromPath(value) {
  return value.replace(/[-_]+/g, ' ').replace(/(^|\s)(\p{L})/gu, (_, boundary, letter) => `${boundary}${letter.toUpperCase()}`);
}

function normalizeDate(value) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
  return null;
}

function normalizeTags(value) {
  const values = Array.isArray(value) ? value : (typeof value === 'string' ? [value] : []);
  const tags = new Map();

  for (const item of values) {
    if (typeof item !== 'string' || !item.trim()) continue;
    const label = item.trim();
    const slug = slugify(label);
    if (!tags.has(slug)) tags.set(slug, { label, slug });
  }

  return [...tags.values()];
}

export function parseNote(source, relativePath) {
  const parsed = matter(source);
  const frontmatter = parsed.data;
  const markdown = parsed.content;
  const normalizedPath = relativePath.split(path.sep).join('/');
  const heading = markdown.match(/^#\s+(.+)\s*$/m)?.[1];
  const fallbackTitle = path.posix.basename(normalizedPath, path.posix.extname(normalizedPath)).replace(/[-_]+/g, ' ');
  const title = typeof frontmatter.title === 'string' && frontmatter.title.trim()
    ? frontmatter.title.trim()
    : (heading ?? fallbackTitle).trim();
  const pathCategory = normalizedPath.includes('/')
    ? categoryFromPath(normalizedPath.split('/')[0])
    : 'Uncategorized';
  const category = typeof frontmatter.category === 'string' && frontmatter.category.trim()
    ? frontmatter.category.trim()
    : pathCategory;

  return {
    sourcePath: normalizedPath,
    outputPath: normalizedPath.replace(/\.md$/i, '.html'),
    markdown,
    title,
    date: normalizeDate(frontmatter.date),
    category,
    categorySlug: slugify(category),
    tags: normalizeTags(frontmatter.tags),
    draft: frontmatter.draft === true,
  };
}
