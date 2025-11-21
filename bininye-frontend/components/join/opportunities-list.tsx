import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

const opportunities = [
  {
    title: "Bénévolat terrain",
    type: "Terrain",
    tags: ["Urgent", "Populaire"],
    image: "/volunteers-field-work.jpg",
    description: "Participez directement aux activités communautaires et aux programmes de développement.",
    points: ["Minimum 3 mois", "Passion pour le développement", "Travail en équipe"],
  },
  {
    title: "Opportunités d'emploi",
    type: "Carrière",
    tags: ["CDD / CDI"],
    image: "/office-meeting-africa.jpg",
    description: "Rejoignez notre équipe permanente pour contribuer à long terme à notre mission.",
    points: ["Expérience humanitaire", "Engagement long terme", "Postes de coordination"],
  },
  {
    title: "Stages & formations",
    type: "Stage",
    tags: ["Étudiants"],
    image: "/students-learning.jpg",
    description: "Idéal pour les étudiants et jeunes professionnels souhaitant acquérir une expérience.",
    points: ["Étudiant ou jeune diplômé", "Motivation forte", "2 mois minimum"],
  },
  {
    title: "Bénévolat de compétences",
    type: "Expertise",
    tags: ["Flexible"],
    image: "/remote-work-laptop.jpg",
    description: "Mettez vos compétences pro (Comms, Finance, IT) au service de l'ONG.",
    points: ["Communication, Finance, IT", "Horaires flexibles", "Distanciel possible"],
  },
]

export function OpportunitiesList() {
  return (
    <section id="opportunites" className="bg-muted/30 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Nos opportunités</h2>
            <p className="mt-2 text-muted-foreground">Trouvez la mission qui correspond à votre profil</p>
          </div>
          <Button variant="outline" className="hidden md:flex bg-transparent">
            Voir toutes les offres <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {opportunities.map((opp, index) => (
            <Card key={index} className="flex flex-col overflow-hidden transition-all hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={opp.image || "/placeholder.svg"}
                  alt={opp.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute left-3 top-3 flex gap-2">
                  {opp.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white/90 text-black backdrop-blur-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="mb-2 text-sm font-medium text-primary">{opp.type}</div>
                <h3 className="text-xl font-bold">{opp.title}</h3>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <p className="mb-4 text-sm text-muted-foreground">{opp.description}</p>
                <ul className="space-y-2">
                  {opp.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full" asChild>
                  <Link href="#candidature">Je suis intéressé</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline">
            Voir toutes les offres <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
