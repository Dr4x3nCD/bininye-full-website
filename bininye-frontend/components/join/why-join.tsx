import { Card, CardContent } from "@/components/ui/card"
import { Target, Zap, Users, Star, Quote } from "lucide-react"

const benefits = [
  {
    icon: Target,
    title: "Impact réel",
    description: "Voyez l'effet direct de vos actions sur le terrain et dans la vie des bénéficiaires.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "Développement personnel",
    description: "Bénéficiez de formations, développez votre leadership et de nouvelles compétences.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Users,
    title: "Communauté dynamique",
    description: "Rejoignez une famille engagée, bienveillante et soudée autour d'un but commun.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Star,
    title: "Valeurs fortes",
    description: "Incarnez le respect, l'engagement et l'excellence au quotidien.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
]

export function WhyJoin() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Pourquoi nous rejoindre ?</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Plus qu'une simple mission, rejoindre Binin Ye est une aventure humaine transformatrice.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="group relative rounded-2xl border bg-card p-6 transition-all hover:shadow-lg">
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${benefit.bg} ${benefit.color}`}
              >
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Micro-testimonial */}
        <div className="mt-16 flex justify-center">
          <Card className="relative max-w-3xl overflow-hidden border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center md:p-10">
              <Quote className="mx-auto mb-6 h-10 w-10 text-primary/40" />
              <p className="mb-6 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                "Binin Ye m’a permis de devenir utile, de grandir et de voir l’impact concret de mon engagement. C'est
                une école de la vie."
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary">
                  <img src="/african-woman-portrait.jpg" alt="Sarah K." className="h-full w-full object-cover" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-foreground">Sarah K.</div>
                  <div className="text-sm text-muted-foreground">Bénévole depuis 2023</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
