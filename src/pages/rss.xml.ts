import rss from '@astrojs/rss'
import { getBlogPosts, getPostUrl } from '@/lib/blog'
import { SITE_PROFILE } from '@/lib/portfolio-data'

export async function GET() {
  const posts = await getBlogPosts({ includeDrafts: false })

  return rss({
    title: `${SITE_PROFILE.name} - Blog`,
    description:
      'Practical notes on internal developer platforms, Backstage, developer experience, and platform-minded product engineering.',
    site: new URL(SITE_PROFILE.siteUrl),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: getPostUrl(post),
      categories: post.data.tags,
    })),
    customData: '<language>en-us</language>',
  })
}
