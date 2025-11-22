import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import Link from "next/link"
import type { BlogPostSummary } from "@/lib/blog-types"

interface FeaturedPostProps {
  post: BlogPostSummary
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="group relative overflow-hidden rounded-3xl bg-card shadow-xl transition-all hover:shadow-2xl">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative min-h-[300px] overflow-hidden lg:min-h-[500px]">
              <Link href={`/blog/${post.slug}`}>
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <div className="mb-6 flex items-center gap-3">
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">{post.category}</Badge>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime} de lecture
                </span>
              </div>

              <Link href={`/blog/${post.slug}`}>
                <h2 className="mb-4 text-balance text-3xl font-bold leading-tight tracking-tight hover:text-primary transition-colors md:text-4xl lg:text-5xl">
                  {post.title}
                </h2>
              </Link>

              <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-6 border-t pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{post.author}</span>
                    <span className="text-xs text-muted-foreground">{post.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" className="group/btn hidden sm:flex bg-transparent">
                      Lire l'article
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
