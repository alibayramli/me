import { Handshake, Linkedin, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="glass overflow-hidden border-0">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-10">
              <Badge
                variant="outline"
                className="mb-4 border-primary/50 text-primary"
              >
                <Handshake className="w-3 h-3 mr-1" />
                Get In Touch
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Open to <span className="text-gradient">contract and consulting</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Available for platform engineering, full-stack development, and
                delivery-focused consulting work.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 mb-10">
              <Button
                size="lg"
                className="w-full max-w-xs sm:w-auto"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/alibayramli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Message on LinkedIn
                </a>
              </Button>
            </div>

            <div className="mt-10 border-t border-border/70 pt-8">
              <div className="mx-auto w-full max-w-md text-sm">
                <div className="grid grid-cols-[1.25rem_1fr] gap-x-3 gap-y-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Baku, Azerbaijan (Available for Remote Work)
                  </p>
                  <span className="mt-1 flex h-4 w-4 items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <p>Fluent in English and Azerbaijani</p>
                  <span className="h-4 w-4" aria-hidden="true" />
                  <p>Intermediate French</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
