import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import type { mostRead } from "@/lib/blog-data"

interface MostReadSectionProps {
  posts: typeof mostRead
}

export function MostReadSection({ posts }: MostReadSectionProps) {
  return (
    <section className="border-t py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Les plus lus</h2>
            <p className="mt-2 text-muted-foreground">Les articles qui ont marqué notre communauté ce mois-ci.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:w-2/3 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Link
                href={`/blog/${post.id}`}
                key={post.id}
                className="group flex flex-col gap-2 rounded-xl border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-primary">#{index + 1}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
                <div className="mt-auto pt-2">
                  <span className="inline-flex items-center text-xs font-medium text-muted-foreground group-hover:text-primary">
                    {post.category}
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
