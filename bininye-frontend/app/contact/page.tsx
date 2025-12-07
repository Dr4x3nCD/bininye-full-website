import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroContact } from "@/components/contact/hero-contact"
import { ContactOptions } from "@/components/contact/contact-options"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactMap } from "@/components/contact/contact-map"
import { ContactFAQ } from "@/components/contact/contact-faq"
import { fetchContactPage } from "@/lib/strapi-contact-page"

export default async function ContactPage() {
  const data = await fetchContactPage()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroContact data={{
          title: data.heroTitle,
          subtitle: data.heroSubtitle,
          backgroundUrl: data.heroBackgroundUrl,
        }} />
        <ContactOptions data={{ options: data.options }} />

        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Left Column: Form */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>

              {/* Right Column: Info */}
              <div className="lg:col-span-5">
                <ContactInfo data={{ contactInfo: data.contactInfo }} />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Full Width */}
        <ContactFAQ data={{ faq: data.faq }} />

        {/* Map Section */}
        <section className="py-12 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-8">
            <ContactMap data={{ mapEmbedUrl: data.mapEmbedUrl }} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
