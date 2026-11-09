import { useState } from 'react'
import { Mail, MapPin, User } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/brand-icons'
import { Button } from '@/components/ui/button'
import { SITE_PROFILE } from '@/lib/portfolio-data'

const Hero = () => {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section id="hero" className="px-6 pb-8 pt-28 md:pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4 md:gap-5">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border/80 md:h-20 md:w-20">
            {imageFailed ? (
              <div className="flex h-full items-center justify-center bg-muted/70">
                <User className="h-8 w-8 text-primary/70" aria-hidden="true" />
              </div>
            ) : (
              <img
                src={SITE_PROFILE.profileImageUrl}
                alt={SITE_PROFILE.name + ' portrait'}
                className="h-full w-full object-cover object-[center_30%]"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                onError={() => setImageFailed(true)}
              />
            )}
          </div>
          <div className="min-w-0">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary/85">
              {SITE_PROFILE.title}
            </p>
            <h1
              id="hero-name"
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            >
              {SITE_PROFILE.name}
            </h1>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-xl font-medium leading-relaxed text-foreground/95 md:text-2xl">
          {SITE_PROFILE.headline}
        </p>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          {SITE_PROFILE.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-2 font-medium text-foreground/80">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
            {SITE_PROFILE.availability}
          </span>
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-primary/80" aria-hidden="true" />
            {SITE_PROFILE.location}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-5">
          <Button size="lg" className="w-full px-7 sm:w-auto" asChild>
            <a href="#projects">View projects</a>
          </Button>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
            <a
              href={'mailto:' + SITE_PROFILE.email}
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              data-umami-event="email-click"
              data-umami-event-placement="hero"
            >
              <Mail className="h-4 w-4 text-primary/80" aria-hidden="true" />
              Email
            </a>
            <a
              href={SITE_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              data-umami-event="profile-link-click"
              data-umami-event-platform="linkedin"
              data-umami-event-placement="hero"
            >
              <LinkedInIcon className="h-4 w-4 text-primary/80" />
              LinkedIn
            </a>
            <a
              href={SITE_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              data-umami-event="profile-link-click"
              data-umami-event-platform="github"
              data-umami-event-placement="hero"
            >
              <GitHubIcon className="h-4 w-4 text-primary/80" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
