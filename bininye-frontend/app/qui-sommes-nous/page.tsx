import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check, Target, Eye, Heart, ChevronDown, Mail, Linkedin } from "lucide-react"
import Link from "next/link"
import { fetchAboutPage } from "@/lib/strapi-about"

export default async function QuiSommesNousPage() {
  const about = await fetchAboutPage()
  const heroBackground = about.heroBackgroundUrl || "/placeholder.svg"
  const storyImage = about.storyImageUrl || "/placeholder.svg"

  const hasValues = about.values && about.values.length > 0
  const hasStats = about.achievementsStats && about.achievementsStats.length > 0
  const hasTeam = about.featuredTeamMembers && about.featuredTeamMembers.length > 0
  const hasFaqs = about.faqs && about.faqs.length > 0

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden py-16 lg:py-24">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroBackground}
              alt="Qui sommes nous background"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif mb-6 text-balance text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                {about.heroTitle}
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-white/90 drop-shadow-md md:text-xl">
                {about.heroSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative">
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={storyImage}
                    alt="Équipe Binin Ye"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  NOTRE HISTOIRE
                </div>

                <h2 className="font-serif text-balance text-3xl font-bold leading-tight md:text-4xl">
                  {about.storyTitle}
                </h2>

                <div
                  className="text-pretty leading-relaxed text-muted-foreground [&>p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: about.storyHtml }}
                />

                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/contact">Contactez-nous</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Valeurs */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Mission */}
              <div className="rounded-3xl bg-card p-8 shadow-lg transition-shadow hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Target className="h-7 w-7" />
                </div>
                <h3 className="font-serif mb-4 text-2xl font-bold">{about.missionTitle}</h3>
                <div
                  className="leading-relaxed text-muted-foreground [&>p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: about.missionHtml }}
                />
              </div>

              {/* Vision */}
              <div className="rounded-3xl bg-card p-8 shadow-lg transition-shadow hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Eye className="h-7 w-7" />
                </div>
                <h3 className="font-serif mb-4 text-2xl font-bold">{about.visionTitle}</h3>
                <div
                  className="leading-relaxed text-muted-foreground [&>p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: about.visionHtml }}
                />
              </div>

              {/* Valeurs */}
              <div className="rounded-3xl bg-card p-8 shadow-lg transition-shadow hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                  <Heart className="h-7 w-7" />
                </div>
                <h3 className="font-serif mb-4 text-2xl font-bold">{about.valuesTitle}</h3>
                {hasValues ? (
                  <ul className="space-y-2">
                    {about.values.map((value) => (
                      <li key={value.title} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{value.title}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">[Donnée non récupérée: values]</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Nos Réalisations */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">{about.achievementsTitle}</h2>
              <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                {about.achievementsSubtitle}
              </p>
            </div>

            {hasStats ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {about.achievementsStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl bg-primary p-8 text-center text-primary-foreground shadow-lg"
                  >
                    <div className="mb-2 text-5xl font-bold">{stat.number}</div>
                    <div className="text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-xl">
                <p className="text-muted-foreground">[Donnée non récupérée: achievementsStats]</p>
              </div>
            )}

            <div className="mt-12 text-center">
              <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/activites">Découvrir toutes nos activités</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Équipe */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">{about.teamSectionTitle}</h2>
              <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                {about.teamSectionSubtitle}
              </p>
            </div>

            {hasTeam ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {about.featuredTeamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="group overflow-hidden rounded-3xl bg-card shadow-lg transition-all hover:shadow-xl"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif mb-1 text-xl font-bold">{member.name}</h3>
                      <p className="mb-3 text-sm font-medium text-primary">{member.role}</p>
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                      <div className="flex gap-3">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                        {member.linkedinUrl && (
                          <a
                            href={member.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-xl">
                <p className="text-muted-foreground">[Donnée non récupérée: featuredTeamMembers]</p>
              </div>
            )}

            <div className="mt-12 text-center">
              <Button asChild size="lg" variant="outline" className="rounded-full border-2 bg-transparent">
                <Link href="/equipes">Voir toute l'équipe</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">
                {about.faqSectionTitle}
              </h2>
              <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                {about.faqSectionSubtitle}
              </p>
            </div>

            {hasFaqs ? (
              <div className="mx-auto max-w-3xl space-y-4">
                {about.faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group rounded-2xl bg-card p-6 shadow-md transition-shadow hover:shadow-lg"
                  >
                    <summary className="flex cursor-pointer items-center justify-between font-semibold">
                      <span className="text-pretty pr-4">{faq.question}</span>
                      <ChevronDown className="h-5 w-5 flex-shrink-0 text-primary transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-xl max-w-3xl mx-auto">
                <p className="text-muted-foreground">[Donnée non récupérée: faqs]</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
