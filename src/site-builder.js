import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseNote } from './note.js';
import { renderMarkdown } from './markdown.js';
import { renderListingPage, renderNotePage } from './pages.js';

async function findMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findMarkdownFiles(entryPath));
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.md') {
      files.push(entryPath);
    }
  }

  return files.sort((a, b) => a.localeCompare(b));
}

function compareNotes(a, b) {
  if (a.date && b.date && a.date !== b.date) return b.date.localeCompare(a.date);
  if (a.date && !b.date) return -1;
  if (!a.date && b.date) return 1;
  return a.title.localeCompare(b.title);
}

function validateOutputPaths(notes) {
  const reserved = new Set(['index.html']);
  for (const note of notes) {
    reserved.add(`category/${note.categorySlug}.html`);
    for (const tag of note.tags) reserved.add(`tag/${tag.slug}.html`);
  }

  for (const note of notes) {
    if (reserved.has(note.outputPath.toLowerCase())) {
      throw new Error(`Note "${note.sourcePath}" maps to reserved output path "${note.outputPath}"`);
    }
  }
}

async function writePage(outputDir, relativeOutputPath, html) {
  const destination = path.join(outputDir, ...relativeOutputPath.split('/'));
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html, 'utf8');
}

export async function buildSite({ contentDir, assetsDir, outputDir }) {
  const markdownFiles = await findMarkdownFiles(contentDir);
  const notes = [];

  for (const sourcePath of markdownFiles) {
    const relativePath = path.relative(contentDir, sourcePath);
    const note = parseNote(await readFile(sourcePath, 'utf8'), relativePath);
    if (!note.draft) notes.push(note);
  }

  notes.sort(compareNotes);
  validateOutputPaths(notes);
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });
  await cp(assetsDir, path.join(outputDir, 'assets'), { recursive: true });

  for (const note of notes) {
    const rendered = await renderMarkdown(note.markdown);
    await writePage(outputDir, note.outputPath, renderNotePage(note, notes, note.outputPath, rendered));
  }

  const categories = new Map();
  const tags = new Map();
  for (const note of notes) {
    if (!categories.has(note.categorySlug)) {
      categories.set(note.categorySlug, { label: note.category, notes: [] });
    }
    categories.get(note.categorySlug).notes.push(note);
    for (const tag of note.tags) {
      if (!tags.has(tag.slug)) tags.set(tag.slug, { label: tag.label, notes: [] });
      tags.get(tag.slug).notes.push(note);
    }
  }

  await writePage(outputDir, 'index.html', renderListingPage({
    title: 'Notes',
    notes,
    allNotes: notes,
    outputPath: 'index.html',
  }));

  for (const [slug, category] of categories) {
    const outputPath = `category/${slug}.html`;
    await writePage(outputDir, outputPath, renderListingPage({
      title: category.label,
      notes: category.notes,
      allNotes: notes,
      outputPath,
    }));
  }

  for (const [slug, tag] of tags) {
    const outputPath = `tag/${slug}.html`;
    await writePage(outputDir, outputPath, renderListingPage({
      title: tag.label,
      notes: tag.notes,
      allNotes: notes,
      outputPath,
    }));
  }

  return notes.length;
}
