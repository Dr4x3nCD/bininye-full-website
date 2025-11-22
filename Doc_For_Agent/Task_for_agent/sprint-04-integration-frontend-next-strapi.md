# Sprint 04 – Intégration du frontend Next.js avec Strapi

## Objectif

Brancher `bininye-frontend` sur Strapi pour que **toutes les pages consomment les données du headless CMS** au lieu des arrays/constants locales.

---

## 1. Mise en place d'un client Strapi côté Next.js

**IMPORTANT - Gestion des timers Strapi** :
- S'assurer qu'**un seul timer est actif à la fois** lors des opérations Strapi.
- Si vous redémarrez Strapi pendant les tests d'intégration, attendre la fin complète de l'arrêt avant de relancer.
- Ne **jamais** lancer plusieurs instances Strapi simultanément.

1. Créer un utilitaire dans le frontend, par exemple `bininye-frontend/lib/strapi-client.ts` :
   - Centraliser :
     - `STRAPI_URL` (ex: `process.env.NEXT_PUBLIC_STRAPI_URL` ou fallback `http://localhost:1337`).
     - `STRAPI_API_TOKEN` (lu depuis une env non exposée côté client si usage en server components / API routes).
   - Exposer une fonction générique :
     - `fetchStrapi(path, options)` qui :
       - Concatène `STRAPI_URL + '/api' + path`.
       - Ajoute le header `Authorization: Bearer <TOKEN>` si token.
       - Gère erreurs de base.

2. Ajouter un wrapper typé si besoin (`getHomepage`, `getActivities`, etc.) pour simplifier l’usage dans les pages.

---

## 2. Pages basées sur des listes (phase 1)

### 2.1. Activités (`/activites` et `/activites/[id]`)

1. Dans `app/activites/page.tsx` :
   - Remplacer l’import `activities, categories, locations, statuses` (depuis `@/lib/activities-data`) par un fetch Strapi dans un **Server Component** ou via `getServerSideProps`/`fetch` côté serveur (App Router).
   - Utiliser l’endpoint : `GET /api/activities?populate=image,category&...`.
   - Générer dynamiquement :
     - La liste des catégories (`activity-category`).
     - Les locations (peuvent venir d’un champ `location` distinct ou d’un type dédié plus tard).
     - Les statuts à partir d’un enum local (frontend) ou d’une liste dérivée des données.

2. Dans `app/activites/[id]/page.tsx` :
   - Remplacer `activities` par un fetch Strapi :
     - `GET /api/activities/:id?populate=deep` **ou** par slug si vous préférez (`:slug`).
   - Mettre à jour `generateStaticParams` pour utiliser :
     - `GET /api/activities?fields[0]=id` (ou `slug`) au build.
   - Adapter le mapping des champs (status, category, tags, participants, programme, objectifs).

### 2.2. Blog (`/blog` et `/blog/[id]`)

1. `app/blog/page.tsx` :
   - Remplacer `blogPosts`, `blogCategories`, `rubrics`, `mostRead` (depuis `@/lib/blog-data`) par :
     - `GET /api/blog-posts?...`
     - `GET /api/blog-categories`
     - `GET /api/blog-rubrics` si utilisé.
   - Passer les données récupérées aux composants : `HeroBlog`, `FeaturedPost`, `BlogFilters`, `ArticleGrid`, `RubricsSection`, `MostReadSection`.

2. `app/blog/[id]/page.tsx` :
   - Décider de la clé d’URL : `id` ou `slug` (recommandé : slug).
   - Adapter `generateStaticParams` pour récupérer la liste des slugs via Strapi.
   - Récupérer l’article courant via `GET /api/blog-posts?filters[slug][$eq]=...&populate=deep`.
   - Récupérer quelques posts pour la section "À lire également" (`relatedPosts`).

### 2.3. Domaines (`/nos-domaines` et `/nos-domaines/[slug]`)

1. `app/nos-domaines/page.tsx` :
   - Remplacer l’import `domains` de `@/lib/domains-data` par un fetch Strapi : `GET /api/domains?populate=stats,items`.
   - Mapper `iconMap` via `domain.iconKey`.

2. `app/nos-domaines/[slug]/page.tsx` :
   - Adapter `generateStaticParams` pour utiliser les slugs Strapi.
   - Récupérer le domaine courant et populates (`items`, `stats`, images, etc.).
   - Mapper `domain.themeColor` et `iconKey` vers les classes CSS/icônes existantes.

### 2.4. Témoignages, Médiathèque, Équipe

1. `app/temoignages/page.tsx` :
   - Remplacer le tableau `testimonials` local par un fetch `GET /api/testimonials`.

2. `app/photos-et-videos/page.tsx` :
   - Remplacer `mediaItems` par `GET /api/media-items`.
   - Conserver la logique de filtre (Tous/Photos/Vidéos) côté frontend.

3. `app/equipes/page.tsx` :
   - Remplacer `teamMembers` local par `GET /api/team-members?sort[0]=order:asc`.

4. Composants de la home qui se basent sur ces listes (events, gallery, partners, etc.) doivent utiliser les données issues de `homepage` + relations vers `activity`, `media-item`, `partner`.

5. Remplacer l’utilisation de `@/lib/menu-data` (header) par un fetch du Single Type `global-settings` et de son champ `primaryNavigation` (component `navigation.link`).

---

## 3. Pages de contenu "single" (phase 2)

### 3.1. Home (`/`)

1. Dans `app/page.tsx` :
   - Transformer la page en Server Component qui :
     - Fait un fetch `GET /api/homepage?populate=deep`.
     - Passe les sous-parties (hero, about, values, events, contribute, gallery, partners) aux composants correspondants, via props.
2. Adapter chaque composant (`HeroSection`, `ValuesSection`, etc.) pour :
   - Accepter des props (textes, images, stats) au lieu d’utiliser des constantes internes.
   - Retirer progressivement les arrays/constantes codées en dur.

### 3.2. Pages statiques : Qui sommes-nous, Équipes, Join, Contribuer, Contact, Témoignages, Médiathèque

Pour chacune :

1. Ajouter un fetch du Single Type correspondant :
   - `/qui-sommes-nous` → `GET /api/about-page?populate=deep`
   - `/equipes` → `GET /api/teams-page?populate=deep`
   - `/nous-rejoindre` → `GET /api/join-page?populate=deep`
   - `/contribuer` → `GET /api/contribute-page?populate=deep`
   - `/contact` → `GET /api/contact-page?populate=deep`
   - `/temoignages` → `GET /api/testimonials-page?populate=deep`
   - `/photos-et-videos` → `GET /api/gallery-page?populate=deep`

2. Adapter les composants pour qu’ils reçoivent leurs données via props plutôt que via des constantes internes.

3. Supprimer/vider les tableaux locaux une fois vérifié que les données viennent bien de Strapi.

---

## 4. Gestion des images & URLs

1. Utiliser un helper pour transformer les URLs media Strapi en URLs absolues :
   - Si Strapi renvoie un chemin relatif (ex. `/uploads/...`), préfixer avec `STRAPI_URL`.

2. Dans les components Next `Image` / `img` :
   - Remplacer les chemins `/...` par les URLs Strapi quand c’est géré par le CMS.
   - Garder éventuellement quelques images purement graphiques en local (backgrounds génériques), si non gérées par Strapi.

---

## 5. Sécurité, cache & stratégie de rendu

1. Décider où utiliser :
   - **Static Generation** (`generateStaticParams` + fetch au build) pour contenus peu changeants (blog, activités, domaines, pages statiques).
   - **Revalidation** (`fetch(..., { next: { revalidate: X } })`) pour rafraîchir régulièrement le contenu.
   - **Server-side** (`cache: 'no-store'`) si besoin de contenu très live.

2. Vérifier que l’API token n’est jamais exposé au client :
   - Utiliser les fetch côté serveur (Server Components, route handlers, etc.).
   - Ne jamais inclure le token dans `NEXT_PUBLIC_*` ni l’exposer dans le JS client.

3. Pour les formulaires (contact, candidature, don si connecté à Strapi à terme) :
   - Limiter les permissions à `create` uniquement sur les collections de soumissions dédiées.
   - Envisager du throttling côté frontend (délais entre soumissions) et, si besoin, un rate limiting/anti-bot côté backend.

---

## 6. Nettoyage final du frontend

**IMPORTANT - Vérification avant suppression** :
- Avant de supprimer les fichiers de données statiques, vérifier que toutes les pages consomment bien les données Strapi.
- Tester chaque page après suppression pour s'assurer qu'aucune référence n'existe encore.

1. Supprimer les fichiers/libs de données devenus inutiles :
   - `@/lib/activities-data`
   - `@/lib/blog-data`
   - `@/lib/domains-data`
   - Les tableaux statiques dans les composants une fois migrés.

2. Vérifier que **chaque texte éditable** dans le site provient bien de Strapi (y compris CTA, titres de sections, etc.).

3. Lancer un tour de test complet :
   - Home, activités, activité détail, blog, article détail, domaines, domaine détail, nous rejoindre, contribuer, contact, témoignages, médiathèque, équipes.

---

## Résultat attendu du sprint 04

- Le frontend Next.js **ne dépend plus des données statiques internes** pour le contenu.
- Toutes les pages consomment le contenu depuis Strapi via les endpoints REST définis.
- Le contenu du site est entièrement administrable depuis Strapi, sans toucher au code frontend pour les textes/images/chiffres.
