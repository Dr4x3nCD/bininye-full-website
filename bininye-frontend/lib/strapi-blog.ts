import type { BlogPostSummary, BlogRubricItem, MostReadItem } from "@/lib/blog-types"
import { getStrapiMediaUrl } from "@/lib/strapi-client"

const PLACEHOLDER_TEXT = (field: string) => `[Donnée non récupérée: ${field}]`

export interface StrapiListResponse<T> {
  data: T[]
}

export interface StrapiBlogCategoryAttributes {
  name: string
  slug: string
}

export interface StrapiBlogCategory extends StrapiBlogCategoryAttributes {
  id: number
}

export interface StrapiBlogRubricAttributes {
  name: string
  description: string
  slug: string
}

export interface StrapiBlogRubric extends StrapiBlogRubricAttributes {
  id: number
}

export interface StrapiAuthorAttributes {
  name: string
  role: string | null
}

export interface StrapiImageAttributes {
  url: string
}

export interface StrapiRelationSingle<T> {
  data: (T & { id: number }) | null
}

export interface StrapiBlogPostAttributes {
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  readTime: number | null
  isFeatured: boolean | null
  isMostRead: boolean | null
  // Strapi 5: relations retournées directement (pas de wrapper {data: ...})
  category: { name: string; slug: string } | null
  author: { name: string; role?: string | null } | null
  image: { url: string } | null
}

export interface StrapiBlogPost extends StrapiBlogPostAttributes {
  id: number
}

function formatDateFr(dateStr: string): string {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function mapBlogPosts(res: StrapiListResponse<StrapiBlogPost>): BlogPostSummary[] {
  return res.data.map(({ id, ...attributes }) => {
    // Strapi 5: relations directes
    const categoryName = attributes.category?.name || PLACEHOLDER_TEXT("category")
    const authorName = attributes.author?.name || PLACEHOLDER_TEXT("author")
    const authorRole = attributes.author?.role || ""
    const imageUrl = attributes.image?.url

    return {
      id,
      title: attributes.title,
      slug: attributes.slug,
      excerpt: attributes.excerpt,
      content: attributes.content,
      author: authorName,
      role: authorRole,
      date: formatDateFr(attributes.date),
      category: categoryName,
      image: getStrapiMediaUrl(imageUrl) ?? "/placeholder.svg",
      readTime: attributes.readTime ? `${attributes.readTime} min` : "",
      featured: Boolean(attributes.isFeatured),
    }
  })
}

export function mapSingleBlogPost(entity: StrapiBlogPost): BlogPostSummary {
  return mapBlogPosts({ data: [entity] })[0]
}

export function mapRubrics(res: StrapiListResponse<StrapiBlogRubric>): BlogRubricItem[] {
  return res.data.map(({ id, name, description, slug }) => ({
    id,
    title: name,
    description,
    image: "/placeholder.svg",
    link: `/blog?rubrique=${slug}`,
  }))
}

export function mapMostRead(posts: BlogPostSummary[]): MostReadItem[] {
  return posts
    .filter((p) => p.featured !== true)
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      date: p.date,
    }))
}
