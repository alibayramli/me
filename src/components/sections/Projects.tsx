import { ArrowUpRight, ExternalLink, Layers } from 'lucide-react'
import { GitHubIcon } from '@/components/brand-icons'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getTrackedElementProps } from '@/lib/observability'
import { PROJECTS } from '@/lib/portfolio-data'

const Projects = () => {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <Layers className="mr-1 h-3 w-3" />
            Featured Work
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Projects that show how I think and execute
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            A mix of internal platform work, shipping product systems, and open-source or
            self-directed builds that make my engineering range visible.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <Card key={project.title} className="glass group relative overflow-hidden border-0">
              <CardContent className="relative p-6">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-background/45 text-foreground/85 dark:bg-background/25 dark:text-primary">
                      {project.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/75">
                          {project.label}
                        </span>
                        {project.company && (
                          <Badge
                            variant="outline"
                            className="bg-background/45 text-[10px] uppercase tracking-[0.14em]"
                          >
                            {project.company}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-bold transition-colors group-hover:text-foreground">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {project.links && (
                    <div className="hidden shrink-0 items-center gap-3 sm:flex">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                          {...getTrackedElementProps('project_link_click', {
                            linkType: 'live',
                            placement: 'header',
                            projectTitle: project.title,
                          })}
                        >
                          Live
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-foreground"
                          {...getTrackedElementProps('project_link_click', {
                            linkType: 'github',
                            placement: 'header',
                            projectTitle: project.title,
                          })}
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mb-5 rounded-2xl border border-border/70 bg-background/28 p-4 dark:bg-background/18">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/75">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    Outcome
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">{project.result}</p>
                </div>

                {project.metrics && project.metrics.length > 0 && (
                  <div className="mb-5 grid gap-3 sm:grid-cols-2">
                    {project.metrics.map((metric) => (
                      <div
                        key={`${project.title}-${metric.label}`}
                        className="rounded-2xl border border-border/70 bg-background/28 p-4 dark:bg-background/18"
                      >
                        <div className="text-xl font-bold text-foreground">{metric.value}</div>
                        <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mb-5">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    <Layers className="h-3.5 w-3.5 text-primary/80" />
                    Highlights
                  </div>
                  <ul className="card-list space-y-3 text-sm text-muted-foreground">
                    {project.caseStudy.slice(0, 3).map((item) => (
                      <li key={item} className="card-list-item">
                        <span className="card-list-bullet" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-background/70 text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {project.links && (
                  <div className="flex flex-wrap gap-4 border-t border-border/70 pt-4">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary hover:underline"
                        {...getTrackedElementProps('project_link_click', {
                          linkType: 'live',
                          placement: 'footer',
                          projectTitle: project.title,
                        })}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                        {...getTrackedElementProps('project_link_click', {
                          linkType: 'github',
                          placement: 'footer',
                          projectTitle: project.title,
                        })}
                      >
                        <GitHubIcon className="h-4 w-4" />
                        Source Code
                      </a>
                    )}
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
