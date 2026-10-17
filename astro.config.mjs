// Configuration du site scan-horizon.com.
// La sortie va dans `dist/`, publie tel quel par Cloudflare Pages (commande `npm run build`).
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://scan-horizon.com',
  // Adresses en dossier avec barre finale : /fr/cgu/ (comme l'accueil /fr/ deja en ligne).
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  devToolbar: {
    enabled: false,
  },
});
