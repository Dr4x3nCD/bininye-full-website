import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { fetchJoinPage } from "@/lib/strapi-join-page"
import { HeroJoin } from "@/components/join/hero-join"
import { WhyJoin } from "@/components/join/why-join"
import { OpportunitiesList } from "@/components/join/opportunities-list"
import { VolunteersGrid } from "@/components/join/volunteers-grid"
import { ProcessSteps } from "@/components/join/process-steps"
import { ApplicationForm } from "@/components/join/application-form"

export default async function NousRejoindre() {
  const data = await fetchJoinPage()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroJoin data={{
          title: data.heroTitle,
          subtitle: data.heroSubtitle,
          backgroundUrl: data.heroBackgroundUrl,
          primaryCtaLabel: data.heroPrimaryCtaLabel,
          secondaryCtaLabel: data.heroSecondaryCtaLabel,
          badgeText: data.heroBadgeText,
          stats: data.heroStats,
        }} />
        <WhyJoin data={{
          title: data.whyJoinTitle,
          intro: data.whyJoinIntro,
          benefits: data.benefits,
          testimonial: data.microTestimonial,
        }} />
        <OpportunitiesList data={{
          title: data.opportunitiesSectionTitle,
          subtitle: data.opportunitiesSectionSubtitle,
          opportunities: data.opportunities,
        }} />
        <VolunteersGrid data={{
          title: data.volunteersSectionTitle,
          subtitle: data.volunteersSectionSubtitle,
          volunteers: data.featuredVolunteers,
        }} />
        <ProcessSteps data={{
          title: data.processTitle,
          subtitle: data.processSubtitle,
          steps: data.steps,
        }} />
        <ApplicationForm data={{
          title: data.applicationIntroTitle,
          text: data.applicationIntroText,
        }} />
      </main>
      <Footer />
    </div>
  )
}
