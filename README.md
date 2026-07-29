# Ali Bayramli Portfolio

Personal portfolio, resume, and technical blog built with Astro, React, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

The production build validates Astro pages and blog content before generating the static site:

```bash
npm run check
```

## Creating a blog post

1. Copy `src/content/blog/post-template.md` to
   `src/content/blog/your-post-slug.md`.
2. Fill in the frontmatter and write the article in Markdown.
3. Keep `draft: true` while previewing locally.
4. Put article images in `src/content/blog/your-post-slug/` and reference them with relative
   Markdown paths.
5. Change the post to `draft: false` when it is ready to publish.

The filename becomes the permanent URL:

```text
src/content/blog/building-golden-paths.md
https://alibayramli.github.io/me/blog/building-golden-paths/
```

Supported content includes headings, links, images, tables, blockquotes, inline code, and fenced
code blocks with syntax highlighting. Production builds exclude drafts and future-dated posts from
pages, tags, RSS, and the sitemap.

Before publishing work-related material, replace internal code and screenshots with sanitized
examples and confirm that company, customer, security, and confidentiality requirements are met.

## Deployment

GitHub Actions validates pull requests and deploys successful `main` builds to GitHub Pages:

https://alibayramli.github.io/me/
