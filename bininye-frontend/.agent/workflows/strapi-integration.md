---
description: Workflow d'intégration Strapi - Règles obligatoires après modification de schéma
---

# Workflow d'Intégration Strapi

## Règles OBLIGATOIRES après toute modification de schéma Strapi

Après avoir modifié un schéma ou créé un composant dans Strapi, tu DOIS suivre ces étapes **dans l'ordre exact** :

### Étape 1 : Redémarrer Strapi
```bash
# Arrêter le processus existant
kill $(lsof -t -i:1337) 2>/dev/null
# ou
fuser -k 1337/tcp

# Attendre et redémarrer
sleep 3
npm run develop
```

### Étape 2 : Supprimer l'ancienne API spec
```bash
rm -f ./docs/api-spec.json
```

### Étape 3 : Régénérer la nouvelle API spec
```bash
npm run strapi openapi generate -- --output ./docs/api-spec.json
```

### Étape 4 : LIRE la spécification générée (CRITIQUE !)
**AVANT d'écrire le moindre code frontend**, tu DOIS :

1. **Localiser le content-type** dans `api-spec.json` :
   ```bash
   grep -n "nom-du-content-type" ./docs/api-spec.json | head -20
   ```

2. **Lire le schéma complet** pour comprendre :
   - Les noms exacts des champs
   - Les types de données
   - La structure des relations
   - Les composants imbriqués

3. **Extraire la section pertinente** (exemple pour contribute-page) :
   ```bash
   # Trouver le numéro de ligne
   grep -n '"/contribute-page"' ./docs/api-spec.json
   # Puis view_file sur les ~500 lignes suivantes
   ```

### Étape 5 : Écrire le code frontend
Seulement APRÈS avoir lu et compris la spec, tu peux :
- Créer/modifier le fichier `lib/strapi-*.ts`
- Utiliser les noms de champs EXACTS de la spec
- Configurer correctement le `populate` selon la structure

---

## Pourquoi c'est important ?

La spécification OpenAPI générée par Strapi contient :
- Les **noms exacts** des endpoints
- La **structure complète** des réponses
- Les **relations** et comment les populer
- Les **types** de chaque champ

**Sans lire la spec, tu risques :**
- D'utiliser des noms de champs incorrects
- De mal configurer les relations
- D'avoir des erreurs silencieuses (données nulles)

---

## Exemple concret

❌ **MAUVAIS** (ce qu'il ne faut PAS faire) :
1. Modifier le schéma Strapi
2. Redémarrer Strapi
3. Régénérer l'API spec
4. **Écrire le code frontend directement** ← ERREUR !

✅ **BON** (ce qu'il FAUT faire) :
1. Modifier le schéma Strapi
2. Redémarrer Strapi
3. Régénérer l'API spec
4. **LIRE la spec** pour voir la structure exacte
5. Écrire le code frontend en se basant sur la spec
