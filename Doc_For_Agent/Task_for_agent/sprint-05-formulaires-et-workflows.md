# Sprint 05 – Formulaires (contact, candidatures, dons) & workflows dans Strapi

## Objectif

Prendre en charge côté Strapi les **soumissions de formulaires** du site (contact, candidatures bénévoles/emplois, dons ou demandes de contact de don) afin que :
- les champs des formulaires soient **configurables** dans Strapi,
- les soumissions importantes puissent être **stockées et consultées** dans l’admin,
- la sécurité reste maîtrisée (permissions, anti-abus).

---

## 1. Modélisation des soumissions dans Strapi

**IMPORTANT - Vérification avant création** :
- Avant de créer les collections `contact-message`, `volunteer-application` et `donation-intent`, utiliser `list_content_types` pour vérifier si elles existent déjà.
- Si elles existent, vérifier le schéma avec `get_content_type_schema` et utiliser `update_content_type` si nécessaire.

**IMPORTANT - Gestion des timers Strapi** :
- S'assurer qu'**un seul timer est actif à la fois** lors des opérations Strapi.
- Attendre la fin complète de chaque opération avant d'en lancer une nouvelle.

Créer des Collection Types dédiés aux formulaires :

1. `contact-message`
   - Champs :
     - `firstName` (string, required)
     - `lastName` (string, required)
     - `email` (email, required)
     - `phone` (string, optional)
     - `subject` (string)
     - `message` (text, required)
     - `sourcePage` (string, ex: `/contact`)

2. `volunteer-application` (candidature "Nous rejoindre")
   - Champs :
     - `firstName` (string, required)
     - `lastName` (string, required)
     - `email` (email, required)
     - `phone` (string, required)
     - `opportunityType` (string ou enum, aligné avec `volunteer-opportunity`)
     - `motivation` (text, required)
     - `sourcePage` (string, ex: `/nous-rejoindre`)

3. `donation-intent` (intention de don, pour le `DonationModal`)
   - Champs :
     - `firstName` (string, required)
     - `lastName` (string, required)
     - `email` (email, required)
     - `phone` (string, required)
     - `type` (enum: `financial`, `material`, `contact`)
     - `amountLabel` (string, ex: `15 000 FCFA` ou `custom`)
     - `amountValue` (float, optionnel pour les montants numériques)
     - `materialCategory` (string, optionnel)
     - `materialDescription` (text, optionnel)
     - `message` (text, optionnel, pour type `contact`)
     - `sourcePage` (string, ex: `/contribuer`)

> Les trois collections servent uniquement à **stocker les soumissions**. La logique métier (paiement réel, redirections vers un PSP, etc.) reste hors scope de ce sprint.

---

## 2. Permissions Strapi pour les formulaires

1. Aller dans **Settings → Roles → Public** (ou créer un rôle/API Token spécifique aux formulaires si vous préférez un token côté serveur).
2. Donner uniquement :
   - `create` sur :
     - `contact-message`
     - `volunteer-application`
     - `donation-intent`
   - Ne pas donner `find`, `findOne`, `update`, `delete` à `Public` pour ces collections (les lire seulement depuis l’admin ou via un rôle protégé).
3. Vérifier que les autres collections restent en lecture seule pour le rôle Public (cf. Sprint 02).

---

## 3. Intégration formulaires frontend → Strapi

### 3.1. Formulaire Contact (`ContactForm`)

**IMPORTANT - Vérification avant tests** :
- Avant de tester les soumissions, vérifier que le content-type `contact-message` existe et est configuré correctement.
- Utiliser `get_entries` après chaque test pour vérifier que la soumission a bien été enregistrée.

1. Adapter le composant `ContactForm` pour qu'il **poste** vers Strapi, par exemple via :
   - Une **Route Handler Next.js** (`app/api/contact/route.ts`) qui :
     - reçoit le POST du formulaire,
     - fait un `POST /api/contact-messages` vers Strapi avec le `STRAPI_API_TOKEN` côté serveur,
     - renvoie une réponse simplifiée au frontend.
   - Ou un `fetch` direct côté client vers Strapi si vous acceptez d’exposer un endpoint public `create` (moins recommandé).

2. Champs à envoyer :
   - `firstName`, `lastName`, `email`, `phone`, `subject`, `message`, `sourcePage`.

3. Gérer les états :
   - `pending` (chargement),
   - `success` (message de confirmation),
   - `error` (erreurs réseau/validation).

### 3.2. Formulaire Candidature (`ApplicationForm`)

**IMPORTANT - Vérification avant tests** :
- Vérifier que `volunteer-application` existe avant de tester les soumissions.

1. Même principe que pour le contact :
   - Créer un handler Next.js `app/api/volunteer-application/route.ts`.
   - Ce handler envoie un `POST /api/volunteer-applications` vers Strapi.

2. Champs à envoyer :
   - `firstName`, `lastName`, `email`, `phone`, `opportunityType`, `motivation`, `sourcePage`.
   - `opportunityType` peut être une string libre ou issue d’une sélection basée sur `volunteer-opportunity` (Sprint 03).

3. Mettre à jour le composant `ApplicationForm` pour :
   - utiliser `onSubmit` asynchrone,
   - afficher un état de succès / erreur.

### 3.3. DonationModal (`DonationModal`)

**IMPORTANT - Vérification avant tests** :
- Vérifier que `donation-intent` existe avant de tester les soumissions.

1. Actuellement, le modal simule une API call. Modifier `handleSubmit` pour :
   - soit appeler `app/api/donation-intent/route.ts` côté Next.js,
   - soit appeler directement `POST /api/donation-intents` si un endpoint public est autorisé.

2. Payload minimal :
   - Infos personnelles (nom, email, téléphone + code pays),
   - `type` (financier / matériel / contact),
   - `amountLabel` et `amountValue` si applicable,
   - `materialCategory` + `materialDescription` si applicable,
   - `message` si type `contact`,
   - `sourcePage` (par ex. `"/contribuer"`).

3. Conserver la logique d’UI (step `form` → `success`) mais déclencher le passage à `success` **seulement après** une réponse 2xx de Strapi.

---

## 4. Rendre configurables les options de formulaires

1. Pour `ApplicationForm` (types d’opportunité) :
   - Remplacer la liste codée en dur par :
     - soit une lecture des `volunteer-opportunity` depuis Strapi,
     - soit un champ configuré dans `join-page` (ex: `opportunityOptions` en component simple).

2. Pour `DonationModal` (montants prédéfinis) :
   - Utiliser les `donationTiers` de `contribute-page` (Sprint 01/03) comme source :
     - fetch `contribute-page` côté serveur,
     - passer les montants au modal via props.

3. Pour Contact :
   - Si le formulaire propose un choix de sujet (général, partenariat, presse...), ce mapping peut provenir d’un component `contact.subject_option` dans `contact-page`.

---

## 5. Sécurité & bonnes pratiques spécifiques aux formulaires

1. **Validation côté backend** (Strapi) :
   - Marquer comme `required` les champs critiques (`email`, `message`, `motivation`, etc.).
   - Utiliser les validations de type Strapi (email, min length). 

2. **Protection contre abus** :
   - Côté frontend :
     - Désactiver le bouton submit pendant l’envoi,
     - Éventuellement ajouter un délai minimal entre deux soumissions.
   - Côté backend (optionnel, plus avancé) :
     - Utiliser un middleware custom ou une gateway (NGINX, CDN) pour limiter le taux de POST sur ces endpoints.

3. **Confidentialité** :
   - Restreindre l’accès lecture de `contact-message`, `volunteer-application`, `donation-intent` uniquement aux rôles admin/modérateurs.
   - Ne jamais exposer ces collections via un token read-only public.

4. **Notifications** (optionnel mais recommandé) :
   - Configurer un provider email Strapi et envoyer un mail interne à chaque nouvelle soumission (ou un résumé quotidien).

---

## Résultat attendu du sprint 05

- Les formulaires **Contact**, **Nous rejoindre** et **Don/Intention de don** créent des entrées dans Strapi.
- Les équipes peuvent consulter ces soumissions depuis l’admin Strapi, sans aller lire les logs ou la BDD directement.
- Les options de formulaires importantes (types de dons, types d’opportunité, éventuellement sujets de contact) sont **administrables dans Strapi**.
- Les permissions sont configurées pour limiter les risques d’abus et protéger les données soumises.