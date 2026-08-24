import { ArrowRight, Clock3 } from 'lucide-react'
import type { BlogPostSummary } from '@/lib/blog-types'
import { withBasePath } from '@/lib/portfolio-data'

type BlogProps = {
  posts: BlogPostSummary[]
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))

const Blog = ({ posts }: BlogProps) => {
  const latestPost = posts[0]

  if (!latestPost) {
    return null
  }

  return (
    <section id="blog" className="px-6 pb-10 pt-16 md:pb-12 md:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold md:text-3xl">Latest Blog Post</h2>
          <a
            href={withBasePath('blog/')}
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <article className="glass rounded-3xl p-6 md:flex md:items-center md:justify-between md:gap-10">
          <div className="max-w-4xl">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <time dateTime={latestPost.publishDate}>{formatDate(latestPost.publishDate)}</time>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5" />
                {latestPost.readingMinutes} min read
              </span>
            </div>
            <h3 className="text-xl font-bold leading-snug md:text-2xl">{latestPost.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{latestPost.description}</p>
          </div>

          <a
            href={latestPost.url}
            className="mt-5 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 md:mt-0"
            data-umami-event="article-open"
            data-umami-event-article={latestPost.url}
            data-umami-event-placement="home-latest"
          >
            Read article
            <ArrowRight className="h-4 w-4" />
          </a>
        </article>
      </div>
    </section>
  )
}

export default Blog
