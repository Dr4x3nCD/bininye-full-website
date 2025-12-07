import Image from "next/image"

interface VolunteersGridProps {
  data: {
    title: string;
    subtitle: string;
    volunteers: Array<{
      id: number;
      name: string;
      role: string;
      imageUrl: string | null;
      quote?: string;
    }>;
  }
}

export function VolunteersGrid({ data }: VolunteersGridProps) {
  // Si pas de volontaires depuis Strapi, ne pas afficher la section
  if (data.volunteers.length === 0) {
    return null
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{data.title}</h2>
          <p className="text-muted-foreground">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {data.volunteers.map((volunteer) => (
            <div key={volunteer.id} className="group relative overflow-hidden rounded-xl">
              <div className="aspect-[3/4] w-full overflow-hidden bg-muted">
                <Image
                  src={volunteer.imageUrl || "/placeholder.svg?height=400&width=300"}
                  alt={volunteer.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 text-white opacity-100 transition-opacity">
                <div className="font-bold">{volunteer.name}</div>
                <div className="text-xs text-white/80">{volunteer.role}</div>
                {volunteer.quote && (
                  <div className="mt-2 text-xs italic text-white/90 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    &quot;{volunteer.quote}&quot;
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
