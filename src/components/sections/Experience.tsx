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

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" />

          {EXPERIENCES.map((exp, index) => (
            <div
              key={index}
              className={`relative mb-12 md:mb-16 ${index % 2 === 0 ? "md:pr-[50%]" : "md:pl-[50%]"}`}
            >
              <div
                className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-background ${
                  exp.highlight ? "bg-primary glow" : "bg-muted-foreground"
                }`}
              />

              <div
                className={`ml-12 md:ml-0 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
              >
                <Card
                  className={`glass border-0 transition-colors duration-300 hover:border-primary/25 ${
                    exp.highlight ? "ring-1 ring-primary/30" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <h3 className="text-xl font-bold">{exp.company}</h3>
                      {exp.highlight && (
                        <Badge className="bg-primary/20 text-primary text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          Current
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
                      <span className="font-medium text-foreground">
                        {exp.role}
                      </span>
                      <span>-</span>
                      <span>{exp.period}</span>
                      <span>-</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {exp.description}
                    </p>

                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">&gt;</span>
                          <span className="text-muted-foreground">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-xs bg-white/5"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
