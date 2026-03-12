# Ali Bayramli Portfolio

Personal portfolio and resume site built with Vite, React, and Tailwind CSS.

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Observability

This app includes a Grafana Faro integration that is safe to ship on GitHub Pages:

- runtime telemetry is only enabled when the `VITE_FARO_*` values are present
- source maps are only uploaded automatically in GitHub Actions
- local source map uploads are opt-in via `FARO_UPLOAD_SOURCEMAPS=true`
- private source map upload credentials stay in CI, not in the browser bundle

Copy `.env.example` to `.env.local` for local testing, then fill in:

```bash
VITE_FARO_ENABLED=true
VITE_FARO_URL=...
VITE_FARO_APP_NAME=ali-bayramli-portfolio
VITE_FARO_APP_ENV=development
```

For dev testing, you can also use `.env.development.local` and then run:

```bash
npm run dev
```

The current instrumentation focuses on:

- one stable page-level `view` per route/path, which stays clean for future blog pages
- section views for the one-page portfolio
- important outbound actions such as resume download, project links, email, GitHub, and LinkedIn clicks
- React render failures via a Faro error boundary
- browser errors, sessions, web vitals, and client-side tracing from Faro's web SDK

## Deploy

This repo is configured to deploy to GitHub Pages via GitHub Actions on push to `main`.
The production URL is `https://alibayramli.github.io/me/`.
