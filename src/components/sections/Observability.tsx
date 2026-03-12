import { Activity, Gauge, ShieldAlert, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const GRAFANA_DASHBOARD_IMAGE_URL = `${import.meta.env.BASE_URL}grafana_dashboard.png`

const OBSERVABILITY_POINTS = [
  {
    icon: <Gauge className="h-4 w-4" />,
    title: 'The site stays measurable after release',
    body: 'I monitor how fast the experience feels for real visitors, not just how it performs on my machine.',
  },
  {
    icon: <ShieldAlert className="h-4 w-4" />,
    title: 'Frontend issues become visible quickly',
    body: 'If a release causes a problem, I can spot it sooner and investigate it with real production signals.',
  },
  {
    icon: <Sparkles className="h-4 w-4" />,
    title: 'I track the actions that matter',
    body: 'That includes project visits, resume downloads, and contact starts, so I can see whether the portfolio is doing its job.',
  },
]

const OBSERVABILITY_LABELS = ['Real-user speed', 'Error visibility', 'Visitor intent']

const Observability = () => {
  return (
    <section id="observability" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <Activity className="mr-1 h-3 w-3" />
            Observability
          </Badge>
          <h2 className="mb-4 max-w-4xl text-3xl font-bold md:text-4xl">
            I monitor this portfolio after release,
            <span className="text-gradient"> not just before it ships</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Even for a static frontend, I want visibility into what happens after deployment. This
            section shows the kind of monitoring I add so performance, issues, and meaningful user
            actions do not stay invisible.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {OBSERVABILITY_POINTS.map((item) => (
            <Card key={item.title} className="glass border-0">
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <div className="mb-2 text-lg font-semibold text-foreground">{item.title}</div>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass overflow-hidden border-0">
          <CardContent className="p-0">
            <div className="flex flex-col gap-4 border-b border-border/70 bg-background/60 px-5 py-5 dark:bg-background/35 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
                  Dashboard Snapshot
                </div>
                <h3 className="mt-2 text-xl font-semibold text-foreground md:text-2xl">
                  Production-facing frontend monitoring
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  This preview comes from the monitoring stack behind the portfolio and acts as a
                  proof artifact rather than a separate destination in the UI.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {OBSERVABILITY_LABELS.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[0.76rem] font-medium text-foreground/85 dark:bg-background/45"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-background/30 p-3 md:p-4 dark:bg-background/20">
              <div className="overflow-hidden rounded-[1.6rem] border border-border/70 bg-slate-950 shadow-[0_20px_48px_-34px_hsl(220_34%_12%_/_0.28)]">
                <img
                  src={GRAFANA_DASHBOARD_IMAGE_URL}
                  alt="Grafana dashboard preview showing page loads, JavaScript errors, and Core Web Vitals for this portfolio"
                  className="w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Observability
