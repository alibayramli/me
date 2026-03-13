import { Globe, Handshake, Mail, MapPin } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/brand-icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getTrackedElementProps } from '@/lib/observability'
import { SITE_PROFILE } from '@/lib/portfolio-data'

const Contact = () => {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-[46rem]">
          <Card className="glass overflow-hidden border-0">
            <CardContent className="p-8 md:p-11">
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
                  <Handshake className="mr-1 h-3 w-3" />
                  Contact
                </Badge>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                  Need someone who can improve developer flow and still ship product code?
                </h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">
                  {SITE_PROFILE.contactHeadline}
                </p>
              </div>

              <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Button size="lg" className="w-full max-w-xs sm:w-auto" asChild>
                  <a
                    href={`mailto:${SITE_PROFILE.email}`}
                    {...getTrackedElementProps('contact_click', {
                      channel: 'email',
                      source: 'contact_cta',
                    })}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email Me
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="w-full max-w-xs sm:w-auto" asChild>
                  <a
                    href={SITE_PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...getTrackedElementProps('profile_link_click', {
                      source: 'contact_cta',
                      target: 'linkedin',
                    })}
                  >
                    <LinkedInIcon className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>

              <div className="mx-auto grid max-w-[38rem] gap-4 border-t border-border/70 pt-8 md:grid-cols-2">
                <div className="rounded-3xl border border-border/70 bg-background/55 p-5">
                  <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                    Direct Contact
                  </div>
                  <div className="grid gap-3 text-sm text-muted-foreground">
                    <a
                      href={`mailto:${SITE_PROFILE.email}`}
                      className="flex items-center gap-2 hover:text-foreground"
                      {...getTrackedElementProps('contact_click', {
                        channel: 'email',
                        source: 'contact_card',
                      })}
                    >
                      <Mail className="h-4 w-4 text-primary/80" />
                      {SITE_PROFILE.email}
                    </a>
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
                </div>

                <div className="rounded-3xl border border-border/70 bg-background/55 p-5">
                  <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                    Profiles and Languages
                  </div>
                  <div className="grid gap-3 text-sm text-muted-foreground">
                    <a
                      href={SITE_PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-foreground"
                      {...getTrackedElementProps('profile_link_click', {
                        source: 'contact_card',
                        target: 'github',
                      })}
                    >
                      <GitHubIcon className="h-4 w-4 text-primary/80" />
                      GitHub /alibayramli
                    </a>
                    <a
                      href={SITE_PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-foreground"
                      {...getTrackedElementProps('profile_link_click', {
                        source: 'contact_card',
                        target: 'linkedin',
                      })}
                    >
                      <LinkedInIcon className="h-4 w-4 text-primary/80" />
                      LinkedIn /in/alibayramli
                    </a>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {SITE_PROFILE.languages.map((language) => (
                        <Badge key={language} variant="secondary" className="bg-background/80">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Contact
