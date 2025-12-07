import { ActivitiesPageClient } from "@/components/activities/activities-page-client"
import { strapiClient } from "@/lib/strapi-client"
import {
  mapStrapiActivities,
  type StrapiActivityEntity,
  type StrapiListResponse,
} from "@/lib/strapi-activities"

export default async function ActivitesPage() {
  const res = (await strapiClient.collection("activities").find({
    populate: ["image", "domain", "category", "tags"],
    sort: "date:desc",
  })) as unknown as StrapiListResponse<StrapiActivityEntity>

  const activities = mapStrapiActivities(res)

  return <ActivitiesPageClient activities={activities} />
}
