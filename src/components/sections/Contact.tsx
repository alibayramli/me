import { Linkedin, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="glass border-0 glow overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-10">
              <Badge
                variant="outline"
                className="mb-4 border-primary/50 text-primary"
              >
                <Linkedin className="w-3 h-3 mr-1" />
                Get In Touch
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let's Build Something{" "}
                <span className="text-gradient">Amazing</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                I'm currently available for contract work and consulting
                opportunities. Whether you need IDP expertise, full-stack
                development, or platform engineering - let's discuss how I can
                help.
              </p>
            </div>

            <div className="mx-auto mb-10 max-w-md">
              <a
                href="https://www.linkedin.com/in/alibayramli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">LinkedIn</div>
                  <div className="font-medium">/in/alibayramli</div>
                </div>
              </a>
            </div>

            <div className="flex items-center justify-center">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/5 w-full sm:w-auto max-w-xs"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/alibayramli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                Baku, Azerbaijan (Available for Remote Work)
              </div>
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Fluent in English and Azerbaijani
                </span>
                <span>-</span>
                <span>Intermediate French</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
