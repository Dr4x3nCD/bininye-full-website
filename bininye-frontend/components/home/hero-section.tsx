import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container relative mx-auto px-4 py-20 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-block">
              <p className="font-serif text-xl italic text-secondary md:text-2xl">Pour la joie</p>
            </div>
            <h1 className="font-serif text-balance text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Bienvenue à l'ONG{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Binin Ye</span>
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl lg:text-2xl">
              Une Organisation Non Gouvernementale engagée dans la création d'un avenir durable pour tous.
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:bg-primary/90"
              >
                <Link href="/qui-sommes-nous">
                  En Savoir Plus
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-2 px-8 text-base font-semibold bg-transparent"
              >
                <Link href="/contribuer">Contribuer</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/happy-african-people-smiling-community-success-sto.jpg"
                alt="Femme et enfant souriants"
                className="h-full w-full object-cover"
              />
              {/* Overlay gradient subtil */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            {/* Décoration */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl bg-secondary/20" />
            <div className="absolute -top-6 -left-6 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 text-background">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 80L60 70C120 60 240 40 360 33.3C480 26.7 600 33.3 720 40C840 46.7 960 53.3 1080 53.3C1200 53.3 1320 46.7 1380 43.3L1440 40V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}
