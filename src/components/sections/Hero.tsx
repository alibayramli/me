import { useState } from 'react'
import { Mail, MapPin, User } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/brand-icons'
import { Button } from '@/components/ui/button'
import { SITE_PROFILE } from '@/lib/portfolio-data'

const Hero = () => {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section id="hero" className="px-6 pb-16 pt-32 md:pb-20 md:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] xl:gap-20">
        <div id="hero-intro">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">
            {SITE_PROFILE.title}
          </div>

          <h1 id="hero-name" className="mb-5 text-5xl font-bold tracking-tight md:text-7xl">
            <span className="text-gradient">{SITE_PROFILE.name}</span>
          </h1>

          <h2 className="max-w-4xl text-2xl font-medium leading-tight text-foreground/95 md:text-4xl lg:text-[2.75rem]">
            {SITE_PROFILE.headline}
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            {SITE_PROFILE.summary}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground/80">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            {SITE_PROFILE.availability}
          </div>

          <div className="mt-8">
            <Button size="lg" className="w-full px-7 sm:w-auto" asChild>
              <a href="#experience">View Experience</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary/80" />
              {SITE_PROFILE.location} / Remote
            </span>
            <a
              href={`mailto:${SITE_PROFILE.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              data-umami-event="email-click"
              data-umami-event-placement="hero"
            >
              <Mail className="h-4 w-4 text-primary/80" />
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

        <div className="mx-auto w-full max-w-[19rem] lg:mx-0">
          <div className="overflow-hidden rounded-[1.75rem] border border-border/80">
            {imageFailed ? (
              <div className="flex aspect-[4/5] items-center justify-center bg-muted/70">
                <User className="h-12 w-12 text-primary/70" />
              </div>
            ) : (
              <img
                src={SITE_PROFILE.profileImageUrl}
                alt={`${SITE_PROFILE.name} portrait`}
                className="aspect-[4/5] w-full object-cover"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                onError={() => setImageFailed(true)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
