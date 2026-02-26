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
            Expertise
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A comprehensive toolkit built over 7+ years of enterprise
            development, with deep expertise in platform engineering and
            full-stack development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, index) => (
            <Card
              key={index}
              className={`glass border-0 transition-all duration-300 hover:scale-[1.02] ${
                category.highlight ? "glow ring-1 ring-primary/50" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-2 rounded-lg ${category.highlight ? "bg-primary/20" : "bg-white/5"}`}
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
                      className={`text-xs ${category.highlight ? "bg-primary/20 text-primary hover:bg-primary/30" : ""}`}
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
