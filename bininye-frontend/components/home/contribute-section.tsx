import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Users, TrendingUp } from "lucide-react"

export function ContributeSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/90 py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-5xl font-bold text-white md:text-6xl">Contribuer</h2>
          <p className="mt-6 text-2xl font-light text-white/90 md:text-3xl">Faites un Don, Changez des Vies</p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Votre générosité transforme des vies. Chaque contribution, quelle que soit sa taille, nous permet de
            poursuivre notre mission et d'avoir un impact durable dans nos communautés.
          </p>

          {/* Stats */}
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
              <Heart className="mx-auto h-10 w-10 text-accent" />
              <p className="mt-4 text-3xl font-bold text-white">5000+</p>
              <p className="mt-2 text-sm text-white/80">Vies Impactées</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
              <Users className="mx-auto h-10 w-10 text-accent" />
              <p className="mt-4 text-3xl font-bold text-white">200+</p>
              <p className="mt-2 text-sm text-white/80">Donateurs Actifs</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
              <TrendingUp className="mx-auto h-10 w-10 text-accent" />
              <p className="mt-4 text-3xl font-bold text-white">95%</p>
              <p className="mt-2 text-sm text-white/80">Fonds aux Projets</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-accent px-8 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-accent/90 hover:shadow-xl"
            >
              <Link href="/contribuer">
                <Heart className="mr-2 h-5 w-5" />
                Faire un Don Maintenant
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-2 border-white bg-transparent px-8 text-base font-semibold text-white transition-all hover:bg-white hover:text-primary"
            >
              <Link href="/contribuer">En Savoir Plus</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
