"use client"

import { useState, useMemo } from "react"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface TestimonialItem {
    id: number
    name: string
    role: string
    location: string
    quote: string
    image: string | null
}

interface TestimonialsGridProps {
    testimonials: TestimonialItem[]
    itemsPerPage?: number
}

const DEFAULT_ITEMS_PER_PAGE = 6

export function TestimonialsGrid({ testimonials, itemsPerPage = DEFAULT_ITEMS_PER_PAGE }: TestimonialsGridProps) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(testimonials.length / itemsPerPage)
    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage
        return testimonials.slice(start, start + itemsPerPage)
    }, [testimonials, currentPage, itemsPerPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    if (testimonials.length === 0) {
        return (
            <div className="text-center py-16 border-2 border-dashed border-muted-foreground/30 rounded-xl">
                <p className="text-muted-foreground">[Aucun témoignage disponible]</p>
            </div>
        )
    }

    return (
        <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {paginatedItems.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="relative overflow-hidden rounded-2xl bg-card p-8 shadow-lg transition-shadow hover:shadow-xl"
                    >
                        <Quote className="absolute right-4 top-4 h-12 w-12 text-primary/10" />
                        <div className="relative">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="h-16 w-16 overflow-hidden rounded-full">
                                    <img
                                        src={testimonial.image || "/placeholder.svg"}
                                        alt={testimonial.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold">{testimonial.name}</h3>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                                </div>
                            </div>
                            <blockquote className="text-pretty leading-relaxed text-muted-foreground">
                                "{testimonial.quote}"
                            </blockquote>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="h-10 w-10 rounded-full"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                        {generatePageNumbers(currentPage, totalPages).map((page, index) => {
                            if (page === "...") {
                                return (
                                    <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                                        ...
                                    </span>
                                )
                            }
                            return (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page as number)}
                                    className={`h-10 w-10 rounded-full text-sm font-medium transition-colors ${currentPage === page
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-foreground hover:bg-muted/80"
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        })}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="h-10 w-10 rounded-full"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </>
    )
}

function generatePageNumbers(current: number, total: number): (number | "...")[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1)
    }
    if (current <= 3) {
        return [1, 2, 3, 4, "...", total]
    }
    if (current >= total - 2) {
        return [1, "...", total - 3, total - 2, total - 1, total]
    }
    return [1, "...", current - 1, current, current + 1, "...", total]
}
