import path from 'node:path'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

const BASE_PATH = '/me'

export default defineConfig({
  site: 'https://alibayramli.github.io',
  base: BASE_PATH,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [react(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
})
