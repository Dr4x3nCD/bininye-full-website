"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) {
    if (totalPages <= 1) return null

    const pages = generatePageNumbers(currentPage, totalPages)

    return (
        <nav className={`flex items-center justify-center gap-2 ${className}`} aria-label="Pagination">
            {/* Bouton Précédent */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-10 w-10 rounded-full"
                aria-label="Page précédente"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Numéros de page */}
            <div className="flex items-center gap-1">
                {pages.map((page, index) => {
                    if (page === "...") {
                        return (
                            <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                                ...
                            </span>
                        )
                    }
                    return (
                        <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="icon"
                            onClick={() => onPageChange(page as number)}
                            className={`h-10 w-10 rounded-full ${currentPage === page
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted"
                                }`}
                            aria-label={`Page ${page}`}
                            aria-current={currentPage === page ? "page" : undefined}
                        >
                            {page}
                        </Button>
                    )
                })}
            </div>

            {/* Bouton Suivant */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-10 w-10 rounded-full"
                aria-label="Page suivante"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </nav>
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

// Hook pour gérer la pagination
export function usePagination<T>(items: T[], itemsPerPage: number) {
    const totalPages = Math.ceil(items.length / itemsPerPage)

    const getPageItems = (page: number) => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        return items.slice(start, end)
    }

    return { totalPages, getPageItems }
}
