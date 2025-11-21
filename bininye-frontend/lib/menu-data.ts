export interface MenuItem {
  title: string
  url: string
  children?: MenuItem[]
}

export const menuData: MenuItem[] = [
  {
    title: "Accueil",
    url: "/",
  },
  {
    title: "A-propos",
    url: "#",
    children: [
      { title: "Qui sommes nous ?", url: "/qui-sommes-nous" },
      { title: "Nos Domaines", url: "/nos-domaines" },
      { title: "Nos Equipes", url: "/equipes" },
    ],
  },
  {
    title: "Nos-Activités",
    url: "/activites",
  },
  {
    title: "Contribuer",
    url: "/contribuer",
  },
  {
    title: "Ressources",
    url: "#",
    children: [
      { title: "Blog", url: "/blog" },
      { title: "Médiathèque", url: "/photos-et-videos" },
      { title: "Nous rejoindre", url: "/nous-rejoindre" },
      { title: "Témoignages", url: "/temoignages" },
    ],
  },
  {
    title: "Contact",
    url: "/contact",
  },
]
