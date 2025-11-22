import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import Link from "next/link"
import type { BlogPostSummary } from "@/lib/blog-types"

interface ArticleGridProps {
  posts: BlogPostSummary[]
}

export function ArticleGrid({ posts }: ArticleGridProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col">
              <article className="flex h-full flex-col">
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4">
                    <Badge
                      variant="secondary"
                      className="bg-background/90 text-foreground backdrop-blur-sm hover:bg-background/100"
                    >
                      {post.category}
                    </Badge>
                  </div>
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
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{post.author}</span>
                    </div>

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

        <div className="mt-16 flex justify-center">
          <Button variant="outline" size="lg" className="min-w-[200px] bg-transparent">
            Charger plus d'articles
          </Button>
        </div>
      </div>
    </section>
  )
}
