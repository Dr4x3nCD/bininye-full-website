# WORKFLOW D'INTÉGRATION STRAPI → NEXT.JS

Ce document décrit **notre nouvelle façon de travailler** pour intégrer les données Strapi dans le frontend Next.js.

> [!IMPORTANT]
> **Changement majeur** : Nous n'utilisons plus le MCP Strapi pour interagir avec le CMS. Toute modification du modèle de données se fait directement dans Strapi (admin panel ou fichiers schema.json), suivi d'un redémarrage du serveur et d'une régénération de la documentation OpenAPI.

---

## 1. Architecture du projet

```
bininye/                          ← Backend Strapi v5
├── src/api/                      ← Content-types (26 types)
├── docs/api-spec.json            ← Documentation OpenAPI générée
└── ...

bininye-frontend/                 ← Frontend Next.js
├── lib/
│   ├── strapi-client.ts          ← SDK Strapi centralisé
│   ├── strapi-*.ts               ← Fonctions de fetch par domaine
│   └── *-data.ts                 ← Données statiques (à migrer)
├── app/                          ← Pages Next.js
└── components/                   ← Composants React
```

---

## 2. Cycle de travail pour les modifications Strapi

### Étape 1 : Modifier le modèle dans Strapi

**Via l'admin panel** (recommandé pour les changements simples) :
1. Ouvrir `http://localhost:1337/admin`
2. Aller dans **Content-Type Builder**
3. Modifier/créer le content-type
4. Sauvegarder (le serveur redémarre automatiquement)

**Via les fichiers schema.json** (pour les changements complexes) :
1. Éditer `bininye/src/api/[nom]/content-types/[nom]/schema.json`
2. Redémarrer Strapi : `npm run develop`

### Étape 2 : Régénérer la documentation OpenAPI

```bash
cd bininye
npm run strapi openapi generate -- --output ./docs/api-spec.json
```

Cette commande génère un fichier `api-spec.json` documentant tous les endpoints disponibles.

### Étape 3 : Lire la documentation OpenAPI

Consulter `bininye/docs/api-spec.json` pour comprendre :
- Les **champs disponibles** (`fields`)
- Les **relations à peupler** (`populate`)
- Les **filtres possibles** (`filters`)
- La **structure de réponse** (`data`, `meta`)

### Étape 4 : Implémenter dans le frontend

1. Créer/modifier le fichier `lib/strapi-[domaine].ts`
2. Utiliser le **SDK Strapi** (`@strapi/client`)
3. Mapper les types Strapi vers les types frontend
4. Intégrer dans les composants/pages

---

## 3. Utilisation du SDK Strapi

### Configuration centralisée

Le client est configuré dans `lib/strapi-client.ts` :

```typescript
import { strapi as createStrapiClient } from "@strapi/client";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export const strapiClient = createStrapiClient({
  baseURL: `${STRAPI_URL.replace(/\/$/, "")}/api`,
  auth: STRAPI_API_TOKEN,
});
```

### Collection Types (plusieurs entrées)

```typescript
// Exemple : récupérer les activités
const activities = await strapiClient.collection("activities").find({
  sort: "date:desc",
  populate: ["image", "category", "tags"],
});
```

### Single Types (une seule entrée)

```typescript
// Exemple : récupérer la homepage
const homepage = await strapiClient.single("homepage").find({
  populate: "*",
});
```

---

## 4. Syntaxe `populate` en Strapi v5

> [!CAUTION]
> Strapi v5 valide strictement les paramètres. Une clé invalide retourne `400 Bad Request`.

### Syntaxes valides

| Besoin | Syntaxe |
|--------|---------|
| Tout peupler (niveau 1) | `populate: "*"` |
| Relations spécifiques | `populate: ["image", "category", "author"]` |
| Relations imbriquées | Via l'objet de configuration (voir doc) |

### Exemples concrets

```typescript
// Collection avec relations
const posts = await strapiClient.collection("blog-posts").find({
  sort: ["date:desc"],
  populate: ["author", "category", "image"],
});

// Single type avec toutes les relations
const aboutPage = await strapiClient.single("about-page").find({
  populate: "*",
});
```

---

## 5. Structure des fichiers d'intégration

Chaque domaine a son fichier dédié dans `lib/` :

```
lib/
├── strapi-client.ts          ← Configuration centralisée
├── strapi-about.ts           ← Intégration page "Qui sommes-nous"
├── strapi-activities.ts      ← Intégration activités
├── strapi-blog.ts            ← Intégration blog
├── strapi-domains.ts         ← Intégration domaines d'action
├── strapi-gallery.ts         ← Intégration médiathèque
├── strapi-homepage.ts        ← Intégration page d'accueil
├── strapi-team.ts            ← Intégration équipe
└── strapi-testimonials.ts    ← Intégration témoignages
```

### Pattern recommandé pour chaque fichier

```typescript
// lib/strapi-[domaine].ts

import { strapiClient, getStrapiMediaUrl } from "./strapi-client";

// 1. Types Strapi (ce que l'API retourne)
interface StrapiEntity {
  documentId: string;
  // ... champs Strapi
}

// 2. Types Frontend (ce que les composants utilisent)
export interface Entity {
  id: string;
  // ... champs mappés
}

// 3. Fonction de fetch
export async function getEntities(): Promise<Entity[]> {
  const response = await strapiClient.collection("entities").find({
    populate: ["image"],
  });
  
  return response.data.map(mapStrapiEntity);
}

// 4. Fonction de mapping
function mapStrapiEntity(strapi: StrapiEntity): Entity {
  return {
    id: strapi.documentId,
    // ... mapping des champs
    imageUrl: getStrapiMediaUrl(strapi.image?.url),
  };
}
```

---

## 6. Content-types disponibles

### Single Types (pages)
| Type | Endpoint | Usage |
|------|----------|-------|
| `homepage` | `/homepage` | Page d'accueil |
| `about-page` | `/about-page` | Qui sommes-nous |
| `teams-page` | `/teams-page` | Page équipes |
| `domains-page` | `/domains-page` | Page domaines |
| `join-page` | `/join-page` | Nous rejoindre |
| `gallery-page` | `/gallery-page` | Médiathèque |
| `testimonials-page` | `/testimonials-page` | Témoignages |
| `contact-page` | `/contact-page` | Contact |
| `contribute-page` | `/contribute-page` | Contribuer |
| `global-setting` | `/global-setting` | Navigation, footer |

### Collection Types (listes)
| Type | Endpoint | Usage |
|------|----------|-------|
| `activity` | `/activities` | Activités |
| `activity-category` | `/activity-categories` | Catégories d'activités |
| `blog-post` | `/blog-posts` | Articles de blog |
| `blog-category` | `/blog-categories` | Catégories de blog |
| `blog-rubric` | `/blog-rubrics` | Rubriques de blog |
| `author` | `/authors` | Auteurs |
| `domain` | `/domains` | Domaines d'action |
| `team-member` | `/team-members` | Membres de l'équipe |
| `testimonial` | `/testimonials` | Témoignages |
| `media-item` | `/media-items` | Éléments médiathèque |
| `partner` | `/partners` | Partenaires |
| `volunteer-opportunity` | `/volunteer-opportunities` | Opportunités bénévolat |
| `volunteer-story` | `/volunteer-stories` | Histoires bénévoles |
| `volunteer-application` | `/volunteer-applications` | Candidatures |
| `contact-message` | `/contact-messages` | Messages contact |
| `donation-intent` | `/donation-intents` | Intentions de don |

---

## 7. Checklist d'intégration par page

### Pour chaque page à intégrer :

- [ ] **Lire** la doc OpenAPI pour connaître les champs disponibles
- [ ] **Créer** le fichier `lib/strapi-[page].ts` si nécessaire
- [ ] **Définir** les types TypeScript (Strapi + Frontend)
- [ ] **Implémenter** la fonction de fetch avec le bon `populate`
- [ ] **Mapper** les données vers le format du composant
- [ ] **Modifier** la page pour utiliser les données Strapi
- [ ] **Supprimer** les imports des données statiques `*-data.ts`
- [ ] **Tester** l'affichage avec des données réelles

---

## 8. Commandes utiles

```bash
# Démarrer Strapi en mode développement
cd bininye && npm run develop

# Démarrer Next.js en mode développement
cd bininye-frontend && pnpm run dev

# Régénérer la documentation OpenAPI
cd bininye && npm run strapi openapi generate -- --output ./docs/api-spec.json

# Lister les content-types
cd bininye && npm run strapi content-types:list

# Lister les routes
cd bininye && npm run strapi routes:list
```

---

## 9. Résolution de problèmes courants

### Erreur `400 Bad Request` avec `populate`

**Cause** : Clé de relation invalide ou inexistante.

**Solution** :
1. Vérifier dans `api-spec.json` les champs `populate` disponibles
2. Utiliser uniquement les noms de relations définis dans le schéma

### Erreur `401 Unauthorized`

**Cause** : Token API manquant ou invalide.

**Solution** :
1. Vérifier la variable `STRAPI_API_TOKEN` dans `.env`
2. Vérifier que le token a les permissions read sur les content-types

### Images non affichées

**Cause** : URL relative retournée par Strapi.

**Solution** : Utiliser le helper `getStrapiMediaUrl(url)` pour convertir en URL absolue.

---

## 10. Prochaines étapes

Les fichiers `*-data.ts` suivants contiennent encore des données statiques à migrer :

| Fichier | Statut | Notes |
|---------|--------|-------|
| `activities-data.ts` | 🔄 Partiel | Certaines données encore statiques |
| `blog-data.tsx` | 🔄 Partiel | Rubriques et mostRead à migrer |
| `domains-data.ts` | 🔄 Partiel | IconMap local, reste à migrer |
| `menu-data.ts` | ❌ À migrer | Utiliser global-setting |
