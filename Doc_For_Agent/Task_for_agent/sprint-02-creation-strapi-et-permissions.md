# Sprint 02 – Création des content-types Strapi & configuration des permissions

## Objectif

Implémenter dans Strapi **tous les Single Types, Collection Types et Components** définis au Sprint 01, puis configurer les **permissions** et un **API Token read-only** pour le frontend.

---

## 1. Création des components Strapi

> À faire dans l'admin Strapi ou via MCP (`create_component`) en suivant le modèle du sprint 01.

**IMPORTANT - Vérification avant création** :
- Avant de créer chaque component, utiliser `list_components` ou `get_component_schema` pour vérifier s'il existe déjà.
- Si le component existe déjà :
  - Vérifier son schéma avec `get_component_schema`.
  - Utiliser `update_component` pour le mettre à jour si nécessaire.
  - Ne le recréer que si absolument nécessaire (supprimer puis recréer).

**Note** : Respecter les namespaces logiques (`shared`, `contact`, `activity`, etc.) et le format `namespace.component-name`. Voir section 3 du guide BONNES_PRATIQUES_STRAPI_MCP.md.

1. Créer les components du namespace `shared` :
   - `shared.value` (title, iconKey)
   - `shared.stat_item` (number, label)
   - `shared.faq_item` (question, answer)
   - `shared.tag` (label)

2. Créer les components du namespace `navigation` :
   - `navigation.link` (label, url, isExternal)

3. Créer les components du namespace `contact` :
   - `contact.contact_option` (title, description, iconKey, ctaLabel, ctaUrl)
   - `contact.contact_info` (address, phone, email, whatsapp, hours)

4. Créer les components du namespace `activity` :
   - `activity.objective_item` (text)
   - `activity.program_item` (time, title)

5. Créer les components du namespace `join` :
   - `join.benefit` (title, description, iconKey)
   - `join.process_step` (title, description, stepOrder, iconKey)
   - `join.micro_testimonial` (quote, personName, personRole, image)

6. Créer les components du namespace `contribute` :
   - `contribute.contribution_way` (title, description, type, iconKey)
   - `contribute.donation_tier` (amountLabel, title, description, isPopular)

7. Créer les components du namespace `domain` :
   - `domain.action_item` (text)

---

## 2. Création des Collection Types

> Utiliser l'admin Strapi ou MCP `create_content_type`. Respecter les types simples (string, text, richtext, media, relation, enum).

**IMPORTANT - Vérification avant création** :
- Avant de créer chaque collection, utiliser `list_content_types` pour vérifier si elle existe déjà.
- Si le content-type existe déjà :
  - Vérifier son schéma avec `get_content_type_schema`.
  - Utiliser `update_content_type` pour ajouter ou modifier des attributs.
  - Ne le supprimer/recréer que si le schéma est irrécupérable.

**Note critique** : Toujours utiliser le format kebab-case pour `singularName` et `pluralName`. Définir `pluginOptions.content-manager.visible = true` et `pluginOptions.content-type-builder.visible = true` pour rendre le content-type visible dans l'admin. Voir section 2 du guide BONNES_PRATIQUES_STRAPI_MCP.md.

Créer les collections suivantes :

1. `activity`
2. `activity-category`
3. `blog-post`
4. `blog-category`
5. `blog-rubric` (optionnel mais recommandé pour correspondre aux rubriques du blog)
6. `author`
7. `team-member`
8. `testimonial`
9. `media-item`
10. `domain`
11. `volunteer-opportunity`
12. `volunteer-story`
13. `partner`

Pour chaque collection :

- Créer les champs décrits dans Sprint 01 (noms + types).
- Créer les **UID/slug** nécessaires (`slug` sur `blog-post`, `domain`, etc.).
- Créer les **relations** entre types (ex : `blog-post.category`, `activity.category`, etc.).

---

## 3. Création des Single Types

Créer les Single Types suivants en respectant les champs du Sprint 01 :

1. `global-settings`
2. `homepage`
3. `about-page`
4. `teams-page`
5. `domains-page`
6. `join-page`
7. `gallery-page`
8. `testimonials-page`
9. `contact-page`
10. `contribute-page`

Pour chacun :
- Ajouter les champs simples (titres, sous-titres, textes, etc.).
- Ajouter les composants (`shared.value`, `shared.stat_item`, etc.).
- Ajouter les relations (ex : `homepage.highlightedEvents` → `activity`).

---

## 4. Vérifications techniques Strapi

**IMPORTANT - Gestion des timers** :
- S'assurer qu'**un seul timer est actif à la fois** lors des opérations Strapi.
- Attendre la fin complète de chaque opération avant d'en lancer une nouvelle.
- Ne **jamais** lancer plusieurs commandes `npm run develop` ou `npm run build` simultanément.
- Si erreur `Timer "cleaningDist..." already started` :
  1. Arrêter proprement Strapi (`Ctrl+C` ou via `kill`).
  2. Nettoyer `.tmp/` et `dist/` si nécessaire.
  3. Redémarrer Strapi.

1. Lancer Strapi en développement (si ce n'est pas déjà fait) :
   - `npm --prefix bininye run develop`

2. S'assurer que :
   - Aucun content-type n'a d'erreur de schéma.
   - La génération des types TS (si activée) se fait sans erreur.

3. Vérifier que chaque collection et single type apparaît bien dans l'admin avec tous ses champs.

---

## 5. Configuration des rôles & permissions

### 5.1. Rôle Public (optionnel)

1. Dans l’admin Strapi, aller dans **Settings → Roles → Public**.
2. Cocher **find** / **findOne** seulement si vous acceptez l’accès anonyme à certains contenus (ex : blog public).
3. Ne **pas** donner `create` / `update` / `delete` sur les collections (sauf si vous créez des endpoints publics spécifiques pour les formulaires, voir Sprint 05).
4. Pour un contrôle plus fin, préférer l’utilisation d’un **API Token Read-Only** (voir ci-dessous).

### 5.2. API Token Read-Only pour le frontend

1. Aller dans **Settings → API Tokens**.
2. Créer un nouveau token :
   - Nom : `frontend-read-only`
   - Type : `Read-only`
3. Limiter le scope si souhaité (selon les types réellement nécessaires).
4. Copier la valeur du token (NE PAS la committer) et :
   - La placer dans une variable d’environnement côté Next.js, par ex. `STRAPI_API_TOKEN` (non exposée côté client).

> Le frontend utilisera ce token uniquement dans des appels côté serveur (Server Components / route handlers) via le header `Authorization: Bearer <TOKEN>`.

### 5.3. CORS & sécurité HTTP

1. Dans `bininye/config/middlewares.ts`, conserver `strapi::cors` mais configurer les origines autorisées via variables d’environnement (ex : `CORS_ORIGIN`), conformément à la doc Strapi.
2. En production, restreindre les origines aux domaines du frontend (ex : `https://www.bininye.com`).
3. Vérifier que `APP_KEYS`, `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY` sont bien définies dans les variables d’environnement et **jamais** versionnées.

---

## 6. Sanity checks

**IMPORTANT - Vérification avant création d'entrées** :
- Avant de créer des entrées de test, utiliser `get_entries` pour vérifier si des entrées existent déjà.
- Ne créer que les entrées manquantes pour éviter les doublons.

1. Depuis l'onglet **Content Manager**, créer **au moins 1 entrée de test** dans :
   - `activity-category`
   - `activity`
   - `blog-category`, `blog-post`
   - `team-member`
   - `testimonial`
   - `media-item`
   - `domain`
   - `volunteer-opportunity`
   - `partner`

2. Créer les Single Types de base avec du contenu minimal :
   - `global-settings`
   - `homepage`

3. Tester rapidement une requête REST brute (ex. via curl ou HTTP client) :
   - `GET http://localhost:1337/api/homepage?populate=deep`
   - `GET http://localhost:1337/api/activities?populate=image,category`

   en ajoutant le header `Authorization: Bearer <API_TOKEN>` si nécessaire.

---

## Résultat attendu du sprint 02

- Tous les **Components**, **Collection Types** et **Single Types** créés et visibles dans l’admin.
- Un **API Token read-only** dédié au frontend, prêt à être consommé.
- Au moins quelques **entrées de test** pour chaque type clé (activities, blog, domains, testimonies, etc.).

Le sprint suivant (Sprint 03) consistera à **migrer le contenu existant** du frontend (arrays et libs) vers Strapi (création des vraies entrées + upload des médias).

---

## 7. Statut d'exécution (agent)

- ✅ Components : tous les components prévus dans le Sprint 01 ont été créés via MCP (`shared.*`, `navigation.link`, `contact.*`, `activity.*`, `join.*`, `contribute.*`, `domain.*`), après vérification préalable de leur absence.
- ✅ Collection Types : toutes les collections listées (activity, activity-category, blog-post, blog-category, blog-rubric, author, team-member, testimonial, media-item, domain, volunteer-opportunity, volunteer-story, partner) ont été créées via MCP, en évitant les noms réservés (ex. `status` → `activityStatus`).
- ✅ Single Types : tous les single types (global-setting, homepage, about-page, teams-page, domains-page, join-page, gallery-page, testimonials-page, contact-page, contribute-page) ont été créés via MCP, en corrigeant :
  - les relations (`manyToMany` remplacé par `oneToMany` côté MCP lorsque nécessaire),
  - les erreurs de `singularName`/`pluralName` identiques,
  - les erreurs génériques `-32603 undefined undefined` en appliquant la procédure documentée (vérification, éventuelle suppression puis recréation après délai).
- ✅ Entrées de test minimales créées via MCP (après vérification avec `get_entries` et délai de 5s entre chaque création), par exemple :
  - `activity-category` : `Catégorie test activité` (`slug: categorie-test-activite`).
  - `activity` : `Activité test 1` (`slug: activite-test-1`, `activityStatus: upcoming`).
  - `blog-category` : `Catégorie blog test` (`slug: categorie-blog-test`).
  - `blog-post` : `Article test agent` (`slug: article-test-agent`, contenu de test).
  - `team-member` : `Membre test agent` (isFeatured, order=1).
  - D'autres types pourront être peuplés plus largement au Sprint 03 lors de la migration des données du frontend.
- ✅ Documentation : les erreurs rencontrées (noms d'attributs réservés, relations `manyToMany` non acceptées via MCP, `singularName`/`pluralName` identiques, erreurs génériques `-32603`) ont été intégrées dans `BONNES_PRATIQUES_STRAPI_MCP.md` avec des procédures concrètes.
- ⚠️ Permissions & API Token : la configuration recommandée (rôle Public en lecture seule, API Token read-only dédié au frontend, CORS via `CORS_ORIGIN`) est décrite dans la section 5 ci-dessus et doit être appliquée manuellement dans l'admin Strapi et les fichiers de config.
