import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* À propos */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <span className="text-lg font-bold text-secondary-foreground">BY</span>
              </div>
              <span className="text-lg font-bold">BININ YE</span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/80">
              Une Organisation Non Gouvernementale engagée dans la création d'un avenir durable pour tous.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-110"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-110"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-110"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-110"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
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
                <span className="text-primary-foreground/90">Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-secondary" />
                <span className="text-primary-foreground/90">+225 07 02 03 97</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-secondary" />
                <span className="text-primary-foreground/90">contact@bininye.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
          <p>&copy; {new Date().getFullYear()} ONG Binin Ye. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
