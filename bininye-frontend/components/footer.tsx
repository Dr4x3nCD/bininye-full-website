import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { getGlobalSettings, type GlobalSettings } from "@/lib/strapi-global-settings"

interface FooterProps {
  settings?: GlobalSettings
}

export async function Footer({ settings: propSettings }: FooterProps) {
  // Fetch settings if not provided
  const settings = propSettings ?? await getGlobalSettings()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* À propos */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              {settings.logoUrl ? (
                <Image
                  src={settings.logoUrl}
                  alt={settings.logoAlt || settings.siteName}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-lg object-contain bg-white"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <span className="text-lg font-bold text-secondary-foreground">BY</span>
                </div>
              )}
              <span className="text-lg font-bold">{settings.siteName}</span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/80">
              {settings.footerText || settings.siteDescription || "[Description non récupérée]"}
            </p>
            <div className="mt-6 flex gap-3">
              {settings.facebookUrl && (
                <Link
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
              )}
              {settings.twitterUrl && (
                <Link
                  href={settings.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
              )}
              {settings.instagramUrl && (
                <Link
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
              )}
              {settings.linkedinUrl && (
                <Link
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              )}
              {settings.youtubeUrl && (
                <Link
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </Link>
              )}
              {/* Fallback si aucun réseau social */}
              {!settings.facebookUrl && !settings.twitterUrl && !settings.instagramUrl && !settings.linkedinUrl && !settings.youtubeUrl && (
                <span className="text-sm text-primary-foreground/50">[Réseaux sociaux non configurés]</span>
              )}
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="mb-6 text-base font-bold">Liens rapides</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/qui-sommes-nous" className="transition-colors hover:text-secondary">
                  Qui sommes nous ?
                </Link>
              </li>
              <li>
                <Link href="/nos-domaines" className="transition-colors hover:text-secondary">
                  Nos Domaines
                </Link>
              </li>
              <li>
                <Link href="/activites" className="transition-colors hover:text-secondary">
                  Nos Activités
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-secondary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/nous-rejoindre" className="transition-colors hover:text-secondary">
                  Nous rejoindre
                </Link>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="mb-6 text-base font-bold">Ressources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/photos-et-videos" className="transition-colors hover:text-secondary">
                  Médiathèque
                </Link>
              </li>
              <li>
                <Link href="/temoignages" className="transition-colors hover:text-secondary">
                  Témoignages
                </Link>
              </li>
              <li>
                <Link href="/contribuer" className="transition-colors hover:text-secondary">
                  Contribuer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-secondary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-base font-bold">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                <span className="text-primary-foreground/90">
                  {settings.address || "[Adresse non récupérée]"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-secondary" />
                <span className="text-primary-foreground/90">
                  {settings.contactPhone || "[Téléphone non récupéré]"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-secondary" />
                <span className="text-primary-foreground/90">
                  {settings.contactEmail || "[Email non récupéré]"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-primary-foreground/70 sm:flex-row">
            <p>&copy; {new Date().getFullYear()} {settings.copyrightText || settings.siteName}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/politique-confidentialite" className="transition-colors hover:text-secondary">
                Politique de confidentialité
              </Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/politique-protection-donnees" className="transition-colors hover:text-secondary">
                Protection des données
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
