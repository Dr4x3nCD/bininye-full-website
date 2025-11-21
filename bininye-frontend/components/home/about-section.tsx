import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const missions = [
  "Promouvoir l'égalité des genres",
  "Renforcer les compétences de vie",
  "Accroître la coopération",
  "Promouvoir un environnement sain",
]

export function AboutSection() {
  return (
    <section className="bg-accent/30 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-3xl shadow-lg">
                  <img
                    src="/african-woman-portrait.jpg"
                    alt="Femme africaine souriante"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="overflow-hidden rounded-3xl shadow-lg">
                  <img
                    src="/students-learning.jpg"
                    alt="Enfant étudiant"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
            {/* Décoration */}
            <div className="absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -top-6 -right-6 -z-10 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
          </div>

          <div className="order-1 space-y-6 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />À PROPOS DE NOUS
            </div>

            <h2 className="font-serif text-balance text-4xl font-bold leading-tight md:text-5xl">
              Nous sommes une ONG engagée
            </h2>

            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              Dédiée à l'amélioration durable des conditions de vie des communautés, particulièrement des femmes et des
              enfants.
            </p>

            <div className="space-y-5">
              <h3 className="text-2xl font-bold">Notre mission</h3>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                Promouvoir le bien-être de l'Homme et la préservation de la nature en plaçant les besoins des
                populations au cœur de toutes nos actions.
              </p>

              <ul className="space-y-4">
                {missions.map((mission) => (
                  <li key={mission} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-lg leading-relaxed">{mission}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="inline-flex items-center gap-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-8 py-6 text-primary-foreground shadow-lg">
              <div className="text-center">
                <div className="font-serif text-5xl font-bold">60+</div>
                <div className="mt-1 text-sm font-medium">Personnes aidées</div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-secondary px-8 font-semibold text-secondary-foreground hover:bg-secondary/90"
              >
                <Link href="/qui-sommes-nous">Découvrir notre histoire</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
