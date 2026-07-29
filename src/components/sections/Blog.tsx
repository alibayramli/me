import { ArrowRight, Clock3, FileText } from 'lucide-react'
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

const Blog = ({ posts }: BlogProps) => (
  <section id="blog" className="px-6 py-24">
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
            Blog
          </div>
          <h2 className="text-3xl font-bold md:text-4xl">
            Notes on developer platforms and product-minded engineering.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
            Practical lessons from building internal platforms, Backstage workflows, and the
            delivery foundations around them.
          </p>
        </div>

        <a
          href={withBasePath('blog/')}
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          View all posts
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.url}
              className="glass group relative flex h-full flex-col rounded-3xl border border-border/70 p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-primary/20 bg-primary/[0.07] px-2.5 py-1 text-xs font-semibold text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold leading-snug">
                <a
                  href={post.url}
                  className="transition-colors after:absolute after:inset-0 hover:text-primary"
                >
                  {post.title}
                </a>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" />
                  {post.readingMinutes} min read
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="glass flex flex-col items-start gap-4 rounded-3xl border border-border/70 p-7 sm:flex-row sm:items-center">
          <div className="rounded-2xl bg-primary/[0.09] p-3 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">The first article is taking shape.</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              This section is ready for long-form posts, code samples, diagrams, and practical
              platform-engineering notes.
            </p>
          </div>
        </div>
      )}
    </div>
  </section>
)

export default Blog
