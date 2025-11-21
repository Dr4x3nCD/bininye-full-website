import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    name: "Marie Kouassi",
    role: "Directrice Exécutive",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Passionnée par le développement communautaire avec plus de 15 ans d'expérience dans le secteur humanitaire.",
  },
  {
    name: "Jean-Baptiste Touré",
    role: "Coordinateur de Projets",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Expert en gestion de projets de développement et en mobilisation communautaire.",
  },
  {
    name: "Aminata Diallo",
    role: "Responsable Programmes",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Spécialiste en santé publique et nutrition communautaire avec une approche centrée sur les femmes.",
  },
  {
    name: "Kouadio N'Guessan",
    role: "Chargé de Communication",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Communicateur engagé pour amplifier l'impact de nos actions auprès des communautés.",
  },
  {
    name: "Fatou Bamba",
    role: "Responsable Finances",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Gestionnaire financière rigoureuse assurant la transparence et la bonne utilisation des ressources.",
  },
  {
    name: "Ibrahim Koné",
    role: "Agent de Terrain",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Travailleur de terrain dévoué, en contact direct avec les communautés bénéficiaires.",
  },
]

export default function EquipesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden py-16 lg:py-24">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/diverse-professional-team-working-together-africa.jpg"
              alt="Notre équipe background"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif mb-6 text-balance text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                Notre Équipe
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-white/90 drop-shadow-md md:text-xl">
                Rencontrez les personnes dévouées qui travaillent chaque jour pour faire de notre mission une réalité.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif mb-6 text-balance text-3xl font-bold md:text-4xl">
                Une équipe passionnée et engagée
              </h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Notre force réside dans la diversité et la complémentarité de nos compétences. Chaque membre de l'équipe
                apporte son expertise unique pour servir au mieux les communautés avec lesquelles nous travaillons.
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
                      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                        <Linkedin className="h-4 w-4" />
                      </button>
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
              <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">Rejoignez notre équipe</h2>
              <p className="mb-8 text-pretty leading-relaxed">
                Vous partagez nos valeurs et souhaitez contribuer à notre mission ? Découvrez nos opportunités de
                carrière et de bénévolat.
              </p>
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link href="/nous-rejoindre">Voir les opportunités</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
