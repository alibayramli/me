import { useEffect, useState } from "react";
import { Briefcase, ChevronDown, Mail, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Full-Stack Developer";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            Available for Contract Work
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          <span className="text-gradient">Ali Bayramli</span>
        </h1>

        <div className="h-16 md:h-20 flex items-center justify-center mb-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-foreground/90">
            {typedText}
            <span className="animate-pulse text-primary">|</span>
          </h2>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
          Specializing in{" "}
          <span className="text-primary font-medium">
            Internal Developer Platforms
          </span>{" "}
          (Backstage.io), Cloud Architecture and{" "}
          <span className="text-primary font-medium">CI/CD Automation</span>
        </p>
        <p className="text-base text-muted-foreground/70 max-w-xl mx-auto mb-12">
          7+ years building scalable solutions for multinational enterprises.
          Former Senior Angular Developer turned Full-Stack Platform Engineer.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 glow"
            asChild
          >
            <a href="#contact">
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 hover:bg-white/5"
            asChild
          >
            <a href="#experience">
              <Briefcase className="w-4 h-4 mr-2" />
              View Experience
            </a>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            "Backstage.io",
            "React",
            "Node.js",
            "Azure",
            "Angular",
            "Docker",
          ].map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="glass px-4 py-2 text-sm"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
