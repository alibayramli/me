import { Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/brand-icons'
import { NAV_ITEMS, SITE_PROFILE } from '@/lib/portfolio-data'

const Footer = () => {
  const capabilitySummary = SITE_PROFILE.heroCapabilities.join(' / ')

  return (
    <footer className="border-t border-border/70 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold">{SITE_PROFILE.name}</div>
          <div>
            <div className="text-sm text-muted-foreground">
              {SITE_PROFILE.title} / {capabilitySummary}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-foreground">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${SITE_PROFILE.email}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Send email"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href={SITE_PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Visit GitHub profile"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            href={SITE_PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Visit LinkedIn profile"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-6xl text-sm text-muted-foreground">
        (c) {new Date().getFullYear()} {SITE_PROFILE.name}
      </div>
    </footer>
  )
}

export default Footer
