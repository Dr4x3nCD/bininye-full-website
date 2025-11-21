export interface Activity {
  id: number
  title: string
  date: string
  dateObj: Date
  location: string
  category: string
  participants: number
  image: string
  description: string
  tags: string[]
  status: "passé" | "à venir"
}

export const activities: Activity[] = [
  {
    id: 1,
    title: "Binin Yé Forme les Leaders Religieux et Soutient l'Épargne des Jeunes",
    date: "15 Novembre 2024",
    dateObj: new Date("2024-11-15"),
    location: "Abidjan",
    category: "Formation",
    participants: 45,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Une session de formation intensive destinée aux leaders religieux pour renforcer leur rôle dans le développement communautaire et l'accompagnement des jeunes dans leurs projets d'épargne.",
    tags: ["Leadership", "Jeunesse", "Épargne"],
    status: "passé",
  },
  {
    id: 2,
    title: "Renforcement de Capacité des Adolescents et des Jeunes",
    date: "8 Novembre 2024",
    dateObj: new Date("2024-11-08"),
    location: "Bouaké",
    category: "Atelier",
    participants: 60,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Programme de renforcement des compétences de vie et d'entrepreneuriat pour les adolescents et jeunes, visant à les préparer à devenir des acteurs de changement dans leurs communautés.",
    tags: ["Jeunesse", "Compétences", "Entrepreneuriat"],
    status: "passé",
  },
  {
    id: 3,
    title: "Campagne de Sensibilisation Nutritionnelle",
    date: "15 Janvier 2025",
    dateObj: new Date("2025-01-15"),
    location: "Yamoussoukro",
    category: "Sensibilisation",
    participants: 120,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Grande campagne de sensibilisation sur l'importance de la nutrition équilibrée et des bonnes pratiques alimentaires pour les familles et les enfants.",
    tags: ["Nutrition", "Santé", "Communauté"],
    status: "à venir",
  },
  {
    id: 4,
    title: "Formation en Gouvernance Locale",
    date: "22 Janvier 2025",
    dateObj: new Date("2025-01-22"),
    location: "Korhogo",
    category: "Formation",
    participants: 35,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Session de formation pour les acteurs locaux sur les principes de bonne gouvernance, la transparence et la participation citoyenne dans la gestion des affaires communautaires.",
    tags: ["Gouvernance", "Leadership", "Participation"],
    status: "à venir",
  },
  {
    id: 5,
    title: "Journée Portes Ouvertes sur les Droits des Femmes",
    date: "8 Mars 2025",
    dateObj: new Date("2025-03-08"),
    location: "Abidjan",
    category: "Événement",
    participants: 200,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Événement communautaire pour sensibiliser sur les droits des femmes, l'égalité des genres et l'autonomisation économique des femmes dans nos communautés.",
    tags: ["Femmes", "Droits", "Égalité"],
    status: "à venir",
  },
  {
    id: 6,
    title: "Atelier de Jardinage Communautaire",
    date: "3 Septembre 2024",
    dateObj: new Date("2024-09-03"),
    location: "San-Pédro",
    category: "Atelier",
    participants: 50,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Atelier pratique sur les techniques de jardinage durable et la création de jardins communautaires pour améliorer la sécurité alimentaire locale.",
    tags: ["Agriculture", "Durabilité", "Communauté"],
    status: "passé",
  },
  {
    id: 7,
    title: "Conférence sur l'Éducation Inclusive",
    date: "20 Février 2025",
    dateObj: new Date("2025-02-20"),
    location: "Abidjan",
    category: "Conférence",
    participants: 150,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Conférence nationale sur l'importance de l'éducation inclusive et les stratégies pour garantir l'accès à l'éducation pour tous les enfants, y compris ceux en situation de handicap.",
    tags: ["Éducation", "Inclusion", "Enfants"],
    status: "à venir",
  },
  {
    id: 8,
    title: "Campagne de Reboisement Communautaire",
    date: "5 Juin 2025",
    dateObj: new Date("2025-06-05"),
    location: "Man",
    category: "Environnement",
    participants: 80,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Action de reboisement avec les communautés locales pour lutter contre la déforestation et sensibiliser à l'importance de la protection de l'environnement.",
    tags: ["Environnement", "Reboisement", "Climat"],
    status: "à venir",
  },
]

export const categories = [
  "Toutes",
  "Formation",
  "Atelier",
  "Sensibilisation",
  "Événement",
  "Conférence",
  "Environnement",
]
export const locations = ["Toutes", "Abidjan", "Bouaké", "Yamoussoukro", "Korhogo", "San-Pédro", "Man"]
export const statuses = ["Tous", "À venir", "Passés"]
