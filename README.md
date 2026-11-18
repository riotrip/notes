# notes

Static Markdown publisher for `prayogo.is-a.dev/thesis/notes/`.

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

The active thesis topic is **kemiripan abstrak berbasis aspek dan risiko kebaruan**. Its seven public notes live in `content/kemiripan-abstrak-dan-risiko-kebaruan/`: **Landasan** (`01`, `02`, `04`), **Literatur** (`03`, `06`, `07`), and **Metode** (`05`). Start with [inti penelitian](content/kemiripan-abstrak-dan-risiko-kebaruan/01-inti-penelitian-5w1h.md), then motivation, literature, system flow, evaluation, and intended contribution. Note `07` records current decisions, implementation status, open questions, and the historical literature ledger.

The 18 November 2026 revision aligns the web notes with `../PRD.md`: one Indonesian abstract, a JTI skripsi/TA corpus, full-abstract retrieval, A/B/C ranking conditions, calibrated categories, and paired word/phrase highlights. Implementation status follows `../abstract-modelling/README.md` and available local data rather than the PRD's older corpus blocker. Keep data preparation distinct from model completion and research results. The original literature foundation remains in `../thesis-research/literature/notes/kemiripan-abstrak-dan-risiko-kebaruan/`; preserve its citations and evidence limits without restoring superseded scope decisions. The flow uses an ordered list and `assets/alur-kemiripan.svg`; the site does not render Mermaid.

Images in note bodies are centered, capped at 640px wide, and shrink to fit narrower screens while preserving their aspect ratio.

The six previous AI-detection notes remain in `content/literature/` as local archives with `draft: true`. They are not published: the build omits their pages, sidebar entries, categories, and searchable listing entries, and clears any previous generated archive pages. Keep the archive files without linking to them from published notes. The detector-product landscape in `06-sistem-deteksi-ai-yang-sudah-ada.md` preserves the historical summary of `../thesis-research/literature/notes/ai-text-detectors-2026-11-01/laporan.md`.

Update published copies when source files change. Relative Markdown links to `.md` files are rendered as `.html`, keeping them usable from the `/thesis/notes/` subpath.

Run `pnpm install`, then `pnpm test` and `pnpm build`. The build creates note pages, category/tag lists, a site index, a note sidebar, a table of contents, highlighted code, and the separate `dist/laporan-skripsi.html` report page. `dist/index.html` is the Notes landing page.
The workflow in `.github/workflows/notify-thesis.yml` sends `repository_dispatch` (`content-updated`) to `riotrip/thesis` on pushes to `main` or manual runs. Set the Actions secret `THESIS_TOKEN` to a fine-grained token with **Contents: Read and write** access to `riotrip/thesis`. The thesis workflow tests and builds this repository, then publishes `dist/` under `/thesis/notes/`. This repository no longer publishes Pages or a `dist` branch; disable its old Pages site in Settings → Pages if still enabled.

The index, category, and tag listings have an in-browser search for the current list's visible title, category, date, and tags. Press Enter or click Search to apply it; clearing the field restores the list. The search does not cover note bodies or notes outside the current list.

On desktop, use the top-left hamburger to hide or reopen the sidebar. On mobile, the sidebar starts closed and opens as a full-screen panel below the topbar; the same hamburger closes it. Collapse each category's note list independently. The index lists category filters with note counts, and note tags link to their tag pages. Page and asset links are relative to keep working under `/thesis/notes/`.

The visual style follows the restrained monochrome palette of `riotrip.github.io` (now `prayogo.is-a.dev`): white backgrounds, neutral gray borders, lightweight sans-serif headings, and quiet navigation. The shared tokens live in `assets/style.css`; no external fonts or decorative effects are required.

Avoid `index.md`, `laporan-skripsi.md`, and `category/<slug>.md` or `tag/<slug>.md` when those pages are generated; those paths are reserved and the build stops rather than overwriting a note.

For a local preview, run `pnpm dlx http-server dist -p 4173`, then open `http://localhost:4173`.
