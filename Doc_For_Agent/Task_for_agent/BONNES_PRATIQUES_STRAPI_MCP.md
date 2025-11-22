# Bonnes pratiques Strapi avec MCP - Guide complet

## 1. Principes généraux de vérification

### 1.1. Toujours vérifier avant de créer

**RÈGLE D'OR** : Ne jamais créer un élément sans avoir vérifié son existence au préalable.

#### Vérifications requises :

1. **Content-Types** : Utiliser `list_content_types` puis `get_content_type_schema` pour vérifier
2. **Components** : Utiliser `list_components` puis `get_component_schema` pour vérifier  
3. **Entries** : Utiliser `get_entries` avec des filtres appropriés

#### Processus de décision :

```
Vérifier existence
    ↓
Existe ? → OUI → Comparer schéma actuel vs souhaité
    ↓              ↓
   NON            Identique ? → OUI → Réutiliser tel quel
    ↓              ↓
Créer            Différent ? → OUI → Utiliser update_*
                                    ou delete + recréer si nécessaire
```

### 1.2. Gestion des timers et processus Strapi

**PROBLÈME CONNU** : Erreur `Timer "cleaningDist..." already started, cannot overwrite`

#### Causes :
- Plusieurs instances de `npm run develop` ou `npm run build` lancées simultanément
- Red démarrage de Strapi avant l'arrêt complet du processus précédent
- Timers de nettoyage qui persistent en mémoire

#### Solutions préventives :

1. **Un seul timer actif** : S'assurer qu'une seule commande Strapi tourne à la fois
2. **Attente entre opérations** : Patienter jusqu'à l'arrêt complet avant de relancer
3. **Arrêt propre** : Utiliser `Ctrl+C` proprement, puis attendre la fin des processus
4. **Nettoyage manuel** : En cas de blocage, supprimer `.tmp/` et `dist/`

#### Commandes sûres :

```bash
# Arrêter Strapi proprement
Ctrl+C
# Attendre 5-10 secondes
# Vérifier qu'aucun processus ne tourne
ps aux | grep strapi
# Nettoyer si nécessaire
rm -rf bininye/.tmp bininye/dist
# Relancer
npm --prefix bininye run develop
```

---

## 2. Content-Types : Création et gestion

### 2.1. Schéma des Content-Types

#### Structure minimale requise :

```json
{
  "kind": "collectionType",  // ou "singleType"
  "collectionName": "nom_table_db",
  "info": {
    "singularName": "nom-singulier",  // kebab-case obligatoire
    "pluralName": "noms-pluriels",    // kebab-case obligatoire
    "displayName": "Nom Affiché"
  },
  "options": {
    "draftAndPublish": true  // true par défaut
  },
  "pluginOptions": {
    "content-manager": {
      "visible": true  // Important pour la visibilité
    },
    "content-type-builder": {
      "visible": true
    }
  },
  "attributes": {
    // Vos attributs ici
  }
}
```

### 2.2. Validation des attributs

#### Types d'attributs disponibles :

- **String types** : `string`, `text`, `richtext`, `enumeration`, `email`, `password`, `uid`
- **Date types** : `date`, `time`, `datetime`, `timestamp`
- **Number types** : `integer`, `biginteger`, `float`, `decimal`
- **Other** : `boolean`, `json`, `media`
- **Strapi-specific** : `relation`, `component`, `dynamiczone`, `customField`

#### Validations de base :

```json
{
  "attributes": {
    "title": {
      "type": "string",
      "required": true,      // Champ obligatoire
      "unique": true,        // Unicité au niveau app
      "minLength": 3,
      "maxLength": 255
    },
    "email": {
      "type": "email",
      "required": true,
      "private": false       // false = exposé dans l'API
    },
    "slug": {
      "type": "uid",
      "targetField": "title" // Génération automatique basée sur title
    }
  }
}
```

#### Validations au niveau base de données (avancé) :

```json
{
  "attributes": {
    "title": {
      "type": "string",
      "unique": true,
      "column": {
        "unique": true,      // Contrainte DB en plus
        "notNullable": true  // Contrainte NOT NULL en DB
      }
    }
  }
}
```

### 2.3. Draft & Publish

**Important** : Le système Draft & Publish affecte la validation `unique`.

- Les **drafts** ne sont **pas vérifiés** pour l'unicité
- L'erreur de doublon apparaît seulement **à la publication**

**Solutions** :
1. Désactiver Draft & Publish si l'unicité globale est critique
2. Ajouter une validation custom (lifecycle hooks)
3. Utiliser des UID auto-générés

---

## 3. Components : Création et réutilisation

### 3.1. Structure des components

#### Namespaces et organisation :

- Utiliser des **namespaces logiques** : `shared`, `contact`, `activity`, etc.
- Format de référence : `namespace.component-name`

```json
{
  "collectionName": "components_shared_values",
  "info": {
    "displayName": "Value",
    "icon": "star"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "iconKey": {
      "type": "string"
    }
  }
}
```

### 3.2. Utilisation dans les Content-Types

#### Component simple :

```json
{
  "attributes": {
    "contactInfo": {
      "type": "component",
      "repeatable": false,
      "component": "contact.contact-info"
    }
  }
}
```

#### Component repeatable :

```json
{
  "attributes": {
    "faqs": {
      "type": "component",
      "repeatable": true,
      "component": "shared.faq-item"
    }
  }
}
```

### 3.3. Vérification avant création

```javascript
// Étape 1 : Lister les components existants
list_components()

// Étape 2 : Vérifier le schéma d'un component spécifique
get_component_schema("shared.value")

// Étape 3 : Décision
// - Si existe et schéma OK → Réutiliser
// - Si existe mais schéma différent → update_component
// - Si n'existe pas → create_component
```

---

## 4. Relations entre Content-Types

### 4.1. Types de relations

| Type | Description | Exemple |
|------|-------------|---------|
| **oneToOne** | 1:1 | User ↔ Profile |
| **oneToMany** | 1:N | Category → Articles |
| **manyToOne** | N:1 | Articles → Category |
| **manyToMany** | N:N | Articles ↔ Tags |

### 4.2. Syntaxe des relations

```json
{
  "attributes": {
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category",
      "inversedBy": "articles"
    },
    "tags": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::tag.tag",
      "inversedBy": "articles"
    }
  }
}
```

### 4.3. Relations avec Single Types

```json
{
  "attributes": {
    "highlightedEvents": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::activity.activity"
    }
  }
}
```

---

## 5. Entries : CRUD operations avec MCP

### 5.1. Création d'entrées

#### Vérifier avant de créer :

```javascript
// 1. Vérifier l'existence par un champ unique (ex: slug ou titre)
get_entries("api::article.article", 
  '{"filters":{"slug":{"$eq":"mon-article"}}}')

// 2. Si n'existe pas, créer
create_entry("api::article.article", {
  "title": "Mon Article",
  "slug": "mon-article",
  "content": "Contenu..."
})

// 3. Si existe, décider : update ou skip
```

### 5.2. Mise à jour d'entrées

```javascript
// Toujours récupérer l'ID avant update
const entries = get_entries("api::article.article", 
  '{"filters":{"slug":{"$eq":"mon-article"}}}')

// Puis update avec l'ID
update_entry("api::article.article", entries[0].id, {
  "title": "Titre Modifié"
})
```

### 5.3. Relations dans les entrées

#### Connecter des relations :

```javascript
connect_relation(
  "api::homepage.homepage",  // content-type principal
  "1",                       // ID de l'entrée principale
  "highlightedEvents",       // champ de relation
  ["5", "7", "12"]          // IDs des entrées à lier
)
```

#### Déconnecter des relations :

```javascript
disconnect_relation(
  "api::homepage.homepage",
  "1",
  "highlightedEvents",
  ["7"]  // Retirer l'événement ID 7
)
```

---

## 6. Media Library : Upload et gestion

### 6.1. Upload de fichiers

#### Méthode 1 : Base64 (fichiers < 750KB) :

```javascript
upload_media(
  base64EncodedData,
  "nom-fichier.jpg",
  "image/jpeg"
)
```

#### Méthode 2 : Depuis un chemin (fichiers < 10MB) :

```javascript
upload_media_from_path(
  "/chemin/vers/fichier.jpg",
  "nom-personnalise.jpg",  // optionnel
  "image/jpeg"             // optionnel, auto-détecté
)
```

### 6.2. Limites et bonnes pratiques

- **Taille max Base64** : ~750KB (1MB encodé)
- **Taille max Path** : 10MB
- **Auto-détection MIME** : Préférer `upload_media_from_path` sans spécifier le type
- **Nommage** : Utiliser des noms descriptifs et kebab-case

### 6.3. Lier les médias aux entrées

```javascript
// Après upload, récupérer l'ID du média
const mediaId = uploadResult.id

// Créer ou update l'entrée avec le média
create_entry("api::article.article", {
  "title": "Article avec image",
  "image": mediaId  // Champ de type 'media'
})
```

---

## 7. Permissions et sécurité

### 7.1. Rôles et permissions

#### Configuration minimale pour le frontend :

**Rôle Public** :
- `find` et `findOne` sur les collections de lecture
- **Jamais** de `create`, `update`, `delete` sur Public
- Préférer un **API Token Read-Only**

#### API Token Read-Only :

```
Settings → API Tokens → Create New Token
- Name: frontend-read-only
- Type: Read-only
- Scope: Sélectionner uniquement les collections nécessaires
```

**Usage côté frontend** :

```javascript
fetch('/api/articles', {
  headers: {
    'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
  }
})
```

### 7.2. Formulaires publics

Pour les formulaires (contact, candidatures, dons) :

**Rôle Public** :
- `create` UNIQUEMENT sur les collections de soumissions
- Jamais de `find`, `findOne`, `update`, `delete`

**Exemple** :

```
Public → contact-message → create: ✓
Public → contact-message → find: ✗
```

### 7.3. CORS et sécurité

```javascript
// bininye/config/middlewares.ts
export default [
  // ...
  {
    name: 'strapi::cors',
    config: {
      origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
      credentials: true
    }
  }
]
```

---

## 8. Variables d'environnement

### 8.1. Variables essentielles

```env
# Server
HOST=0.0.0.0
PORT=1337

# App Keys (générer avec openssl rand -base64 32)
APP_KEYS=key1,key2,key3,key4

# Database (SQLite par défaut)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Pour PostgreSQL/MySQL
# DATABASE_CLIENT=postgres
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_NAME=strapi
# DATABASE_USERNAME=strapi
# DATABASE_PASSWORD=strapi
# DATABASE_SSL=false

# Admin JWT
ADMIN_JWT_SECRET=secret_generated
API_TOKEN_SALT=salt_generated
TRANSFER_TOKEN_SALT=salt_generated

# Encryption
ENCRYPTION_KEY=key_generated

# CORS
CORS_ORIGIN=http://localhost:3000,https://www.bininye.com
```

### 8.2. Bonnes pratiques

1. **Ne JAMAIS committer** les fichiers `.env`
2. **Générer des secrets robustes** : `openssl rand -base64 32`
3. **Différencier** : dev, staging, production
4. **Documenter** : créer un `.env.example`

---

## 9. Checklist de vérification avant chaque action

### Avant de créer un Content-Type :

- [ ] Vérifier avec `list_content_types` si existe déjà
- [ ] Si existe, comparer schéma avec `get_content_type_schema`
- [ ] Valider les noms (singularName, pluralName en kebab-case)
- [ ] Vérifier la visibilité (`pluginOptions`)
- [ ] S'assurer qu'aucun Strapi dev ne tourne déjà

### Avant de créer un Component :

- [ ] Vérifier avec `list_components` si existe déjà
- [ ] Choisir le bon namespace
- [ ] Définir si `repeatable` ou non
- [ ] S'assurer de la réutilisabilité

### Avant de créer des Entries :

- [ ] Vérifier l'existence par un champ unique (slug, email, etc.)
- [ ] Valider les relations avant de les lier
- [ ] Uploader les médias AVANT de créer l'entrée
- [ ] Vérifier les permissions pour la création

### Avant de lancer Strapi :

- [ ] Aucun autre processus Strapi ne tourne
- [ ] Variables d'environnement correctes
- [ ] Base de données accessible
- [ ] `.tmp/` et `dist/` propres si problème précédent

---

## 10. Erreurs fréquentes et résolutions

### 10.1. Timer "cleaningDist..." already started

**Solution** :
```bash
# 1. Arrêter Strapi (Ctrl+C)
# 2. Tuer les processus restants
pkill -f strapi
# 3. Nettoyer
rm -rf bininye/.tmp bininye/dist
# 4. Relancer
npm --prefix bininye run develop
```

### 10.2. Content-Type n'apparaît pas dans l'admin

**Solutions** :
1. Vérifier `pluginOptions.content-manager.visible = true`
2. Vérifier `pluginOptions.content-type-builder.visible = true`
3. Rebuild l'admin : `npm run build`
4. Vider le cache navigateur

### 10.3. Erreur "documentId" not found

**Cause** : Utilisation d'API v4 au lieu de v5

**Solution** : Utiliser Document Service API (v5) :
```javascript
// Strapi v5
strapi.documents('api::article.article').findMany()

// Au lieu de (v4)
strapi.entityService.findMany('api::article.article')
```

### 10.4. Unicité non respectée en Draft

**Cause** : Draft & Publish skip les validations `unique`

**Solutions** :
1. Désactiver Draft & Publish si unicité critique
2. Ajouter validation custom dans lifecycle hooks
3. Utiliser des UID auto-générés

---

## 11. Workflow recommandé avec MCP

### Phase 1 : Planification
1. Lister tous les content-types nécessaires
2. Identifier les components réutilisables
3. Définir les relations entre types
4. Créer un schéma de données sur papier/diagramme

### Phase 2 : Vérification
1. `list_content_types` → Identifier l'existant
2. `list_components` → Identifier les components existants
3. Comparer avec le plan → Déterminer ce qui manque

### Phase 3 : Création
1. Créer les components d'abord (réutilisables)
2. Puis les content-types (qui utilisent les components)
3. Vérifier dans l'admin après chaque création
4. S'assurer qu'un seul timer Strapi tourne

### Phase 4 : Population
1. Uploader les médias en premier
2. Créer les entrées de base (catégories, tags, etc.)
3. Créer les entrées principales avec relations
4. Connecter les relations

### Phase 5 : Test et validation
1. Tester les endpoints REST API
2. Vérifier les permissions
3. Tester les formulaires publics
4. Valider les relations

---

## 12. Commandes utiles

```bash
# Lister les content-types
npm --prefix bininye run strapi content-types:list

# Lister les routes
npm --prefix bininye run strapi routes:list

# Lister les policies
npm --prefix bininye run strapi policies:list

# Lister les services
npm --prefix bininye run strapi services:list

# Rebuild l'admin
npm --prefix bininye run build

# Watch (dev mode)
npm --prefix bininye run develop

# Production
npm --prefix bininye run start

# Console Strapi (accès programmatique)
npm --prefix bininye run console
```

---

## Conclusion

**Les 3 règles d'or pour travailler avec Strapi via MCP** :

1. ✅ **Toujours vérifier avant de créer** (éviter doublons et conflits)
2. ⏱️ **Un seul timer Strapi à la fois** (éviter les erreurs de timer)
3. 🔒 **Sécuriser les permissions** (read-only public, create limité aux formulaires)

En suivant ces bonnes pratiques, vous minimiserez les erreurs et assurerez une configuration stable et sécurisée de votre instance Strapi.
