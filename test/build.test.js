import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { buildSite } from '../build.js';

test('buildSite renders a note with noindex and content', async (t) => {
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
  assert.match(html, /<title>Example note \| Notes<\/title>/);
});
test('buildSite changes stylesheet URL when its content changes', async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'notes-build-'));
  t.after(() => rm(root, { recursive: true, force: true }));

  const contentDir = path.join(root, 'content');
  const assetsDir = path.join(root, 'assets');
  const outputDir = path.join(root, 'dist');
  const stylesheetPath = path.join(assetsDir, 'style.css');
  await mkdir(path.join(contentDir, 'literature'), { recursive: true });
  await mkdir(assetsDir, { recursive: true });
  await writeFile(path.join(contentDir, 'literature', 'example.md'), '# Example note\n');
  await writeFile(stylesheetPath, 'body { color: #172431; }\n');

  const readStylesheetVersion = async (page) => {
    const html = await readFile(path.join(outputDir, page), 'utf8');
    const match = html.match(/href="[^"]*assets\/style\.css\?v=([a-f0-9]{12})"/);
    assert.ok(match, `${page} must reference a versioned stylesheet`);
    return match[1];
  };
  const buildAndReadVersions = async () => {
    await buildSite({ contentDir, assetsDir, outputDir });
    return Promise.all([
      'index.html',
      'laporan-skripsi.html',
      'literature/example.html',
      'category/literature.html',
    ].map(readStylesheetVersion));
  };

  const originalVersions = await buildAndReadVersions();
  assert.ok(originalVersions.every((version) => version === originalVersions[0]));

  await writeFile(stylesheetPath, 'body { color: #000; }\n');
  const updatedVersions = await buildAndReadVersions();
  assert.ok(updatedVersions.every((version) => version === updatedVersions[0]));
  assert.notEqual(updatedVersions[0], originalVersions[0]);
});

test('buildSite publishes the thesis report as a top-level page outside Notes', async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'notes-build-'));
  t.after(() => rm(root, { recursive: true, force: true }));

  const contentDir = path.join(root, 'content');
  const assetsDir = path.join(root, 'assets');
  const outputDir = path.join(root, 'dist');
  await mkdir(path.join(contentDir, 'literature'), { recursive: true });
  await mkdir(assetsDir, { recursive: true });
  await writeFile(path.join(contentDir, 'literature', 'example.md'), '# Example note\n');
  await writeFile(path.join(assetsDir, 'style.css'), '');

  await buildSite({
    contentDir,
    assetsDir,
    outputDir,
    thesisReportUrl: 'https://docs.google.com/document/d/Abc_123/edit?usp=sharing',
  });

  const report = await readFile(path.join(outputDir, 'laporan-skripsi.html'), 'utf8');
  const note = await readFile(path.join(outputDir, 'literature', 'example.html'), 'utf8');
  assert.match(report, /<h1[^>]*>Laporan Skripsi<\/h1>/);
  assert.match(report, /<iframe[^>]*src="https:\/\/docs\.google\.com\/document\/d\/Abc_123\/preview"/);
  assert.match(report, /title="Pratinjau Google Docs"[^>]*loading="eager"/);
  assert.match(report, /href="https:\/\/docs\.google\.com\/document\/d\/Abc_123\/edit\?usp=sharing"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
  assert.match(report, /aria-label="Navigasi utama"/);
  assert.match(report, /<nav[^>]*aria-label="Navigasi utama"[\s\S]*?<a class="topbar__nav-link" href="laporan-skripsi\.html" aria-current="page">Laporan Skripsi<\/a>/);
  assert.match(note, /href="\.\.\/laporan-skripsi\.html">Laporan Skripsi<\/a>/);
  assert.match(report, /id="notes-sidebar"/);
  assert.match(report, /href="literature\/example\.html"/);
  assert.doesNotMatch(note, /<li><a href="\.\.\/laporan-skripsi\.html"/);
});

test('buildSite reports an unset or invalid thesis report URL without embedding it', async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'notes-build-'));
  t.after(() => rm(root, { recursive: true, force: true }));

  const contentDir = path.join(root, 'content');
  const assetsDir = path.join(root, 'assets');
  const outputDir = path.join(root, 'dist');
  await mkdir(contentDir, { recursive: true });
  await mkdir(assetsDir, { recursive: true });
  await writeFile(path.join(assetsDir, 'style.css'), '');

  await buildSite({ contentDir, assetsDir, outputDir, thesisReportUrl: 'https://example.com/not-a-doc' });

  const report = await readFile(path.join(outputDir, 'laporan-skripsi.html'), 'utf8');
  assert.match(report, /Tautan laporan belum dikonfigurasi atau bukan URL Google Docs yang valid/);
  assert.doesNotMatch(report, /<iframe\b/);
  assert.doesNotMatch(report, /target="_blank"/);
});
