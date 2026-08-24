import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/brand-icons'
import { SITE_PROFILE } from '@/lib/portfolio-data'

const Contact = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 border-t border-primary/20 bg-primary/[0.055] px-6 py-14 dark:bg-primary/[0.07] md:py-16"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/85">
            Contact
          </div>
          <h2 id="contact-title" className="mt-3 text-3xl font-bold md:text-4xl">
            Have a role or project in mind?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            {SITE_PROFILE.contactHeadline}
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary/80" aria-hidden="true" />
            {SITE_PROFILE.location} / Remote
          </div>
        </div>

        <div className="lg:border-l lg:border-primary/20 lg:pl-12">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Best way to reach me
          </div>

          <a
            href={`mailto:${SITE_PROFILE.email}`}
            className="group mt-4 flex items-center gap-4 rounded-2xl border border-primary/20 bg-background/65 p-4 transition-colors hover:border-primary/35 hover:bg-background/90 dark:bg-background/30 dark:hover:bg-background/45"
            data-umami-event="email-click"
            data-umami-event-placement="contact-primary"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold text-foreground md:text-lg">
              Send an email
            </span>
            <ArrowUpRight
              className="ml-auto h-5 w-5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            <a
              href={SITE_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              data-umami-event="profile-link-click"
              data-umami-event-platform="linkedin"
              data-umami-event-placement="contact-secondary"
            >
              <LinkedInIcon className="h-4 w-4 text-primary/80" />
              LinkedIn
            </a>
            <a
              href={SITE_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              data-umami-event="profile-link-click"
              data-umami-event-platform="github"
              data-umami-event-placement="contact-secondary"
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

export default Contact
