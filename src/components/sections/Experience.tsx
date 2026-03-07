import { Award, Briefcase, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EXPERIENCES } from "@/lib/portfolio-data";

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-primary/50 text-primary"
          >
            <Briefcase className="w-3 h-3 mr-1" />
            Career Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A track record of delivering high-impact solutions across fintech,
            enterprise, and energy sectors.
          </p>
        </div>

        <div className="space-y-5">
          {EXPERIENCES.map((exp, index) => (
            <Card
              key={index}
              className={`glass border-0 transition-colors duration-300 hover:border-primary/20 ${
                exp.highlight ? "border border-primary/25" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold">{exp.company}</h3>
                      {exp.highlight && (
                        <Badge className="bg-background/80 text-foreground/85 text-xs">
                          <Award className="mr-1 w-3 h-3" />
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium text-foreground/85">
                      {exp.role}
                    </p>
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground md:text-right">
                    <div>{exp.period}</div>
                    <div className="flex items-center gap-1 md:justify-end">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-muted-foreground">{exp.description}</p>

                <ul className="mb-5 grid gap-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
                      <span className="text-muted-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-xs bg-background/70"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
