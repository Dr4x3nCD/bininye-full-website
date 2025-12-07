"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, User, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { BlogPostSummary } from "@/lib/blog-types"

interface ArticleGridProps {
  posts: BlogPostSummary[]
  itemsPerPage?: number
}

const DEFAULT_ITEMS_PER_PAGE = 9

export function ArticleGrid({ posts, itemsPerPage = DEFAULT_ITEMS_PER_PAGE }: ArticleGridProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(posts.length / itemsPerPage)
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return posts.slice(start, start + itemsPerPage)
  }, [posts, currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {paginatedPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col">
              <article className="flex h-full flex-col">
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {post.category && (
                    <div className="absolute left-4 top-4">
                      <Badge
                        variant="secondary"
                        className="bg-background/90 text-foreground backdrop-blur-sm hover:bg-background/100"
                      >
                        {post.category}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="mb-3 text-balance text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="mb-6 line-clamp-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t pt-4">
                    {post.author && (
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">{post.author}</span>
                      </div>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-0 text-primary hover:bg-transparent hover:text-primary/80"
                    >
                      Lire
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-4">
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
      </div>
    </section>
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
