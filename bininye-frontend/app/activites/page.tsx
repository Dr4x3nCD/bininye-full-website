"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, MapPin, Users, Search, RotateCcw, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { activities, categories, locations, statuses } from "@/lib/activities-data"
import { useState, useMemo } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function ActivitesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Toutes")
  const [selectedLocation, setSelectedLocation] = useState("Toutes")
  const [selectedStatus, setSelectedStatus] = useState("Tous")
  const [visibleCount, setVisibleCount] = useState(9)

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("Toutes")
    setSelectedLocation("Toutes")
    setSelectedStatus("Tous")
    setVisibleCount(9)
  }

  useMemo(() => {
    setVisibleCount(9)
  }, [searchQuery, selectedCategory, selectedLocation, selectedStatus])

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "Toutes" || activity.category === selectedCategory

      const matchesLocation = selectedLocation === "Toutes" || activity.location === selectedLocation

      const matchesStatus =
        selectedStatus === "Tous" ||
        (selectedStatus === "À venir" && activity.status === "à venir") ||
        (selectedStatus === "Passés" && activity.status === "passé")

      return matchesSearch && matchesCategory && matchesLocation && matchesStatus
    })
  }, [searchQuery, selectedCategory, selectedLocation, selectedStatus])

  const displayedActivities = filteredActivities.slice(0, visibleCount)

  return (
    <div className="flex min-h-screen flex-col bg-muted/10">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden py-16 lg:py-24">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/community-activities-workshop-training-africa.jpg"
              alt="Activités background"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif mb-6 text-balance text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                Nos Activités
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-white/90 drop-shadow-md md:text-xl">
                Découvrez nos actions sur le terrain et l'impact que nous créons dans les communautés à travers nos
                différentes activités et événements.
              </p>
            </div>
          </div>
        </section>

        {/* Redesigned filter section with better hierarchy, card style, and horizontal layout */}
        <section className="relative z-10 -mt-8 px-4 pb-12 lg:px-8">
          <div className="container mx-auto">
            <div className="mx-auto max-w-5xl rounded-3xl bg-card p-6 shadow-xl md:p-8 lg:p-10">
              <div className="space-y-8">
                {/* Header Filtres */}
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Filter className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Filtrer les activités</h2>
                  </div>

                  {/* Compteur de résultats */}
                  <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
                    {filteredActivities.length} activité{filteredActivities.length > 1 ? "s" : ""} disponible
                    {filteredActivities.length > 1 ? "s" : ""}
                  </Badge>
                </div>

                {/* Barre de recherche */}
                <div className="relative mx-auto max-w-3xl">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Recherchez une activité, un lieu ou un thème..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-14 w-full rounded-full border-2 border-muted bg-background pl-12 pr-4 text-base shadow-sm transition-all focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10"
                    />
                  </div>
                </div>

                {/* Filtres */}
                <div className="grid gap-8 border-t border-border pt-8 md:grid-cols-3">
                  {/* Filtre Statut */}
                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Statut</p>
                    <div className="flex flex-wrap gap-2">
                      {statuses.slice(0, 5).map((status) => (
                        <button
                          key={status}
                          onClick={() => setSelectedStatus(status)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            selectedStatus === status
                              ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                              : "bg-muted text-foreground hover:bg-muted/80 hover:shadow-sm"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtre Catégorie */}
                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Catégorie</p>
                    <div className="flex flex-wrap gap-2">
                      {categories.slice(0, 5).map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            selectedCategory === category
                              ? "bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90"
                              : "bg-muted text-foreground hover:bg-muted/80 hover:shadow-sm"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtre Localisation */}
                  <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Localisation</p>
                    <div className="flex flex-wrap gap-2">
                      {locations.slice(0, 5).map((location) => (
                        <button
                          key={location}
                          onClick={() => setSelectedLocation(location)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            selectedLocation === location
                              ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                              : "bg-muted text-foreground hover:bg-muted/80 hover:shadow-sm"
                          }`}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bouton Réinitialiser */}
                {(searchQuery ||
                  selectedCategory !== "Toutes" ||
                  selectedLocation !== "Toutes" ||
                  selectedStatus !== "Tous") && (
                  <div className="flex justify-center pt-4">
                    <Button
                      variant="ghost"
                      onClick={resetFilters}
                      className="text-muted-foreground hover:text-foreground hover:bg-muted/50 gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Réinitialiser les filtres
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16 pt-8 lg:pb-24 lg:pt-12">
          <div className="container mx-auto px-4 lg:px-8">
            {filteredActivities.length === 0 ? (
              <div className="mx-auto max-w-md text-center py-12">
                <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-muted/30 text-6xl">
                  🔍
                </div>
                <h3 className="font-serif mb-3 text-2xl font-bold text-foreground">Aucune activité trouvée</h3>
                <p className="text-muted-foreground mb-6">
                  Nous n'avons trouvé aucune activité correspondant à vos critères. Essayez de modifier vos filtres ou
                  votre recherche.
                </p>
                <Button onClick={resetFilters} variant="outline" className="rounded-full bg-transparent">
                  Effacer tous les filtres
                </Button>
              </div>
            ) : (
              <>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {displayedActivities.map((activity) => (
                    <Link
                      key={activity.id}
                      href={`/activites/${activity.id}`}
                      className="group overflow-hidden rounded-3xl bg-card shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-border/50"
                    >
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 transition-opacity group-hover:opacity-40" />
                        <img
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Badge statut */}
                        <div className="absolute right-4 top-4 z-20">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-sm ${
                              activity.status === "à venir" ? "bg-white text-primary" : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {activity.status === "à venir" ? "À venir" : "Passé"}
                          </span>
                        </div>
                        {/* Badge catégorie */}
                        <div className="absolute bottom-4 left-4 z-20">
                          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground shadow-sm">
                            {activity.category}
                          </span>
                        </div>
                      </div>

                      {/* Contenu */}
                      <div className="flex flex-col gap-4 p-6">
                        <h3 className="font-serif text-balance text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                          {activity.title}
                        </h3>

                        <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-primary" />
                            {activity.date}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-secondary" />
                            {activity.location}
                          </div>
                        </div>

                        <p className="line-clamp-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                          {activity.description}
                        </p>

                        <div className="mt-auto pt-2 flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {/* Placeholder for participants avatars if available, or just an icon */}
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary ring-2 ring-background">
                              <Users className="h-4 w-4" />
                            </div>
                            <span className="flex h-8 items-center px-2 text-xs font-medium text-muted-foreground">
                              {activity.participants}
                            </span>
                          </div>

                          <span className="text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            Voir détails
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {visibleCount < filteredActivities.length && (
                  <div className="mt-16 flex justify-center">
                    <Button
                      onClick={() => setVisibleCount((prev) => prev + 9)}
                      size="lg"
                      variant="outline"
                      className="group min-w-[200px] rounded-full border-2 border-primary/20 bg-background px-8 text-base font-medium text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Voir plus d'activités
                      <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-3xl bg-primary p-8 text-center text-primary-foreground lg:p-12">
              <h2 className="font-serif mb-4 text-balance text-3xl font-bold md:text-4xl">
                Participez à nos prochaines activités
              </h2>
              <p className="mb-8 text-pretty text-lg leading-relaxed">
                Rejoignez-nous dans nos actions et contribuez à créer un impact positif dans les communautés. Ensemble,
                nous pouvons faire la différence.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/nous-rejoindre">Devenir bénévole</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
