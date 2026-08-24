import { ChevronDown, ExternalLink } from 'lucide-react'
import { GitHubIcon } from '@/components/brand-icons'
import { Card, CardContent } from '@/components/ui/card'
import { PROJECTS } from '@/lib/portfolio-data'

type FeaturedProject = (typeof PROJECTS)[number] & {
  featured?: boolean
  homepageOrder?: number
}

const FEATURED_PROJECTS = (PROJECTS as FeaturedProject[])
  .filter((project) => project.featured === true)
  .sort(
    (firstProject, secondProject) =>
      (firstProject.homepageOrder ?? Number.MAX_SAFE_INTEGER) -
      (secondProject.homepageOrder ?? Number.MAX_SAFE_INTEGER),
  )

const Projects = () => {
  return (
    <section id="projects" className="scroll-mt-24 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-3xl font-bold md:text-4xl">Selected projects</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {FEATURED_PROJECTS.map((project) => (
            <Card key={project.title} className="glass overflow-hidden border-0">
              <CardContent className="flex h-full flex-col p-6 md:p-7">
                <div>
                  {project.company && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary/75">
                      {project.company}
                    </p>
                  )}
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <p className="mt-4 border-l-2 border-primary/50 pl-4 text-sm font-medium leading-relaxed text-foreground/90">
                  {project.result}
                </p>

                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground/80">Built with:</span>{' '}
                  {project.tech.slice(0, 4).join(', ')}
                </p>

                {project.caseStudy.length > 0 && (
                  <details className="group mt-5 border-t border-border/70 pt-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-foreground/85 marker:content-none">
                      Implementation details
                      <ChevronDown
                        className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <ul className="card-list mt-4 space-y-3 text-sm text-muted-foreground">
                      {project.caseStudy.map((item) => (
                        <li key={item} className="card-list-item">
                          <span className="card-list-bullet" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                {project.links && (
                  <div className="mt-auto flex flex-wrap gap-4 pt-6">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary hover:underline"
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
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
