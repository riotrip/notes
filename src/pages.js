import path from 'node:path';

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function relativeHref(fromPath, toPath) {
  const relative = path.posix.relative(path.posix.dirname(fromPath), toPath) || path.posix.basename(toPath);
  return relative.split('/').map((segment) => encodeURIComponent(segment)).join('/');
}

function categoryGroups(notes) {
  const groups = new Map();
  for (const note of notes) {
    if (!groups.has(note.categorySlug)) {
      groups.set(note.categorySlug, { title: note.category, slug: note.categorySlug, notes: [] });
    }
    groups.get(note.categorySlug).notes.push(note);
  }
  return [...groups.values()].sort((a, b) => a.title.localeCompare(b.title));
}

function renderSidebar(notes, outputPath) {
  const groups = categoryGroups(notes);
  const groupHtml = groups.map((group) => `
      <details class="sidebar__group" open>
        <summary><a href="${relativeHref(outputPath, `category/${group.slug}.html`)}">${escapeHtml(group.title)}<span class="sidebar__count">${group.notes.length}</span></a><span class="sidebar__group-control" aria-hidden="true"></span></summary>
        <ul>${group.notes.map((note) => `
          <li><a href="${relativeHref(outputPath, note.outputPath)}"${note.outputPath === outputPath ? ' aria-current="page"' : ''}>${escapeHtml(note.title)}</a></li>`).join('')}
        </ul>
      </details>`).join('');

  return `<aside id="notes-sidebar" class="sidebar">
    <nav class="sidebar__nav" aria-label="Notes">
      <div class="sidebar__groups">${groupHtml || '<p class="sidebar__empty">No published notes yet.</p>'}</div>
    </nav>
  </aside>`;

}

function renderCategoryNav(notes, outputPath) {
  const activeCategory = outputPath.startsWith('category/')
    ? path.posix.basename(outputPath, '.html')
    : null;
  const allActive = outputPath === 'index.html';
  const links = [
    `<a class="category-chip${allActive ? ' is-active' : ''}" href="${relativeHref(outputPath, 'index.html')}"${allActive ? ' aria-current="page"' : ''}>All notes <span>${notes.length}</span></a>`,
    ...categoryGroups(notes).map((group) => {
      const active = group.slug === activeCategory;
      return `<a class="category-chip${active ? ' is-active' : ''}" href="${relativeHref(outputPath, `category/${group.slug}.html`)}"${active ? ' aria-current="page"' : ''}>${escapeHtml(group.title)} <span>${group.notes.length}</span></a>`;
    }),
  ];
  return `<nav class="category-nav" aria-label="Categories">${links.join('')}</nav>`;
}

function renderShell({ title, outputPath, notes, content }) {
  const stylesheet = relativeHref(outputPath, 'assets/style.css');
  const sidebarScript = relativeHref(outputPath, 'assets/sidebar.js');
  const indexHref = relativeHref(outputPath, 'index.html');
  return `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <meta name="theme-color" content="#edf1f3">
  <title>${escapeHtml(title)} · notes</title>
  <link rel="stylesheet" href="${escapeHtml(stylesheet)}">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <button class="sidebar-toggle" type="button" aria-label="Close sidebar" title="Close sidebar" aria-controls="notes-sidebar" aria-expanded="true" data-sidebar-toggle hidden>
        <span class="hamburger" aria-hidden="true"><span></span><span></span><span></span></span>
      </button>
      <a class="topbar__brand" href="${escapeHtml(indexHref)}">Notes</a>
    </header>
    <div class="site-layout">
      ${renderSidebar(notes, outputPath)}
      <div class="workspace">
        <main class="main">${content}</main>
      </div>
    </div>
  </div>
  <script src="${escapeHtml(sidebarScript)}" defer></script>
</body>
</html>
`;
}

function renderMetadata(note, outputPath) {
  const entries = [`<a href="${relativeHref(outputPath, `category/${note.categorySlug}.html`)}">${escapeHtml(note.category)}</a>`];
  if (note.date) entries.push(`<time datetime="${escapeHtml(note.date)}">${escapeHtml(note.date)}</time>`);
  for (const tag of note.tags) {
    entries.push(`<a href="${relativeHref(outputPath, `tag/${tag.slug}.html`)}">#${escapeHtml(tag.label)}</a>`);
  }
  return `<div class="note-meta">${entries.join('<span aria-hidden="true">·</span>')}</div>`;
}

function renderToc(headings) {
  if (!headings.length) return '';

  return `<details class="toc">
    <summary>Contents</summary>
    <ul>${headings.map((heading) => `<li class="toc__level-${heading.level}"><a href="#${escapeHtml(heading.id)}">${escapeHtml(heading.text)}</a></li>`).join('')}
    </ul>
  </details>`;
}

export function renderNotePage(note, notes, outputPath, rendered) {
  const headingId = rendered.titleBlockId ? ` data-block-id="${rendered.titleBlockId}"` : '';
  const content = `<article class="note">
    <h1${headingId}>${escapeHtml(note.title)}</h1>
    ${renderMetadata(note, outputPath)}
    ${renderToc(rendered.headings)}
    <div class="prose">${rendered.html}</div>
  </article>`;
  return renderShell({ title: note.title, outputPath, notes, content });
}

function renderListingItem(note, outputPath) {
  const href = relativeHref(outputPath, note.outputPath);
  const date = note.date ? `<time datetime="${escapeHtml(note.date)}">${escapeHtml(note.date)}</time>` : '';
  const tags = note.tags.map((tag) => `<a href="${relativeHref(outputPath, `tag/${tag.slug}.html`)}">#${escapeHtml(tag.label)}</a>`).join(' ');
  return `<li class="note-list__item">
    <a class="note-list__title" href="${href}">${escapeHtml(note.title)}</a>
    <p class="note-list__meta"><a href="${relativeHref(outputPath, `category/${note.categorySlug}.html`)}">${escapeHtml(note.category)}</a>${date ? ` <span aria-hidden="true">·</span> ${date}` : ''}${tags ? ` <span aria-hidden="true">·</span> ${tags}` : ''}</p>
  </li>`;
}

export function renderListingPage({ title, notes, allNotes, outputPath }) {
  const list = notes.length
    ? `<ul class="note-list">${notes.map((note) => renderListingItem(note, outputPath)).join('')}</ul>`
    : '<p class="empty-state">No notes in this list yet.</p>';
  const content = `<section class="listing">
    <h1>${escapeHtml(title)}</h1>
    ${renderCategoryNav(allNotes, outputPath)}
    ${list}
  </section>`;
  return renderShell({ title, outputPath, notes: allNotes, content });
}
