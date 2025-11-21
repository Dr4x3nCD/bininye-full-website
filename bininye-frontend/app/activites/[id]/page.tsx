import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, MapPin, Users, Tag, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { activities } from "@/lib/activities-data"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return activities.map((activity) => ({
    id: activity.id.toString(),
  }))
}

export default function ActivityDetailPage({ params }: { params: { id: string } }) {
  const activity = activities.find((a) => a.id.toString() === params.id)

  if (!activity) {
    notFound()
  }

  const relatedActivities = activities
    .filter((a) => a.id !== activity.id && (a.category === activity.category || a.location === activity.location))
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section avec image */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <img src={activity.image || "/placeholder.svg"} alt={activity.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12 lg:px-8">
              <Button asChild variant="ghost" size="sm" className="mb-6 text-white hover:bg-white/20">
                <Link href="/activites">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour aux activités
                </Link>
              </Button>

              <div className="max-w-4xl">
                <div className="mb-4 flex flex-wrap gap-3">
                  <span
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                      activity.status === "à venir"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {activity.status === "à venir" ? "À venir" : "Passé"}
                  </span>
                  <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
                    {activity.category}
                  </span>
                </div>

                <h1 className="font-serif mb-6 text-balance text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  {activity.title}
                </h1>

                <div className="flex flex-wrap gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">{activity.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span className="font-medium">{activity.participants} participants</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contenu principal */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-3">
              {/* Contenu principal */}
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h2 className="font-serif mb-4 text-2xl font-bold">À propos de cette activité</h2>
                    <p className="text-pretty leading-relaxed text-muted-foreground">{activity.description}</p>
                  </div>

                  {/* Objectifs */}
                  <div>
                    <h2 className="font-serif mb-4 text-2xl font-bold">Objectifs</h2>
                    <ul className="space-y-3">
                      {[
                        "Renforcer les capacités des participants dans leur domaine d'intervention",
                        "Créer un espace d'échange et de partage d'expériences",
                        "Développer des compétences pratiques et applicables",
                        "Favoriser la mise en réseau et la collaboration",
                      ].map((objective, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                          <span className="text-pretty leading-relaxed text-muted-foreground">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Programme */}
                  <div>
                    <h2 className="font-serif mb-4 text-2xl font-bold">Programme</h2>
                    <div className="space-y-4">
                      {[
                        { time: "09:00 - 09:30", title: "Accueil et inscription des participants" },
                        { time: "09:30 - 11:00", title: "Session plénière d'ouverture" },
                        { time: "11:00 - 11:15", title: "Pause café" },
                        { time: "11:15 - 13:00", title: "Ateliers thématiques en groupes" },
                        { time: "13:00 - 14:00", title: "Déjeuner" },
                        { time: "14:00 - 16:00", title: "Travaux pratiques et études de cas" },
                        { time: "16:00 - 16:30", title: "Synthèse et clôture" },
                      ].map((item, index) => (
                        <div key={index} className="flex gap-4 rounded-2xl bg-muted/50 p-4">
                          <div className="flex-shrink-0 font-semibold text-primary">{item.time}</div>
                          <div className="text-muted-foreground">{item.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h2 className="font-serif mb-4 text-2xl font-bold">Thématiques</h2>
                    <div className="flex flex-wrap gap-3">
                      {activity.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 font-medium text-primary"
                        >
                          <Tag className="h-4 w-4" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Carte d'information */}
                <div className="rounded-3xl bg-card p-6 shadow-lg">
                  <h3 className="font-serif mb-4 text-xl font-bold">Informations pratiques</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-1 text-sm font-medium text-muted-foreground">Date</p>
                      <p className="font-semibold">{activity.date}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-medium text-muted-foreground">Lieu</p>
                      <p className="font-semibold">{activity.location}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-medium text-muted-foreground">Participants</p>
                      <p className="font-semibold">{activity.participants} personnes</p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-medium text-muted-foreground">Catégorie</p>
                      <p className="font-semibold">{activity.category}</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="rounded-3xl bg-primary p-6 text-center text-primary-foreground">
                  <h3 className="font-serif mb-3 text-xl font-bold">Intéressé par cette activité ?</h3>
                  <p className="mb-6 text-sm leading-relaxed">
                    {activity.status === "à venir"
                      ? "Inscrivez-vous dès maintenant pour participer à cette activité."
                      : "Découvrez nos prochaines activités similaires."}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Link href={activity.status === "à venir" ? "/nous-rejoindre" : "/activites"}>
                      {activity.status === "à venir" ? "S'inscrire" : "Voir les activités"}
                    </Link>
                  </Button>
                </div>

                {/* Partage */}
                <div className="rounded-3xl bg-card p-6 shadow-lg">
                  <h3 className="font-serif mb-4 text-xl font-bold">Partager</h3>
                  <Button variant="outline" size="lg" className="w-full rounded-full bg-transparent">
                    <Share2 className="mr-2 h-4 w-4" />
                    Partager cette activité
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activités similaires */}
        {relatedActivities.length > 0 && (
          <section className="bg-muted/30 py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
              <h2 className="font-serif mb-12 text-center text-3xl font-bold md:text-4xl">Activités similaires</h2>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedActivities.map((relatedActivity) => (
                  <Link
                    key={relatedActivity.id}
                    href={`/activites/${relatedActivity.id}`}
                    className="group overflow-hidden rounded-3xl bg-card shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedActivity.image || "/placeholder.svg"}
                        alt={relatedActivity.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-4 left-4">
                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                          {relatedActivity.category}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 p-6">
                      <h3 className="font-serif line-clamp-2 text-balance text-lg font-bold leading-tight transition-colors group-hover:text-primary">
                        {relatedActivity.title}
                      </h3>

                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-primary" />
                          {relatedActivity.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-accent" />
                          {relatedActivity.location}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
