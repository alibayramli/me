import { Award, Briefcase, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { EXPERIENCES } from '@/lib/portfolio-data'

const Experience = () => {
  return (
    <section id="experience" className="scroll-mt-24 px-6 pb-24 pt-[4.5rem] md:pb-24 md:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-5xl xl:max-w-[54rem]">
          <div className="mb-12 max-w-3xl">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              <Briefcase className="mr-1 h-3 w-3" />
              Experience
            </Badge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Work history with measurable outcomes
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              A mix of platform, front-end, and full-stack roles across fintech, SaaS, and
              enterprise environments.
            </p>
          </div>

          <div className="space-y-5">
            {EXPERIENCES.map((exp) => (
              <Card
                key={`${exp.company}-${exp.period}`}
                className={`glass border-0 transition-transform duration-300 hover:-translate-y-1 ${
                  exp.highlight ? 'border border-primary/25' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold">{exp.company}</h3>
                        {exp.highlight && (
                          <Badge className="bg-background/80 text-foreground/85 text-xs">
                            <Award className="mr-1 h-3 w-3" />
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="mb-2 text-sm font-semibold text-foreground/85">
                        {exp.role}
                      </div>
                      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>
                      <div className="mt-4">
                        <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                          Key Outcome
                        </div>
                        <p className="text-sm font-medium text-foreground/85">{exp.impact}</p>
                      </div>
                    </div>

                    <div className="shrink-0 space-y-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground/80 lg:text-right">
                      <div>{exp.period}</div>
                      <div className="flex items-center gap-1 normal-case tracking-normal lg:justify-end">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <ul className="card-list mb-5 grid gap-3">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement} className="card-list-item text-sm">
                        <span className="card-list-bullet" aria-hidden="true" />
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-background/70 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
