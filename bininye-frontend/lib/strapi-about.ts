import { strapiClient, getStrapiMediaUrl } from "@/lib/strapi-client"
import { mapTeamMembers, type StrapiTeamMemberEntity, type TeamMemberView } from "@/lib/strapi-team"

export interface StrapiStatItem {
  number: string
  label: string
}

export interface StrapiFaqItem {
  question: string
  answer: string
}

export interface StrapiValueItem {
  title: string
  iconKey?: string | null
}

// Strapi 5 : media direct avec url
export interface StrapiMedia {
  url?: string
  alternativeText?: string
}

// Strapi 5 Document format - fields are at the top level
export interface StrapiAboutPageDocument {
  documentId: string
  heroTitle: string | null
  heroSubtitle: string | null
  heroBackground?: StrapiMedia | null

  storyTitle: string | null
  storyRichText: string | null
  storyImage?: StrapiMedia | null

  missionTitle: string | null
  missionText: string | null

  visionTitle: string | null
  visionText: string | null

  valuesTitle: string | null
  values: StrapiValueItem[]

  achievementsTitle: string | null
  achievementsSubtitle: string | null
  achievementsStats: StrapiStatItem[]

  teamSectionTitle: string | null
  teamSectionSubtitle: string | null
  featuredTeamMembers: StrapiTeamMemberEntity[] | null  // Strapi 5: tableau direct

  faqSectionTitle: string | null
  faqSectionSubtitle: string | null
  faqs: StrapiFaqItem[]
}

// Strapi 5 Document Response format
export interface DocumentResponse<T> {
  data: T | null
  meta?: Record<string, unknown>
}

export interface AboutPageView {
  heroTitle: string
  heroSubtitle: string
  heroBackgroundUrl: string | null

  storyTitle: string
  storyHtml: string
  storyImageUrl: string | null

  missionTitle: string
  missionHtml: string

  visionTitle: string
  visionHtml: string

  valuesTitle: string
  values: StrapiValueItem[]

  achievementsTitle: string
  achievementsSubtitle: string
  achievementsStats: StrapiStatItem[]

  teamSectionTitle: string
  teamSectionSubtitle: string
  featuredTeamMembers: TeamMemberView[]

  faqSectionTitle: string
  faqSectionSubtitle: string
  faqs: StrapiFaqItem[]
}

// Strapi 5 : media.url est direct
function getMediaUrl(media?: StrapiMedia | null): string | null {
  if (!media?.url) return null
  return getStrapiMediaUrl(media.url)
}

export async function fetchAboutPage(): Promise<AboutPageView> {
  const res = (await strapiClient.single("about-page").find({
    populate: [
      "heroBackground",
      "storyImage",
      "values",
      "achievementsStats",
      "faqs",
      "featuredTeamMembers.image",
    ],
  })) as unknown as DocumentResponse<StrapiAboutPageDocument>

  // Placeholder constants
  const PLACEHOLDER_TEXT = (field: string) => `[Donnée non récupérée: ${field}]`
  const PLACEHOLDER_IMAGE = "/placeholder.svg"

  // Si le Single Type n'est pas encore créé dans l'admin
  if (!res.data) {
    return {
      heroTitle: PLACEHOLDER_TEXT("heroTitle"),
      heroSubtitle: PLACEHOLDER_TEXT("heroSubtitle"),
      heroBackgroundUrl: null,

      storyTitle: PLACEHOLDER_TEXT("storyTitle"),
      storyHtml: PLACEHOLDER_TEXT("storyRichText"),
      storyImageUrl: null,

      missionTitle: PLACEHOLDER_TEXT("missionTitle"),
      missionHtml: PLACEHOLDER_TEXT("missionText"),

      visionTitle: PLACEHOLDER_TEXT("visionTitle"),
      visionHtml: PLACEHOLDER_TEXT("visionText"),

      valuesTitle: PLACEHOLDER_TEXT("valuesTitle"),
      values: [],

      achievementsTitle: PLACEHOLDER_TEXT("achievementsTitle"),
      achievementsSubtitle: PLACEHOLDER_TEXT("achievementsSubtitle"),
      achievementsStats: [],

      teamSectionTitle: PLACEHOLDER_TEXT("teamSectionTitle"),
      teamSectionSubtitle: PLACEHOLDER_TEXT("teamSectionSubtitle"),
      featuredTeamMembers: [],

      faqSectionTitle: PLACEHOLDER_TEXT("faqSectionTitle"),
      faqSectionSubtitle: PLACEHOLDER_TEXT("faqSectionSubtitle"),
      faqs: [],
    }
  }

  const doc = res.data

  const heroBackgroundUrl = getMediaUrl(doc.heroBackground)
  const storyImageUrl = getMediaUrl(doc.storyImage)

  // Strapi 5 : featuredTeamMembers est un tableau direct, pas { data: [] }
  const featuredTeam = doc.featuredTeamMembers
    ? mapTeamMembers(doc.featuredTeamMembers)
    : []

  return {
    heroTitle: doc.heroTitle || PLACEHOLDER_TEXT("heroTitle"),
    heroSubtitle: doc.heroSubtitle || PLACEHOLDER_TEXT("heroSubtitle"),
    heroBackgroundUrl,

    storyTitle: doc.storyTitle || PLACEHOLDER_TEXT("storyTitle"),
    storyHtml: doc.storyRichText || PLACEHOLDER_TEXT("storyRichText"),
    storyImageUrl,

    missionTitle: doc.missionTitle || PLACEHOLDER_TEXT("missionTitle"),
    missionHtml: doc.missionText || PLACEHOLDER_TEXT("missionText"),

    visionTitle: doc.visionTitle || PLACEHOLDER_TEXT("visionTitle"),
    visionHtml: doc.visionText || PLACEHOLDER_TEXT("visionText"),

    valuesTitle: doc.valuesTitle || PLACEHOLDER_TEXT("valuesTitle"),
    values: doc.values ?? [],

    achievementsTitle: doc.achievementsTitle || PLACEHOLDER_TEXT("achievementsTitle"),
    achievementsSubtitle: doc.achievementsSubtitle || PLACEHOLDER_TEXT("achievementsSubtitle"),
    achievementsStats: doc.achievementsStats ?? [],

    teamSectionTitle: doc.teamSectionTitle || PLACEHOLDER_TEXT("teamSectionTitle"),
    teamSectionSubtitle: doc.teamSectionSubtitle || PLACEHOLDER_TEXT("teamSectionSubtitle"),
    featuredTeamMembers: featuredTeam,

    faqSectionTitle: doc.faqSectionTitle || PLACEHOLDER_TEXT("faqSectionTitle"),
    faqSectionSubtitle: doc.faqSectionSubtitle || PLACEHOLDER_TEXT("faqSectionSubtitle"),
    faqs: doc.faqs ?? [],
  }
}
