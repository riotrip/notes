# notes

Static Markdown publisher for `prayogo.is-a.dev/notes/`.

## Thesis report

The fixed Google Docs report has its own top-level **Laporan Skripsi** page, separate from Notes. Set `THESIS_REPORT_URL` in `src/config.js` to the report's original Google Docs URL. The page embeds its `/preview` URL and links to the original document for Google Docs comments. Leave the value empty until the document link is available.

## Add or update a note

Create a Markdown file under `content/` and add frontmatter such as:

```yaml
---
title: Example note
category: Example
tags:
  - placeholder
draft: false
---
```

`title`, `date`, `category`, `tags`, and `draft` are optional. A missing title comes from the first `#` heading; a missing category comes from the first content subfolder. `draft: true` keeps a note out of the site and its generated sidebar.

The active thesis topic is **kemiripan abstrak berbasis aspek dan risiko kebaruan**. Its public notes live in `content/kemiripan-abstrak-dan-risiko-kebaruan/`, categorized by content: **Landasan** (`01`, `02`, `04`), **Literatur** (`03`, `06`, `07`), and **Metode** (`05`). Notes `01`–`06` follow the reading sequence: research overview, motivation, prior work and methods, system operation, data and evaluation, and existing approaches with the intended contribution. Note `07` retains the search and evidence ledger. Start with [inti penelitian](content/kemiripan-abstrak-dan-risiko-kebaruan/01-inti-penelitian-5w1h.md). The research foundation comes from `../thesis-research/literature/notes/kemiripan-abstrak-dan-risiko-kebaruan/`; the web edition adds reader-facing explanations and provisional evaluation proposals, rather than being a verbatim copy. Preserve citations, evidence limits, and provisional decisions when synchronizing; adjust links to the published filenames. The conceptual flow uses an ordered list because the site does not render Mermaid.

The six previous AI-detection notes remain in `content/literature/` as local archives with `draft: true`. They are not published: the build omits their pages, sidebar entries, categories, and searchable listing entries, and clears any previous generated archive pages. Keep the archive files without linking to them from published notes. The detector-product landscape in `06-sistem-deteksi-ai-yang-sudah-ada.md` preserves the historical summary of `../thesis-research/literature/notes/ai-text-detectors-2026-11-01/laporan.md`.

Update published copies when source files change. Relative Markdown links to `.md` files are rendered as `.html`, keeping them usable from the `/notes/` project-site subpath.

Run `pnpm install`, then `pnpm test` and `pnpm build`. The build creates note pages, category/tag lists, a site index, a note sidebar, a table of contents, highlighted code, and the separate `dist/laporan-skripsi.html` report page. `dist/index.html` is the Notes landing page; for a GitHub Pages project site from this repository, publish it at `/notes/`.
The workflow in `.github/workflows/deploy.yml` runs tests and builds on pushes to `main`, then deploys `dist/`. Set repository Settings → Pages → Build and deployment → Source to **GitHub Actions** once.

The index, category, and tag listings have an in-browser search for the current list's visible title, category, date, and tags. Press Enter or click Search to apply it; clearing the field restores the list. The search does not cover note bodies or notes outside the current list.

On desktop, use the top-left hamburger to hide or reopen the sidebar. On mobile, the sidebar starts closed and opens as a full-screen panel below the topbar; the same hamburger closes it. Collapse each category's note list independently. The index lists category filters with note counts, and note tags link to their tag pages. Page and asset links are relative to keep working under `/notes/`.

All page and section backgrounds use white through the shared `--paper` and `--surface` tokens; text, borders, and action buttons retain their contrast colors.

Avoid `index.md`, `laporan-skripsi.md`, and `category/<slug>.md` or `tag/<slug>.md` when those pages are generated; those paths are reserved and the build stops rather than overwriting a note.

For a local preview, run `pnpm dlx http-server dist -p 4173`, then open `http://localhost:4173`.
