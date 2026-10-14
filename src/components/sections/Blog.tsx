import { ArrowRight } from 'lucide-react'
import BlogPostCard from '@/components/blog/BlogPostCard'
import type { BlogPostSummary } from '@/lib/blog-types'
import { withBasePath } from '@/lib/portfolio-data'

type BlogProps = {
  posts: BlogPostSummary[]
}

const Blog = ({ posts }: BlogProps) => {
  const latestPost = posts[0]

  if (!latestPost) {
    return null
  }

  return (
    <section id="blog" className="scroll-mt-24 px-6 pb-10 pt-16 md:pb-12 md:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold md:text-4xl">Latest blog post</h2>
          <a
            href={withBasePath('blog/')}
            className="inline-flex shrink-0 items-center gap-2 rounded-sm text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            data-umami-event="blog-index-open"
            data-umami-event-placement="home-blog-header"
          >
            View all
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <BlogPostCard post={latestPost} placement="home-latest" featured />
      </div>
    </section>
  )
}

export default Blog
