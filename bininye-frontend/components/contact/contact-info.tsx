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
    <div className="space-y-8">
      <div>
        <h2 className="font-serif mb-8 text-balance text-3xl font-bold md:text-4xl">Nos coordonnées</h2>

        {/* Team Section */}
        <div className="mb-8 rounded-2xl bg-muted/30 p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Vos interlocuteurs
          </h3>
          <div className="flex flex-wrap gap-4">
            {teamContacts.map((contact) => (
              <div key={contact.name} className="flex items-center gap-3 rounded-full bg-background p-2 pr-4 shadow-sm">
                <img
                  src={contact.image || "/placeholder.svg"}
                  alt={contact.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Card className="border-2 shadow-sm transition-all hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">Réponse rapide (8h-17h)</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 bg-transparent"
              >
                Discuter
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-sm transition-all hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Phone className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Téléphone</h3>
                <p className="text-sm text-muted-foreground">+225 07 02 03 97</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 bg-transparent"
              >
                Appeler
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-sm transition-all hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <Mail className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Email</h3>
                <p className="text-sm text-muted-foreground">contact@bininye.com</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 bg-transparent"
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
