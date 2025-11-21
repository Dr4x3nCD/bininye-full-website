import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactMap() {
  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-2xl font-bold">Notre localisation</h3>
        <p className="text-muted-foreground">Venez nous rencontrer à nos bureaux</p>
      </div>

      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl shadow-lg">
        <div className="aspect-[16/9] w-full bg-muted md:aspect-[21/9] md:h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.499814377546!2d-3.998678824247689!3d5.340578634258666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb5e636c62d7%3A0x268763716660666!2sCocody%2C%20Abidjan%2C%20C%C3%B4te%20d&#39;Ivoire!5e0!3m2!1sfr!2sfr!4v1716300000000!5m2!1sfr!2sfr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
          ></iframe>
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
