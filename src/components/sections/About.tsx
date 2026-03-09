import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ABOUT_SECTION } from "@/lib/portfolio-data";

const About = () => {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <Badge
              variant="outline"
              className="mb-4 border-primary/50 text-primary"
            >
              <User className="mr-1 h-3 w-3" />
              {ABOUT_SECTION.eyebrow}
            </Badge>
            <h2 className="mb-5 max-w-3xl text-3xl font-bold md:text-4xl">
              {ABOUT_SECTION.title}
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {ABOUT_SECTION.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {ABOUT_SECTION.cards.map((card) => (
            <Card key={card.title} className="glass border-0">
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {card.icon}
                </div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary/85">
                  {card.eyebrow}
                </div>
                <h3 className="mb-3 text-lg font-semibold">{card.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
                <ul className="card-list mt-auto grid gap-3 text-sm text-muted-foreground">
                  {card.points.map((point) => (
                    <li key={point} className="card-list-item">
                      <span className="card-list-bullet" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
