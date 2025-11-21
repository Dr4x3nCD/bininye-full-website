import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

const events = [
  {
    id: 1,
    number: "01",
    date: "Novembre 2024",
    location: "Abidjan",
    title: "Binin Yé Forme les Leaders Religieux et Soutient l'Épargne des Jeunes",
    image: "/community-meeting-africa.jpg",
  },
  {
    id: 2,
    number: "02",
    date: "Novembre 2024",
    location: "Bouaké",
    title: "Renforcement de Capacité des Adolescents et des Jeunes",
    image: "/community-activities-workshop-training-africa.jpg",
  },
]

export function EventsSection() {
  return (
    <section className="bg-accent/30 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            ÉVÉNEMENTS
          </div>
          <h2 className="font-serif text-balance text-4xl font-bold leading-tight md:text-5xl">
            Explorez nos événements
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">Découvrez nos actions sur le terrain</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {events.map((event) => (
            <article
              key={event.id}
              className="group overflow-hidden rounded-3xl bg-card shadow-lg transition-all hover:shadow-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/95 backdrop-blur-sm">
                  <span className="font-serif text-3xl font-bold text-primary">{event.number}</span>
                </div>
              </div>
              <div className="p-8">
                <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-secondary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <h3 className="text-balance text-xl font-bold leading-tight md:text-2xl">{event.title}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            asChild
            size="lg"
            className="h-14 rounded-full bg-secondary px-10 text-base font-semibold text-secondary-foreground shadow-lg transition-transform hover:scale-105 hover:bg-secondary/90"
          >
            <Link href="/activites">
              Voir Toutes Les Activités
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
