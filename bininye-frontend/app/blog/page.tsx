import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroBlog } from "@/components/blog/hero-blog"
import { FeaturedPost } from "@/components/blog/featured-post"
import { BlogFilters } from "@/components/blog/blog-filters"
import { ArticleGrid } from "@/components/blog/article-grid"
import { RubricsSection } from "@/components/blog/rubrics-section"
import { MostReadSection } from "@/components/blog/most-read-section"
import { blogPosts, blogCategories, rubrics, mostRead } from "@/lib/blog-data"

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroBlog />
        <FeaturedPost post={blogPosts[0]} />
        <BlogFilters categories={blogCategories} />
        <ArticleGrid posts={blogPosts.slice(1)} />
        <RubricsSection items={rubrics} />
        <MostReadSection posts={mostRead} />
      </main>
      <Footer />
    </div>
  )
}
