import App from '@/App'
import AppErrorBoundary from '@/components/AppErrorBoundary'
import type { BlogPostSummary } from '@/lib/blog-types'

type PortfolioAppProps = {
  posts: BlogPostSummary[]
}

const PortfolioApp = ({ posts }: PortfolioAppProps) => (
  <AppErrorBoundary>
    <App posts={posts} />
  </AppErrorBoundary>
)

export default PortfolioApp
