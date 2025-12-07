import { strapiClient, getStrapiMediaUrl } from "@/lib/strapi-client"

export interface StrapiMediaField {
  url?: string | null
  data?: {
    url?: string | null
    attributes?: {
      url?: string | null
    }
  } | Array<{
    url?: string | null
    attributes?: {
      url?: string | null
    }
  }> | null
}

export interface StrapiGalleryPageAttributes {
  heroTitle: string | null
  heroSubtitle: string | null
  heroBackground?: StrapiMediaField | null
}

export interface StrapiGalleryPageEntity {
  id: number
  attributes: StrapiGalleryPageAttributes
}

export interface StrapiSingleResponse<T> {
  data: T | null
}

export interface StrapiMediaItemAttributes {
  title: string
  type: "photo" | "video"
  date: string | null
  category: string | null
  videoUrl: string | null
  thumbnail?: StrapiMediaField | null
}

export type StrapiMediaItemEntity = StrapiMediaItemAttributes & {
  id: number
}

export interface StrapiListResponse<T> {
  data: T[]
}

export interface MediaItemView {
  id: number
  type: "photo" | "video"
  title: string
  thumbnail: string
  dateLabel: string
  category: string
  videoUrl: string | null
}

export interface GalleryPageView {
  heroTitle: string
  heroSubtitle: string
  heroBackgroundUrl: string | null
  items: MediaItemView[]
}

function getMediaUrl(field?: StrapiMediaField | null): string | null {
  if (!field) return null

  // Strapi v5 : thumbnail est directement { url: '/uploads/...' }
  if ((field as any)?.url) {
    return getStrapiMediaUrl((field as any).url)
  }

  // Fallback pour d'autres structures possibles (data.attributes.url, data.url)
  const raw = (field as any)?.data as
    | { url?: string | null; attributes?: { url?: string | null } }
    | Array<{ url?: string | null; attributes?: { url?: string | null } }>
    | null
    | undefined

  if (!raw) return null

  const data = Array.isArray(raw) ? raw[0] : raw
  const url = data?.attributes?.url ?? data?.url ?? null
  return url ? getStrapiMediaUrl(url) : null
}

function getYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "") || null
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v")
      if (id) return id
      const parts = u.pathname.split("/")
      const watchIndex = parts.indexOf("embed")
      if (watchIndex >= 0 && parts[watchIndex + 1]) return parts[watchIndex + 1]
    }
  } catch {
    return null
  }
  return null
}

function formatDateLabel(dateStr: string | null): string {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
}

function mapMediaItems(response: StrapiListResponse<StrapiMediaItemEntity>): MediaItemView[] {
  return response.data.map(({ id, ...attributes }) => {
    let thumbUrl = getMediaUrl(attributes.thumbnail)

    if (!thumbUrl && attributes.type === "video") {
      const ytId = getYouTubeId(attributes.videoUrl)
      if (ytId) {
        thumbUrl = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
      }
    }

    if (!thumbUrl) {
      thumbUrl = "/placeholder.svg?height=400&width=600"
    }

    return {
      id,
      type: attributes.type,
      title: attributes.title,
      thumbnail: thumbUrl,
      dateLabel: formatDateLabel(attributes.date),
      category: attributes.category ?? "",
      videoUrl: attributes.videoUrl ?? null,
    }
  })
}

export async function fetchGalleryPage(): Promise<GalleryPageView> {
  const pageRes = (await strapiClient.single("gallery-page").find({
    populate: ["heroBackground"],
  })) as StrapiSingleResponse<StrapiGalleryPageEntity>

  const itemsRes = (await strapiClient.collection("media-items").find({
    sort: "date:desc",
    populate: ["thumbnail"],
  })) as StrapiListResponse<StrapiMediaItemEntity>

  const items = mapMediaItems(itemsRes)

  // Fallback si le Single Type n'est pas encore créé/rempli
  if (!pageRes.data || !pageRes.data.attributes) {
    return {
      heroTitle: "Médiathèque",
      heroSubtitle:
        "Découvrez en images et en vidéos nos actions sur le terrain et l'impact de notre travail dans les communautés.",
      heroBackgroundUrl: null,
      items,
    }
  }

  const { attributes } = pageRes.data

  const heroBackgroundUrl = getMediaUrl(attributes.heroBackground)

  return {
    heroTitle: attributes.heroTitle ?? "Médiathèque",
    heroSubtitle:
      attributes.heroSubtitle ??
      "Découvrez en images et en vidéos nos actions sur le terrain et l'impact de notre travail dans les communautés.",
    heroBackgroundUrl,
    items,
  }
}
