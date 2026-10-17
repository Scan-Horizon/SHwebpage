// Controles apres `astro build`. La mise en ligne echoue si l'un d'eux echoue,
// plutot que de publier un site casse.
//
// 1. Les fichiers indispensables existent (app-ads.txt, robots.txt, pages legales...).
// 2. app-ads.txt est publie a l'identique (revenus publicitaires).
// 3. Chaque page legale contient, mot pour mot, le texte source de src/legal/.

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = join(process.cwd(), 'dist');
const errors = [];

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
  '.well-known/security.txt',
  'fr/telecharger/index.html',
  'en/download/index.html',
];

const LEGAL = {
  fr: { privacy: 'confidentialite', terms: 'cgu', legal: 'mentions-legales', delete: 'supprimer-mes-donnees' },
  en: { privacy: 'privacy', terms: 'terms', legal: 'legal-notice', delete: 'delete-my-data' },
};

for (const file of REQUIRED) {
  if (!existsSync(join(DIST, file))) errors.push(`Fichier absent : ${file}`);
}

if (existsSync(join(DIST, 'app-ads.txt'))) {
  const published = readFileSync(join(DIST, 'app-ads.txt'), 'utf8');
  const source = readFileSync(join(process.cwd(), 'public', 'app-ads.txt'), 'utf8');
  if (published !== source) errors.push('app-ads.txt publie differe de public/app-ads.txt');
}

// Texte visible : on retire les balises et on normalise les espaces,
// pour comparer le contenu et non la mise en forme.
const text = (html) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

for (const [lang, docs] of Object.entries(LEGAL)) {
  for (const [key, slug] of Object.entries(docs)) {
    const page = join(DIST, lang, slug, 'index.html');
    if (!existsSync(page)) {
      errors.push(`Page legale absente : /${lang}/${slug}/`);
      continue;
    }
    const source = readFileSync(join(process.cwd(), 'src', 'legal', lang, `${key}.html`), 'utf8');
    if (!text(readFileSync(page, 'utf8')).includes(text(source))) {
      errors.push(`Le texte de /${lang}/${slug}/ ne correspond pas a src/legal/${lang}/${key}.html`);
    }
  }
}

if (errors.length) {
  console.error('Controle de dist/ en echec :');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log('Controle de dist/ : OK (fichiers indispensables, app-ads.txt, 8 pages legales).');
