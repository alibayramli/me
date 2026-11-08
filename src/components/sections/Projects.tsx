import { ChevronDown, ExternalLink } from 'lucide-react'
import { GitHubIcon } from '@/components/brand-icons'
import { PROJECTS } from '@/lib/portfolio-data'

const Projects = () => (
  <section id="projects" className="scroll-mt-24 px-6 py-8 md:py-10">
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-6 text-3xl font-bold md:text-4xl">Projects</h2>

      <div className="divide-y divide-border/70 border-y border-border/70">
        {PROJECTS.map((project) => (
          <article
            key={project.title}
            className="grid gap-4 py-6 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10"
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <div>
              <p className="max-w-2xl text-base leading-7 text-foreground/90">
                {project.description}
              </p>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                {project.tech.join(' / ')}
              </p>

              {project.links && (
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                      data-umami-event="project-link-click"
                      data-umami-event-project={project.title}
                      data-umami-event-destination="live"
                      data-umami-event-placement="card-footer"
                    >
                      Try the demo
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                      data-umami-event="project-link-click"
                      data-umami-event-project={project.title}
                      data-umami-event-destination="github"
                      data-umami-event-placement="card-footer"
                    >
                      <GitHubIcon className="h-4 w-4" aria-hidden="true" />
                      Source code
                    </a>
                  )}
                </div>
              )}

              {project.caseStudy.length > 0 && (
                <details className="group mt-5">
                  <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-sm text-sm font-medium text-primary marker:content-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                    Implementation details
                    <ChevronDown
                      className="h-4 w-4 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <ul className="mt-4 max-w-2xl list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
                    {project.caseStudy.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default Projects
