import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Stat {
  number: string
  label: string
}

interface Mission {
  title: string
  iconKey?: string
}

interface AboutSectionProps {
  title?: string
  intro?: string
  missionTitle?: string
  missionDescription?: string
  missions?: Mission[]
  stats?: Stat[]
  image1Url?: string | null
  image2Url?: string | null
  ctaLabel?: string
  ctaUrl?: string
}

export function AboutSection({
  title,
  intro,
  missionTitle,
  missionDescription,
  missions,
  stats,
  image1Url,
  image2Url,
  ctaLabel,
  ctaUrl,
}: AboutSectionProps) {
  const hasMissions = missions && missions.length > 0
  const hasStats = stats && stats.length > 0

  return (
    <section className="bg-accent/30 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-3xl shadow-lg">
                  <img
                    src={image1Url || "/placeholder.svg"}
                    alt="Image À propos 1"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="overflow-hidden rounded-3xl shadow-lg">
                  <img
                    src={image2Url || "/placeholder.svg"}
                    alt="Image À propos 2"
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
              {title || "[Donnée non récupérée: aboutTitle]"}
            </h2>

            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              {intro || "[Donnée non récupérée: aboutIntro]"}
            </p>

            <div className="space-y-5">
              <h3 className="text-2xl font-bold">
                {missionTitle || "[Donnée non récupérée: aboutMissionTitle]"}
              </h3>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                {missionDescription || "[Donnée non récupérée: aboutMissionDescription]"}
              </p>

              {hasMissions ? (
                <ul className="space-y-4">
                  {missions.map((mission) => (
                    <li key={mission.title} className="flex items-start gap-3">
                      <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-lg leading-relaxed">{mission.title}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted-foreground italic">
                  [Donnée non récupérée: aboutMissions]
                </div>
              )}
            </div>

            {hasStats ? (
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-4 py-6 md:px-8 text-primary-foreground shadow-lg">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center min-w-[80px]">
                    <div className="font-serif text-3xl md:text-5xl font-bold">{stat.number}</div>
                    <div className="mt-1 text-xs md:text-sm font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground italic">
                [Donnée non récupérée: aboutMainStats]
              </div>
            )}

            <div className="pt-4">
              {ctaLabel && ctaUrl ? (
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-secondary px-8 font-semibold text-secondary-foreground hover:bg-secondary/90"
                >
                  <Link href={ctaUrl}>{ctaLabel}</Link>
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
