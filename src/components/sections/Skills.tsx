import { Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SKILL_CATEGORIES } from "@/lib/portfolio-data";

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-primary/50 text-primary"
          >
            <Cpu className="w-3 h-3 mr-1" />
            Core Stack
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tools, workflows, and{" "}
            <span className="text-gradient">engineering focus</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The core technologies and delivery practices I use across platform
            engineering and full-stack work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, index) => (
            <Card
              key={index}
              className={`glass border-0 transition-colors duration-300 hover:border-primary/25 ${
                category.highlight ? "border border-primary/30 bg-primary/[0.035]" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`rounded-lg p-2 ${category.highlight ? "bg-primary/12 text-primary" : "bg-background/70 text-foreground/80"}`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className={`text-xs ${category.highlight ? "bg-background/80 text-foreground/85" : "bg-background/70"}`}
                    >
                      {skill}
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

export default Skills;
