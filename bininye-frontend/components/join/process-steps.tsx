import { FileText, UserCheck, MessageSquare, HeartHandshake } from "lucide-react"

export function ProcessSteps() {
  const steps = [
    {
      icon: FileText,
      title: "Candidature",
      description: "Remplissez le formulaire ci-dessous avec vos motivations.",
    },
    {
      icon: UserCheck,
      title: "Sélection",
      description: "Nous étudions votre profil sous 48h.",
    },
    {
      icon: MessageSquare,
      title: "Échange",
      description: "Un court entretien pour faire connaissance.",
    },
    {
      icon: HeartHandshake,
      title: "Intégration",
      description: "Bienvenue dans la famille Binin Ye !",
    },
  ]

  return (
    <section className="bg-primary/5 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Comment ça marche ?</h2>
          <p className="text-muted-foreground">Un processus simple pour commencer l'aventure</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute left-0 top-12 hidden h-0.5 w-full -translate-y-1/2 bg-primary/20 lg:block" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-background shadow-lg ring-4 ring-primary/10 transition-transform hover:scale-110">
                  <step.icon className="h-10 w-10 text-primary" />
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="max-w-[200px] text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
