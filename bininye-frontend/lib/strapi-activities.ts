import { strapiClient, getStrapiMediaUrl } from "@/lib/strapi-client"
import type { Activity } from "@/components/activities/activities-page-client"
export type { Activity }

export interface ObjectiveItem {
  text: string
}

export interface ProgramItem {
  time: string
  title: string
}

export interface StrapiActivityAttributes {
  title: string
  slug: string
  date: string | null
  location: string | null
  description: string | null
  participantsLabel: string | null
  activityStatus: "upcoming" | "past" | null
  category?: {
    name?: string
  } | null
  domain?: {
    slug?: string
    title?: string
  } | null
  image?: {
    url?: string
    alternativeText?: string
  } | null
  tags?: {
    label?: string | null
  }[] | null
  objectives?: ObjectiveItem[] | null
  programItems?: ProgramItem[] | null
}

export type StrapiActivityEntity = StrapiActivityAttributes & {
  id: number
  documentId?: string
}

export interface StrapiListResponse<T> {
  data: T[]
}

// Interface étendue pour la page de détail
export interface ActivityDetail extends Activity {
  objectives: string[]
  programItems: { time: string; title: string }[]
}

export function mapStrapiActivities(response: StrapiListResponse<StrapiActivityEntity>): Activity[] {
  return response.data.map(({ id, ...attributes }) => {
    const dateIso = attributes.date ?? ""
    const dateObj = dateIso ? new Date(dateIso) : new Date()
    const dateLabel = dateIso
      ? dateObj.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
      : ""

    const participantsLabel = attributes.participantsLabel ?? "0"
    const participants = parseInt(participantsLabel, 10) || 0

    const status: Activity["status"] = attributes.activityStatus === "upcoming" ? "à venir" : "passé"

    // Strapi 5 : category est direct, pas category.data.name
    const categoryName = attributes.category?.name ?? ""

    const tags = (attributes.tags ?? [])
      .map((t) => t.label ?? "")
      .filter((t): t is string => Boolean(t))

    // Strapi 5 : image.url est direct
    const imageUrl = attributes.image?.url
      ? (getStrapiMediaUrl(attributes.image.url) ?? "/placeholder.svg")
      : "/placeholder.svg"

    return {
      id,
      slug: attributes.slug,
      title: attributes.title,
      date: dateLabel,
      dateObj,
      location: attributes.location ?? "",
      category: categoryName,
      domain: attributes.domain?.slug ?? null,
      domainTitle: attributes.domain?.title ?? null,
      participants,
      image: imageUrl,
      description: attributes.description ?? "",
      tags,
      status,
    }
  })
}

export function mapSingleActivity(entity: StrapiActivityEntity): Activity {
  return mapStrapiActivities({ data: [entity] })[0]
}

// Mapper pour la page de détail avec objectives et programItems
export function mapActivityDetail(entity: StrapiActivityEntity): ActivityDetail {
  const base = mapSingleActivity(entity)

  const objectives = (entity.objectives ?? [])
    .map((o) => o.text)
    .filter((t): t is string => Boolean(t))

  const programItems = (entity.programItems ?? [])
    .filter((p) => p.time && p.title)
    .map((p) => ({ time: p.time, title: p.title }))

  return {
    ...base,
    objectives,
    programItems,
  }
}

// Récupérer les activités par domaine
export async function fetchActivitiesByDomain(domainSlug: string, limit: number = 4): Promise<Activity[]> {
  const res = (await strapiClient.collection("activities").find({
    filters: { domain: { slug: { $eq: domainSlug } } },
    populate: ["image", "category", "domain", "tags"],
    pagination: { page: 1, pageSize: limit },
    sort: "date:desc",
  })) as unknown as StrapiListResponse<StrapiActivityEntity>

  return mapStrapiActivities(res)
}

// Récupérer toutes les activités
export async function fetchAllActivities(): Promise<Activity[]> {
  const res = (await strapiClient.collection("activities").find({
    populate: ["image", "category", "domain", "tags"],
    sort: "date:desc",
  })) as unknown as StrapiListResponse<StrapiActivityEntity>

  return mapStrapiActivities(res)
}

