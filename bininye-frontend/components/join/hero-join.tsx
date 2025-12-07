"use client"

import { Button } from "@/components/ui/button"
import { Heart, Users, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

interface StrapiStatItem {
  number: string;
  label: string;
}

interface HeroJoinProps {
  data: {
    title: string;
    subtitle: string;
    backgroundUrl: string | null;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    badgeText: string;
    stats: StrapiStatItem[];
  }
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  globe: Globe,
  heart: Heart,
}

export function HeroJoin({ data }: HeroJoinProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const backgroundImage = data.backgroundUrl || "/placeholder.svg?height=1080&width=1920"

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-slate-900 pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Bénévoles en action"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 text-center text-white">
        <div
          className={`mx-auto max-w-4xl transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
        >
          <div className="mb-6 inline-flex items-center rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm border border-primary/30">
            <span className="mr-2 flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            {data.badgeText}
          </div>

          <h1 className="mb-6 text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            {data.title.includes("d'un avenir") ? (
              <>
                {data.title.split("d'un avenir")[0]}<br />
                <span className="text-primary">d&apos;un avenir{data.title.split("d'un avenir")[1]}</span>
              </>
            ) : (
              data.title
            )}
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-200 md:text-xl">
            {data.subtitle}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-14 min-w-[200px] rounded-full text-lg font-semibold shadow-lg shadow-primary/25 transition-transform hover:scale-105"
              asChild
            >
              <Link href="#candidature">
                {data.primaryCtaLabel} <Heart className="ml-2 h-5 w-5 fill-current" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 min-w-[200px] rounded-full border-white/20 bg-white/10 text-lg font-semibold text-white backdrop-blur-sm transition-transform hover:bg-white/20 hover:scale-105 hover:text-white"
              asChild
            >
              <Link href="#opportunites">{data.secondaryCtaLabel}</Link>
            </Button>
          </div>

          {/* Stats */}
          {data.stats.length > 0 && (
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-8 md:grid-cols-3">
              {data.stats.map((stat, index) => (
                <div key={index} className={`text-center ${index === 2 ? "col-span-2 md:col-span-1" : ""}`}>
                  <div className="mb-1 flex justify-center text-3xl font-bold text-primary md:text-4xl">{stat.number}</div>
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
