import { ArrowRight, Clock3 } from 'lucide-react'
import { formatBlogDate, slugifyTag } from '@/lib/blog-format'
import type { BlogPostSummary } from '@/lib/blog-types'
import { withBasePath } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

type BlogPostCardProps = {
  post: BlogPostSummary
  placement: 'home-latest' | 'blog-index' | 'tag-index'
  featured?: boolean
  showDraft?: boolean
}

const PostTopics = ({ tags }: { tags: string[] }) => (
  <ul className="flex flex-wrap gap-2" aria-label="Article topics">
    {tags.map((tag) => (
      <li key={tag}>
        <a
          href={withBasePath(`blog/tags/${slugifyTag(tag)}/`)}
          className="inline-flex rounded-md border border-primary/20 bg-primary/[0.07] px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/[0.13] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          {tag}
        </a>
      </li>
    ))}
  </ul>
)

const BlogPostCard = ({
  post,
  placement,
  featured = false,
  showDraft = false,
}: BlogPostCardProps) => {
  const Heading = placement === 'home-latest' ? 'h3' : 'h2'
  const articleEvent = {
    'data-umami-event': 'article-open',
    'data-umami-event-article': post.url,
    'data-umami-event-placement': placement,
  }

  return (
    <article
      className={cn(
        'glass flex h-full flex-col rounded-3xl p-6 transition-colors hover:border-primary/30',
        featured &&
          'md:grid md:grid-cols-[minmax(0,1fr)_18rem] md:gap-8 md:p-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 lg:p-10',
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col items-start">
        {showDraft && (
          <span className="mb-4 rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
            Draft
          </span>
        )}
        {!featured && post.tags.length > 0 && (
          <div className="mb-5">
            <PostTopics tags={post.tags} />
          </div>
        )}
        <Heading className={cn('text-2xl font-bold leading-snug', featured && 'md:text-3xl')}>
          <a
            href={post.url}
            className="rounded-sm transition-colors hover:text-primary focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            {...articleEvent}
          >
            {post.title}
          </a>
        </Heading>
        <p
          className={cn(
            'mt-4 text-sm leading-7 text-muted-foreground',
            featured && 'max-w-2xl md:text-base',
          )}
        >
          {post.description}
        </p>
        <div className="mt-auto pt-6">
          <a
            href={post.url}
            className="group/link inline-flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/[0.07] px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/[0.13] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            {...articleEvent}
          >
            Read article
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover/link:translate-x-1 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      <dl
        className={cn(
          'mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-border/70 pt-5 text-sm text-muted-foreground',
          featured &&
            'mt-8 grid grid-cols-2 gap-5 pt-6 md:mt-0 md:flex md:flex-col md:border-l md:border-t-0 md:pl-8 md:pt-0 lg:pl-12',
        )}
      >
        <div>
          <dt className={featured ? 'mb-2 text-xs font-medium' : 'sr-only'}>Published</dt>
          <dd className={featured ? 'font-medium text-foreground/90' : undefined}>
            <time dateTime={post.publishDate}>{formatBlogDate(new Date(post.publishDate))}</time>
          </dd>
        </div>
        <div>
          <dt className={featured ? 'mb-2 text-xs font-medium' : 'sr-only'}>Reading time</dt>
          <dd
            className={cn('flex items-center gap-2', featured && 'font-medium text-foreground/90')}
          >
            <Clock3 className="h-4 w-4 text-primary/80" aria-hidden="true" />
            {post.readingMinutes} min read
          </dd>
        </div>
        {featured && post.tags.length > 0 && (
          <div className="col-span-2">
            <dt className="mb-2 text-xs font-medium">Topics</dt>
            <dd>
              <PostTopics tags={post.tags} />
            </dd>
          </div>
        )}
      </dl>
    </article>
  )
}

export default BlogPostCard
