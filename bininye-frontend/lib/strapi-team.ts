import { strapiClient, getStrapiMediaUrl } from "@/lib/strapi-client"

export interface StrapiTeamMemberAttributes {
  name: string
  role: string | null
  bio: string | null
  email: string | null
  linkedinUrl: string | null
  order: number | null
  isFeatured: boolean | null
  image?: {
    url?: string
  } | null
}

export interface StrapiTeamMemberEntity extends StrapiTeamMemberAttributes {
  id: number
  documentId?: string
}

export interface StrapiListResponse<T> {
  data: T[]
}

export interface TeamMemberView {
  id: number
  name: string
  role: string
  bio: string
  image: string
  email?: string
  linkedinUrl?: string
  order: number
  isFeatured: boolean
}

export function mapTeamMembers(res: StrapiListResponse<StrapiTeamMemberEntity> | StrapiTeamMemberEntity[]): TeamMemberView[] {
  // Support both array directly and { data: [] } format
  const members = Array.isArray(res) ? res : res.data
  // The 'data' property of StrapiListResponse is always an array, so 'members' will never be null/undefined.
  // This check is therefore redundant and can be removed.
  // if (!members) return [];

  return members.map((entity) => {
    // Strapi 5 : image.url est direct, pas image.data.url
    const imageUrl = entity.image?.url
      ? (getStrapiMediaUrl(entity.image.url) ?? "/placeholder.svg")
      : "/placeholder.svg"

    return {
      id: entity.id,
      name: entity.name || "[Donnée non récupérée: name]",
      role: entity.role ?? "[Donnée non récupérée: role]",
      bio: entity.bio ?? "",
      image: imageUrl,
      email: entity.email ?? undefined,
      linkedinUrl: entity.linkedinUrl ?? undefined,
      order: entity.order ?? 0,
      isFeatured: Boolean(entity.isFeatured),
    }
  })
}

export function mapSingleTeamMember(entity: StrapiTeamMemberEntity): TeamMemberView {
  return mapTeamMembers([entity])[0]
}

export async function fetchAllTeamMembers() {
  const res = (await strapiClient.collection("team-members").find({
    sort: "order:asc",
    populate: ["image"],
  })) as unknown as StrapiListResponse<StrapiTeamMemberEntity>

  return mapTeamMembers(res)
}