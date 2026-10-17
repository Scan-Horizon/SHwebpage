# Site scan-horizon.com

Site vitrine de l'application ScanHorizon (SAS SCAN HORIZON).

## Contenu

- `index.html` : page d'aiguillage. Envoie chaque visiteur vers `/fr/` ou `/en/` selon la langue de son navigateur, en gardant l'ancre (`#privacy`, `#terms`, `#legal`, `#delete`) utilisee par l'application et les e-mails.
- `fr/index.html`, `en/index.html` : le site (accueil et textes legaux).
- `404.html` : page affichee pour une adresse inconnue.
- `app-ads.txt` : declaration des regies publicitaires. **Ne jamais modifier sans verifier dans AdMob.**
- `robots.txt`, `sitemap.xml`, `llms.txt` : referencement.
- `_headers` : en-tetes HTTP pour Cloudflare Pages.

## Mise en ligne

- **Cloudflare Pages** (cible) : commande de construction `npm run build`, dossier publie `dist`. Chaque PR obtient un lien d'apercu ; un merge dans `main` met le site en ligne.
- **GitHub Pages** (actuel, garde en secours pendant la transition) : publie la racine du depot telle quelle.

`npm run build` copie dans `dist/` tout ce qui doit etre en ligne (voir `scripts/build.mjs`). Aucune dependance a installer.

## Regles

- Travailler sur une branche, ouvrir une PR vers `main`, ne jamais pousser directement sur `main`.
- Les textes legaux publies ici doivent rester identiques a ceux valides dans `ScanHorizon_Frontend/legal/`.
- Pas de tiret cadratin dans les textes, le moins d'emoji possible.
