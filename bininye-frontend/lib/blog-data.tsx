export const blogCategories = [
  "Tous",
  "Nutrition & Santé",
  "Éducation & Savoirs",
  "Autonomisation des femmes",
  "Jeunesse & Leadership",
  "Agriculture & Société",
  "Gouvernance & Développement",
]

export const blogPosts = [
  {
    id: 1,
    title: "L'importance de la nutrition communautaire dans le développement durable",
    excerpt:
      "Une analyse approfondie sur la manière dont une alimentation équilibrée peut transformer des communautés entières et créer un impact durable sur plusieurs générations.",
    content: `
      <h2>Une fondation pour l'avenir</h2>
      <p>La nutrition n'est pas seulement une question de santé individuelle ; c'est le fondement même du développement communautaire. Lorsque les enfants ont accès à une alimentation nutritive, leurs capacités cognitives s'améliorent, leur fréquentation scolaire augmente et leur potentiel futur s'élargit considérablement.</p>
      
      <p>Dans nos programmes à travers la Côte d'Ivoire, nous avons observé une corrélation directe entre la sécurité alimentaire et la vitalité économique locale. Les communautés qui investissent dans la nutrition, via des jardins communautaires et des programmes d'éducation, voient une réduction drastique des maladies évitables.</p>

      <blockquote>
        "Investir dans la nutrition, c'est investir dans le capital humain de demain. C'est la pierre angulaire de toute société prospère."
      </blockquote>

      <h2>L'approche de Binin Ye</h2>
      <p>Notre stratégie repose sur trois piliers essentiels :</p>
      <ul>
        <li><strong>Éducation :</strong> Sensibiliser les familles aux valeurs nutritionnelles des produits locaux.</li>
        <li><strong>Production :</strong> Encourager l'agriculture vivrière diversifiée.</li>
        <li><strong>Suivi :</strong> Assurer un monitoring régulier de la croissance des enfants de moins de 5 ans.</li>
      </ul>

      <p>Cette approche holistique permet non seulement de traiter la malnutrition, mais aussi de prévenir sa réapparition en autonomisant les ménages.</p>
    `,
    author: "Marie Kouassi",
    role: "Nutritionniste",
    date: "12 Décembre 2024",
    category: "Nutrition & Santé",
    image: "/nutrition-community-africa.jpg",
    readTime: "5 min",
    featured: true,
  },
  {
    id: 2,
    title: "Autonomisation des femmes : Témoignages de réussite",
    excerpt:
      "Rencontre avec des femmes inspirantes qui ont transformé leur destin grâce à l'entrepreneuriat. Des récits de courage et de résilience.",
    content: `
      <h2>Briser les barrières</h2>
      <p>L'autonomisation économique des femmes est l'un des leviers les plus puissants pour éradiquer la pauvreté. Quand une femme gagne sa vie, elle réinvestit 90% de ses revenus dans sa famille et sa communauté.</p>

      <h2>L'histoire d'Awa</h2>
      <p>Awa, mère de trois enfants, a commencé avec un micro-crédit de 50.000 FCFA. Aujourd'hui, elle dirige une coopérative de transformation de manioc qui emploie 12 autres femmes du village.</p>

      <blockquote>
        "Au début, on me disait que ce n'était pas ma place. Aujourd'hui, ces mêmes personnes viennent me demander conseil pour leurs propres affaires."
      </blockquote>

      <p>Son parcours illustre parfaitement l'effet multiplicateur de l'entrepreneuriat féminin. Non seulement elle a sorti sa famille de la précarité, mais elle a aussi inspiré toute une génération de jeunes filles dans sa localité.</p>
    `,
    author: "Aminata Diallo",
    role: "Journaliste",
    date: "5 Décembre 2024",
    category: "Autonomisation des femmes",
    image: "/african-women-entrepreneurs.jpg",
    readTime: "7 min",
  },
  {
    id: 3,
    title: "La gouvernance locale : Un pilier du développement",
    excerpt:
      "Pourquoi la transparence et la participation citoyenne sont essentielles pour la pérennité des projets de développement locaux.",
    content: `
      <h2>La démocratie participative en action</h2>
      <p>Le développement ne se décrète pas d'en haut ; il se construit à la base. La gouvernance locale efficace nécessite une implication active de tous les citoyens, des chefs traditionnels aux associations de jeunes.</p>
      
      <p>La transparence dans la gestion des ressources communales crée un climat de confiance indispensable. Sans cette confiance, même les projets les mieux financés risquent l'échec.</p>

      <h2>Les outils de la transparence</h2>
      <p>Nous encourageons l'utilisation de budgets participatifs et de conseils de quartier ouverts. Ces mécanismes permettent à chacun de faire entendre sa voix et de comprendre les arbitrages nécessaires.</p>
    `,
    author: "Jean-Baptiste Touré",
    role: "Expert Gouvernance",
    date: "28 Novembre 2024",
    category: "Gouvernance & Développement",
    image: "/community-meeting-africa.jpg",
    readTime: "6 min",
  },
  {
    id: 4,
    title: "Éducation et santé : Deux piliers indissociables",
    excerpt:
      "Comment l'accès à l'éducation améliore les indicateurs de santé publique et vice-versa. Une perspective croisée.",
    content: `
      <h2>Un cercle vertueux</h2>
      <p>L'école est souvent le premier lieu de dépistage des problèmes de santé chez l'enfant. Inversement, un enfant en bonne santé apprend mieux et plus vite.</p>

      <p>Nos programmes intègrent systématiquement ces deux volets : des cantines scolaires équilibrées et des visites médicales régulières au sein même des établissements.</p>
    `,
    author: "Dr. Konan Yves",
    role: "Médecin",
    date: "20 Novembre 2024",
    category: "Éducation & Savoirs",
    image: "/education-health-africa.jpg",
    readTime: "8 min",
  },
  {
    id: 5,
    title: "Les jeunes, acteurs du changement social",
    excerpt:
      "Portrait d'une génération qui refuse le statu quo et s'engage pour transformer son environnement immédiat.",
    content: `
      <h2>L'énergie du renouveau</h2>
      <p>L'Afrique est le continent le plus jeune du monde. Cette jeunesse n'est pas un problème à résoudre, mais une opportunité à saisir.</p>

      <p>À travers le leadership associatif, l'innovation technologique et l'art, les jeunes Ivoiriens redéfinissent les contours de leur avenir.</p>
    `,
    author: "Kouadio N'Guessan",
    role: "Sociologue",
    date: "13 Novembre 2024",
    category: "Jeunesse & Leadership",
    image: "/young-african-leaders.jpg",
    readTime: "5 min",
  },
  {
    id: 6,
    title: "Agriculture durable : Vers la sécurité alimentaire",
    excerpt:
      "Enquête sur les nouvelles pratiques agricoles qui permettent de concilier productivité et respect de l'environnement.",
    content: `
      <h2>Produire mieux pour nourrir plus</h2>
      <p>L'agroécologie n'est pas un retour en arrière, c'est l'agriculture du futur. En préservant les sols et la biodiversité, nous garantissons la sécurité alimentaire sur le long terme.</p>

      <p>Les techniques comme l'association de cultures et le compostage permettent d'augmenter les rendements sans dépendre d'intrants chimiques coûteux et nocifs.</p>
    `,
    author: "Ibrahim Koné",
    role: "Agronome",
    date: "6 Novembre 2024",
    category: "Agriculture & Société",
    image: "/sustainable-agriculture-africa.jpg",
    readTime: "6 min",
  },
]

export const rubrics = [
  {
    title: "Développement durable",
    description: "Analyses sur l'écologie et l'avenir",
    image: "/sustainable-development.png",
    link: "#",
  },
  {
    title: "Société & Inclusion",
    description: "Regards sur le vivre-ensemble",
    image: "/community-inclusion.jpg",
    link: "#",
  },
  {
    title: "Opinion & Témoignages",
    description: "La parole aux acteurs de terrain",
    image: "/african-portrait.jpg",
    link: "#",
  },
  {
    title: "Analyses & Recherches",
    description: "Données et études d'impact",
    image: "/data-research.jpg",
    link: "#",
  },
]

export const mostRead = [
  {
    id: 1,
    title: "Comment l'éducation des filles change le monde",
    category: "Éducation & Savoirs",
    date: "15 Oct 2024",
  },
  {
    id: 2,
    title: "5 mythes sur l'aide humanitaire",
    category: "Société & Inclusion",
    date: "22 Oct 2024",
  },
  {
    id: 3,
    title: "L'impact du micro-crédit en zone rurale",
    category: "Autonomisation des femmes",
    date: "01 Nov 2024",
  },
]
