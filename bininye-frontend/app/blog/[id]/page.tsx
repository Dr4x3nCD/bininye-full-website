import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogPostHero } from "@/components/blog/blog-post-hero"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { BlogPostShare } from "@/components/blog/blog-post-share"
import { ArticleGrid } from "@/components/blog/article-grid"
import { strapiClient } from "@/lib/strapi-client"
import type { BlogPostSummary } from "@/lib/blog-types"
import {
  mapBlogPosts,
  mapSingleBlogPost,
  type StrapiBlogPost,
  type StrapiListResponse,
} from "@/lib/strapi-blog"

interface BlogPostPageProps {
  params: Promise<{
    id: string // segment de l'URL, utilisé comme slug pour le SEO
  }>
}

export async function generateStaticParams() {
  const res = (await strapiClient.collection("blog-posts").find({
    fields: ["slug"],
  })) as StrapiListResponse<StrapiBlogPost>

  return res.data.map((post) => ({ id: post.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params
  const slug = id

  const postRes = (await strapiClient.collection("blog-posts").find({
    filters: { slug: { $eq: slug } },
    populate: ["author", "category", "image"],
  })) as StrapiListResponse<StrapiBlogPost>

  if (!postRes.data.length) {
    notFound()
  }

  const postSummary: BlogPostSummary = mapSingleBlogPost(postRes.data[0])

  const relatedRes = (await strapiClient.collection("blog-posts").find({
    filters: { slug: { $ne: slug } },
    sort: "date:desc",
    populate: ["author", "category", "image"],
  })) as StrapiListResponse<StrapiBlogPost>

  const relatedPosts = mapBlogPosts(relatedRes).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <BlogPostHero
          title={postSummary.title}
          category={postSummary.category}
          image={postSummary.image}
          author={postSummary.author}
          date={postSummary.date}
          readTime={postSummary.readTime}
        />

        <BlogPostContent content={postSummary.content || ""} author={postSummary.author} role={postSummary.role} />

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
