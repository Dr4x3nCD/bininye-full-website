import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NutritionIcon, GovernanceIcon, SanteIcon, LeadershipIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { domains } from "@/lib/domains-data"

const iconMap = {
  "nutrition-communautaire": NutritionIcon,
  "gouvernance-locale": GovernanceIcon,
  "droit-et-sante": SanteIcon,
  "leadership-et-empowerment": LeadershipIcon,
}

export default function NosDomainesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden py-16 lg:py-24">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/sustainable-development-agriculture-education-heal.jpg"
              alt="Nos domaines background"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif mb-6 text-balance text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                Nos Domaines d'Intervention
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-white/90 drop-shadow-md md:text-xl">
                Découvrez les différents secteurs dans lesquels nous intervenons pour créer un impact durable dans les
                communautés.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif mb-6 text-balance text-3xl font-bold md:text-4xl">
                Une approche holistique du développement
              </h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Nos interventions couvrent quatre domaines clés qui se complètent pour créer un impact durable et
                mesurable dans les communautés. Chaque domaine répond à des besoins spécifiques tout en contribuant à
                notre vision globale d'un développement équitable et durable.
              </p>
            </div>
          </div>
        </section>

        {/* Domaines Grid */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {domains.map((domain) => {
                const Icon = iconMap[domain.id as keyof typeof iconMap]
                return (
                  <Link
                    key={domain.id}
                    href={`/nos-domaines/${domain.id}`}
                    className="group relative overflow-hidden rounded-3xl bg-card shadow-lg transition-all hover:shadow-2xl"
                  >
                    {/* Image de fond */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={`/.jpg?height=400&width=600&query=${domain.title}`}
                        alt={domain.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                      {/* Icône et titre sur l'image */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div
                          className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl ${domain.color} text-white shadow-lg`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-white">{domain.title}</h3>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      <p className="mb-4 text-pretty leading-relaxed text-muted-foreground">
                        {domain.shortDescription}
                      </p>

                      <div className="mb-4 space-y-2">
                        {domain.items.slice(0, 3).map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${domain.color}`} />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div
                        className={`flex items-center gap-2 font-semibold ${domain.textColor} transition-gap group-hover:gap-3`}
                      >
                        <span>En savoir plus</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-3xl bg-primary p-8 text-center text-primary-foreground lg:p-12">
              <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">
                Soutenez nos actions sur le terrain
              </h2>
              <p className="mb-8 text-pretty leading-relaxed">
                Votre contribution nous permet de continuer à intervenir dans ces domaines essentiels et de créer un
                impact durable dans les communautés.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="rounded-full">
                  <Link href="/contribuer">Faire un don</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary"
                >
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
