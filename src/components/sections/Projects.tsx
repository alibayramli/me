import { Container, ExternalLink, Github, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PROJECTS } from "@/lib/portfolio-data";

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-primary/50 text-primary"
          >
            <Container className="w-3 h-3 mr-1" />
            Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Selected work across platform engineering, internal tooling, and
            full-stack product delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <Card
              key={index}
              className="glass group overflow-hidden border-0 transition-colors duration-300 hover:border-primary/20"
            >
              <CardContent className="p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-background/60 text-foreground/85 dark:text-primary">
                      {project.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium uppercase tracking-[0.16em] text-primary/80">
                          {project.role}
                        </span>
                        {project.company && (
                          <Badge
                            variant="outline"
                            className="bg-background/70 text-[10px] uppercase tracking-[0.14em]"
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
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mb-5">
                  <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <Layers className="h-3.5 w-3.5 text-primary/80" />
                    Highlights
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {project.caseStudy.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-xs bg-background/70"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                {project.links && (
                  <div className="flex flex-wrap gap-4 border-t border-border/70 pt-4 sm:hidden">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Github className="w-4 h-4" />
                        Source
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
  );
};

export default Projects;
