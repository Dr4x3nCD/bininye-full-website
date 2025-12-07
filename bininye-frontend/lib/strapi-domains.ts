import { strapiClient, getStrapiMediaUrl } from "@/lib/strapi-client"

export interface StrapiDomainItem {
  text: string
}

export interface StrapiDomainStat {
  number: string
  label: string
}

export interface StrapiDomainAttributes {
  title: string
  slug: string
  shortDescription: string | null
  description: string | null
  impact: string | null
  themeColor: string | null
  textColor?: string | null
  iconKey: "nutrition-communautaire" | "gouvernance-locale" | "droit-et-sante" | "leadership-et-empowerment" | null
  items: StrapiDomainItem[]
  stats: StrapiDomainStat[]
  image?: {
    url?: string
    alternativeText?: string
  } | null
}

export interface StrapiDomainEntity extends StrapiDomainAttributes {
  id: number
  documentId?: string
}

export interface StrapiListResponse<T> {
  data: T[]
}

export interface DomainView {
  id: number
  documentId?: string
  slug: string
  title: string
  shortDescription: string
  description: string
  impact: string
  themeColor: string
  textColor: string
  iconKey: StrapiDomainAttributes["iconKey"]
  items: string[]
  stats: StrapiDomainStat[]
  imageUrl: string | null
}

const DEFAULT_THEME_COLOR = "bg-primary"
const DEFAULT_TEXT_COLOR = "text-primary"
const PLACEHOLDER_TEXT = (field: string) => `[Donnée non récupérée: ${field}]`

export function mapStrapiDomains(res: StrapiListResponse<StrapiDomainEntity>): DomainView[] {
  return res.data.map(mapSingleDomain)
}

export function mapSingleDomain(entity: StrapiDomainEntity): DomainView {
  const {
    id,
    documentId,
    slug,
    title,
    shortDescription,
    description,
    impact,
    themeColor,
    textColor,
    iconKey,
    items,
    stats,
    image,
  } = entity

  // Strapi 5 : image.url est direct
  const imageUrl = image?.url ? getStrapiMediaUrl(image.url) : null

  return {
    id,
    documentId,
    slug,
    title: title || PLACEHOLDER_TEXT("title"),
    shortDescription: shortDescription || PLACEHOLDER_TEXT("shortDescription"),
    description: description || PLACEHOLDER_TEXT("description"),
    impact: impact || PLACEHOLDER_TEXT("impact"),
    themeColor: themeColor || DEFAULT_THEME_COLOR,
    textColor: textColor || DEFAULT_TEXT_COLOR,
    iconKey,
    items: (items || []).map((i) => i.text),
    stats: stats || [],
    imageUrl,
  }
}

// Récupérer tous les domaines
export async function fetchAllDomains(): Promise<DomainView[]> {
  const res = (await strapiClient.collection("domains").find({
    sort: "title:asc",
    populate: ["items", "stats", "image"],
  })) as unknown as StrapiListResponse<StrapiDomainEntity>

  return mapStrapiDomains(res)
}

// Récupérer un domaine par slug
export async function fetchDomainBySlug(slug: string): Promise<DomainView | null> {
  const res = (await strapiClient.collection("domains").find({
    filters: { slug: { $eq: slug } },
    populate: ["items", "stats", "image"],
  })) as unknown as StrapiListResponse<StrapiDomainEntity>

  if (!res.data.length) return null
  return mapSingleDomain(res.data[0])
}
