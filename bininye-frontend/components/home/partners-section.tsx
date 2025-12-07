import Image from "next/image"
import Link from "next/link"

interface Partner {
  documentId: string
  id: number
  name: string
  websiteUrl?: string
  logo?: {
    url: string
    alternativeText?: string
  }
}

interface PartnersSectionProps {
  title?: string
  subtitle?: string
  partners?: Partner[]
}

export function PartnersSection({
  title,
  subtitle,
  partners,
}: PartnersSectionProps) {
  const hasPartners = partners && partners.length > 0

  // Déterminer le nombre de colonnes pour centrer si peu de partenaires
  const getGridClass = (count: number) => {
    if (count <= 2) return "grid-cols-2 max-w-md"
    if (count <= 3) return "grid-cols-3 max-w-2xl"
    if (count <= 4) return "grid-cols-2 md:grid-cols-4 max-w-4xl"
    if (count <= 5) return "grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-5xl"
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
  }

  return (
    <section className="border-t bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            {title || "[Donnée non récupérée: partnersTitle]"}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {subtitle || "[Donnée non récupérée: partnersSubtitle]"}
          </p>
        </div>

        {hasPartners ? (
          <div className={`mt-16 mx-auto grid gap-8 ${getGridClass(partners.length)}`}>
            {partners.map((partner) => {
              const content = (
                <div
                  className="group flex items-center justify-center rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg cursor-pointer"
                >
                  {partner.logo?.url ? (
                    <Image
                      src={partner.logo.url}
                      alt={partner.logo.alternativeText || partner.name}
                      width={120}
                      height={48}
                      className="h-12 w-auto object-contain opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                      {partner.name}
                    </span>
                  )}
                </div>
              )

              // Si websiteUrl existe, envelopper dans un Link
              if (partner.websiteUrl) {
                return (
                  <Link
                    key={partner.documentId}
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </Link>
                )
              }

              return <div key={partner.documentId}>{content}</div>
            })}
          </div>
        ) : (
          <div className="mt-16 text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-xl">
            <p className="text-muted-foreground">[Donnée non récupérée: highlightedPartners]</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Vous souhaitez devenir partenaire ?{" "}
            <a
              href="/contact"
              className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
            >
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
