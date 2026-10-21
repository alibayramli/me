# Ali Bayramli Portfolio

Personal portfolio showcasing my projects, skills, and experience, with a resume and technical blog.

## Development

```bash
npm install
npm run dev
```

Run the checks and build the site:

```bash
npm run check
```

## Portfolio and resume content

The portfolio, resume, and social preview image all use `src/content/site-content.json`.
Edit this file to update profile details, skills, experience, technologies, projects, languages,
and education. Then regenerate the resume and image:

```bash
npm run resume
npm run og:generate
```

The resume command saves one-page Word and PDF copies in `public/resume/`.

## Creating a blog post

1. Copy `src/content/blog/post-template.md` to
   `src/content/blog/your-post-slug.md`.
2. Fill in the details at the top of the file and write the article in Markdown.
3. Keep `draft: true` while previewing locally.
4. Put article images in `src/content/blog/your-post-slug/` and reference them with relative
   Markdown paths.
5. Set `draft: false` when the post is ready to publish.

The filename sets the post's URL:

```text
src/content/blog/building-golden-paths.md
https://alibayramli.github.io/me/blog/building-golden-paths/
```

You can use headings, links, images, tables, quotes, inline code, and code blocks with syntax
highlighting. Drafts and posts with future publish dates are left out of published pages, tag pages,
RSS, and the sitemap.

Before publishing work-related posts, remove private details from code examples and screenshots.
Check that the content follows company, customer, security, and confidentiality requirements.

## Deployment

GitHub Actions checks pull requests. Changes to `main` are deployed to GitHub Pages after the checks
pass:

https://alibayramli.github.io/me/
