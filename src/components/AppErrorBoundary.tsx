import { Component, type ErrorInfo, type ReactNode } from 'react'
import { SITE_PROFILE } from '@/lib/portfolio-data'
import { trackError } from '@/lib/observability'

type AppErrorBoundaryProps = {
  children: ReactNode
}

type AppErrorBoundaryState = {
  error: Error | null
}

class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    error: null,
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    trackError(error, {
      context: {
        componentStack: errorInfo.componentStack,
        source: 'app_error_boundary',
      },
      type: 'ReactErrorBoundary',
    })
  }

  render() {
    if (!this.state.error) {
      return this.props.children
    }

    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="glass max-w-lg rounded-3xl border border-border/70 p-8 text-center">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
            Something broke
          </div>
          <h1 className="mb-4 text-3xl font-bold">The portfolio hit an unexpected client error.</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            If Grafana observability is configured for this build, the failure should already be
            visible there.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              onClick={() => {
                this.setState({ error: null })
                window.location.reload()
              }}
            >
              Reload page
            </button>
            <a
              href={`mailto:${SITE_PROFILE.email}`}
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
            >
              Report issue
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{this.state.error.message}</p>
        </div>
      </div>
    )
  }
}

export default AppErrorBoundary
