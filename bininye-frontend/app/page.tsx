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

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ValuesSection />
        <AboutSection />
        <DomainsSection />
        <EventsSection />
        <ContributeSection />
        <GallerySection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  )
}
