# Site scan-horizon.com

Site vitrine de l'application ScanHorizon (SAS SCAN HORIZON), construit avec [Astro](https://astro.build) et publié par Cloudflare Pages.

## Organisation

| Dossier | Contenu |
| --- | --- |
| `src/pages/` | Pages construites par Astro : accueil FR/EN (`fr/index.astro`, `en/index.astro`), pages Télécharger (`fr/telecharger.astro`, `en/download.astro`), les 8 pages légales (`[lang]/[slug].astro`) et la page 404. |
| `src/legal/fr/`, `src/legal/en/` | Textes légaux v2.1, **copiés mot pour mot** de la version validée. Ne pas les modifier sans accord : ce sont des textes opposables. |
| `src/layouts/`, `src/components/` | Gabarit commun, en-tête (avec le bouton vision nocturne), pied de page, badges des stores, page Télécharger. |
| `src/components/home/` | Blocs de l'accueil : viseur animé, compteur en direct, carrousel 3D des cartes, globe des clans. |
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

- **Compteur en direct** : lit `/api/stats/scans-count` du service Railway `diffusion` (cache serveur de 5 minutes). Il essaie d'abord Railway en direct, puis des relais publics si le navigateur refuse l'appel (réglage CORS côté Railway). En cas d'échec, il garde la dernière valeur connue.
- **Cartes du carrousel** : `src/data/home.ts`. Une carte par rareté, plus une carte Événement en silhouette, sans aucun indice sur la façon de l'obtenir.
- **Vision nocturne** : un filtre CSS sur toute la page (`src/styles/global.css`), mémorisé dans le navigateur.
- **Animations** : si le système demande moins d'animations, le viseur affiche directement l'avion verrouillé et sa carte, et le carrousel ne bouge plus tout seul.
- **Lien à partager** : `scan-horizon.com/fr/telecharger/` (ou `/en/download/`) ouvre directement le bon store sur téléphone. C'est aussi la cible des QR codes.

## Règles

- Travailler sur une branche, ouvrir une PR vers `main`, ne jamais pousser directement sur `main`.
- Ne jamais modifier `app-ads.txt` sans vérifier dans AdMob.
- Pas de tiret cadratin dans les textes, le moins d'emoji possible.
