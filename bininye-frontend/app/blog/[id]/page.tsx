import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogPostHero } from "@/components/blog/blog-post-hero"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { BlogPostShare } from "@/components/blog/blog-post-share"
import { blogPosts } from "@/lib/blog-data"
import { ArticleGrid } from "@/components/blog/article-grid" // Reusing grid for "read also"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

// Generate static params for all known blog posts to optimize build
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Find the post
  const post = blogPosts.find((p) => p.id.toString() === params.id)

  if (!post) {
    notFound()
  }

  // Find related posts (just exclude current one and take 3)
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <BlogPostHero
          title={post.title}
          category={post.category}
          image={post.image}
          author={post.author}
          date={post.date}
          readTime={post.readTime}
        />

        <BlogPostContent content={post.content || ""} author={post.author} role={post.role} />

        <BlogPostShare />

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">À lire également</h2>
            <ArticleGrid posts={relatedPosts} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
