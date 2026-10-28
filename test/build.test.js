import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { buildSite } from '../build.js';

test('buildSite renders a note with noindex and copies site assets', async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'notes-build-'));
  t.after(() => rm(root, { recursive: true, force: true }));

  const contentDir = path.join(root, 'content');
  const assetsDir = path.join(root, 'assets');
  const outputDir = path.join(root, 'dist');
  await mkdir(path.join(contentDir, 'literature'), { recursive: true });
  await mkdir(assetsDir, { recursive: true });
  await writeFile(path.join(contentDir, 'literature', 'example.md'), '# Example note\n\nA readable paragraph.\n');
  await writeFile(path.join(assetsDir, 'style.css'), 'body { color: #172431; }\n');

  await buildSite({ contentDir, assetsDir, outputDir });

  const html = await readFile(path.join(outputDir, 'literature', 'example.html'), 'utf8');
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.match(html, /<h1[^>]*>Example note<\/h1>/);
  assert.match(html, /<p[^>]*>A readable paragraph\.<\/p>/);
  assert.match(html, /href="\.\.\/assets\/style\.css"/);
  assert.equal(await readFile(path.join(outputDir, 'assets', 'style.css'), 'utf8'), 'body { color: #172431; }\n');
});
