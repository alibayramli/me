import { MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { EXPERIENCE_GROUPS } from '@/lib/portfolio-data'

const Experience = () => {
  return (
    <section id="experience" className="scroll-mt-24 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-5xl xl:max-w-[54rem]">
          <h2 className="mb-10 text-3xl font-bold md:text-4xl">Experience</h2>

          <div className="space-y-5">
            {EXPERIENCE_GROUPS.map((group) => {
              const isCurrentEmployer = group.roles.some((role) => role.period.endsWith('Present'))
              const hasMultipleRoles = group.roles.length > 1

              return (
                <Card
                  key={`${group.company}-${group.roles[0].period}`}
                  className={`glass border-0 ${isCurrentEmployer ? 'border border-primary/25' : ''}`}
                >
                  <CardContent className="p-6 md:p-7">
                    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-xl font-bold">{group.company}</h3>
                      {isCurrentEmployer && (
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">
                          Current
                        </span>
                      )}
                    </div>
                    <div className={hasMultipleRoles ? 'ml-1 border-l border-border pl-5' : ''}>
                      {group.roles.map((exp, index) => {
                        const [primaryBullet, ...supportingBullets] = exp.bullets
                        return (
                          <div
                            key={`${exp.role}-${exp.period}`}
                            className={`relative ${index > 0 ? 'mt-7' : ''}`}
                          >
                            {hasMultipleRoles && (
                              <span
                                className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary"
                                aria-hidden="true"
                              />
                            )}
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                              <h4 className="text-base font-semibold text-foreground/90">
                                {exp.role}
                              </h4>

                              <div className="shrink-0 text-sm text-muted-foreground sm:text-right">
                                <div>{exp.period}</div>
                                <div className="mt-1 flex items-center gap-1 sm:justify-end">
                                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                                  {exp.location}
                                </div>
                              </div>
                            </div>

                            <p className="mt-4 border-l-2 border-primary/50 pl-4 text-sm font-medium leading-relaxed text-foreground/90">
                              {primaryBullet}
                            </p>

                            {supportingBullets.length > 0 && (
                              <ul className="card-list mt-5 grid gap-3">
                                {supportingBullets.map((bullet) => (
                                  <li key={bullet} className="card-list-item text-sm">
                                    <span className="card-list-bullet" aria-hidden="true" />
                                    <span className="text-muted-foreground">{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            <p className="mt-5 border-t border-border/70 pt-4 text-xs leading-relaxed text-muted-foreground">
                              <span className="font-semibold text-foreground/80">
                                Technologies:
                              </span>{' '}
                              {exp.tech.join(', ')}
                            </p>
                          </div>
                        )
                      })}
                    </div>
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
