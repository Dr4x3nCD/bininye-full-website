import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { fetchGalleryPage } from "@/lib/strapi-gallery"
import { MediaGallery } from "@/components/gallery/media-gallery"

export default async function MediathequePage() {
  const data = await fetchGalleryPage()
  const heroBackground =
    data.heroBackgroundUrl || "/photographer-camera-filming-africa-community-event.jpg"
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
              alt="Médiathèque background"
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

        {/* Galerie */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <MediaGallery items={data.items} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
