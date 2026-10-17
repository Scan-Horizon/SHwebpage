# Site scan-horizon.com

Site vitrine de l'application ScanHorizon (SAS SCAN HORIZON), construit avec [Astro](https://astro.build) et publié par Cloudflare Pages.

## Organisation

| Dossier | Contenu |
| --- | --- |
| `src/pages/` | Pages construites par Astro : les 8 pages légales (`[lang]/[slug].astro`) et la page 404. |
| `src/legal/fr/`, `src/legal/en/` | Textes légaux v2.1, **copiés mot pour mot** de la version validée. Ne pas les modifier sans accord : ce sont des textes opposables. |
| `src/layouts/`, `src/components/` | Gabarit commun, en-tête et pied de page. |
| `src/styles/tokens.css` | Couleurs, polices, rayons et espacements, repris de l'app (`lib/theme/app_colors.dart`). |
| `src/data/site.ts` | Adresses des pages légales, liens des stores, libellés FR/EN. |
| `public/` | Fichiers publiés tels quels : accueil actuel (`fr/`, `en/`, refait en phase 2), page d'aiguillage `index.html`, images, `app-ads.txt`, `robots.txt`, `sitemap.xml`, `llms.txt`, `_headers`. |
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

L'app et l'e-mail de suppression de compte pointent vers `scan-horizon.com/#privacy`, `#terms`, `#legal` et `#delete`. Ces ancres redirigent vers les pages légales, depuis `/`, `/fr/` et `/en/`. Les adresses sont définies dans `src/data/site.ts` et répétées dans les trois pages de `public/` : les garder synchronisées.

## Règles

- Travailler sur une branche, ouvrir une PR vers `main`, ne jamais pousser directement sur `main`.
- Ne jamais modifier `app-ads.txt` sans vérifier dans AdMob.
- Pas de tiret cadratin dans les textes, le moins d'emoji possible.
