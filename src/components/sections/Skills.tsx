import { Cpu } from 'lucide-react'
import { SKILL_CATEGORIES } from '@/lib/portfolio-data'

const Skills = () => {
  return (
    <section id="skills" className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-3">
          <Cpu className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold md:text-3xl">Core skills</h2>
        </div>

        <dl className="glass divide-y divide-border/70 overflow-hidden rounded-3xl px-5 sm:px-7">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="grid gap-2 py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-start sm:gap-6"
            >
              <dt className="flex items-center gap-3 font-semibold text-foreground">
                <span className="text-primary" aria-hidden="true">
                  {category.icon}
                </span>
                {category.title}
              </dt>
              <dd className="text-sm leading-7 text-muted-foreground">
                {category.skills.join(', ')}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Skills
