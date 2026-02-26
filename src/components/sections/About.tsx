import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { STATS } from "@/lib/portfolio-data";

const About = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge
              variant="outline"
              className="mb-4 border-primary/50 text-primary"
            >
              <User className="w-3 h-3 mr-1" />
              About Me
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Building <span className="text-gradient">Developer-First</span>{" "}
              Solutions
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate Full-Stack Developer with extensive experience
                in building
                <strong className="text-foreground">
                  {" "}
                  Internal Developer Platforms (IDP)
                </strong>{" "}
                that streamline development workflows and boost team
                productivity.
              </p>
              <p>
                At <strong className="text-foreground">XM.com</strong>, I led
                the integration of
                <strong className="text-foreground"> Backstage.io</strong> into
                internal tools, creating custom plugins with Azure AI Services
                that reduced manual review time significantly. I also played a
                key role in launching{" "}
                <strong className="text-foreground">trading.com</strong> as a
                Senior Angular Developer.
              </p>
              <p>
                My background includes modernizing legacy applications at{" "}
                <strong className="text-foreground">Morgan Stanley</strong>
                for 15,000+ users, and building scalable full-stack solutions
                across fintech and enterprise sectors.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, index) => (
              <Card key={index} className="glass border-0 glow">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
