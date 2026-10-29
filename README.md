# notes

Static Markdown publisher for `prayogo.is-a.dev/notes/`.

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

The published research draft lives at `content/literature/riset-deteksi-teks-ai-indonesia.md` and is available at `https://prayogo.is-a.dev/notes/literature/riset-deteksi-teks-ai-indonesia.html` after deployment. Its source is `../thesis-research/literature/notes/riset-deteksi-teks-ai-indonesia.md`; update the published copy when the research draft changes.

Run `pnpm install`, then `pnpm test` and `pnpm build`. The build creates HTML pages, category/tag lists, a site index, a note sidebar, a table of contents, and highlighted code in `dist/`. `dist/index.html` is the landing page; for a GitHub Pages project site from this repository, publish it at `/notes/`.
The workflow in `.github/workflows/deploy.yml` runs tests and builds on pushes to `main`, then deploys `dist/`. Set repository Settings → Pages → Build and deployment → Source to **GitHub Actions** once.

On the index, category, and tag pages, **Search notes** filters the notes in the current list by the displayed title, category, date, or tags. Filtering happens in the browser; it does not search note bodies or other categories from a category page.

On desktop, use the top-left hamburger to hide or reopen the sidebar. On mobile, the sidebar starts closed and opens as a full-screen panel below the topbar; the same hamburger closes it. Collapse each category's note list independently. The index lists category filters with note counts, and note tags link to their tag pages. Page and asset links are relative to keep working under `/notes/`.

Avoid `index.md` and `category/<slug>.md` or `tag/<slug>.md` when those category/tag pages are generated; those paths are reserved and the build stops rather than overwriting a note.

For a local preview, run `pnpm dlx http-server dist -p 4173`, then open `http://localhost:4173`.
