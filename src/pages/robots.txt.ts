import type { APIRoute } from 'astro'
import { SITE_PROFILE } from '@/lib/portfolio-data'

export const GET: APIRoute = ({ site }) => {
  const root = site ?? new URL(SITE_PROFILE.siteUrl)
  const sitemapUrl = new URL(`${import.meta.env.BASE_URL}sitemap-index.xml`, root)

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl.href}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
