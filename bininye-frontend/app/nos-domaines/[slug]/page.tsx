import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { NutritionIcon, GovernanceIcon, SanteIcon, LeadershipIcon } from "@/components/icons"
import { ArrowLeft, ArrowRight, Check, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { strapiClient } from "@/lib/strapi-client"
import { fetchDomainBySlug, type DomainView } from "@/lib/strapi-domains"
import { fetchActivitiesByDomain } from "@/lib/strapi-activities"

interface StrapiDomainEntity {
  id: number
  slug: string
}

interface StrapiListResponse<T> {
  data: T[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "nutrition-communautaire": NutritionIcon,
  "gouvernance-locale": GovernanceIcon,
  "droit-et-sante": SanteIcon,
  "leadership-et-empowerment": LeadershipIcon,
}

export async function generateStaticParams() {
  const res = (await strapiClient.collection("domains").find({
    fields: ["slug"],
  })) as unknown as StrapiListResponse<StrapiDomainEntity>

  return res.data.map((domain) => ({ slug: domain.slug }))
}

export default async function DomainDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const [domain, activities] = await Promise.all([
    fetchDomainBySlug(slug),
    fetchActivitiesByDomain(slug, 4),
  ])

  if (!domain) {
    notFound()
  }

  const Icon = iconMap[domain.iconKey || "nutrition-communautaire"] ?? NutritionIcon
  const hasItems = domain.items && domain.items.length > 0
  const hasStats = domain.stats && domain.stats.length > 0
  const hasActivities = activities && activities.length > 0

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="absolute inset-0">
            <img
              src={domain.imageUrl || "/placeholder.svg"}
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
                className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${domain.themeColor || "bg-primary"} text-white shadow-xl`}
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

        {/* Nos Actions Concrètes */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="font-serif mb-6 text-balance text-3xl font-bold md:text-4xl">Nos Axes d'Intervention</h2>
                <p className="mb-8 text-pretty leading-relaxed text-muted-foreground">
                  Nous mettons en œuvre des programmes ciblés et mesurables pour créer un impact durable dans ce
                  domaine.
                </p>

                {hasItems ? (
                  <div className="space-y-4">
                    {domain.items.map((item) => (
                      <div key={item} className="flex items-start gap-4 rounded-2xl bg-muted/50 p-4">
                        <div
                          className={`mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${domain.themeColor || "bg-primary"}`}
                        >
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-muted-foreground/30 rounded-xl">
                    <p className="text-muted-foreground">[Donnée non récupérée: items]</p>
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={domain.imageUrl || "/placeholder.svg"}
                    alt={`Actions ${domain.title}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activités dans ce domaine */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">
                Activités dans ce domaine
              </h2>
              <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                Découvrez nos actions concrètes et projets réalisés dans le domaine {domain.title.toLowerCase()}.
              </p>
            </div>

            {hasActivities ? (
              <>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {activities.map((activity) => (
                    <Link
                      key={activity.id}
                      href={`/activites/${activity.slug}`}
                      className="group overflow-hidden rounded-2xl bg-card shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className={`inline-block rounded-full ${domain.themeColor} px-2 py-0.5 text-xs font-medium text-white`}>
                            {activity.status === "à venir" ? "À venir" : "Réalisé"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="mb-2 font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {activity.title}
                        </h3>
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{activity.date || "[Date non définie]"}</span>
                          </div>
                          {activity.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{activity.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href={`/activites?domain=${slug}`}>
                      Voir toutes les activités
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-xl max-w-2xl mx-auto">
                <p className="text-muted-foreground mb-4">Aucune activité liée à ce domaine pour le moment.</p>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/activites">Voir toutes les activités</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Statistiques */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">Notre Impact en Chiffres</h2>
              <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                Des résultats concrets qui témoignent de l'efficacité de nos interventions
              </p>
            </div>

            {hasStats ? (
              <div className="grid gap-8 sm:grid-cols-3">
                {domain.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`rounded-3xl ${domain.themeColor || "bg-primary"} p-8 text-center text-white shadow-lg`}
                  >
                    <div className="mb-2 text-5xl font-bold">{stat.number}</div>
                    <div className="text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-xl">
                <p className="text-muted-foreground">[Donnée non récupérée: stats]</p>
              </div>
            )}
          </div>
        </section>

        {/* Impact Story */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                NOTRE IMPACT
              </div>

              <h2 className="font-serif mb-6 text-balance text-3xl font-bold md:text-4xl">
                Un Impact Durable dans les Communautés
              </h2>

              <div
                className="text-pretty text-lg leading-relaxed text-muted-foreground [&>p]:mb-4"
                dangerouslySetInnerHTML={{ __html: domain.impact || "[Donnée non récupérée: impact]" }}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
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
