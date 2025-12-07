import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Users, TrendingUp } from "lucide-react"

interface Stat {
  number: string
  label: string
  iconKey?: string
}

interface ContributeSectionProps {
  title?: string
  subtitle?: string
  description?: string
  stats?: Stat[]
  primaryCtaLabel?: string
  primaryCtaUrl?: string
  secondaryCtaLabel?: string
  secondaryCtaUrl?: string
}

// Mapping des iconKey vers les composants d'icônes
const iconMap: Record<string, any> = {
  heart: Heart,
  users: Users,
  trending: TrendingUp,
}

export function ContributeSection({
  title,
  subtitle,
  description,
  stats,
  primaryCtaLabel,
  primaryCtaUrl,
  secondaryCtaLabel,
  secondaryCtaUrl,
}: ContributeSectionProps) {
  const hasStats = stats && stats.length > 0

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/90 py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {title || "[Donnée non récupérée: contributeTitle]"}
          </h2>
          <p className="mt-4 text-lg font-light text-white/90 sm:mt-6 sm:text-xl md:text-2xl lg:text-3xl">
            {subtitle || "[Donnée non récupérée: contributeSubtitle]"}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg">
            {description || "[Donnée non récupérée: contributeDescription]"}
          </p>

          {/* Stats */}
          {hasStats ? (
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {stats.map((stat, index) => {
                const IconComponent = stat.iconKey ? iconMap[stat.iconKey.toLowerCase()] : [Heart, Users, TrendingUp][index % 3]

                return (
                  <div key={index} className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                    {IconComponent && <IconComponent className="mx-auto h-10 w-10 text-accent" />}
                    <p className="mt-4 text-3xl font-bold text-white">{stat.number}</p>
                    <p className="mt-2 text-sm text-white/80">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-white/80">[Donnée non récupérée: contributeStats]</p>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {primaryCtaLabel && primaryCtaUrl ? (
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-white px-8 text-base font-semibold text-primary shadow-lg transition-all hover:scale-105 hover:bg-white/90 hover:shadow-xl"
              >
                <Link href={primaryCtaUrl}>
                  <Heart className="mr-2 h-5 w-5" />
                  {primaryCtaLabel}
                </Link>
              </Button>
            ) : (
              <Button disabled className="h-14 rounded-full px-8 font-semibold opacity-50">
                [CTA primaire non configuré]
              </Button>
            )}
            {secondaryCtaLabel && secondaryCtaUrl ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-2 border-white bg-transparent px-8 text-base font-semibold text-white transition-all hover:bg-white hover:text-primary"
              >
                <Link href={secondaryCtaUrl}>
                  {secondaryCtaLabel}
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
