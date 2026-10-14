import { ChevronDown, ExternalLink } from 'lucide-react'
import { GitHubIcon } from '@/components/brand-icons'
import { Card, CardContent } from '@/components/ui/card'
import { PROJECTS } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

const ProjectHighlights = ({ items }: { items: string[] }) => (
  <ul className="card-list mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
    {items.map((item) => (
      <li key={item} className="card-list-item">
        <span className="card-list-bullet" aria-hidden="true" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

const Projects = () => {
  const isFeatured = PROJECTS.length === 1

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-3xl font-bold md:text-4xl">Selected projects</h2>

        <div className={cn('grid grid-cols-1 gap-6', !isFeatured && 'md:grid-cols-2')}>
          {PROJECTS.map((project) => (
            <Card
              key={project.title}
              className={cn('glass overflow-hidden border-0', isFeatured && 'rounded-3xl py-0')}
            >
              <CardContent
                className={cn(
                  'h-full p-6 md:p-7',
                  isFeatured && 'md:p-8 lg:p-10',
                  isFeatured &&
                    project.caseStudy.length > 0 &&
                    'grid gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12',
                )}
              >
                <div className="flex h-full min-w-0 flex-col">
                  <h3 className={cn('text-xl font-bold', isFeatured && 'text-2xl md:text-3xl')}>
                    {project.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {isFeatured ? (
                    <ul aria-label="Built with" className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-border/70 bg-background/40 px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground/80">Built with:</span>{' '}
                      {project.tech.slice(0, 4).join(', ')}
                    </p>
                  )}

                  {!isFeatured && project.caseStudy.length > 0 && (
                    <details className="group mt-5 border-t border-border/70 pt-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-foreground/85 marker:content-none">
                        Project overview
                        <ChevronDown
                          className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                          aria-hidden="true"
                        />
                      </summary>
                      <ProjectHighlights items={project.caseStudy} />
                    </details>
                  )}

                  {project.links && (
                    <div className="mt-auto flex flex-wrap gap-4 pt-6">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'flex items-center gap-1 text-sm text-primary hover:underline',
                            isFeatured &&
                              'gap-2 rounded-lg border border-primary/25 px-4 py-2.5 font-semibold transition-colors hover:bg-primary/10 hover:no-underline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary',
                          )}
                          data-umami-event="project-link-click"
                          data-umami-event-project={project.title}
                          data-umami-event-destination="live"
                          data-umami-event-placement="card-footer"
                        >
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                          Live Demo
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground',
                            isFeatured &&
                              'gap-2 rounded-lg border border-border bg-background/40 px-4 py-2.5 font-semibold text-foreground/90 transition-colors hover:bg-accent/70 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary',
                          )}
                          data-umami-event="project-link-click"
                          data-umami-event-project={project.title}
                          data-umami-event-destination="github"
                          data-umami-event-placement="card-footer"
                        >
                          <GitHubIcon className="h-4 w-4" aria-hidden="true" />
                          Source Code
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {isFeatured && project.caseStudy.length > 0 && (
                  <div className="border-t border-border/70 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0 lg:pl-12">
                    <h4 className="text-sm font-semibold text-foreground/90">Project highlights</h4>
                    <ProjectHighlights items={project.caseStudy} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
