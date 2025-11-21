import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { NutritionIcon, GovernanceIcon, SanteIcon, LeadershipIcon } from "@/components/icons"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { domains } from "@/lib/domains-data"
import { notFound } from "next/navigation"

const iconMap = {
  "nutrition-communautaire": NutritionIcon,
  "gouvernance-locale": GovernanceIcon,
  "droit-et-sante": SanteIcon,
  "leadership-et-empowerment": LeadershipIcon,
}

export function generateStaticParams() {
  return domains.map((domain) => ({
    slug: domain.id,
  }))
}

export default function DomainDetailPage({ params }: { params: { slug: string } }) {
  const domain = domains.find((d) => d.id === params.slug)

  if (!domain) {
    notFound()
  }

  const Icon = iconMap[domain.id as keyof typeof iconMap]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="absolute inset-0">
            <img
              src={`/placeholder.svg?height=800&width=1600&query=${domain.title} community work`}
              alt={domain.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/95 via-secondary/90 to-secondary/80" />
          </div>

          <div className="container relative mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/nos-domaines"
                className="mb-6 inline-flex items-center gap-2 text-secondary-foreground/80 transition-colors hover:text-secondary-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour aux domaines</span>
              </Link>

              <div
                className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${domain.color} text-white shadow-xl`}
              >
                <Icon className="h-8 w-8" />
              </div>

              <h1 className="font-serif mb-6 text-balance text-4xl font-bold text-secondary-foreground md:text-5xl lg:text-6xl">
                {domain.title}
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-secondary-foreground/90 md:text-xl">
                {domain.description}
              </p>
            </div>
          </div>
        </section>

        {/* Nos Actions */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="font-serif mb-6 text-balance text-3xl font-bold md:text-4xl">Nos Actions Concrètes</h2>
                <p className="mb-8 text-pretty leading-relaxed text-muted-foreground">
                  Nous mettons en œuvre des programmes ciblés et mesurables pour créer un impact durable dans ce
                  domaine.
                </p>

                <div className="space-y-4">
                  {domain.items.map((item) => (
                    <div key={item} className="flex items-start gap-4 rounded-2xl bg-muted/50 p-4">
                      <div
                        className={`mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${domain.color}`}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={`/placeholder.svg?height=600&width=500&query=${domain.title} action on field`}
                    alt={`Actions ${domain.title}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistiques */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">Notre Impact en Chiffres</h2>
              <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                Des résultats concrets qui témoignent de l'efficacité de nos interventions
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {domain.stats.map((stat) => (
                <div key={stat.label} className={`rounded-3xl ${domain.color} p-8 text-center text-white shadow-lg`}>
                  <div className="mb-2 text-5xl font-bold">{stat.number}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Story */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                NOTRE IMPACT
              </div>

              <h2 className="font-serif mb-6 text-balance text-3xl font-bold md:text-4xl">
                Un Impact Durable dans les Communautés
              </h2>

              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{domain.impact}</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-3xl bg-primary p-8 text-center text-primary-foreground lg:p-12">
              <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">
                Soutenez nos actions dans ce domaine
              </h2>
              <p className="mb-8 text-pretty leading-relaxed">
                Votre contribution nous permet de continuer à créer un impact positif et durable dans les communautés.
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
                  <Link href="/activites">Voir nos activités</Link>
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
