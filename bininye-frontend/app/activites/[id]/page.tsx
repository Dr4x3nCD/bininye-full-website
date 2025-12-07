import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, MapPin, Users, Tag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { strapiClient } from "@/lib/strapi-client"
import {
  mapActivityDetail,
  mapStrapiActivities,
  type StrapiActivityEntity,
  type StrapiListResponse,
  type ActivityDetail,
} from "@/lib/strapi-activities"
import { ActivityDetailClient } from "@/components/activities/activity-detail-client"

export async function generateStaticParams() {
  const res = (await strapiClient.collection("activities").find({
    fields: ["slug"],
  })) as StrapiListResponse<StrapiActivityEntity>

  return res.data.map((activity) => ({ id: activity.slug }))
}

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const slug = id

  const res = (await strapiClient.collection("activities").find({
    filters: { slug: { $eq: slug } },
    populate: ["image", "category", "tags", "objectives", "programItems", "domain"],
  })) as StrapiListResponse<StrapiActivityEntity>

  if (!res.data.length) {
    notFound()
  }

  const activity: ActivityDetail = mapActivityDetail(res.data[0])

  const relatedRes = (await strapiClient.collection("activities").find({
    filters: {
      slug: { $ne: slug },
      $or: [
        { category: { name: { $eq: activity.category } } },
        { location: { $eq: activity.location } },
      ],
    },
    populate: ["image", "category"],
    sort: "date:desc",
  })) as StrapiListResponse<StrapiActivityEntity>

  const relatedActivities = mapStrapiActivities(relatedRes).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section avec image */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <img
            src={activity.image || "/placeholder.svg"}
            alt={activity.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12 lg:px-8">
              <Button asChild variant="ghost" size="sm" className="mb-6 text-white hover:bg-white/20">
                <Link href="/activites">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour aux activités
                </Link>
              </Button>

              <div className="max-w-4xl">
                <div className="mb-4 flex flex-wrap gap-3">
                  <span
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold ${activity.status === "à venir"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {activity.status === "à venir" ? "À venir" : "Passé"}
                  </span>
                  {activity.category && (
                    <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
                      {activity.category}
                    </span>
                  )}
                </div>

                <h1 className="font-serif mb-6 text-balance text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  {activity.title}
                </h1>

                <div className="flex flex-wrap gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">{activity.date || "[Donnée non récupérée: date]"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{activity.location || "[Donnée non récupérée: location]"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span className="font-medium">{activity.participants} participants</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contenu principal - composant client pour le partage */}
        <ActivityDetailClient activity={activity} relatedActivities={relatedActivities} />
      </main>
      <Footer />
    </div>
  )
}
