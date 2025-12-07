# Règles d'Intégration Strapi

## Règle OBLIGATOIRE après modification de schéma

Quand des champs ou informations sont ajoutés ou modifiés dans un schéma Strapi, tu DOIS suivre ces étapes **dans l'ordre exact** :

### 1. Redémarrer Strapi
```bash
fuser -k 1337/tcp; sleep 3; npm run develop
```

### 2. Supprimer l'ancienne API spec
```bash
rm -f ./docs/api-spec.json
```

### 3. Régénérer la nouvelle API spec
```bash
npm run strapi openapi generate -- --output ./docs/api-spec.json
```

### 4. LIRE la spécification générée (CRITIQUE !)

**AVANT d'écrire le moindre code frontend**, tu DOIS OBLIGATOIREMENT :

1. **Localiser le content-type** dans `api-spec.json` :
   ```bash
   grep -n "nom-du-content-type" ./docs/api-spec.json | head -20
   ```

2. **Lire le schéma complet** (view_file sur ~300-500 lignes) pour comprendre :
   - Les noms exacts des champs
   - Les types de données  
   - La structure des relations et composants
   - Comment configurer le `populate`

### 5. Écrire le code frontend

Seulement APRÈS avoir lu et compris la spec générée :
- Créer/modifier le fichier `lib/strapi-*.ts`
- Utiliser les **noms de champs EXACTS** de la spec
- Configurer correctement le `populate` selon la structure

---

## Pourquoi c'est CRITIQUE ?

La spécification OpenAPI contient la **source de vérité** sur :
- Les endpoints exacts
- La structure complète des réponses
- Les relations et comment les populer
- Les types de chaque champ

**Sans lire la spec, tu risques :**
- D'utiliser des noms de champs incorrects
- De mal configurer les relations
- D'avoir des erreurs silencieuses (données nulles)

---

## Résumé

```
Modifier schéma → Restart Strapi → Supprimer spec → Régénérer spec → LIRE spec → Écrire frontend
```
