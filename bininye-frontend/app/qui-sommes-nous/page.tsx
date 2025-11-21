import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check, Target, Eye, Heart, ChevronDown, Mail, Linkedin } from "lucide-react"
import Link from "next/link"

const featuredTeamMembers = [
  {
    name: "Marie Kouassi",
    role: "Directrice Exécutive",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Passionnée par le développement communautaire avec plus de 15 ans d'expérience.",
  },
  {
    name: "Jean-Baptiste Touré",
    role: "Coordinateur de Projets",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Expert en gestion de projets de développement et mobilisation communautaire.",
  },
  {
    name: "Aminata Diallo",
    role: "Responsable Programmes",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Spécialiste en santé publique et nutrition communautaire.",
  },
]

const faqs = [
  {
    question: "Qu'est-ce que Binin Ye ?",
    answer:
      "Binin Ye est une Organisation Non Gouvernementale (ONG) qui œuvre pour le développement communautaire en Afrique. Nous intervenons dans les domaines de l'éducation, la santé, l'environnement et le développement économique.",
  },
  {
    question: "Comment Binin Ye est-elle financée ?",
    answer:
      "Nous sommes financés par des dons individuels, des subventions de fondations, des partenariats avec des organisations internationales et des contributions d'entreprises socialement responsables. Nous assurons une transparence totale dans l'utilisation de nos fonds.",
  },
  {
    question: "Dans quelles régions intervenez-vous ?",
    answer:
      "Nous intervenons principalement dans les zones rurales et périurbaines d'Afrique de l'Ouest, en nous concentrant sur les communautés les plus vulnérables. Nos projets touchent actuellement plus de 8 communautés dans plusieurs pays.",
  },
  {
    question: "Comment puis-je contribuer à votre mission ?",
    answer:
      "Vous pouvez contribuer de plusieurs façons : faire un don financier, devenir bénévole, offrir vos compétences professionnelles, ou devenir partenaire. Chaque contribution, quelle que soit sa forme, fait une différence réelle dans la vie des communautés.",
  },
  {
    question: "Comment mesurez-vous l'impact de vos actions ?",
    answer:
      "Nous utilisons des indicateurs précis pour chaque projet : nombre de bénéficiaires, amélioration des conditions de vie, taux de réussite des formations, etc. Nous publions régulièrement des rapports d'activité détaillés pour assurer la transparence de nos actions.",
  },
  {
    question: "Puis-je visiter vos projets sur le terrain ?",
    answer:
      "Oui, nous organisons régulièrement des visites de terrain pour nos donateurs et partenaires. Contactez-nous pour planifier une visite et découvrir concrètement l'impact de nos actions dans les communautés.",
  },
]

export default function QuiSommesNousPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden py-16 lg:py-24">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/african-community-happy-diverse-group.jpg"
              alt="Qui sommes nous background"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif mb-6 text-balance text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                Qui sommes nous ?
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-white/90 drop-shadow-md md:text-xl">
                Découvrez l'histoire, la mission et les valeurs qui guident notre engagement pour un avenir meilleur.
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
                    src="/placeholder.svg?height=600&width=500"
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
                  Une organisation engagée depuis sa création
                </h2>

                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Binin Ye est une Organisation Non Gouvernementale (ONG) créée avec la vision de bâtir un avenir
                  durable pour tous. Depuis nos débuts, nous nous sommes engagés à améliorer les conditions de vie des
                  communautés, en particulier celles des femmes et des enfants.
                </p>

                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Notre approche holistique combine développement communautaire, éducation, santé et autonomisation
                  économique pour créer un impact durable et mesurable dans les communautés que nous servons.
                </p>

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
                <h3 className="font-serif mb-4 text-2xl font-bold">Notre Mission</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Promouvoir le bien-être de l'Homme et la préservation de la nature en plaçant les besoins des
                  populations au cœur de toutes nos actions.
                </p>
              </div>

              {/* Vision */}
              <div className="rounded-3xl bg-card p-8 shadow-lg transition-shadow hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Eye className="h-7 w-7" />
                </div>
                <h3 className="font-serif mb-4 text-2xl font-bold">Notre Vision</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Un monde où chaque communauté a accès aux ressources nécessaires pour s'épanouir et construire un
                  avenir durable pour les générations futures.
                </p>
              </div>

              {/* Valeurs */}
              <div className="rounded-3xl bg-card p-8 shadow-lg transition-shadow hover:shadow-xl">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                  <Heart className="h-7 w-7" />
                </div>
                <h3 className="font-serif mb-4 text-2xl font-bold">Nos Valeurs</h3>
                <ul className="space-y-2">
                  {["Engagement", "Durabilité", "Inclusion", "Intégrité", "Excellence"].map((value) => (
                    <li key={value} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Nos Réalisations */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">Nos Réalisations</h2>
              <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                Des chiffres qui témoignent de notre impact dans les communautés
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { number: "60+", label: "Personnes aidées" },
                { number: "15+", label: "Projets réalisés" },
                { number: "8+", label: "Communautés touchées" },
                { number: "25+", label: "Partenaires" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl bg-primary p-8 text-center text-primary-foreground shadow-lg"
                >
                  <div className="mb-2 text-5xl font-bold">{stat.number}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/activites">Découvrir toutes nos activités</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">Rencontrez Notre Équipe</h2>
              <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                Des personnes passionnées et dévouées qui travaillent chaque jour pour faire de notre mission une
                réalité
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTeamMembers.map((member) => (
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

            <div className="mt-12 text-center">
              <Button asChild size="lg" variant="outline" className="rounded-full border-2 bg-transparent">
                <Link href="/equipes">Voir toute l'équipe</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">
                Questions Fréquemment Posées
              </h2>
              <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
                Tout ce que vous devez savoir sur Binin Ye et notre mission
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              {faqs.map((faq, index) => (
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
