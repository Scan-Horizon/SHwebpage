// Prepare le dossier `dist/` publie par Cloudflare Pages (commande : npm run build).
//
// Aujourd'hui le site est fait de fichiers HTML statiques : on copie simplement
// tout ce qui doit etre en ligne dans `dist/`, sans rien transformer.
// Quand le site passera sous Astro (phase 1 de la refonte), cette commande sera
// remplacee par la construction Astro, qui ecrira elle aussi dans `dist/` :
// les reglages Cloudflare (commande `npm run build`, dossier `dist`) ne changeront pas.
//
// Aucune dependance : Node seul suffit.

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const OUT = join(ROOT, 'dist');

// Ce qui ne doit jamais partir en ligne (outillage, depot git, sources de travail).
const EXCLUDED = new Set([
  '.git',
  '.github',
  '.gitignore',
  '.node-version',
  'node_modules',
  'dist',
  'scripts',
  'package.json',
  'package-lock.json',
  'README.md',
  // Originaux lourds remplaces par leurs versions WebP (gardes dans le depot, pas publies).
  'Frame 1.png',
  'Frame 2.png',
  'Frame 3.png',
  'Frame 4.png',
  'Frame 5.png',
  'Frame 6.png',
  'A380.png',
  'planes_AS50.png',
  'logo text vert. couleur 1.png',
  'loading.gif',
  'map.png',
]);

// Fichiers obligatoires : la construction echoue s'il en manque un,
// plutot que de mettre en ligne un site incomplet.
const REQUIRED = [
  'index.html',
  'fr/index.html',
  'en/index.html',
  '404.html',
  'app-ads.txt',
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
  '_headers',
];

for (const file of REQUIRED) {
  if (!existsSync(join(ROOT, file))) {
    console.error(`Fichier obligatoire absent : ${file}`);
    process.exit(1);
  }
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);

let count = 0;
for (const entry of readdirSync(ROOT)) {
  if (EXCLUDED.has(entry)) continue;
  const src = join(ROOT, entry);
  cpSync(src, join(OUT, entry), { recursive: true });
  count += statSync(src).isDirectory() ? readdirSync(src).length : 1;
}

console.log(`dist/ pret : ${count} fichiers copies.`);
