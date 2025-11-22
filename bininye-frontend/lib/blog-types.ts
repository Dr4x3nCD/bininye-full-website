export interface BlogPostSummary {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  role: string
  date: string
  category: string
  image: string
  readTime: string
  featured?: boolean
}

export interface BlogRubricItem {
  id: number
  title: string
  description: string
  image: string
  /** Lien vers la page listant les articles de cette rubrique (peut être "#" au début). */
  link: string
}

export interface MostReadItem {
  id: number
  slug: string
  title: string
  category: string
  date: string
}
