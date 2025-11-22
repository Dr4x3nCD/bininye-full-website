# Sprint 01 – Analyse du site & Modèle de contenu Strapi

## Objectif

Établir un **modèle de contenu Strapi complet** couvrant l’ensemble des pages et composants de `bininye-frontend`, afin de pouvoir ensuite créer les content-types et brancher le frontend.

---

## 1. Inventaire des pages et sections (lecture seule)

À partir du code actuel de `bininye-frontend` :

- **Pages principales (app/)**
  - `/` → `app/page.tsx`
    - Sections : `HeroSection`, `ValuesSection`, `AboutSection`, `DomainsSection`, `EventsSection`, `ContributeSection`, `GallerySection`, `PartnersSection`.
  - `/activites` + `/activites/[id]`
  - `/blog` + `/blog/[id]`
  - `/qui-sommes-nous`
  - `/equipes`
  - `/nos-domaines` + `/nos-domaines/[slug]`
  - `/nous-rejoindre`
  - `/photos-et-videos`
  - `/temoignages`
  - `/contact`
  - `/contribuer`

- **Sources de données statiques repérées**
  - `@/lib/activities-data` (activités, catégories, lieux, statuts)
  - `@/lib/blog-data` (articles de blog, catégories, rubriques, "most read")
  - `@/lib/domains-data` (domaines d’intervention, items, stats, impact)
  - Tableaux/constantes directement dans les composants :
    - Qui sommes-nous : `featuredTeamMembers`, `faqs`, stats, réalisations
    - Équipes : `teamMembers`
    - Médiathèque : `mediaItems`
    - Témoignages : `testimonials`
    - Home : `missions`, `values`, `events`, `images`, `partners`
    - Nous rejoindre : `benefits`, `opportunities`, `volunteers`, `steps`, texte du micro-témoignage
    - Page contribuer : `contributionWays`, `donationTiers`, `faqs` (et autres si ajoutés)

> Résultat attendu : l’agent connaît toutes les zones de texte/images/chiffres actuellement **hardcodées** à rendre dynamiques.

---

## 2. Modèle de contenu Strapi – Vue d’ensemble

### 2.1. Single Types (contenus globaux ou pages uniques)

1. **global-settings** (Single Type)
   - But : Paramètres globaux du site.
   - Champs :
     - `siteName` (string)
     - `logo` (media, single)
     - `primaryNavigation` (component repeatable `navigation.link`)
     - `footerText` (text)
     - `contactEmail` (email)
     - `contactPhone` (string)
     - `address` (text)
     - `socialLinks` (component repeatable `global.social_link`)

2. **homepage** (Single Type)
   - But : Contenu de la home, y compris textes de sections + relations vers d’autres types.
   - Champs (exemple) :
     - `heroTitle` (string)
     - `heroSubtitle` (text)
     - `heroBackground` (media)
     - `heroPrimaryCtaLabel` (string)
     - `heroPrimaryCtaUrl` (string)
     - `heroSecondaryCtaLabel` (string)
     - `heroSecondaryCtaUrl` (string)
     - `valuesTitle` (string)
     - `valuesIntro` (text)
     - `values` (component repeatable `shared.value`)
     - `aboutTitle` (string)
     - `aboutIntro` (richtext)
     - `aboutMissions` (component repeatable `shared.mission_item`)
     - `aboutMainStats` (component repeatable `shared.stat_item`)
     - `eventsTitle` (string)
     - `eventsSubtitle` (string)
     - `highlightedEvents` (relation many-to-many vers `api::activity.activity`)
     - `galleryTitle` (string)
     - `gallerySubtitle` (string)
     - `galleryHighlightMedia` (relation many-to-many vers `api::media-item.media-item`)
     - `partnersTitle` (string)
     - `partnersSubtitle` (string)
     - `highlightedPartners` (relation many-to-many vers `api::partner.partner`)

3. **about-page** (Single Type, pour `/qui-sommes-nous`)
   - Champs :
     - `heroTitle`, `heroSubtitle`, `heroBackground` (media)
     - `storyTitle`, `storyImage` (media), `storyRichText` (richtext)
     - `missionTitle`, `visionTitle`, `valuesTitle` (strings)
     - `missionText`, `visionText` (richtext)
     - `values` (component repeatable `shared.value`)
     - `achievementsStats` (component repeatable `shared.stat_item`)
     - `featuredTeamMembers` (relation many-to-many vers `api::team-member.team-member`)
     - `faqs` (component repeatable `shared.faq_item`)

4. **teams-page** (Single Type, pour `/equipes`)
   - Champs :
     - `heroTitle`, `heroSubtitle`, `heroBackground` (media)
     - `introTitle`, `introText` (string/text)
     - `members` (relation many-to-many vers `api::team-member.team-member`)
     - `joinCtaTitle`, `joinCtaText`, `joinCtaButtonLabel`, `joinCtaButtonUrl`

5. **domains-page** (Single Type, pour `/nos-domaines`)
   - Champs :
     - `heroTitle`, `heroSubtitle`, `heroBackground` (media)
     - `introTitle`, `introText`

6. **join-page** (Single Type, pour `/nous-rejoindre`)
   - Champs :
     - `heroTitle`, `heroSubtitle`, `heroBackground` (media)
     - `whyJoinTitle`, `whyJoinIntro`
     - `benefits` (component repeatable `join.benefit`)
     - `processTitle`, `processSubtitle`
     - `steps` (component repeatable `join.process_step`)
     - `microTestimonial` (component `join.micro_testimonial`)
     - `applicationIntroTitle`, `applicationIntroText` (pour le bloc texte du formulaire)

7. **gallery-page** (Single Type, pour `/photos-et-videos`)
   - Champs :
     - `heroTitle`, `heroSubtitle`, `heroBackground` (media)

8. **testimonials-page** (Single Type, pour `/temoignages`)
   - Champs :
     - `heroTitle`, `heroSubtitle`, `heroBackground` (media)
     - `introTitle`, `introText`
     - `ctaTitle`, `ctaText`, `ctaButtonLabel`

9. **contact-page** (Single Type, pour `/contact`)
   - Champs :
     - `heroTitle`, `heroSubtitle`, `heroBackground` (media)
     - `options` (component repeatable `contact.contact_option`)
     - `faq` (component repeatable `shared.faq_item`)
     - `mapEmbedUrl` ou `mapConfig` (JSON ou component dédié)
     - `contactInfo` (component `contact.contact_info` : adresse, téléphone, horaires, email, réseaux sociaux…)

10. **contribute-page** (Single Type, pour `/contribuer`)
    - Champs :
      - `heroTitle`, `heroSubtitle`, `heroBackground` (media)
      - `contributionWays` (component repeatable `contribute.contribution_way`)
      - `donationTiers` (component repeatable `contribute.donation_tier`)
      - `faqs` (component repeatable `shared.faq_item`)
      - `impactStats` (component repeatable `shared.stat_item`)

---

### 2.2. Collection Types (données répétables)

1. **activity** (`api::activity.activity`)
   - Champs :
     - `title` (string)
     - `slug` (UID, basé sur `title`)
     - `description` (richtext)
     - `date` (date)
     - `location` (string, ou relation vers un `location` si besoin plus tard)
     - `status` (enum : `upcoming`, `past`)
     - `participantsLabel` (string) – ex : "30 participants"
     - `category` (relation many-to-one vers `api::activity-category.activity-category`)
     - `tags` (component repeatable `shared.tag` ou simple repeatable string)
     - `image` (media)
     - `objectives` (component repeatable `activity.objective_item`)
     - `program` (component repeatable `activity.program_item` avec `time`, `title`)

2. **activity-category**
   - Champs :
     - `name` (string)
     - `slug` (UID)

3. **blog-post**
   - Champs :
     - `title` (string)
     - `slug` (UID)
     - `excerpt` (text)
     - `content` (richtext ou blocks)
     - `image` (media)
     - `category` (relation vers `blog-category`)
     - `rubrics` (relation many-to-many vers `blog-rubric` ou tags)
     - `author` (relation vers `author`)
     - `date` (date)
     - `readTime` (integer ou string)
     - `isFeatured` (boolean)
     - `isMostRead` (boolean)

4. **blog-category**
   - Champs : `name`, `slug`.

5. **blog-rubric** (optionnel, si besoin de rubriques séparées)
   - Champs : `name`, `slug`, `description`.

6. **author**
   - Champs :
     - `name` (string)
     - `role` (string)
     - `avatar` (media)
     - `bio` (text)

7. **team-member**
   - Champs :
     - `name` (string)
     - `role` (string)
     - `bio` (text)
     - `image` (media)
     - `email` (string, optionnel)
     - `linkedinUrl` (string, optionnel)
     - `isFeatured` (boolean)
     - `order` (integer)

8. **testimonial**
   - Champs :
     - `name` (string)
     - `role` (string)
     - `location` (string)
     - `image` (media)
     - `quote` (text/longtext)
     - `type` (enum : `beneficiary`, `volunteer`, `partner`, …) – optionnel

9. **media-item** (pour `/photos-et-videos` et la galerie home)
   - Champs :
     - `title` (string)
     - `type` (enum : `photo`, `video`)
     - `thumbnail` (media)
     - `date` (string ou date)
     - `videoUrl` (string, optionnel)
     - `category` (string ou relation vers un type `media-category` si besoin)

10. **domain** (nos domaines d’intervention)
    - Champs :
      - `title` (string)
      - `slug` (UID)
      - `shortDescription` (text)
      - `description` (richtext)
      - `items` (component repeatable `domain.action_item`)
      - `stats` (component repeatable `shared.stat_item`)
      - `impact` (richtext)
      - `themeColor` (enum ou string, ex : `primary`, `secondary`, ou classe Tailwind à mapper côté frontend)
      - `iconKey` (string, ex : `nutrition-communautaire`, `gouvernance-locale` – utilisé par le frontend pour choisir l’icône)

11. **volunteer-opportunity**
    - Champs :
      - `title` (string)
      - `type` (string : Terrain, Carrière, Stage, etc.)
      - `tags` (component repeatable `shared.tag` ou repeatable string)
      - `image` (media)
      - `description` (text)
      - `points` (repeatable text ou component `join.point_item`)

12. **volunteer-story** (pour le grid de bénévoles + micro-témoignages)
    - Champs :
      - `name` (string)
      - `role` (string)
      - `since` (string)
      - `quote` (text)
      - `image` (media)
      - `highlighted` (boolean)

13. **partner**
    - Champs :
      - `name` (string)
      - `logo` (media)
      - `websiteUrl` (string, optionnel)
      - `order` (integer)

---

### 2.3. Composants (components) proposés

**Namespace `shared`**
- `shared.value`
  - `title` (string)
  - `iconKey` (string) – mappé par le frontend vers les icônes existantes.
- `shared.stat_item`
  - `number` (string)
  - `label` (string)
- `shared.faq_item`
  - `question` (string)
  - `answer` (richtext ou text)
- `shared.tag`
  - `label` (string)

**Namespace `navigation`**
- `navigation.link`
  - `label` (string)
  - `url` (string)
  - `isExternal` (boolean)
  - éventuellement un niveau pour sous-menus si besoin plus tard.

**Namespace `contact`**
- `contact.contact_option`
  - `title` (string)
  - `description` (text)
  - `iconKey` (string)
  - `ctaLabel` (string)
  - `ctaUrl` (string)
- `contact.contact_info`
  - `address` (text)
  - `phone` (string)
  - `email` (string)
  - `whatsapp` (string, optionnel)
  - `hours` (text)

**Namespace `activity`**
- `activity.objective_item`
  - `text` (string)
- `activity.program_item`
  - `time` (string)
  - `title` (string)

**Namespace `join`**
- `join.benefit`
  - `title` (string)
  - `description` (text)
  - `iconKey` (string)
- `join.process_step`
  - `title` (string)
  - `description` (text)
  - `stepOrder` (integer)
  - `iconKey` (string)
- `join.micro_testimonial`
  - `quote` (text)
  - `personName` (string)
  - `personRole` (string)
  - `image` (media)

**Namespace `contribute`**
- `contribute.contribution_way`
  - `title` (string)
  - `description` (text)
  - `type` (enum ou string : don financier, bénévolat, partenariat, don en nature)
  - `iconKey` (string)
- `contribute.donation_tier`
  - `amountLabel` (string, ex : "5 000 FCFA")
  - `title` (string)
  - `description` (text)
  - `isPopular` (boolean)

**Namespace `domain`**
- `domain.action_item`
  - `text` (string)

---

## 3. Relations principales à respecter

- `homepage.highlightedEvents` → many-to-many vers `activity` (pour la section événements de la home).
- `homepage.highlightedPartners` → many-to-many vers `partner`.
- `homepage.galleryHighlightMedia` → many-to-many vers `media-item`.
- `about-page.featuredTeamMembers` → many-to-many vers `team-member`.
- `teams-page.members` → many-to-many vers `team-member`.
- `blog-post.category` → many-to-one `blog-category`.
- `blog-post.rubrics` → many-to-many `blog-rubric` (optionnel).
- `blog-post.author` → many-to-one `author`.
- `activity.category` → many-to-one `activity-category`.

---

## 4. Permissions & API (design, sans implémentation ici)

### 4.1. Permissions Strapi

Pour que le frontend Next.js puisse lire le contenu :

- **Rôle Public** ou **API Token** devra avoir au minimum :
  - `find` et `findOne` sur :
    - `activity`, `activity-category`
    - `blog-post`, `blog-category`, `blog-rubric`, `author`
    - `team-member`, `testimonial`, `media-item`, `domain`, `volunteer-opportunity`, `volunteer-story`, `partner`
    - Single types : `global-settings`, `homepage`, `about-page`, `teams-page`, `domains-page`, `join-page`, `gallery-page`, `testimonials-page`, `contact-page`, `contribute-page`.

Recommandation :
- Utiliser un **API Token Read-Only** dédié au frontend (meilleur contrôle) plutôt que d’ouvrir trop le rôle Public.

### 4.2. Endpoints REST à consommer par le frontend

(Défaut Strapi v4/v5 : préfixe `/api`)

- Global & pages :
  - `GET /api/global-settings?populate=*`
  - `GET /api/homepage?populate=deep`
  - `GET /api/about-page?populate=deep`
  - `GET /api/teams-page?populate=deep`
  - `GET /api/domains-page?populate=deep`
  - `GET /api/join-page?populate=deep`
  - `GET /api/gallery-page?populate=deep`
  - `GET /api/testimonials-page?populate=deep`
  - `GET /api/contact-page?populate=deep`
  - `GET /api/contribute-page?populate=deep`

- Collections :
  - Activités :
    - `GET /api/activities?populate=image,category,tags&filters[status][$eq]=upcoming` (listes)
    - `GET /api/activities/:id?populate=deep` (détail, programme, objectifs, tags)
  - Blog :
    - `GET /api/blog-posts?populate=image,category,author&sort[0]=date:desc`
    - `GET /api/blog-posts/:slug?populate=deep`
    - `GET /api/blog-categories`
    - `GET /api/blog-rubrics`
  - Domaines :
    - `GET /api/domains?populate=stats,items`
    - `GET /api/domains/:slug?populate=deep`
  - Équipe, témoignages, galerie :
    - `GET /api/team-members?sort[0]=order:asc`
    - `GET /api/testimonials`
    - `GET /api/media-items`
    - `GET /api/partners?sort[0]=order:asc`
  - Recrutement :
    - `GET /api/volunteer-opportunities`
    - `GET /api/volunteer-stories`

> L’agent adaptera les `populate` & `filters` au besoin (par ex. `populate=deep` limité à un niveau si performance nécessaire).

---

## 5. Résultat attendu du sprint 01

- Un **modèle de contenu Strapi validé**, couvrant toutes les données actuellement hardcodées dans `bininye-frontend`.
- Une **liste claire de Single Types, Collection Types, Components et Relations** (ci-dessus) à implémenter dans le sprint 02.
- Une première ébauche des **endpoints REST** à utiliser par Next.js.

Le sprint suivant (Sprint 02) consistera à **créer concrètement ces content-types et components dans Strapi** via le MCP (ou l'admin Strapi), puis à configurer les permissions et tokens API.

---

## 6. Précautions techniques importantes

:::tip Guide complet de bonnes pratiques
Pour une référence complète sur les bonnes pratiques Strapi avec MCP, consultez le document **BONNES_PRATIQUES_STRAPI_MCP.md** dans le dossier Task_for_agent.
:::

### 6.1. Vérification d'existence avant création

**IMPORTANT** : Avant de créer tout content-type, component ou entrée :
1. **Vérifier systématiquement** si l'élément existe déjà dans Strapi (via MCP `list_content_types`, `list_components`, ou `get_entries`).
2. Ne créer l'élément que s'il n'existe pas déjà.
3. Si l'élément existe, évaluer s'il faut :
   - Le réutiliser tel quel,
   - Le mettre à jour (`update_content_type`, `update_component`, `update_entry`),
   - Le recréer (supprimer puis recréer uniquement si nécessaire).

Cette pratique évite :
- Les doublons dans la base de données,
- Les conflits de schéma,
- Les erreurs de création.

### 6.2. Gestion des timers Strapi

**IMPORTANT** : S'assurer qu'**un seul timer est actif à la fois** lors des opérations Strapi.

Problème connu :
```
Error: Timer "cleaningDist1763773141761" already started, cannot overwrite
at cleanupDistDirectory
```

Cause : Le timer de nettoyage `cleaningDist…` est lancé plusieurs fois simultanément, causant un conflit lors du redémarrage de Strapi.

**Solutions** :
1. Attendre la fin complète d'une opération Strapi avant d'en lancer une nouvelle.
2. Ne jamais lancer plusieurs commandes `npm run develop` ou `npm run build` en parallèle.
3. Arrêter proprement Strapi (`Ctrl+C` ou `kill`) avant de le redémarrer.
4. Nettoyer manuellement le dossier `.tmp/` ou `dist/` si les timers persistent.

---

## 7. Statut d'exécution (agent)

- ✅ 2025-11-22 — Modèle de contenu Strapi validé par l’agent.
- Couverture vérifiée par rapport à `bininye-frontend` : pages (`app/*`) et données statiques (`lib/activities-data.ts`, `lib/blog-data.tsx`, `lib/domains-data.ts` et tableaux internes des pages comme `qui-sommes-nous`, `equipes`, `photos-et-videos`, `temoignages`, `contribuer`, `contact`).
- Aucune zone de texte/image/chiffre hardcodée manquante identifiée pour ce sprint ; les Single Types, Collection Types, Components et relations décrits ci-dessus sont cohérents avec l’interface actuelle et serviront de base au Sprint 02 (création concrète dans Strapi via MCP).
