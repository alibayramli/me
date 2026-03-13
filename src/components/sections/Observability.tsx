import { Activity, Gauge, ShieldAlert, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const GRAFANA_DASHBOARD_IMAGE_URL = `${import.meta.env.BASE_URL}grafana_dashboard.png`

const OBSERVABILITY_BENEFITS = [
  {
    icon: <Gauge className="h-4 w-4" />,
    title: 'Fast for real visitors',
    body: 'I look at real post-release performance, not only how the site behaves on my own machine.',
  },
  {
    icon: <ShieldAlert className="h-4 w-4" />,
    title: 'Problems show up sooner',
    body: 'If a release causes a frontend issue, I can see it early instead of waiting for someone to report it.',
  },
  {
    icon: <Sparkles className="h-4 w-4" />,
    title: 'Important actions are visible',
    body: 'I can track whether visitors reach projects, download the resume, or start contact from the site.',
  },
]

const OBSERVABILITY_LABELS = ['Speed after release', 'Issue visibility', 'User intent']

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
            I can see when a release slows the site or breaks a key path
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Even on a static portfolio, I want clear answers after deployment: Is it still fast? Did
            anything break? Are people still reaching projects, resume downloads, and contact
            actions?
          </p>
        </div>

        <Card className="glass overflow-hidden border-0">
          <CardContent className="p-0">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
              <div className="border-b border-border/70 bg-background/58 px-6 py-6 md:px-8 md:py-8 dark:bg-background/38 lg:border-b-0 lg:border-r">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
                  Release Health View
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">
                  This is how I check whether a change actually worked
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  Grafana dashboard gives me live feedback after release. It shows whether the site
                  remains fast, whether frontend issues appear, and whether visitors continue to
                  reach the most important actions.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
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
                <div className="aspect-[557/300] overflow-hidden rounded-[1.6rem] border border-border/70 bg-slate-950 shadow-[0_20px_48px_-34px_hsl(220_34%_12%_/_0.28)]">
                  <img
                    src={GRAFANA_DASHBOARD_IMAGE_URL}
                    alt="Grafana dashboard preview showing page loads, JavaScript errors, and Core Web Vitals for this portfolio"
                    width={2228}
                    height={1200}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {OBSERVABILITY_BENEFITS.map((item) => (
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
      </div>
    </section>
  )
}

export default Observability
