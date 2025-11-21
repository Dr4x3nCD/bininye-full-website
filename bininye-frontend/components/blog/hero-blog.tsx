import { Badge } from "@/components/ui/badge"

export function HeroBlog() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 lg:py-32">
      <div className="container relative z-10 mx-auto px-4 text-center lg:px-8">
        <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 px-4 py-1 text-sm text-primary">
          Éditorial & Perspectives
        </Badge>
        <h1 className="mx-auto mb-6 max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Perspectives, analyses et récits pour un avenir durable.
        </h1>
        <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          Un espace d'idées où nous partageons expertises, témoignages et réflexions sur les enjeux du développement
          communautaire.
        </p>
      </div>

      {/* Abstract background elements */}
      <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
    </section>
  )
}
