import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ImageIcon } from "lucide-react"

interface MediaItem {
  documentId: string
  id: number
  title: string
  type: "photo" | "video"
  thumbnail?: {
    url: string
    alternativeText?: string
  }
}

interface GallerySectionProps {
  title?: string
  subtitle?: string
  media?: MediaItem[]
}

export function GallerySection({
  title,
  subtitle,
  media,
}: GallerySectionProps) {
  const hasMedia = media && media.length > 0
  // Prendre seulement les 3 dernières images
  const displayMedia = hasMedia ? media.slice(0, 3) : []

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <ImageIcon className="h-4 w-4" />
            Médiathèque
          </div>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            {title || "[Donnée non récupérée: galleryTitle]"}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {subtitle || "[Donnée non récupérée: gallerySubtitle]"}
          </p>
        </div>

        {displayMedia.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {displayMedia.map((item) => (
              <div
                key={item.documentId}
                className="group relative overflow-hidden rounded-3xl bg-muted shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.thumbnail?.url || "/placeholder.svg"}
                    alt={item.thumbnail?.alternativeText || item.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-lg font-semibold text-white">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-xl">
            <p className="text-muted-foreground">[Donnée non récupérée: galleryHighlightMedia]</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="h-14 rounded-full bg-primary px-8 text-base font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <Link href="/photos-et-videos">
              Voir Toute la Galerie
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
