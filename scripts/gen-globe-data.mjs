// Genere src/data/globe-110m.json a partir des donnees du globe de l'app
// (lib/widgets/multiplayer/globe_land_data.dart, Natural Earth 110m, domaine public).
// A relancer seulement si l'app change ses donnees :
//   node scripts/gen-globe-data.mjs ../ScanHorizon_Frontend/lib/widgets/multiplayer/globe_land_data.dart
//
// Sortie : { land: [[[lon, lat], ...], ...], borders: [[[lon, lat], ...], ...] }
// Les anneaux de terre sont orientes comme d3-geo l'attend (sens horaire) : sinon
// d3 remplirait tout le globe sauf les continents.
import { readFileSync, writeFileSync } from 'node:fs';
import { geoArea } from 'd3-geo';

const src = readFileSync(process.argv[2], 'utf8');

function readList(name) {
  const start = src.indexOf(`${name} = [`);
  if (start < 0) throw new Error(`liste ${name} introuvable`);
  const end = src.indexOf('\n];', start);
  const body = src.slice(start, end);
  return [...body.matchAll(/\[([^\[\]]+)\]/g)].map((m) => {
    const n = m[1].split(',').map((s) => Number(s.trim())).filter((v) => Number.isFinite(v));
    const pts = [];
    for (let i = 0; i + 1 < n.length; i += 2) pts.push([Math.round(n[i] * 10) / 10, Math.round(n[i + 1] * 10) / 10]);
    return pts;
  });
}

const land = readList('globeLandRings').map((ring) => {
  const closed = ring[0][0] === ring.at(-1)[0] && ring[0][1] === ring.at(-1)[1] ? ring : [...ring, ring[0]];
  // Un anneau oriente a l'envers couvre plus d'un hemisphere : on l'inverse.
  return geoArea({ type: 'Polygon', coordinates: [closed] }) > 2 * Math.PI ? closed.reverse() : closed;
});
const borders = readList('globeBorderLines');

writeFileSync('src/data/globe-110m.json', JSON.stringify({ land, borders }));
console.log(`terres : ${land.length} anneaux, frontieres : ${borders.length} lignes`);
