---
description: Workflow d'intégration Strapi - Règles obligatoires après modification de schéma
---

# Workflow Intégration Strapi

## Règles obligatoires après modification d'un schéma Strapi

Quand des champs ou informations sont ajoutés ou modifiés dans un schéma Strapi, tu DOIS suivre ces étapes :

### 1. Redémarrer Strapi
```bash
// turbo
fuser -k 1337/tcp 2>/dev/null; sleep 2; npm run develop
```
Cela permet à Strapi de générer les nouveaux content-types et structures.

### 2. Supprimer l'ancienne spécification API
```bash
// turbo
rm -f ./docs/api-spec.json
```

### 3. Régénérer la spécification API
```bash
// turbo
npm run strapi openapi generate -- --output ./docs/api-spec.json
```

### 4. Consulter la nouvelle spécification
Toujours utiliser la spécification API nouvellement générée pour :
- Comprendre la structure des données
- Implémenter le fetch côté frontend
- Vérifier les noms de champs exacts

## Checklist rapide
- [ ] Schéma modifié
- [ ] Strapi redémarré
- [ ] Ancienne API spec supprimée
- [ ] Nouvelle API spec générée
- [ ] Frontend mis à jour selon la nouvelle spec
