import Link from "next/link"
import { MessageCircle, Handshake, Heart, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const options = [
  {
    icon: MessageCircle,
    title: "Demande générale",
    description: "Une question sur nos activités ?",
    action: "Poser une question",
    href: "#contact-form",
    param: "general",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Handshake,
    title: "Partenariat",
    description: "Collaborer avec Binin Ye",
    action: "Proposer un partenariat",
    href: "#contact-form",
    param: "partenariat",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Heart,
    title: "Faire un don",
    description: "Soutenir nos actions",
    action: "Contribuer",
    href: "/contribuer",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Users,
    title: "Bénévolat",
    description: "Rejoindre l'équipe",
    action: "Devenir bénévole",
    href: "/nous-rejoindre",
    color: "text-primary",
    bg: "bg-primary/10",
  },
]

export function ContactOptions() {
  return (
    <section className="relative z-10 -mt-12 pb-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {options.map((option) => (
            <Link key={option.title} href={option.href} className="group block h-full">
              <Card className="h-full border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="flex h-full flex-col items-center p-6 text-center">
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${option.bg} ${option.color}`}
                  >
                    <option.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{option.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{option.description}</p>
                  <span className={`mt-auto text-sm font-semibold ${option.color} group-hover:underline`}>
                    {option.action} →
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
