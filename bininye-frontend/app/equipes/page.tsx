import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin } from "lucide-react"
import Link from "next/link"
import { fetchTeamsPage } from "@/lib/strapi-teams-page"
import { fetchAllTeamMembers } from "@/lib/strapi-team"

export default async function EquipesPage() {
  const [pageData, allMembers] = await Promise.all([
    fetchTeamsPage(),
    fetchAllTeamMembers(),
  ])

  // Utiliser les membres de teams-page si disponibles, sinon tous les membres
  const teamMembers = pageData.members.length > 0 ? pageData.members : allMembers

  const heroBackground = pageData.heroBackgroundUrl || "/diverse-professional-team-working-together-africa.jpg"

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
              alt="Notre équipe background"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif mb-6 text-balance text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                {pageData.heroTitle}
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-white/90 drop-shadow-md md:text-xl">
                {pageData.heroSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif mb-6 text-balance text-3xl font-bold md:text-4xl">
                {pageData.introTitle}
              </h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {pageData.introText}
              </p>
            </div>
          </div>
        </section>

        {/* Membres de l'équipe */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="group overflow-hidden rounded-3xl bg-card shadow-lg transition-all hover:shadow-2xl"
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
          </div>
        </section>

        {/* Rejoindre l'équipe */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-3xl bg-primary p-8 text-center text-primary-foreground lg:p-12">
              <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">{pageData.joinCtaTitle}</h2>
              <p className="mb-8 text-pretty leading-relaxed">
                {pageData.joinCtaText}
              </p>
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link href={pageData.joinCtaButtonUrl}>{pageData.joinCtaButtonLabel}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
