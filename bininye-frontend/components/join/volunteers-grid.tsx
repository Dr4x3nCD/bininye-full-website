export function VolunteersGrid() {
  const volunteers = [
    {
      name: "Amina T.",
      role: "Bénévole Terrain",
      since: "2022",
      quote: "Une expérience inoubliable.",
      image: "/african-woman-smiling.jpg",
    },
    {
      name: "Jean-Marc K.",
      role: "Coordinateur",
      since: "2021",
      quote: "Donner du sens à ma carrière.",
      image: "/african-man-professional.jpg",
    },
    {
      name: "Sophie L.",
      role: "Bénévole Santé",
      since: "2023",
      quote: "J'ai appris autant que j'ai donné.",
      image: "/woman-doctor-volunteer.jpg",
    },
    {
      name: "Moussa D.",
      role: "Logistique",
      since: "2022",
      quote: "L'esprit d'équipe est incroyable.",
      image: "/man-working-logistics.jpg",
    },
    {
      name: "Claire B.",
      role: "Formation",
      since: "2024",
      quote: "Voir les sourires est ma récompense.",
      image: "/woman-teaching.jpg",
    },
    {
      name: "Yannick O.",
      role: "Communication",
      since: "2023",
      quote: "Fier de porter ces valeurs.",
      image: "/man-photographer.jpg",
    },
  ]

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ils font Binin Ye</h2>
          <p className="text-muted-foreground">Rencontrez ceux qui agissent au quotidien</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {volunteers.map((volunteer, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl">
              <div className="aspect-[3/4] w-full overflow-hidden bg-muted">
                <img
                  src={volunteer.image || "/placeholder.svg"}
                  alt={volunteer.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 text-white opacity-100 transition-opacity">
                <div className="font-bold">{volunteer.name}</div>
                <div className="text-xs text-white/80">{volunteer.role}</div>
                <div className="mt-2 text-xs italic text-white/90 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  "{volunteer.quote}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
