import { UnicefLogo, WHOIcon, WorldBankLogo, UnescoLogo, USAIDLogo, AfricanUnionLogo } from "@/components/partner-logos"

export function PartnersSection() {
  const partners = [
    {
      name: "UNICEF",
      Logo: UnicefLogo,
    },
    {
      name: "OMS",
      Logo: WHOIcon,
    },
    {
      name: "Banque Mondiale",
      Logo: WorldBankLogo,
    },
    {
      name: "UNESCO",
      Logo: UnescoLogo,
    },
    {
      name: "USAID",
      Logo: USAIDLogo,
    },
    {
      name: "Union Africaine",
      Logo: AfricanUnionLogo,
    },
  ]

  return (
    <section className="border-t bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">Nos Partenaires</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Nous collaborons avec des organisations de renommée mondiale pour maximiser notre impact et atteindre nos
            objectifs communs.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group flex items-center justify-center rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              {/* Replaced placeholder images with SVG component logos */}
              {partner.Logo && (
                <partner.Logo className="h-12 w-auto text-foreground opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
              )}
            </div>
          ))}
        </div>

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
