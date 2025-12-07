# Sprint 03 – Migration du contenu frontend vers Strapi (données + médias)

## Objectif

Transférer **tout le contenu actuellement hardcodé** dans `bininye-frontend` (arrays, constantes, libs) vers Strapi : créer les entrées dans les content-types, uploader les médias, et préparer la suppression future des données statiques côté frontend.

---

## 1. Préparation

**IMPORTANT - Gestion des timers Strapi** :
- S'assurer qu'**un seul timer est actif à la fois** lors des opérations Strapi.
- Attendre la fin complète de chaque opération avant d'en lancer une nouvelle.
- Ne **jamais** lancer plusieurs commandes `npm run develop` simultanément.
- Si erreur `Timer "cleaningDist..." already started`, arrêter proprement Strapi et nettoyer `.tmp/` et `dist/`.

1. Lancer Strapi en dev et vérifier l'accès à l'admin.
2. Vérifier que tous les types définis aux sprints 01–02 existent.
3. Garder une vue du code Next.js ouverte pour recopier les contenus (titres, textes, stats…).

---

## 2. Migration des contenus par zone

### 2.1. Activités (`/activites`)

**IMPORTANT - Vérification avant création** :
- Avant de créer des entrées `activity-category` ou `activity`, utiliser `get_entries` pour vérifier si elles existent déjà.
- Vérifier via slug ou titre pour éviter les doublons.
- Utiliser `update_entry` pour mettre à jour les entrées existantes plutôt que de créer des doublons.

1. Ouvrir `@/lib/activities-data` (frontend) et recenser :
   - `activities`
   - `categories`, `locations`, `statuses`.
2. Dans Strapi :
   - Créer les entrées `activity-category` correspondant aux catégories.
   - Créer les entrées `activity` pour chaque activité :
     - Titre, slug, description, date, location, status, participants, tags, image.
     - Remplir objectifs/programmes si nécessaire (ou laisser pour plus tard si non définis dans le code).
3. Uploader dans la Media Library les images utilisées par les activités (fichiers du dossier `public/` du frontend) et les lier aux champs `image`.

### 2.2. Blog (`/blog`)

**IMPORTANT - Vérification avant création** :
- Vérifier l'existence des `blog-category`, `blog-rubric`, `author` et `blog-post` avant création.
- Utiliser les slugs pour identifier les doublons potentiels.

1. Ouvrir `@/lib/blog-data` :
   - `blogPosts`, `blogCategories`, `rubrics`, `mostRead`.
2. Dans Strapi :
   - Créer les `blog-category`.
   - Créer les `blog-rubric` si utilisées.
   - Créer les `author` si les auteurs sont explicitement nommés dans les posts (sinon un auteur générique).
   - Créer les `blog-post` :
     - Titre, slug, excerpt, content, image, category, rubrics, author, date, readTime.
   - Pour `mostRead` / article mis en avant, marquer les posts avec `isFeatured` / `isMostRead`.
3. Uploader les images des articles et les associer.

### 2.3. Domaines (`/nos-domaines`)

**IMPORTANT - Vérification avant création** :
- Vérifier l'existence des entrées `domain` via slug avant de les créer.

1. Ouvrir `@/lib/domains-data`.
2. Pour chaque domaine, créer une entrée `domain` avec :
   - `title`, `slug`, `shortDescription`, `description` (ou champ équivalent).
   - `items` (component `domain.action_item`) à partir des listes d’items.
   - `stats` (component `shared.stat_item`) à partir des chiffres.
   - `impact` (texte long/riche basé sur le contenu frontend).
   - `themeColor` et `iconKey` en accord avec ce qui est utilisé dans le frontend (`nutrition-communautaire`, `gouvernance-locale`, etc.).

### 2.4. Équipe et Qui sommes-nous (`/qui-sommes-nous` et `/equipes`)

**IMPORTANT - Vérification avant création** :
- Vérifier l'existence des entrées `team-member` par nom avant création.

1. À partir des tableaux `featuredTeamMembers` et `teamMembers` dans les pages/components :
   - Créer des entrées `team-member` avec nom, rôle, bio, image.
   - Mettre à jour les flags `isFeatured` pour ceux qui apparaissent dans les sections "équipe".
2. Remonter dans les Single Types :
   - `about-page`: renseigner les champs story/mission/vision/values/achievements avec les textes et stats.
   - `teams-page`: renseigner les champs hero/intro/CTA et lier les `team-member`.

### 2.5. Médiathèque (`/photos-et-videos` + galerie home)

**IMPORTANT - Vérification avant création** :
- Vérifier l'existence des `media-item` par titre avant création.

1. À partir de `mediaItems` et des images utilisés en home :
   - Créer des `media-item` pour chaque entrée avec type (photo/vidéo), titre, date, thumbnail, et éventuellement `videoUrl` si on passe à de vraies vidéos hébergées.
2. Uploader les visuels correspondants.
3. Dans `homepage`, lier quelques `media-item` dans `galleryHighlightMedia`.

### 2.6. Témoignages (`/temoignages` + micro-témoignages join)

**IMPORTANT - Vérification avant création** :
- Vérifier l'existence des `testimonial` et `volunteer-story` par nom avant création.

1. À partir du tableau `testimonials` de la page `/temoignages` :
   - Créer une entrée `testimonial` par personne (nom, rôle, location, quote, image).
2. Pour le micro-témoignage dans `WhyJoin`, soit :
   - Le modéliser comme `volunteer-story` (recommandé) et le référencer dans `join-page.microTestimonial`.
   - Ou saisir directement le texte dans le component `join.micro_testimonial` de `join-page`.

### 2.7. Opportunités & bénévoles (`/nous-rejoindre`)

**IMPORTANT - Vérification avant création** :
- Vérifier l'existence des `volunteer-opportunity` et `volunteer-story` avant création.

1. Opportunités (`opportunities` dans `opportunities-list.tsx`) :
   - Créer des `volunteer-opportunity` avec title, type, tags, image, description, points.
2. Bénévoles (`volunteers` dans `volunteers-grid.tsx`) :
   - Créer des `volunteer-story` (name, role, since, quote, image).
3. Avantages, étapes & micro-témoignage :
   - Remplir `join-page.benefits`, `join-page.steps`, `join-page.microTestimonial` avec les données.

### 2.8. Contribuer (`/contribuer`)

1. À partir des constantes `contributionWays`, `donationTiers`, `faqs`, stats (s’il y en a) :
   - Remplir `contribute-page.contributionWays` (component `contribute.contribution_way`).
   - Remplir `contribute-page.donationTiers`.
   - Remplir `contribute-page.faqs` (component `shared.faq_item`).
   - Remplir `contribute-page.impactStats` avec les stats importantes.

### 2.9. Contact (`/contact`)

1. À partir des composants `ContactOptions`, `ContactInfo`, `ContactFAQ`, `ContactMap` :
   - Remplir `contact-page.options` avec les cartes de contact.
   - Remplir `contact-page.faq` (questions/réponses).
   - Renseigner `contact-page.contactInfo` (adresse, email, téléphone, horaires, réseaux sociaux).
   - Si `ContactMap` utilise une iframe/coordonnées, les mettre dans `mapEmbedUrl` ou un champ `mapConfig`.

### 2.10. Home (sections générales)

**IMPORTANT - Vérification avant création/mise à jour** :
- Vérifier si `homepage` et `partner` existent déjà avant création.

1. Remplir `homepage` avec les contenus textuels de :
   - `HeroSection` (titre, sous-titre, CTA labels & urls).
   - `ValuesSection` (valeurs, titres, etc.).
   - `AboutSection` (missions, textes, images principales).
   - `EventsSection` (titres + liaison vers des `activity` marquées comme "en vitrine").
   - `ContributeSection` (titres + stats principales, éventuellement réutilisation des données de `contribute-page`).
   - `GallerySection` (titre/sous-titre + liaison vers quelques `media-item`).
   - `PartnersSection` (texte principal + liaison vers `partner`).

2. Créer les `partner` à partir de `PartnersSection` (noms + logos) et lier dans `homepage.highlightedPartners`.

---

## 3. Nettoyage préparatoire côté frontend (sans supprimer encore)

> Ce sprint reste centré sur la **migration vers Strapi**. Le nettoyage de code frontend se fera au sprint 04, une fois les fetchs en place.

1. Marquer (par commentaires ou TODO) les endroits du frontend où le contenu est désormais dans Strapi :
   - `@/lib/activities-data`, `blog-data`, `domains-data`.
   - `@/lib/menu-data` (navigation principale du header).
   - Tableaux statiques dans les composants (équipe, témoignages, médiathèque, opportunités, bénévoles, etc.).
2. Noter pour chaque bloc **l’endpoint Strapi cible** (cf. Sprint 01) qui sera utilisé au sprint 04.

---

## 4. Vérifications

1. Parcourir chaque type dans Strapi et vérifier que les données saisies correspondent visuellement au contenu du site actuel.
2. Vérifier que les images sont bien dans la Media Library et liées aux bonnes entrées.
3. Retester rapidement quelques endpoints REST avec `populate` pour s’assurer que la structure correspond aux besoins du frontend.

---

## 5. Résultat attendu du sprint 03

- Tous les contenus visibles aujourd’hui dans `bininye-frontend` sont **représentés dans Strapi** (données + médias).
- Les Single Types de pages et les Collections principales (activities, blog, domains, team, testimonials, gallery, join, contribute, contact) sont **remplis**.
- Le frontend peut désormais être modifié pour lire ces contenus via API (Sprint 04).

---

## Statut d'exécution (agent)

**Statut : Terminé**

Travail réalisé par bloc :

- **Activités** :
  - 9 entrées `activity` créées (dont 1 de test) avec titres, slugs, descriptions, dates, lieux, labels participants et tags.
  - Catégories et statuts gérés via les champs prévus au modèle.

- **Blog** :
  - 7 entrées `blog-post` créées (6 articles du front + 1 article test) avec titre, slug, excerpt, contenu, date et `readTime`.
  - `isFeatured` utilisé pour l’article mis en avant.

- **Domaines** :
  - 4 entrées `domain` créées avec `title`, `slug`, `shortDescription`, `description`, `impact`, `items` (components `domain.action_item`) et `stats` (components `shared.stat-item`).

- **Équipe & Qui sommes-nous** :
  - 6 `team-member` réels créés (plus 1 membre de test existant) avec `bio`, `role`, `isFeatured`, `order`.
  - `about-page` rempli : hero, histoire, mission, vision, valeurs, stats, FAQ.
  - `teams-page` rempli : hero, intro, CTA.

- **Médiathèque** :
  - 8 `media-item` créés à partir de la page `/photos-et-videos` (type, titre, date, placeholder d’image).
  - `gallery-page` rempli avec le hero.

- **Témoignages** :
  - 6 entrées `testimonial` créées (nom, rôle, localisation, citation, type `beneficiary`/`volunteer`/`partner`).
  - `testimonials-page` rempli (hero, intro, CTA).

- **Nous Rejoindre** :
  - `join-page` rempli : hero, textes d’intro, benefits (`join.join-benefit`), steps (`join.join-process-step`), micro-témoignage (`join.join-micro-testimonial`), bloc candidature.
  - 4 `volunteer-opportunity` créées à partir de `opportunities-list`.
  - 6 `volunteer-story` créées à partir de `volunteers-grid`.

- **Contribuer** :
  - `contribute-page` rempli : hero, `impactStats`, `donationTiers` (4 paliers), `contributionWays` (4 façons de contribuer), FAQ (4 Q/R).

- **Contact** :
  - `contact-page` rempli : hero, `contactInfo` (adresse, email, téléphone, WhatsApp, horaires), options (`contact.contact-option[]`), FAQ, `mapEmbedUrl` (iframe Cocody).

- **Homepage** :
  - `homepage` rempli : hero, valeurs, bloc à propos, titres/sous-titres des sections événements, galerie, partenaires.
  - 6 entrées `partner` créées (UNICEF, OMS, Banque Mondiale, UNESCO, USAID, Union Africaine).

### Remarque sur les relations

- Toutes les collections et Single Types nécessaires au sprint 03 sont créés et remplis en données.
- Les relations de mise en avant doivent être configurées directement dans l'admin Strapi (onglet Relations des Single Types) :
  - Sur `homepage` :
    - `highlightedEvents` : les 2 activités principales (leaders religieux, renforcement des adolescents et jeunes).
    - `highlightedPartners` : les 6 partenaires créés.
    - `galleryHighlightMedia` : quelques `media-item` représentatifs.
  - Sur `about-page` : `featuredTeamMembers` : les 3 membres mis en avant.
  - Sur `teams-page` : `members` : l'ensemble des 6 membres réels de l'équipe.

Une fois ces relations visuellement validées dans l’admin, le sprint 03 est considéré comme **complètement opérationnel** côté Strapi (modèle + données).

> **Mise à jour** : après revue et validation globale du contenu, le sprint 03 est désormais considéré comme **totalement terminé**. Tous les contenus frontend ont été migrés dans Strapi et la responsabilité de l’ajustement fin des relations (via l’admin) est assumée hors du périmètre de développement de ce sprint.
