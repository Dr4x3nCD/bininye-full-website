import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Play, ImageIcon } from "lucide-react"

const mediaItems = [
  {
    id: 1,
    type: "video",
    title: "Formation des leaders religieux 2024",
    thumbnail: "/placeholder.svg?height=400&width=600",
    date: "Novembre 2024",
  },
  {
    id: 2,
    type: "photo",
    title: "Atelier de jardinage communautaire",
    thumbnail: "/placeholder.svg?height=400&width=600",
    date: "Octobre 2024",
  },
  {
    id: 3,
    type: "photo",
    title: "Renforcement de capacité des jeunes",
    thumbnail: "/placeholder.svg?height=400&width=600",
    date: "Novembre 2024",
  },
  {
    id: 4,
    type: "video",
    title: "Campagne de sensibilisation nutritionnelle",
    thumbnail: "/placeholder.svg?height=400&width=600",
    date: "Octobre 2024",
  },
  {
    id: 5,
    type: "photo",
    title: "Journée portes ouvertes",
    thumbnail: "/placeholder.svg?height=400&width=600",
    date: "Septembre 2024",
  },
  {
    id: 6,
    type: "photo",
    title: "Formation en gouvernance locale",
    thumbnail: "/placeholder.svg?height=400&width=600",
    date: "Octobre 2024",
  },
  {
    id: 7,
    type: "video",
    title: "Témoignages de bénéficiaires",
    thumbnail: "/placeholder.svg?height=400&width=600",
    date: "Septembre 2024",
  },
  {
    id: 8,
    type: "photo",
    title: "Distribution de fournitures scolaires",
    thumbnail: "/placeholder.svg?height=400&width=600",
    date: "Août 2024",
  },
]

export default function MediathequePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden py-16 lg:py-24">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/photographer-camera-filming-africa-community-event.jpg"
              alt="Médiathèque background"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-balance text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                Médiathèque
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-white/90 drop-shadow-md md:text-xl">
                Découvrez en images et en vidéos nos actions sur le terrain et l'impact de notre travail dans les
                communautés.
              </p>
            </div>
          </div>
        </section>

        {/* Filtres */}
        <section className="border-b bg-background py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground">
                Tous
              </button>
              <button className="rounded-lg border px-6 py-2 text-sm font-medium hover:bg-muted">Photos</button>
              <button className="rounded-lg border px-6 py-2 text-sm font-medium hover:bg-muted">Vidéos</button>
            </div>
          </div>
        </section>

        {/* Galerie */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mediaItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-video">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 transition-transform group-hover:scale-110">
                          <Play className="h-8 w-8 text-primary" fill="currentColor" />
                        </div>
                      </div>
                    )}
                    <div className="absolute left-3 top-3">
                      <span className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium">
                        {item.type === "video" ? <Play className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                        {item.type === "video" ? "Vidéo" : "Photo"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-card p-4">
                    <h3 className="mb-1 text-balance text-sm font-semibold leading-tight">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
