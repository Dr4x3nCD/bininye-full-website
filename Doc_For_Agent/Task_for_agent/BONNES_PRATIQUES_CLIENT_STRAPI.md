# BONNES PRATIQUES – Client Strapi (Next.js)

Ce document résume les règles à suivre côté frontend (Next.js) pour consommer proprement une API Strapi v5, en particulier sur la validation des paramètres et l’utilisation de `populate`.

## 1. Toujours tenir compte de la version Strapi

- Vérifier la version majeure de Strapi (ici **v5**).
- Utiliser **la documentation v5** correspondante (REST, populate, validation), pas celle de v4.
- Entre v4 et v5, la syntaxe de certains paramètres de requête a changé (ex. `populate`).

## 2. Validation stricte des paramètres en Strapi 5

En Strapi 5, les requêtes REST sont **validées** avant exécution. Une clé inconnue ou un chemin invalide dans les paramètres entraîne un `400 Bad Request` de type `ValidationError`.

Exemples d’erreurs typiques renvoyées par Strapi :

- `"Invalid key related at image.related"`
- `"Invalid key avatar at author.avatar"`

Ces erreurs apparaissent par exemple lorsque :

- on utilise un champ qui **n’existe plus** dans le schéma (ex. `author.avatar` alors que le modèle `author` n’a plus de champ `avatar`),
- on utilise un chemin de `populate` incompatible avec la nouvelle syntaxe v5,
- on demande à peupler des champs/relations non autorisés pour le rôle courant.

Avec un client comme `fetchStrapi`, il est normal de voir remonter un message du type :

```text
Strapi fetch failed (400 Bad Request) for <URL>: { "error": { "message": "Invalid key avatar at author.avatar", ... } }
```

Ce comportement est voulu : Strapi ne "silence" plus les erreurs de schéma.

## 3. Bonnes pratiques pour `populate` en REST (Strapi v5)

### 3.1. Syntaxes recommandées

En v5, pour la REST API :

- Peupler **tout** au niveau racine :
  - `?populate=*`
- Peupler **des relations spécifiques** au niveau racine :
  - `?populate[0]=relationA&populate[1]=relationB`
- Peupler **des relations imbriquées** :
  - `?populate[category][populate][0]=restaurants`

**À éviter en v5** :

- Ancienne syntaxe de v4 comme `populate[image]=*` ou `populate[author][populate][avatar]=*` avec un champ inexistant.

### 3.2. Exemples concrets dans le projet

#### Activities (`/api/activities`)

**Mauvais (v4 + clé invalide en v5)** :

```text
/activities?populate[image]=*&populate[category]=*&populate[tags]=*
```

**Correct (v5)** :

```text
/activities?populate[0]=image&populate[1]=category&populate[2]=tags
```

Ou, si on accepte de tout peupler :

```text
/activities?populate=*
```

#### Blog posts (`/api/blog-posts`)

**Mauvais (v4)** :

```text
/blog-posts?sort[0]=date:desc&populate[author]=*&populate[category]=*&populate[image]=*
```

**Correct (v5)** :

```text
/blog-posts?sort[0]=date:desc&populate[0]=author&populate[1]=category&populate[2]=image
```

Ou bien, pour tout peupler à la racine :

```text
/blog-posts?sort[0]=date:desc&populate=*
```

### 3.3. Cas des erreurs de type `author.avatar`

Si Strapi renvoie :

```json
{
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "Invalid key avatar at author.avatar",
    "details": { "key": "avatar", "path": "author.avatar" }
  }
}
```

Alors :

1. **Vérifier le modèle** dans l’admin Strapi :
   - Ouvrir le content-type `author`.
   - Vérifier si un champ `avatar` existe encore.
   - Sinon, identifier le nouveau champ (ex. `image`, `picture`, etc.).
2. **Adapter la requête côté client** (Next.js) :
   - Supprimer `avatar` des paramètres `populate`.
   - Ou le remplacer par le nom réel du champ média (`image`, `photo`, ...).
3. Relancer la requête après modification.

Si le champ `avatar` doit exister fonctionnellement, le recréer dans Strapi via le Content-Type Builder, redéployer/redémarrer, puis retester.

## 4. Stratégie côté client : utiliser `@strapi/client`

### 4.1. Initialisation du client `@strapi/client`

On utilise désormais le SDK officiel [`@strapi/client`](https://github.com/strapi/client) comme point d’entrée unique pour toutes les requêtes HTTP vers Strapi.

Exemple d’initialisation (dans `lib/strapi-client.ts`) :

```ts
import { strapi as createStrapiClient } from "@strapi/client";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export const strapiClient = createStrapiClient({
  baseURL: `${STRAPI_URL.replace(/\/$/, "")}/api`,
  auth: STRAPI_API_TOKEN,
});
```

Bonnes pratiques :

- `baseURL` pointe toujours sur `/api` (pas sur la racine Strapi).
- `auth` reçoit un **API Token read-only** dédié au frontend.
- Le client est exporté depuis un seul module (`lib/strapi-client.ts`) et réutilisé partout.

### 4.2. Collections : `client.collection('resource')`

Pour les collection-types, on utilise le **Collection Resource Manager** :

```ts
const activities = await strapiClient.collection("activities").find({
  sort: "date:desc",
  populate: ["image", "category", "tags"],
});

const blogPosts = await strapiClient.collection("blog-posts").find({
  sort: "date:desc",
  populate: ["author", "category", "image"],
});
```

Règles :

- `resource` est le **nom pluralisé** du type (ex. `"blog-posts"`, `"activities"`).
- `find(params)` prend les mêmes `query params` que la REST API v5 : `sort`, `populate`, `filters`, `locale`, etc.
- La réponse suit la forme REST v5 : `{ data: T[], meta: {...} }`. On ne compte plus sur `attributes` (les champs sont à plat dans chaque entrée).

### 4.3. Singles : `client.single('resource')`

Pour les single-types (homepage, about-page, contact-page, etc.) on utilise le **Single Resource Manager** :

```ts
const homepage = await strapiClient.single("homepage").find();

const spanishHomepage = await strapiClient.single("homepage").find({
  locale: "es",
});
```

À appliquer dans ce projet pour :

- `homepage`, `about-page`, `teams-page`, `domains-page`, `join-page`, `gallery-page`,
- `testimonials-page`, `contact-page`, `contribute-page`,
- `global-setting` (navigation globale, footer, etc.).

### 4.4. Gestion du typage côté frontend

Même avec `@strapi/client`, on garde un **mapping typé** entre la réponse Strapi et les props de nos composants :

- On définit des interfaces locales (`Activity`, `BlogPostSummary`, `BlogRubricItem`, etc.).
- On déclare des types Strapi minimalistes pour ne prendre que ce dont on a besoin (ex. `StrapiActivity`, `StrapiBlogPost`).
- On ajoute une couche de transformation dédiée (ex. `mapStrapiActivities`, `mapBlogPosts`) pour :
  - formatter les dates (`toLocaleDateString`),
  - convertir des enums (`upcoming` → `"à venir"`),
  - gérer les URLs media relatives via un helper (`getStrapiMediaUrl`).

### 4.5. Historique : `fetchStrapi`

Le helper maison `fetchStrapi` reste présent pour compatibilité et pour d’éventuels appels très spécifiques, mais **la voie recommandée** est désormais `@strapi/client`.

## 5. Bonnes pratiques générales côté client

1. **Lire les messages d’erreur Strapi** :
   - Toujours regarder `error.message` et `error.details.path` pour comprendre quelle clé est rejetée.
2. **Être explicite dans `populate`** :
   - Préférer lister précisément les relations nécessaires plutôt que `*`, surtout quand le schéma évolue.
3. **Aligner le client sur le schéma** :
   - Dès qu’un champ ou une relation change dans Strapi, vérifier et adapter les requêtes frontend.
4. **Limiter les changements de syntaxe entre versions** :
   - Lors d’upgrade (v4 → v5), vérifier systématiquement la doc des query params (populate, filters, sort, etc.).
