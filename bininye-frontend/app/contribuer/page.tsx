import { fetchContributePage } from "@/lib/strapi-contribute-page"
import ContribuerPageClient from "@/components/contribuer-page-client"

export default async function ContribuerPage() {
  const data = await fetchContributePage()
  return <ContribuerPageClient data={data} />
}
