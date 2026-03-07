import { Briefcase, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center px-6 pb-20 pt-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Platform engineering and full-stack delivery
            </span>
          </div>

          <h1 className="mb-5 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            <span className="text-gradient">Ali Bayramli</span>
          </h1>

          <h2 className="mb-6 max-w-3xl text-2xl font-light leading-tight text-foreground/90 md:text-4xl lg:text-5xl">
            I build developer platforms and full-stack systems that are easy to
            ship, run, and scale.
          </h2>

          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Platform engineering, CI/CD automation, cloud infrastructure, and
            full-stack delivery with React, Angular, Node.js, and Python.
          </p>

          <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="px-8 text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
            >
              <a href="#experience">
                <Briefcase className="mr-2 h-4 w-4" />
                View Experience
              </a>
            </Button>
          </div>
        </div>

        <Card className="glass border-0">
          <CardContent className="p-8">
            <div className="mb-6 text-sm font-medium uppercase tracking-[0.24em] text-primary/90">
              Current Focus
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-border/70 bg-background/45 p-5">
                <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
                  Platform
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Internal platforms
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Developer portals, service catalogs, automation, and workflows
                  that reduce friction for engineering teams.
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/45 p-5">
                <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
                  Product
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Full-stack systems
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Product and internal applications spanning React, Angular,
                  Node.js, Python, APIs, and integration layers.
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/45 p-5">
                <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
                  Delivery
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Delivery and operations
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  GitLab CI/CD, AWS, Terraform, observability, and release
                  workflows built for repeatable delivery.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Hero;
