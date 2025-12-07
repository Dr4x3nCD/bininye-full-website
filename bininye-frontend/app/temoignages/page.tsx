import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { fetchTestimonialsPage } from "@/lib/strapi-testimonials"
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid"

export default async function TemoignagesPage() {
  const data = await fetchTestimonialsPage()
  const heroBackground =
    data.heroBackgroundUrl || "/happy-african-people-smiling-community-success-sto.jpg"
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden py-16 lg:py-24">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroBackground}
              alt="Témoignages background"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-balance text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                {data.heroTitle}
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-white/90 drop-shadow-md md:text-xl">
                {data.heroSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-balance text-3xl font-bold md:text-4xl">{data.introTitle}</h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {data.introText}
              </p>
            </div>
          </div>
        </section>

        {/* Témoignages avec pagination */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <TestimonialsGrid testimonials={data.testimonials} />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-3xl bg-primary p-8 text-center text-primary-foreground lg:p-12">
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">{data.ctaTitle}</h2>
              <p className="mb-8 text-pretty leading-relaxed">
                {data.ctaText}
              </p>
              <button className="rounded-lg bg-white px-8 py-3 font-semibold text-primary transition-colors hover:bg-white/90">
                {data.ctaButtonLabel}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
