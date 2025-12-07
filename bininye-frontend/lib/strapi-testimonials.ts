import { strapiClient } from "@/lib/strapi-client"
import { getStrapiMediaUrl } from "@/lib/strapi-client"

const PLACEHOLDER_TEXT = (field: string) => `[Donnée non récupérée: ${field}]`

// Types Strapi 5 - media est direct, pas imbriqué
export interface StrapiMediaDirect {
  id?: number
  url?: string
  alternativeText?: string
}

export interface StrapiTestimonialsPageData {
  documentId: string
  id: number
  heroTitle?: string | null
  heroSubtitle?: string | null
  heroBackground?: StrapiMediaDirect | null
  introTitle?: string | null
  introText?: string | null
  ctaTitle?: string | null
  ctaText?: string | null
  ctaButtonLabel?: string | null
}

export interface StrapiSingleResponse<T> {
  data: T | null
}

export interface StrapiTestimonialEntity {
  id: number
  name: string
  role?: string | null
  location?: string | null
  quote?: string | null
  type?: "beneficiary" | "volunteer" | "partner" | null
  image?: StrapiMediaDirect | null
}

export interface StrapiListResponse<T> {
  data: T[]
}

export interface TestimonialView {
  id: number
  name: string
  role: string
  location: string
  quote: string
  image: string
  type: "beneficiary" | "volunteer" | "partner" | "unknown"
}

export interface TestimonialsPageView {
  heroTitle: string
  heroSubtitle: string
  heroBackgroundUrl: string | null
  introTitle: string
  introText: string
  ctaTitle: string
  ctaText: string
  ctaButtonLabel: string
  testimonials: TestimonialView[]
}

function mapTestimonials(response: StrapiListResponse<StrapiTestimonialEntity>): TestimonialView[] {
  return response.data.map((entity) => {
    // Strapi 5 : image.url est direct
    const imageUrl = entity.image?.url
      ? (getStrapiMediaUrl(entity.image.url) ?? "/placeholder.svg")
      : "/placeholder.svg"

    let type: TestimonialView["type"] = "unknown"
    if (entity.type === "beneficiary") type = "beneficiary"
    else if (entity.type === "volunteer") type = "volunteer"
    else if (entity.type === "partner") type = "partner"

    return {
      id: entity.id,
      name: entity.name || PLACEHOLDER_TEXT("name"),
      role: entity.role || PLACEHOLDER_TEXT("role"),
      location: entity.location || PLACEHOLDER_TEXT("location"),
      quote: entity.quote || PLACEHOLDER_TEXT("quote"),
      image: imageUrl,
      type,
    }
  })
}

export async function fetchTestimonialsPage(): Promise<TestimonialsPageView> {
  try {
    const pageRes = (await strapiClient.single("testimonials-page").find({
      populate: ["heroBackground"],
    })) as unknown as StrapiSingleResponse<StrapiTestimonialsPageData>

    const testimonialsRes = (await strapiClient.collection("testimonials").find({
      sort: "id:asc",
      populate: ["image"],
    })) as unknown as StrapiListResponse<StrapiTestimonialEntity>

    const testimonials = mapTestimonials(testimonialsRes)

    if (!pageRes.data) {
      return getDefaultTestimonialsPage(testimonials)
    }

    const doc = pageRes.data

    // Strapi 5 : heroBackground.url est direct
    const heroBackgroundUrl = doc.heroBackground?.url
      ? (getStrapiMediaUrl(doc.heroBackground.url) ?? null)
      : null

    return {
      heroTitle: doc.heroTitle || PLACEHOLDER_TEXT("heroTitle"),
      heroSubtitle: doc.heroSubtitle || PLACEHOLDER_TEXT("heroSubtitle"),
      heroBackgroundUrl,
      introTitle: doc.introTitle || PLACEHOLDER_TEXT("introTitle"),
      introText: doc.introText || PLACEHOLDER_TEXT("introText"),
      ctaTitle: doc.ctaTitle || PLACEHOLDER_TEXT("ctaTitle"),
      ctaText: doc.ctaText || PLACEHOLDER_TEXT("ctaText"),
      ctaButtonLabel: doc.ctaButtonLabel || PLACEHOLDER_TEXT("ctaButtonLabel"),
      testimonials,
    }
  } catch (error) {
    console.error("❌ Error fetching testimonials page:", error)
    return getDefaultTestimonialsPage([])
  }
}

function getDefaultTestimonialsPage(testimonials: TestimonialView[]): TestimonialsPageView {
  return {
    heroTitle: PLACEHOLDER_TEXT("heroTitle"),
    heroSubtitle: PLACEHOLDER_TEXT("heroSubtitle"),
    heroBackgroundUrl: null,
    introTitle: PLACEHOLDER_TEXT("introTitle"),
    introText: PLACEHOLDER_TEXT("introText"),
    ctaTitle: PLACEHOLDER_TEXT("ctaTitle"),
    ctaText: PLACEHOLDER_TEXT("ctaText"),
    ctaButtonLabel: PLACEHOLDER_TEXT("ctaButtonLabel"),
    testimonials,
  }
}
