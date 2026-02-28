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
            A selection of projects showcasing my expertise in platform
            engineering, full-stack development, and enterprise solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <Card
              key={index}
              className="glass border-0 overflow-hidden group transition-colors duration-300 hover:glow hover:border-primary/25"
            >
              <div className="relative border-b border-white/10">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={`h-44 bg-gradient-to-br ${project.coverClass}`}
                  />
                )}
                <div className="absolute inset-0">
                  <div className="h-full w-full flex items-end justify-between p-4">
                    <div className="p-3 rounded-xl bg-white/5 text-primary">
                      {project.icon}
                    </div>
                    {project.company && (
                      <Badge variant="outline" className="text-xs bg-black/30">
                        {project.company}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Layers className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">
                    Role:
                  </span>
                  <span>{project.role}</span>
                </div>

                <div className="mb-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Case Study
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {project.caseStudy.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-primary">&gt;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.metrics && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-lg bg-white/5 p-3"
                      >
                        <div className="text-xs text-muted-foreground">
                          {metric.label}
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-xs bg-white/5"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                {project.links && (
                  <div className="flex gap-3">
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
