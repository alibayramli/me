import { Cpu } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SKILL_CATEGORIES } from '@/lib/portfolio-data'

const Skills = () => {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <Cpu className="mr-1 h-3 w-3" />
            Core Stack
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Where I work most</h2>
          <p className="text-muted-foreground">
            Platform and delivery work are the center of gravity. Frontend, backend, and
            observability support that core.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-12">
          {SKILL_CATEGORIES.map((category) => (
            <Card
              key={category.title}
              className={`glass border-0 transition-transform duration-300 hover:-translate-y-1 ${
                category.highlight
                  ? 'border border-primary/25 bg-primary/[0.04] xl:col-span-6'
                  : 'xl:col-span-4'
              }`}
            >
              <CardContent className="flex h-full flex-col p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      category.highlight
                        ? 'bg-primary/12 text-primary'
                        : 'bg-background/70 text-foreground/80'
                    }`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-sm font-semibold leading-snug">{category.title}</h3>
                </div>
                {category.highlight && (
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                    Core focus
                  </div>
                )}
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {category.summary}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className={`text-xs ${
                        category.highlight
                          ? 'bg-background/80 text-foreground/85'
                          : 'bg-background/70'
                      }`}
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
  )
}

export default Skills
