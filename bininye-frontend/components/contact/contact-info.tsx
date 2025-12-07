import { Phone, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ContactInfoProps {
  data: {
    contactInfo: {
      address: string;
      email: string;
      hours: string;
      phone: string;
      whatsapp: string;
    };
  }
}

export function ContactInfo({ data }: ContactInfoProps) {
  const { contactInfo } = data

  return (
    <div className="flex h-full items-center">
      <div className="w-full space-y-4">
        <h2 className="font-serif mb-3 text-balance text-center text-xl font-bold md:text-2xl">Nos coordonnées</h2>

        <div className="space-y-2">
          <Card className="border border-primary/20 shadow-sm transition-all hover:shadow-md">
            <CardContent className="flex items-center gap-3 p-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm">WhatsApp</h3>
                <p className="text-xs text-muted-foreground truncate">{contactInfo.whatsapp}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-primary/30 text-primary hover:bg-primary/5 bg-transparent hover:text-primary text-xs h-8"
                asChild
              >
                <a href={`https://wa.me/${contactInfo.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">
                  Discuter
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-primary/20 shadow-sm transition-all hover:shadow-md">
            <CardContent className="flex items-center gap-3 p-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm">Téléphone</h3>
                <p className="text-xs text-muted-foreground truncate">{contactInfo.phone}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-primary/30 text-primary hover:bg-primary/5 bg-transparent hover:text-primary text-xs h-8"
                asChild
              >
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>
                  Appeler
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-primary/20 shadow-sm transition-all hover:shadow-md">
            <CardContent className="flex items-center gap-3 p-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm">Email</h3>
                <p className="text-xs text-muted-foreground truncate">{contactInfo.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-primary/30 text-primary hover:bg-primary/5 bg-transparent hover:text-primary text-xs h-8"
                asChild
              >
                <a href={`mailto:${contactInfo.email}`}>
                  Écrire
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 rounded-lg bg-muted/20 p-3 text-center">
          <p className="text-xs text-muted-foreground">{contactInfo.hours}</p>
          <p className="text-xs text-muted-foreground mt-1">{contactInfo.address}</p>
        </div>
      </div>
    </div>
  )
}
