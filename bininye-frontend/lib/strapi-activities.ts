import type { Activity } from "@/components/activities/activities-page-client"

export interface StrapiMedia {
  data?: {
    url?: string
  } | null
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
    data?: {
      name?: string
    } | null
  }
  image?: StrapiMedia | null
  tags?: {
    label?: string | null
  }[] | null
}

export type StrapiActivityEntity = StrapiActivityAttributes & { id: number }

export interface StrapiListResponse<T> {
  data: T[]
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

    const categoryName = attributes.category?.data?.name ?? ""

    const tags = (attributes.tags ?? [])
      .map((t) => t.label ?? "")
      .filter((t): t is string => Boolean(t))

    const imageUrl = attributes.image?.data?.url ?? "/placeholder.svg"

    return {
      id,
      slug: attributes.slug,
      title: attributes.title,
      date: dateLabel,
      dateObj,
      location: attributes.location ?? "",
      category: categoryName,
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
