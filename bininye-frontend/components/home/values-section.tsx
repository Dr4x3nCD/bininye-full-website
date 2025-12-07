import { EngagementIcon, DurabiliteIcon, InclusionIcon, IntegriteIcon, ExcellenceIcon } from "@/components/icons"

interface Value {
  title: string
  iconKey?: string
}

interface ValuesSectionProps {
  title?: string
  intro?: string
  values?: Value[]
}

// Mapping des iconKey vers les composants d'icônes
const iconMap: Record<string, any> = {
  engagement: EngagementIcon,
  durabilite: DurabiliteIcon,
  inclusion: InclusionIcon,
  integrite: IntegriteIcon,
  excellence: ExcellenceIcon,
}

export function ValuesSection({
  title,
  intro,
  values,
}: ValuesSectionProps) {
  // Si pas de valeurs, afficher un message explicite
  const hasValues = values && values.length > 0

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            {title || "[Donnée non récupérée: valuesTitle]"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {intro || "[Donnée non récupérée: valuesIntro]"}
          </p>
        </div>

        {hasValues ? (
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {values.map((value, index) => {
              const IconComponent = value.iconKey ? iconMap[value.iconKey.toLowerCase()] : null
              const color = index % 2 === 0 ? "text-primary" : "text-secondary"
              const bgColor = index % 2 === 0 ? "bg-primary/10" : "bg-secondary/10"

              return (
                <div
                  key={value.title}
                  className="group flex flex-col items-center gap-4 text-center transition-transform hover:scale-105"
                >
                  <div className={`rounded-2xl ${bgColor} p-6 shadow-sm transition-shadow group-hover:shadow-md`}>
                    {IconComponent ? (
                      <IconComponent className={`h-10 w-10 ${color}`} />
                    ) : (
                      <div className={`h-10 w-10 ${color}`} />
                    )}
                  </div>
                  <h3 className="text-base font-semibold md:text-lg">{value.title}</h3>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-xl">
            <p className="text-muted-foreground">[Donnée non récupérée: values - Aucune valeur configurée]</p>
          </div>
        )}
      </div>
    </section>
  )
}
