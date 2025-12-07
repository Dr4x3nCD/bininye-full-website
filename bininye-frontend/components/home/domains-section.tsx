import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { NutritionIcon, GovernanceIcon, SanteIcon, LeadershipIcon } from "@/components/icons"

interface Domain {
  documentId: string
  id: number
  title: string
  slug: string
  shortDescription?: string
  iconKey?: string
  themeColor?: string
}

interface DomainsSectionProps {
  title?: string
  subtitle?: string
  description?: string
  imageUrl?: string | null
  domains?: Domain[]
  ctaLabel?: string
  ctaUrl?: string
}

// Mapping des iconKey vers les composants d'icônes
const iconMap: Record<string, any> = {
  nutrition: NutritionIcon,
  "nutrition-communautaire": NutritionIcon,
  gouvernance: GovernanceIcon,
  "gouvernance-locale": GovernanceIcon,
  sante: SanteIcon,
  "droit-sante": SanteIcon,
  leadership: LeadershipIcon,
  "leadership-empowerment": LeadershipIcon,
}

export function DomainsSection({
  title,
  subtitle,
  description,
  imageUrl,
  domains,
  ctaLabel,
  ctaUrl,
}: DomainsSectionProps) {
  const hasDomains = domains && domains.length > 0

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square overflow-hidden rounded-[3rem] shadow-2xl">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="Image Domaines"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            {/* Décoration */}
            <div className="absolute -bottom-8 -right-8 -z-10 h-full w-full rounded-[3rem] bg-secondary/20" />
            <div className="absolute -top-8 -left-8 -z-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="order-1 space-y-8 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-5 py-2 text-sm font-semibold text-secondary">
              <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
              {subtitle || "[Donnée non récupérée: domainsSubtitle]"}
            </div>

            <h2 className="font-serif text-balance text-4xl font-bold leading-tight md:text-5xl">
              {title || "[Donnée non récupérée: domainsTitle]"}
            </h2>

            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              {description || "[Donnée non récupérée: domainsDescription]"}
            </p>

            {hasDomains ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {domains.map((domain, index) => {
                  const IconComponent = domain.iconKey ? iconMap[domain.iconKey.toLowerCase()] : null
                  const colorClass = domain.themeColor === "secondary" || index % 2 === 1 ? "bg-secondary" : "bg-primary"

                  return (
                    <div
                      key={domain.documentId}
                      className="group flex items-center gap-4 rounded-2xl bg-card p-5 shadow-sm transition-all hover:shadow-md"
                    >
                      <div
                        className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${colorClass} text-white shadow-sm transition-transform group-hover:scale-110`}
                      >
                        {IconComponent ? (
                          <IconComponent className="h-7 w-7" />
                        ) : (
                          <div className="h-7 w-7" />
                        )}
                      </div>
                      <h3 className="text-base font-semibold leading-tight">{domain.title}</h3>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-xl">
                <p className="text-muted-foreground">[Donnée non récupérée: highlightedDomains]</p>
              </div>
            )}

            <div className="pt-4">
              {ctaLabel && ctaUrl ? (
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-primary px-8 font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:bg-primary/90"
                >
                  <Link href={ctaUrl}>
                    {ctaLabel}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button disabled className="h-12 rounded-full px-8 font-semibold opacity-50">
                  [CTA non configuré]
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
