import { getCollection, type CollectionEntry } from 'astro:content'
import { slugifyTag } from '@/lib/blog-format'
import type { BlogPostSummary } from '@/lib/blog-types'
import { withBasePath } from '@/lib/portfolio-data'

export { formatBlogDate, slugifyTag } from '@/lib/blog-format'

const WORDS_PER_MINUTE = 220

type BlogPost = CollectionEntry<'blog'>

type GetBlogPostsOptions = {
  includeDrafts?: boolean
}

export function isPublishedPost(post: BlogPost, now = new Date()) {
  return !post.data.draft && post.data.publishDate.getTime() <= now.getTime()
}

export async function getBlogPosts({
  includeDrafts = import.meta.env.DEV,
}: GetBlogPostsOptions = {}) {
  const now = new Date()
  const posts = await getCollection('blog')

  return posts
    .filter((post) => includeDrafts || isPublishedPost(post, now))
    .sort((left, right) => right.data.publishDate.getTime() - left.data.publishDate.getTime())
}

export function getReadingMinutes(body?: string) {
  const prose = (body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/<[^>]+>/g, ' ')
  const wordCount = prose.match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu)?.length ?? 0

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

export function getPostUrl(post: Pick<BlogPost, 'id'>) {
  return withBasePath(`blog/${post.id}/`)
}

export function toPostSummary(post: BlogPost): BlogPostSummary {
  return {
    title: post.data.title,
    description: post.data.description,
    publishDate: post.data.publishDate.toISOString(),
    readingMinutes: getReadingMinutes(post.body),
    tags: post.data.tags,
    url: getPostUrl(post),
  }
}

export function getTagMap(posts: BlogPost[]) {
  const tags = new Map<string, string>()

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = slugifyTag(tag)
      if (slug && !tags.has(slug)) {
        tags.set(slug, tag)
      }
    }
  }

  return tags
}
