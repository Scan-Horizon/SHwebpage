# Site scan-horizon.com

Site vitrine de l'application ScanHorizon (SAS SCAN HORIZON), construit avec [Astro](https://astro.build) et publié par Cloudflare Pages.

## Organisation

| Dossier | Contenu |
| --- | --- |
| `src/pages/` | Pages construites par Astro : accueil FR/EN (`fr/index.astro`, `en/index.astro`), pages Télécharger (`fr/telecharger.astro`, `en/download.astro`), les 8 pages légales (`[lang]/[slug].astro`) et la page 404. |
| `src/legal/fr/`, `src/legal/en/` | Textes légaux v2.1, **copiés mot pour mot** de la version validée. Ne pas les modifier sans accord : ce sont des textes opposables. |
| `src/layouts/`, `src/components/` | Gabarit commun, en-tête (avec le bouton vision nocturne), pied de page, badges des stores, page Télécharger. |
| `src/components/home/` | Blocs de l'accueil : démo du scanner (`ScanDemo`), compteur en direct, carrousel 3D des cartes, globe des clans, carte Business Class. |
| `src/scripts/globe-runtime.ts`, `src/data/globe-110m.json` | Dessin du globe et carte du monde (côtes et frontières Natural Earth, reprises de l'app par `scripts/gen-globe-data.mjs`). |
| `public/img/scan/` | Bouton et animations du scan, repris de l'app (`assets/logos/`), réduits pour le web. |
| `src/data/home.ts` | Textes de l'accueil FR/EN et liste des cartes du carrousel. |
| `src/styles/tokens.css` | Couleurs, polices, rayons et espacements, repris de l'app (`lib/theme/app_colors.dart`). |
| `src/data/site.ts` | Adresses des pages légales, liens des stores, libellés FR/EN. |
| `public/` | Fichiers publiés tels quels : page d'aiguillage `index.html` (envoie vers `/fr/` ou `/en/`), images, QR codes (`img/`), `app-ads.txt`, `robots.txt`, `sitemap.xml`, `llms.txt`, `_headers`. |
| `design/originaux/` | Images sources en haute définition (non publiées). |

## Commandes

```bash
npm install        # une seule fois
npm run dev        # aperçu local sur http://localhost:4321
npm run build      # construit dist/ puis lance les contrôles (scripts/check-dist.mjs)
```

`npm run build` échoue si un fichier indispensable manque (`app-ads.txt`, pages légales...), si `app-ads.txt` est modifié en route, ou si le texte d'une page légale ne correspond plus à sa source.

## Mise en ligne

- Cloudflare Pages, projet `scanhorizon-site` : commande `npm run build`, dossier `dist`, Node indiqué par `.node-version`.
- Chaque PR reçoit un lien d'aperçu ; un merge dans `main` met le site en ligne en 1 à 2 minutes.
- Retour arrière : Cloudflare, projet `scanhorizon-site`, onglet **Deployments**, menu **…** d'un déploiement précédent, **Rollback to this deployment**.

## Anciens liens

L'app et l'e-mail de suppression de compte pointent vers `scan-horizon.com/#privacy`, `#terms`, `#legal` et `#delete`. Ces ancres redirigent vers les pages légales, depuis `/`, `/fr/` et `/en/`. **Ces redirections doivent rester pour toujours** : d'anciennes versions de l'app et des e-mails déjà envoyés utilisent ces liens. Les adresses sont définies dans `src/data/site.ts` (utilisé par l'accueil) et répétées dans `public/index.html` : les garder synchronisées.

## Accueil

- **Démo du scanner** (haut de page) : un avion traverse le viseur, le visiteur touche le bouton Scan de l'app, l'animation de chargement de l'app tourne (`load.webp` puis `caught.webp`), puis une carte tirée au hasard apparaît. Les étapes Vise, Scanne, Collectionne s'allument au fil de la démo. Les animations ne se chargent qu'une fois la page affichée.
- **Compteur en direct** : lit `/api/stats/scans-count` du service Railway `diffusion` (cache serveur de 5 minutes). Il essaie d'abord Railway en direct, puis des relais publics si le navigateur refuse l'appel. Pour supprimer les relais : ajouter `https://scan-horizon.com` à la variable `CORS_ALLOWED_ORIGINS` du service `diffusion` (liste séparée par des virgules). En cas d'échec, il garde la dernière valeur connue.
- **Cartes du carrousel** : `src/data/home.ts`. Une carte par rareté, plus une carte Événement en silhouette, sans aucun indice sur la façon de l'obtenir.
- **Vision nocturne** : un filtre CSS sur toute la page (`src/styles/global.css`), mémorisé dans le navigateur.
- **Globe** : comme l'onglet Explorer de l'app (mêmes couleurs, pastilles d'aéroports, avions sur leurs routes). Il se fait tourner à la souris, au doigt ou aux flèches, et ne se charge qu'à l'approche de la section. Les aéroports affichés sont une illustration, pas des données en direct.
- **Carte Business Class** : la carte de l'app (`business_class_card.dart`, couleurs `BusinessCardPalette.gold`), refaite en HTML. Elle s'incline avec la souris et se retourne pour montrer les avantages.
- **Animations** : si le système demande moins d'animations, la démo passe directement à la carte, le globe ne tourne plus tout seul et le carrousel reste immobile.
- **Lien à partager** : `scan-horizon.com/fr/telecharger/` (ou `/en/download/`) ouvre directement le bon store sur téléphone. C'est aussi la cible des QR codes.

## Règles

- Travailler sur une branche, ouvrir une PR vers `main`, ne jamais pousser directement sur `main`.
- Ne jamais modifier `app-ads.txt` sans vérifier dans AdMob.
- Pas de tiret cadratin dans les textes, le moins d'emoji possible.
