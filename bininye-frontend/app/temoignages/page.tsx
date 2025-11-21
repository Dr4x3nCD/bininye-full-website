import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Awa Traoré",
    role: "Bénéficiaire du programme d'entrepreneuriat",
    location: "Abidjan",
    image: "/placeholder.svg?height=200&width=200",
    quote:
      "Grâce à Binin Ye, j'ai pu démarrer mon activité de couture. Aujourd'hui, je suis autonome financièrement et je peux subvenir aux besoins de ma famille. Les formations m'ont donné confiance en moi.",
  },
  {
    id: 2,
    name: "Kouassi Yao",
    role: "Leader communautaire",
    location: "Bouaké",
    image: "/placeholder.svg?height=200&width=200",
    quote:
      "Les formations en gouvernance locale ont transformé notre façon de gérer les affaires de notre communauté. Nous sommes maintenant plus transparents et inclusifs dans nos décisions.",
  },
  {
    id: 3,
    name: "Fatou Koné",
    role: "Mère de famille",
    location: "Yamoussoukro",
    image: "/placeholder.svg?height=200&width=200",
    quote:
      "Les ateliers de nutrition ont changé la vie de ma famille. Mes enfants sont en meilleure santé et je sais maintenant comment préparer des repas équilibrés avec les ressources locales.",
  },
  {
    id: 4,
    name: "Ibrahim Diallo",
    role: "Jeune entrepreneur",
    location: "Korhogo",
    image: "/placeholder.svg?height=200&width=200",
    quote:
      "Le programme de renforcement des capacités m'a permis de développer mon projet agricole. J'emploie maintenant 5 personnes de ma communauté et je contribue à la sécurité alimentaire locale.",
  },
  {
    id: 5,
    name: "Mariam Sanogo",
    role: "Bénévole",
    location: "Abidjan",
    image: "/placeholder.svg?height=200&width=200",
    quote:
      "Être bénévole chez Binin Ye a été une expérience enrichissante. J'ai appris énormément et j'ai pu contribuer concrètement à améliorer la vie des gens dans ma communauté.",
  },
  {
    id: 6,
    name: "Amadou Bamba",
    role: "Leader religieux",
    location: "San-Pédro",
    image: "/placeholder.svg?height=200&width=200",
    quote:
      "La formation des leaders religieux nous a permis de mieux accompagner les jeunes de notre communauté. Nous sommes maintenant des acteurs clés du développement local.",
  },
]

export default function TemoignagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden py-16 lg:py-24">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/happy-african-people-smiling-community-success-sto.jpg"
              alt="Témoignages background"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-balance text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                Témoignages
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-white/90 drop-shadow-md md:text-xl">
                Découvrez les histoires inspirantes de personnes dont la vie a été transformée grâce à nos programmes et
                actions.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-balance text-3xl font-bold md:text-4xl">Des vies transformées</h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Chaque témoignage est une preuve de l'impact réel de notre travail. Ces histoires nous motivent à
                continuer notre mission et à toucher encore plus de vies dans les communautés.
              </p>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="relative overflow-hidden rounded-2xl bg-card p-8 shadow-lg transition-shadow hover:shadow-xl"
                >
                  <Quote className="absolute right-4 top-4 h-12 w-12 text-primary/10" />
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-full">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                    <blockquote className="text-pretty leading-relaxed text-muted-foreground">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-3xl bg-primary p-8 text-center text-primary-foreground lg:p-12">
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Votre histoire peut inspirer</h2>
              <p className="mb-8 text-pretty leading-relaxed">
                Vous avez bénéficié de nos programmes ? Partagez votre témoignage pour inspirer d'autres personnes et
                montrer l'impact de notre travail.
              </p>
              <button className="rounded-lg bg-white px-8 py-3 font-semibold text-primary transition-colors hover:bg-white/90">
                Partager mon témoignage
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
