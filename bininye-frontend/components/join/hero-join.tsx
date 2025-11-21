"use client"

import { Button } from "@/components/ui/button"
import { Heart, Users, Globe } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroJoin() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-slate-900 pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/volunteers-helping-community-africa.jpg"
          alt="Bénévoles en action"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 text-center text-white">
        <div
          className={`mx-auto max-w-4xl transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-6 inline-flex items-center rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm border border-primary/30">
            <span className="mr-2 flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Rejoignez +150 bénévoles actifs
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Rejoignez les bâtisseurs <br />
            <span className="text-primary">d'un avenir durable</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-200 md:text-xl">
            Contribuez à des projets concrets qui transforment les communautés en Côte d'Ivoire. Donnez du sens à votre
            engagement.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-14 min-w-[200px] rounded-full text-lg font-semibold shadow-lg shadow-primary/25 transition-transform hover:scale-105"
              asChild
            >
              <Link href="#candidature">
                Devenir bénévole <Heart className="ml-2 h-5 w-5 fill-current" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 min-w-[200px] rounded-full border-white/20 bg-white/10 text-lg font-semibold text-white backdrop-blur-sm transition-transform hover:bg-white/20 hover:scale-105 hover:text-white"
              asChild
            >
              <Link href="#opportunites">Voir les opportunités</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-1 flex justify-center text-3xl font-bold text-primary md:text-4xl">150+</div>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                <Users className="h-4 w-4" /> Bénévoles actifs
              </div>
            </div>
            <div className="text-center">
              <div className="mb-1 flex justify-center text-3xl font-bold text-primary md:text-4xl">12</div>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                <Globe className="h-4 w-4" /> Projets en cours
              </div>
            </div>
            <div className="col-span-2 text-center md:col-span-1">
              <div className="mb-1 flex justify-center text-3xl font-bold text-primary md:text-4xl">8</div>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                <Heart className="h-4 w-4" /> Communautés aidées
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
