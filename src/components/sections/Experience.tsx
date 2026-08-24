import { ChevronDown, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { EXPERIENCES } from '@/lib/portfolio-data'

const Experience = () => {
  return (
    <section id="experience" className="scroll-mt-24 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-5xl xl:max-w-[54rem]">
          <h2 className="mb-10 text-3xl font-bold md:text-4xl">Experience</h2>

          <div className="space-y-5">
            {EXPERIENCES.map((exp) => {
              const extraAchievements = exp.achievements
              const coreTools = exp.tech.slice(0, 6)
              const additionalTools = exp.tech.slice(6)

              return (
                <Card
                  key={`${exp.company}-${exp.period}`}
                  className={`glass border-0 ${exp.highlight ? 'border border-primary/25' : ''}`}
                >
                  <CardContent className="p-6 md:p-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="text-xl font-bold">{exp.company}</h3>
                          {exp.highlight && (
                            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm font-semibold text-foreground/85">{exp.role}</p>
                      </div>

                      <div className="shrink-0 text-sm text-muted-foreground sm:text-right">
                        <div>{exp.period}</div>
                        <div className="mt-1 flex items-center gap-1 sm:justify-end">
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>

                    <p className="mt-4 border-l-2 border-primary/50 pl-4 text-sm font-medium leading-relaxed text-foreground/90">
                      {exp.impact}
                    </p>

                    <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground/80">Tools:</span>{' '}
                      {coreTools.join(', ')}
                    </p>

                    {(extraAchievements.length > 0 || additionalTools.length > 0) && (
                      <details className="group mt-5 border-t border-border/70 pt-4">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-foreground/85 marker:content-none">
                          More details
                          <ChevronDown
                            className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                            aria-hidden="true"
                          />
                        </summary>
                        {extraAchievements.length > 0 && (
                          <ul className="card-list mt-4 grid gap-3">
                            {extraAchievements.map((achievement) => (
                              <li key={achievement} className="card-list-item text-sm">
                                <span className="card-list-bullet" aria-hidden="true" />
                                <span className="text-muted-foreground">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {additionalTools.length > 0 && (
                          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                            <span className="font-semibold text-foreground/80">Other tools:</span>{' '}
                            {additionalTools.join(', ')}
                          </p>
                        )}
                      </details>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
