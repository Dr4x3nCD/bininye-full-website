# SUIVI D'INTÉGRATION DES PAGES - Strapi → Next.js

Ce document trace le statut d'intégration de chaque page du site avec Strapi.

**Légende** :
- ✅ **Intégré** : La page consomme entièrement les données Strapi
- 🔄 **Partiel** : Certaines données viennent de Strapi, d'autres sont statiques
- ❌ **Non intégré** : La page utilise des données statiques
- 📝 **À créer** : Le content-type Strapi n'existe pas encore

---

## Single Types (Pages statiques)

| Page | Route | Content-type Strapi | Fichier lib | Statut | Notes |
|------|-------|---------------------|-------------|--------|-------|
| Accueil | `/` | `homepage` | `strapi-homepage.ts` | ✅ Intégré | Tous les champs intégrés : Hero, Values, About (missions+images), Domains, Events, Contribute (stats+CTAs), Gallery, Partners. |
| Qui sommes-nous | `/qui-sommes-nous` | `about-page` | `strapi-about.ts` | ✅ Intégré | Tous les champs intégrés : Hero, Story, Mission, Vision, Values, Achievements, Team, FAQ. |
| Équipes | `/equipes` | `teams-page` | `strapi-teams-page.ts` | ✅ Intégré | Tous les champs intégrés : Hero, Intro, Members, JoinCTA. |
| Domaines | `/nos-domaines` | `domains-page` | `strapi-domains-page.ts` | ✅ Intégré | Tous les champs intégrés : Hero, Intro, CTA. |
| Nous rejoindre | `/nous-rejoindre` | `join-page` | - | ❌ Non intégré | Content-type existe, pas de lib. |
| Contribuer | `/contribuer` | `contribute-page` | `strapi-contribute-page.ts` | ✅ Intégré | Tous les champs intégrés : Hero, Story, Stats, DonationTiers, Achievements, ContributionWays, Transparency, Payments, FAQ. |
| Contact | `/contact` | `contact-page` | - | ❌ Non intégré | Content-type existe, pas de lib. |
| Témoignages | `/temoignages` | `testimonials-page` | `strapi-testimonials.ts` | 🔄 Partiel | Intégration partielle. |
| Médiathèque | `/photos-et-videos` | `gallery-page` | `strapi-gallery.ts` | 🔄 Partiel | Intégration partielle. |

---

## Collection Types (Listes)

| Page | Route | Collection-type | Fichier lib | Statut | Notes |
|------|-------|-----------------|-------------|--------|-------|
| Liste activités | `/activites` | `activity` | `strapi-activities.ts` | 🔄 Partiel | Intégration existante. Catégories à vérifier. |
| Détail activité | `/activites/[slug]` | `activity` | `strapi-activities.ts` | 🔄 Partiel | À vérifier avec generateStaticParams. |
| Liste blog | `/blog` | `blog-post` | `strapi-blog.ts` | 🔄 Partiel | Rubriques et mostRead encore locaux. |
| Détail blog | `/blog/[id]` | `blog-post` | `strapi-blog.ts` | 🔄 Partiel | À vérifier. |
| Liste domaines | `/nos-domaines` | `domain` | `strapi-domains.ts` | 🔄 Partiel | IconMap local. |
| Détail domaine | `/nos-domaines/[slug]` | `domain` | `strapi-domains.ts` | 🔄 Partiel | À vérifier. |

---

## Fichiers de données statiques à migrer

Ces fichiers contiennent encore des données qui devraient venir de Strapi :

| Fichier | Utilisé par | Données à migrer |
|---------|-------------|------------------|
| `activities-data.ts` (4.9 KB) | `/activites`, composants | Fallback activities, categories, locations, statuses |
| `blog-data.tsx` (8.5 KB) | `/blog`, composants | blogCategories, rubrics, mostRead |
| `domains-data.ts` (4.8 KB) | `/nos-domaines`, DomainsSection | domainsList, iconMap mapping |
| `menu-data.ts` (860 B) | Header, navigation | menuItems → devrait venir de global-setting |

---

## Prochaine page à traiter

**Suggestion** : Commencer par les pages qui n'ont pas encore de fichier `lib/strapi-*.ts` :

1. **`/contact`** - Simple single type
2. **`/contribuer`** - Simple single type  
3. **`/nous-rejoindre`** - Single type avec relations

Ou continuer avec les pages partiellement intégrées pour les compléter :

1. **`/` (Accueil)** - Compléter DomainsSection et ContributeSection
2. **`/blog`** - Migrer rubriques et mostRead

---

## Comment mettre à jour ce document

Après chaque intégration de page :

1. Mettre à jour le statut (❌ → 🔄 → ✅)
2. Ajouter des notes sur ce qui a été fait
3. Si un fichier `*-data.ts` n'est plus utilisé, le noter pour suppression
