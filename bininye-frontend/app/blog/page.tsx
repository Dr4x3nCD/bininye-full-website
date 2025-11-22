import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroBlog } from "@/components/blog/hero-blog"
import { FeaturedPost } from "@/components/blog/featured-post"
import { BlogFilters } from "@/components/blog/blog-filters"
import { ArticleGrid } from "@/components/blog/article-grid"
import { RubricsSection } from "@/components/blog/rubrics-section"
import { MostReadSection } from "@/components/blog/most-read-section"
import { strapiClient } from "@/lib/strapi-client"
import type { BlogPostSummary } from "@/lib/blog-types"
import {
  mapBlogPosts,
  mapMostRead,
  mapRubrics,
  type StrapiBlogCategory,
  type StrapiBlogRubric,
  type StrapiBlogPost,
  type StrapiListResponse,
} from "@/lib/strapi-blog"

async function getBlogData() {
  const [postsRes, categoriesRes, rubricsRes] = await Promise.all([
    (await strapiClient.collection("blog-posts").find({
      sort: "date:desc",
      populate: ["author", "category", "image"],
    })) as StrapiListResponse<StrapiBlogPost>,
    (await strapiClient.collection("blog-categories").find()) as StrapiListResponse<StrapiBlogCategory>,
    (await strapiClient.collection("blog-rubrics").find()) as StrapiListResponse<StrapiBlogRubric>,
  ])

  const posts = mapBlogPosts(postsRes)
  const featured = posts.find((p) => p.featured) ?? posts[0]
  const otherPosts = featured ? posts.filter((p) => p.id !== featured.id) : posts

  const categories = [
    "Tous",
    ...Array.from(new Set(categoriesRes.data.map((c) => c.name))).sort(),
  ]

  const rubricItems = mapRubrics(rubricsRes)
  const mostReadItems = mapMostRead(posts)

  return { featured, otherPosts, categories, rubricItems, mostReadItems }
}

export default async function BlogPage() {
  const { featured, otherPosts, categories, rubricItems, mostReadItems } = await getBlogData()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroBlog />
        {featured && <FeaturedPost post={featured} />}
        <BlogFilters categories={categories} />
        <ArticleGrid posts={otherPosts} />
        <RubricsSection items={rubricItems} />
        <MostReadSection posts={mostReadItems} />
      </main>
      <Footer />
    </div>
  )
}
