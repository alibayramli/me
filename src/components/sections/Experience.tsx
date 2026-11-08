import { ChevronDown } from 'lucide-react'
import { EXPERIENCE_GROUPS } from '@/lib/portfolio-data'

const Experience = () => (
  <section id="experience" className="scroll-mt-24 px-6 py-8 md:py-10">
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-6 text-3xl font-bold md:text-4xl">Experience</h2>

      <div className="divide-y divide-border/70 border-y border-border/70">
        {EXPERIENCE_GROUPS.map((group) => (
          <article
            key={group.company + group.roles[0].period}
            className="grid gap-4 py-6 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10"
          >
            <h3 className="text-xl font-semibold">{group.company}</h3>
            <div className="space-y-8">
              {group.roles.map((exp) => {
                const [primaryBullet, ...supportingBullets] = exp.bullets

                return (
                  <div key={exp.role + exp.period}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h4 className="text-base font-semibold">{exp.role}</h4>
                      <span className="text-sm text-muted-foreground">{exp.period}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{exp.location}</p>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/90">
                      {primaryBullet}
                    </p>

                    <details className="group mt-3">
                      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-sm text-sm font-medium text-primary marker:content-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                        Role details
                        <ChevronDown
                          className="h-4 w-4 transition-transform group-open:rotate-180"
                          aria-hidden="true"
                        />
                      </summary>
                      {supportingBullets.length > 0 && (
                        <ul className="mt-4 max-w-2xl list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
                          {supportingBullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                      <p className="mt-4 text-xs leading-6 text-muted-foreground">
                        {exp.tech.join(', ')}
                      </p>
                    </details>
                  </div>
                )
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default Experience
