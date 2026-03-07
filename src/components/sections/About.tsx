import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ABOUT_HIGHLIGHTS } from "@/lib/portfolio-data";

const About = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 max-w-3xl">
          <Badge
            variant="outline"
            className="mb-4 border-primary/50 text-primary"
          >
            <User className="w-3 h-3 mr-1" />
            About Me
          </Badge>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Platform engineering,
            <span className="block text-gradient">full-stack delivery.</span>
          </h2>
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              I build internal platforms, delivery workflows, cloud
              infrastructure, and web applications that help teams ship
              reliably.
            </p>
            <p>
              My stack spans React, Angular, Node.js, and Python, alongside
              GitLab CI/CD, AWS, Terraform, and observability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ABOUT_HIGHLIGHTS.map((item, index) => (
            <Card key={index} className="glass border-0">
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <div className="mb-2 text-sm font-medium uppercase tracking-[0.16em] text-primary/85">
                  {index === 0 ? "Core Focus" : index === 1 ? "Application" : "Operations"}
                </div>
                <div className="mb-3 text-lg font-semibold">
                  {item.title}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      className="bg-background/75 text-foreground/80 hover:bg-accent/70"
                    >
                      {keyword}
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

export default About;
