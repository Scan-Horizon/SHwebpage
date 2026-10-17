// Prepare un texte legal pour l'affichage, SANS toucher a son contenu :
// - ajoute un identifiant a chaque titre <h3> (pour le sommaire et les liens directs) ;
// - entoure chaque tableau d'un conteneur defilant sur petit ecran.
// Le texte lui-meme reste identique, mot pour mot, a celui publie dans l'ancien site
// (verifie par scripts/check-dist.mjs).

export interface TocEntry {
  id: string;
  label: string;
}

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&[a-z]+;/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

export function prepareLegalHtml(html: string, tableLabel: string): { html: string; toc: TocEntry[] } {
  const toc: TocEntry[] = [];
  const used = new Set<string>();

  const withIds = html.replace(/<h3>([\s\S]*?)<\/h3>/g, (_match, inner: string) => {
    const label = decodeEntities(inner.replace(/<[^>]+>/g, '').trim());
    let id = slugify(label) || 'section';
    let n = 2;
    while (used.has(id)) id = `${slugify(label)}-${n++}`;
    used.add(id);
    toc.push({ id, label });
    return `<h3 id="${id}">${inner}</h3>`;
  });

  const withTables = withIds
    .replace(/<table>/g, `<div class="table-scroll" role="region" aria-label="${tableLabel}" tabindex="0"><table>`)
    .replace(/<\/table>/g, '</table></div>');

  return { html: withTables, toc };
}
