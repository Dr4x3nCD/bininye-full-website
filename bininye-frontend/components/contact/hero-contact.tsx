import { Badge } from "@/components/ui/badge"

interface HeroContactProps {
  data: {
    title: string;
    subtitle: string;
    backgroundUrl: string | null;
  }
}

export function HeroContact({ data }: HeroContactProps) {
  const heroImage = data.backgroundUrl || "/placeholder.svg?height=600&width=800"

  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium text-primary">
              Contactez-nous
            </Badge>
            <h1 className="font-serif mb-6 text-balance text-5xl font-bold leading-tight text-foreground md:text-6xl">
              {data.title}
            </h1>
            <p className="text-pretty text-xl leading-relaxed text-muted-foreground md:text-2xl">
              {data.subtitle}
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={heroImage}
                alt="Notre équipe à votre écoute"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-medium">L'équipe Binin Ye à Abidjan</p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 -z-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -top-6 -right-6 -z-10 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
