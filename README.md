# Géoportail personnalisé – Limites administratives Côte d'Ivoire

Interface cartographique inspirée du [Géoportail ANSTAT](https://geoportail.anstat.ci/), utilisant les données du dossier **limite administrative** (régions, départements, districts).

## Fonctionnalités

- Carte interactive (Leaflet) centrée sur la Côte d'Ivoire
- Couches : **Régions**, **Départements**, **Districts** (activation/désactivation dans le panneau)
- Survol et clic sur une zone pour afficher les informations (Pays, District, Région, Préfecture)
- Fond de carte sombre (CARTO Dark)

## Structure

```
geoportail-perso/
├── index.html
├── css/style.css
├── js/app.js
├── data/
│   ├── region.js
│   ├── departement.js
│   └── district.js
└── README.md
```

## Utilisation en local

Ouvrir `index.html` dans un navigateur. Pour éviter les restrictions CORS sur le chargement des scripts, servir le dossier avec un serveur local, par exemple :

```bash
npx serve .
# ou
python -m http.server 8000
```

Puis aller sur `http://localhost:3000` (ou 8000).

## Publication sur GitHub

Le dépôt Git est déjà initialisé avec un premier commit. Pour publier sur **votre GitHub** :

### 1. Créer un nouveau dépôt sur GitHub

- Allez sur [github.com/new](https://github.com/new).
- Nom du dépôt : par ex. **geoportail-civ** (sans initialiser avec README).

### 2. Lier et pousser le projet

Dans un terminal, depuis le dossier `geoportail-perso` :

Dépôt : **[github.com/AMAUDE/geoportail](https://github.com/AMAUDE/geoportail)** (déjà poussé).

### 3. Activer GitHub Pages (pour publier le site en ligne)

- Dans le dépôt : **Settings** → **Pages**.
- Source : **Deploy from a branch**.
- Branch : **main** → **/ (root)** → **Save**.
- La carte sera en ligne à : **https://amaude.github.io/geoportail/**

## Données

Les couches GeoJSON (régions, départements, districts) proviennent du dossier **limite administrative** du projet.

## Licence

Données et code à usage personnel / éducatif. Vérifier les conditions d’utilisation des données sources.
