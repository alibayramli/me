import { useState } from 'react'
import { Download, Globe, Mail, MapPin, MoveRight, User } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/brand-icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { HERO_FOCUS, SITE_PROFILE } from '@/lib/portfolio-data'

const MOBILE_CAPABILITY_LABELS: Record<string, string> = {
  'Platform engineering': 'Platform eng',
  'Developer portals': 'Dev portals',
  'Full-stack development': 'Full-stack dev',
}

const Hero = () => {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section id="hero" className="relative flex min-h-screen items-center px-6 pb-20 pt-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.1fr)_24rem]">
          <div id="hero-intro">
            <div className="mb-6 grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:gap-2">
              {SITE_PROFILE.heroCapabilities.map((capability) => (
                <Badge
                  key={capability}
                  variant="outline"
                  className="w-full rounded-lg border-primary/35 bg-primary/[0.05] px-2 py-1 text-center text-[0.62rem] font-semibold tracking-[0.01em] text-primary/90 sm:w-auto sm:rounded-xl sm:px-3 sm:py-1.5 sm:text-[0.72rem] sm:tracking-[0.04em]"
                >
                  <span className="sm:hidden">
                    {MOBILE_CAPABILITY_LABELS[capability] ?? capability}
                  </span>
                  <span className="hidden sm:inline">{capability}</span>
                </Badge>
              ))}
            </div>

            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">
              {SITE_PROFILE.title}
            </div>
            <h1 id="hero-name" className="mb-4 text-5xl font-bold tracking-tight md:text-7xl">
              <span className="text-gradient">{SITE_PROFILE.name}</span>
            </h1>
            <h2 className="mb-6 max-w-4xl text-2xl font-light leading-tight text-foreground/90 md:text-4xl lg:text-5xl">
              {SITE_PROFILE.headline}
            </h2>

            <p className="mb-10 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {SITE_PROFILE.summary}
            </p>

            <div className="mb-10 grid gap-3 sm:flex sm:flex-row sm:flex-wrap">
              <Button
                size="lg"
                className="w-full px-7 text-primary-foreground hover:bg-primary/90 sm:w-auto"
                asChild
              >
                <a href={SITE_PROFILE.resumePdfUrl} download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <a href="#projects">
                  View Projects
                  <MoveRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-primary/20 bg-primary/[0.04] text-foreground hover:bg-primary/[0.08] sm:w-auto"
                asChild
              >
                <a href={`mailto:${SITE_PROFILE.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Me
                </a>
              </Button>
            </div>
          </div>

          <div>
            <Card className="glass overflow-hidden border-0">
              <CardContent className="p-5">
                <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-background/60">
                  {imageFailed ? (
                    <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
                      <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-border/70 bg-background/85 shadow-lg shadow-primary/10">
                        <User className="h-10 w-10 text-primary/75" />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={SITE_PROFILE.profileImageUrl}
                      alt={`${SITE_PROFILE.name} portrait`}
                      className="aspect-[4/5] h-full w-full object-cover"
                      onError={() => setImageFailed(true)}
                    />
                  )}
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold">{SITE_PROFILE.name}</div>
                    <div className="text-sm text-muted-foreground">{SITE_PROFILE.title}</div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary/80" />
                    {SITE_PROFILE.location} / {SITE_PROFILE.remote}
                  </div>
                  <a
                    href={SITE_PROFILE.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-foreground"
                  >
                    <Globe className="h-4 w-4 text-primary/80" />
                    {SITE_PROFILE.siteUrl.replace(/^https?:\/\//, '')}
                  </a>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href={SITE_PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                      <LinkedInIcon className="mr-2 h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={SITE_PROFILE.github} target="_blank" rel="noopener noreferrer">
                      <GitHubIcon className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {HERO_FOCUS.map((item) => (
            <Card key={item.title} className="glass h-full border-0">
              <CardContent className="p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
                  {item.eyebrow}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
