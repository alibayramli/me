import { PROOF_METRICS } from '@/lib/portfolio-data'

const Impact = () => (
  <section id="impact" aria-labelledby="impact-title" className="border-y border-border/70 px-6">
    <div className="mx-auto max-w-6xl py-10 md:py-12">
      <h2
        id="impact-title"
        className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80"
      >
        Impact
      </h2>

      <div className="grid md:grid-cols-3">
        {PROOF_METRICS.map((metric) => (
          <div
            key={metric.label}
            className="border-t border-border/70 py-5 first:border-t-0 md:border-l md:border-t-0 md:px-7 md:py-2 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
          >
            <div className="text-3xl font-bold tracking-tight text-foreground">{metric.value}</div>
            <div className="mt-1 text-sm font-semibold text-foreground/90">{metric.label}</div>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{metric.note}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Impact
