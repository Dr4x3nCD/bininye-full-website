"use client"

import { useState, useMemo } from "react"
import { Play, ImageIcon, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export interface MediaItemViewProps {
  id: number
  type: "photo" | "video"
  title: string
  thumbnail: string
  dateLabel: string
  category: string
  videoUrl: string | null
}

interface MediaGalleryProps {
  items: MediaItemViewProps[]
  itemsPerPage?: number
}

const ITEMS_PER_PAGE = 8

export function MediaGallery({ items, itemsPerPage = ITEMS_PER_PAGE }: MediaGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [typeFilter, setTypeFilter] = useState<"all" | "photo" | "video">("all")

  // Filtrer par type (photo / vidéo / tout)
  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        typeFilter === "all" ? true : item.type === typeFilter,
      ),
    [items, typeFilter],
  )

  // Items navigables (sans placeholder)
  const navigableItems = useMemo(
    () => filteredItems.filter((item) => !item.thumbnail.includes("/placeholder.svg")),
    [filteredItems],
  )

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage))
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedItems = filteredItems.slice(startIdx, startIdx + itemsPerPage)

  // Media actif basé sur l'index dans la liste navigable
  const activeMedia = activeIndex !== null ? navigableItems[activeIndex] ?? null : null
  const prevMedia = activeIndex !== null && activeIndex > 0 ? navigableItems[activeIndex - 1] : null
  const nextMedia =
    activeIndex !== null && activeIndex < navigableItems.length - 1
      ? navigableItems[activeIndex + 1]
      : null

  const handlePrev = () => {
    if (activeIndex !== null && activeIndex > 0) setActiveIndex(activeIndex - 1)
  }

  const handleNext = () => {
    if (activeIndex !== null && activeIndex < navigableItems.length - 1)
      setActiveIndex(activeIndex + 1)
  }

  const handleOpenMedia = (id: number) => {
    const idx = navigableItems.findIndex((it) => it.id === id)
    if (idx === -1) return
    setActiveIndex(idx)
  }

  const handleFilterChange = (filter: "all" | "photo" | "video") => {
    setTypeFilter(filter)
    setCurrentPage(1)
    setActiveIndex(null)
  }

  return (
    <>
      {/* Filtres internes (Photos / Vidéos / Tous) */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        <button
          className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${
            typeFilter === "all"
              ? "bg-primary text-primary-foreground"
              : "border bg-background hover:bg-muted"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          Tous
        </button>
        <button
          className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${
            typeFilter === "photo"
              ? "bg-primary text-primary-foreground"
              : "border bg-background hover:bg-muted"
          }`}
          onClick={() => handleFilterChange("photo")}
        >
          Photos
        </button>
        <button
          className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${
            typeFilter === "video"
              ? "bg-primary text-primary-foreground"
              : "border bg-background hover:bg-muted"
          }`}
          onClick={() => handleFilterChange("video")}
        >
          Vidéos
        </button>
      </div>

      {/* Grille */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedItems.map((item) => {
          const isPlaceholder = item.thumbnail.includes("/placeholder.svg")

          return (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-video">
                {isPlaceholder ? (
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => handleOpenMedia(item.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors w-full h-full"
                  >
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.type === "video" && (
                      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/90 transition-transform group-hover:scale-110">
                        <Play className="h-10 w-10 text-primary" fill="currentColor" />
                      </div>
                    )}
                    {item.type === "photo" && (
                      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/90 transition-transform group-hover:scale-110">
                        <ImageIcon className="h-10 w-10 text-primary" />
                      </div>
                    )}
                  </button>
                )}
                <div className="absolute left-3 top-3">
                  <span className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium">
                    {item.type === "video" ? <Play className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                    {item.type === "video" ? "Vidéo" : "Photo"}
                  </span>
                </div>
              </div>
              <div className="bg-card p-4">
                <h3 className="mb-1 text-balance text-sm font-semibold leading-tight line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.dateLabel}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Media Modal (Photo + Vidéo) */}
      <Dialog open={activeMedia != null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent
          className="max-w-6xl border-0 bg-transparent p-0 shadow-none"
          overlayClassName="bg-transparent"
          showCloseButton={false}
        >
          <DialogClose
            className="absolute -top-4 -right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
          >
            <X className="h-7 w-7" />
            <span className="sr-only">Fermer</span>
          </DialogClose>
          {activeMedia && (
            <div className="flex flex-col gap-6">
              {/* Media Container with Side Navigation */}
              <div className="relative w-full flex items-center justify-center gap-4">
                {/* Précédent Button */}
                {prevMedia && (
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handlePrev}
                    className="absolute left-0 z-10 rounded-full bg-primary/10 hover:bg-primary/20 text-primary h-16 w-16 p-0 transition-colors"
                  >
                    <ChevronLeft className="h-9 w-9" />
                  </Button>
                )}

                {/* Media */}
                <div className="relative w-full overflow-hidden rounded-2xl">
                  {activeMedia.type === "video" ? (
                    <div className="pt-[56.25%]">
                      <iframe
                        src={activeMedia.videoUrl?.replace("watch?v=", "embed/") || ""}
                        title={activeMedia.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    </div>
                  ) : (
                    <img
                      src={activeMedia.thumbnail}
                      alt={activeMedia.title}
                      className="w-full h-auto object-contain max-h-[70vh] rounded-2xl"
                    />
                  )}
                </div>

                {/* Suivant Button */}
                {nextMedia && (
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleNext}
                    className="absolute right-0 z-10 rounded-full bg-primary/10 hover:bg-primary/20 text-primary h-16 w-16 p-0 transition-colors"
                  >
                    <ChevronRight className="h-9 w-9" />
                  </Button>
                )}
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
