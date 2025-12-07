import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ValuesSection } from "@/components/home/values-section"
import { AboutSection } from "@/components/home/about-section"
import { DomainsSection } from "@/components/home/domains-section"
import { EventsSection } from "@/components/home/events-section"
import { ContributeSection } from "@/components/home/contribute-section"
import { GallerySection } from "@/components/home/gallery-section"
import { PartnersSection } from "@/components/home/partners-section"
import { getHomepage, getMediaUrl } from "@/lib/strapi-homepage"

export default async function HomePage() {
  // Fetch homepage data from Strapi
  const homepageData = await getHomepage()

  // Si pas de données Strapi, afficher la page avec les valeurs par défaut
  if (!homepageData) {
    console.warn("No homepage data from Strapi, using default values")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection
          title={homepageData?.heroTitle}
          subtitle={homepageData?.heroSubtitle}
          description={homepageData?.heroDescription}
          primaryCtaLabel={homepageData?.heroPrimaryCtaLabel}
          primaryCtaUrl={homepageData?.heroPrimaryCtaUrl}
          secondaryCtaLabel={homepageData?.heroSecondaryCtaLabel}
          secondaryCtaUrl={homepageData?.heroSecondaryCtaUrl}
          backgroundImageUrl={getMediaUrl(homepageData?.heroBackground)}
        />
        <ValuesSection
          title={homepageData?.valuesTitle}
          intro={homepageData?.valuesIntro}
          values={homepageData?.values}
        />
        <AboutSection
          title={homepageData?.aboutTitle}
          intro={homepageData?.aboutIntro}
          missionTitle={homepageData?.aboutMissionTitle}
          missionDescription={homepageData?.aboutMissionDescription}
          missions={homepageData?.aboutMissions}
          stats={homepageData?.aboutMainStats}
          image1Url={getMediaUrl(homepageData?.aboutImage1)}
          image2Url={getMediaUrl(homepageData?.aboutImage2)}
          ctaLabel={homepageData?.aboutCtaLabel}
          ctaUrl={homepageData?.aboutCtaUrl}
        />
        <DomainsSection
          title={homepageData?.domainsTitle}
          subtitle={homepageData?.domainsSubtitle}
          description={homepageData?.domainsDescription}
          imageUrl={getMediaUrl(homepageData?.domainsImage)}
          domains={homepageData?.highlightedDomains}
          ctaLabel={homepageData?.domainsCtaLabel}
          ctaUrl={homepageData?.domainsCtaUrl}
        />
        <EventsSection
          title={homepageData?.eventsTitle}
          subtitle={homepageData?.eventsSubtitle}
          events={homepageData?.highlightedEvents?.map((event) => ({
            ...event,
            image: event.image ? {
              url: getMediaUrl(event.image) || "",
              alternativeText: event.image.alternativeText,
            } : undefined,
          }))}
        />
        <ContributeSection
          title={homepageData?.contributeTitle}
          subtitle={homepageData?.contributeSubtitle}
          description={homepageData?.contributeDescription}
          stats={homepageData?.contributeStats}
          primaryCtaLabel={homepageData?.contributePrimaryCtaLabel}
          primaryCtaUrl={homepageData?.contributePrimaryCtaUrl}
          secondaryCtaLabel={homepageData?.contributeSecondaryCtaLabel}
          secondaryCtaUrl={homepageData?.contributeSecondaryCtaUrl}
        />
        <GallerySection
          title={homepageData?.galleryTitle}
          subtitle={homepageData?.gallerySubtitle}
          media={homepageData?.galleryHighlightMedia?.map((item) => ({
            ...item,
            thumbnail: item.thumbnail ? {
              url: getMediaUrl(item.thumbnail) || "",
              alternativeText: item.thumbnail.alternativeText,
            } : undefined,
          }))}
        />
        <PartnersSection
          title={homepageData?.partnersTitle}
          subtitle={homepageData?.partnersSubtitle}
          partners={homepageData?.highlightedPartners?.map((partner) => ({
            ...partner,
            logo: partner.logo ? {
              url: getMediaUrl(partner.logo) || "",
              alternativeText: partner.logo.alternativeText,
            } : undefined,
          }))}
        />
      </main>
      <Footer />
    </div>
  )
}
