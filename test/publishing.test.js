import assert from 'node:assert/strict';
import { access, mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { buildSite } from '../build.js';

async function createSiteFixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'notes-publish-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const contentDir = path.join(root, 'content');
  const assetsDir = path.join(root, 'assets');
  const outputDir = path.join(root, 'dist');
  await mkdir(path.join(contentDir, 'literature'), { recursive: true });
  await mkdir(path.join(contentDir, 'backend'), { recursive: true });
  await mkdir(assetsDir, { recursive: true });
  await writeFile(path.join(assetsDir, 'style.css'), 'body { color: #172431; }\n');
  await writeFile(path.join(assetsDir, 'favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg"></svg>\n');
  return { contentDir, assetsDir, outputDir };
}

test('buildSite publishes metadata-driven listings and omits drafts', async (t) => {
  const { contentDir, assetsDir, outputDir } = await createSiteFixture(t);
  await writeFile(path.join(contentDir, 'literature', 'calibration.md'), `---
title: Calibration transfer
date: 2026-10-27
category: Research
tags: [calibration, IndoBERT]
draft: false
---
# Working question

A paragraph about confidence.

## Method

- Fit only on validation data.

> Keep held-out data untouched.

\`\`\`js
const score = 1;
\`\`\`
`);
  await writeFile(path.join(contentDir, 'literature', 'fallback.md'), '# Folder-derived category\n\nA second published note.\n');
  await writeFile(path.join(contentDir, 'backend', 'draft.md'), `---\ntitle: Hidden draft\ndraft: true\n---\n# Not for publishing\n`);

  const count = await buildSite({ contentDir, assetsDir, outputDir });
  const index = await readFile(path.join(outputDir, 'index.html'), 'utf8');
  const note = await readFile(path.join(outputDir, 'literature', 'calibration.html'), 'utf8');
  const categoryPage = await readFile(path.join(outputDir, 'category', 'research.html'), 'utf8');
  const folderCategoryPage = await readFile(path.join(outputDir, 'category', 'literature.html'), 'utf8');
  const tagPage = await readFile(path.join(outputDir, 'tag', 'calibration.html'), 'utf8');

  assert.equal(count, 2);
  assert.match(index, /aria-label="Categories"/);
  assert.match(index, /href="category\/research\.html">Research <span>1<\/span>/);
  assert.match(index, /href="tag\/calibration\.html">#calibration/);
  assert.match(categoryPage, /aria-current="page">Research <span>1<\/span>/);
  assert.match(index, /href="category\/literature\.html">Literature <span>1<\/span>/);
  assert.match(index, /aria-current="page">All notes <span>2<\/span>/);
  assert.match(index, /src="assets\/sidebar\.js"/);
  assert.match(index, /class="topbar"/);
  assert.match(index, /aria-label="Close sidebar"/);
  assert.match(index, /class="hamburger"/);
  assert.match(index, /<details class="sidebar__group" open>/);
  assert.match(note, /<details class="sidebar__group" open>/);
  assert.match(categoryPage, /<details class="sidebar__group" open>/);
  assert.match(tagPage, /<details class="sidebar__group" open>/);
  assert.match(note, /data-sidebar-toggle/);
  assert.match(categoryPage, /data-sidebar-toggle/);
  assert.match(tagPage, /data-sidebar-toggle/);
  assert.match(index, /Folder-derived category/);
  assert.doesNotMatch(index, /Hidden draft/);
  assert.match(index, /href="assets\/favicon\.svg"/);
  assert.match(index, /<title>Notes<\/title>/);
  assert.match(index, /href="literature\/calibration\.html"/);
  assert.match(note, /<title>Calibration transfer \| Notes<\/title>/);
  assert.match(note, /href="\.\.\/assets\/favicon\.svg"/);
  assert.match(categoryPage, /<title>Research \| Notes<\/title>/);
  assert.match(categoryPage, /href="\.\.\/assets\/favicon\.svg"/);
  assert.match(tagPage, /<title>calibration \| Notes<\/title>/);
  assert.match(tagPage, /href="\.\.\/assets\/favicon\.svg"/);
  assert.match(note, /href="fallback\.html"/);
  assert.match(note, /Folder-derived category/);
  assert.doesNotMatch(note, /Hidden draft/);
  assert.match(note, /<time datetime="2026-10-27">2026-10-27<\/time>/);
  assert.doesNotMatch(note, /RIO TRI PRAYOGO|RESEARCH NOTES|UNINDEXED RESEARCH NOTES/);
  assert.match(note, /<details class="toc">/);
  assert.match(note, /<a href="calibration\.html" aria-current="page">/);
  assert.doesNotMatch(note, /draft: false/);
  assert.match(note, /href="\.\.\/assets\/style\.css"/);
  assert.match(note, /href="\.\.\/category\/research\.html"/);
  assert.match(note, /href="\.\.\/tag\/calibration\.html"/);
  assert.match(categoryPage, /Calibration transfer/);
  assert.match(folderCategoryPage, /Folder-derived category/);
  assert.match(tagPage, /Calibration transfer/);
  assert.match(categoryPage, /href="\.\.\/literature\/calibration\.html"/);

  for (const file of [
    path.join(outputDir, 'index.html'),
    path.join(outputDir, 'literature', 'calibration.html'),
    path.join(outputDir, 'category', 'research.html'),
    path.join(outputDir, 'category', 'literature.html'),
    path.join(outputDir, 'tag', 'calibration.html'),
  ]) {
    assert.match(await readFile(file, 'utf8'), /<meta name="robots" content="noindex, nofollow">/);
  }
  await assert.rejects(access(path.join(outputDir, 'backend', 'draft.html')));
  await assert.rejects(access(path.join(outputDir, 'sitemap.xml')));
});

test('buildSite rejects notes that collide with generated pages', async (t) => {
  for (const sourcePath of ['index.md', 'category/research.md', 'tag/calibration.md']) {
    const { contentDir, assetsDir, outputDir } = await createSiteFixture(t);
    await writeFile(path.join(contentDir, 'literature', 'main.md'), '---\ncategory: Research\ntags: [calibration]\n---\n# Main note\n');
    const collisionPath = path.join(contentDir, sourcePath);
    await mkdir(path.dirname(collisionPath), { recursive: true });
    await writeFile(collisionPath, '# Colliding note\n');

    await assert.rejects(buildSite({ contentDir, assetsDir, outputDir }), /reserved output path/);
  }
});


test('buildSite adds a TOC, highlighted code, and stable IDs to markdown blocks', async (t) => {
  const { contentDir, assetsDir, outputDir } = await createSiteFixture(t);
  const notePath = path.join(contentDir, 'literature', 'blocks.md');
  await writeFile(notePath, '# Block note\n\n## Scope\n\nParagraph block.\n\nRepeated block.\n\nRepeated block.\n\n- List block.\n\n> Quote block.\n\n```js\nconst value = 42;\n```\n');

  await buildSite({ contentDir, assetsDir, outputDir });
  const html = await readFile(path.join(outputDir, 'literature', 'blocks.html'), 'utf8');
  const firstIds = [...html.matchAll(/data-block-id="([a-f0-9]{12})"/g)].map((match) => match[1]);
  assert.ok(firstIds.length >= 6);
  assert.equal(new Set(firstIds).size, firstIds.length);
  assert.match(html, /href="#scope"/);
  assert.match(html, /id="scope"/);
  assert.match(html, /class="shiki github-light"/);

  await buildSite({ contentDir, assetsDir, outputDir });
  const rebuilt = await readFile(path.join(outputDir, 'literature', 'blocks.html'), 'utf8');
  const secondIds = [...rebuilt.matchAll(/data-block-id="([a-f0-9]{12})"/g)].map((match) => match[1]);
  assert.deepEqual(secondIds, firstIds);
});
