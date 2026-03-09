import { ArrowUpRight, CheckCircle2, LineChart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PROOF_METRICS } from '@/lib/portfolio-data'

const Impact = () => {
  return (
    <section id="impact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <LineChart className="mr-1 h-3 w-3" />
            Impact
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Evidence that the work
            <span className="text-gradient"> changes delivery outcomes</span>
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            The strongest signal in platform and product work is whether teams ship with less
            friction afterward. These are the kinds of outcomes I aim for.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PROOF_METRICS.map((metric) => (
            <Card
              key={metric.label}
              className="glass border-0 transition-transform duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="mb-3 text-3xl font-bold text-foreground">{metric.value}</div>
                <div className="mb-2 text-sm font-semibold text-foreground/90">{metric.label}</div>
                <p className="text-sm leading-relaxed text-muted-foreground">{metric.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="glass border-0">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">
                <ArrowUpRight className="h-4 w-4" />
                Common Engagements
              </div>
              <ul className="card-list grid gap-3 text-sm text-muted-foreground">
                {[
                  'Internal developer portals and Backstage.io customization.',
                  'CI/CD, release workflow, and local platform tooling improvements.',
                  'Full-stack feature delivery where the platform layer touches the product surface.',
                ].map((item) => (
                  <li key={item} className="card-list-item">
                    <span className="card-list-bullet" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="glass border-0">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary/85">
                <CheckCircle2 className="h-4 w-4" />
                What Usually Improves
              </div>
              <ul className="card-list grid gap-3 text-sm text-muted-foreground">
                {[
                  'Service discoverability, platform adoption, and clearer developer paths.',
                  'Lower review overhead through automation and better validation steps.',
                  'Release confidence through stronger observability and repeatable delivery flows.',
                ].map((item) => (
                  <li key={item} className="card-list-item">
                    <span className="card-list-bullet" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Impact
