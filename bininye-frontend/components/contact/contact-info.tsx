import { Phone, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const teamContacts = [
  {
    name: "Kouadio N.",
    role: "Communication",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Jean-Baptiste T.",
    role: "Partenariats",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Aminata D.",
    role: "Bénévoles",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function ContactInfo() {
  return (
    <div className="flex h-full items-center">
      <div className="w-full space-y-4">
        <h2 className="font-serif mb-3 text-balance text-center text-xl font-bold md:text-2xl">Nos coordonnées</h2>

        {/* Team Section - Compact */}
        <div className="mb-4 rounded-lg bg-muted/20 p-3">
          <h3 className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Équipe
          </h3>
          <div className="flex flex-wrap justify-center gap-1.5">
            {teamContacts.map((contact) => (
              <div key={contact.name} className="flex items-center gap-1 rounded-full bg-background p-1 pr-2 shadow-sm text-xs">
                <img
                  src={contact.image || "/placeholder.svg"}
                  alt={contact.name}
                  className="h-6 w-6 rounded-full object-cover"
                />
                <div className="whitespace-nowrap">
                  <p className="font-bold leading-none">{contact.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Card className="border border-primary/20 shadow-sm transition-all hover:shadow-md">
            <CardContent className="flex items-center gap-3 p-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm">WhatsApp</h3>
                <p className="text-xs text-muted-foreground truncate">Réponse rapide (8h-17h)</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-primary/30 text-primary hover:bg-primary/5 bg-transparent hover:text-primary text-xs h-8"
              >
                Discuter
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
                <p className="text-xs text-muted-foreground truncate">+225 07 02 03 97</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-primary/30 text-primary hover:bg-primary/5 bg-transparent hover:text-primary text-xs h-8"
              >
                Appeler
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
                <p className="text-xs text-muted-foreground truncate">contact@bininye.com</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-primary/30 text-primary hover:bg-primary/5 bg-transparent hover:text-primary text-xs h-8"
              >
                Écrire
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
