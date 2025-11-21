import { ArrowRight } from "lucide-react"
import type { rubrics } from "@/lib/blog-data"

interface RubricsSectionProps {
  items: typeof rubrics
}

export function RubricsSection({ items }: RubricsSectionProps) {
  return (
    <section className="bg-muted/30 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Rubriques principales</h2>
          <p className="mt-4 text-muted-foreground">Explorez nos thématiques phares</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((rubric) => (
            <a
              key={rubric.title}
              href={rubric.link}
              className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 h-12 w-12 overflow-hidden rounded-lg bg-primary/10">
                {/* Using a colored box instead of image for icon-like feel, or could use the image */}
                <img
                  src={rubric.image || "/placeholder.svg"}
                  alt=""
                  className="h-full w-full object-cover opacity-80 mix-blend-multiply"
                />
              </div>
              <h3 className="mb-2 text-lg font-bold group-hover:text-primary transition-colors">{rubric.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{rubric.description}</p>
              <div className="flex items-center text-xs font-medium text-primary">
                Voir les articles
                <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
