import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactMapProps {
  data: {
    mapEmbedUrl: string;
  }
}

export function ContactMap({ data }: ContactMapProps) {
  const isValidUrl = data.mapEmbedUrl && !data.mapEmbedUrl.includes("[Donnée non récupérée")

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-2xl font-bold">Notre localisation</h3>
        <p className="text-muted-foreground">Venez nous rencontrer à nos bureaux</p>
      </div>

      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl shadow-lg">
        <div className="aspect-[16/9] w-full bg-muted md:aspect-[21/9] md:h-[400px]">
          {isValidUrl ? (
            <iframe
              src={data.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            ></iframe>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Carte non disponible
            </div>
          )}
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-background/90 px-6 py-3 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-medium">Cocody, Abidjan</span>
            <div className="mx-2 h-4 w-px bg-border" />
            <Button variant="link" className="h-auto p-0 text-primary">
              Itinéraire
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
