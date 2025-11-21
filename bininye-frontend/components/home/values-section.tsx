import { EngagementIcon, DurabiliteIcon, InclusionIcon, IntegriteIcon, ExcellenceIcon } from "@/components/icons"

const values = [
  {
    icon: EngagementIcon,
    title: "Engagement",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: DurabiliteIcon,
    title: "Durabilité",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: InclusionIcon,
    title: "Inclusion",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: IntegriteIcon,
    title: "Intégrité",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: ExcellenceIcon,
    title: "Excellence",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function ValuesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">Nos Valeurs</h2>
          <p className="mt-4 text-lg text-muted-foreground">Les principes qui guident notre action</p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="group flex flex-col items-center gap-4 text-center transition-transform hover:scale-105"
            >
              <div className={`rounded-2xl ${value.bgColor} p-6 shadow-sm transition-shadow group-hover:shadow-md`}>
                <value.icon className={`h-10 w-10 ${value.color}`} />
              </div>
              <h3 className="text-base font-semibold md:text-lg">{value.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
