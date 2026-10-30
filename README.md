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

Research notes copied from `../thesis-research/literature/notes/` are numbered `01`–`05` in reading order under `content/literature/`; update published copies when source files change. Relative Markdown links to `.md` files are rendered as `.html`, keeping them usable from the `/notes/` project-site subpath.

Run `pnpm install`, then `pnpm test` and `pnpm build`. The build creates HTML pages, category/tag lists, a site index, a note sidebar, a table of contents, and highlighted code in `dist/`. `dist/index.html` is the landing page; for a GitHub Pages project site from this repository, publish it at `/notes/`.
The workflow in `.github/workflows/deploy.yml` runs tests and builds on pushes to `main`, then deploys `dist/`. Set repository Settings → Pages → Build and deployment → Source to **GitHub Actions** once.

The index, category, and tag listings have an in-browser search for the current list's visible title, category, date, and tags. Press Enter or click Search to apply it; clearing the field restores the list. The search does not cover note bodies or notes outside the current list.

On desktop, use the top-left hamburger to hide or reopen the sidebar. On mobile, the sidebar starts closed and opens as a full-screen panel below the topbar; the same hamburger closes it. Collapse each category's note list independently. The index lists category filters with note counts, and note tags link to their tag pages. Page and asset links are relative to keep working under `/notes/`.

Avoid `index.md` and `category/<slug>.md` or `tag/<slug>.md` when those category/tag pages are generated; those paths are reserved and the build stops rather than overwriting a note.

For a local preview, run `pnpm dlx http-server dist -p 4173`, then open `http://localhost:4173`.
