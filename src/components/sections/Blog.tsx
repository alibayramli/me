import { ArrowRight } from 'lucide-react'
import type { BlogPostSummary } from '@/lib/blog-types'
import { formatBlogDate } from '@/lib/blog-format'
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
    <section id="blog" className="scroll-mt-24 px-6 py-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold md:text-4xl">Writing</h2>
          <a
            href={withBasePath('blog/')}
            className="inline-flex shrink-0 items-center gap-2 rounded-sm text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            data-umami-event="blog-index-open"
            data-umami-event-placement="home-blog-header"
          >
            All posts
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <article className="grid gap-4 border-t border-border/70 pt-6 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10">
          <p className="text-sm text-muted-foreground">
            <time dateTime={latestPost.publishDate}>
              {formatBlogDate(new Date(latestPost.publishDate))}
            </time>
            <span className="mt-1 block text-xs">{latestPost.readingMinutes} min read</span>
          </p>
          <div>
            <h3 className="text-xl font-semibold">
              <a
                href={latestPost.url}
                className="rounded-sm underline-offset-4 hover:text-primary hover:underline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                data-umami-event="article-open"
                data-umami-event-article={latestPost.url}
                data-umami-event-placement="home-latest"
              >
                {latestPost.title}
              </a>
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              {latestPost.description}
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Blog
