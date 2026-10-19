// Globe des clans, dessine comme celui de l'onglet Explorer de l'app
// (lib/widgets/multiplayer/globe_painter.dart, couleurs « dark » de
// lib/theme/tokens_context.dart) : memes cotes et frontieres Natural Earth 110m,
// meme ocean en degrade, terres ombrees, graticule, halo d'atmosphere, pastilles
// d'aeroports violettes, pastille « moi » ambre et avions sur leurs routes.
// Charge seulement quand la section approche de l'ecran (import dynamique).
import { geoDistance, geoGraticule10, geoInterpolate, geoOrthographic, geoPath } from 'd3-geo';
import type { GeoPermissibleObjects } from 'd3-geo';
import data from '../data/globe-110m.json';

const C = {
  ocean: '#16324f',
  oceanShallow: '#234f7f', // ocean eclairci de 12 % (meme calcul HSL que l'app)
  oceanDeep: '#0b1d33',
  land: '#2e7d4f',
  landHigh: '#41b170', // +14 %
  landLow: '#1f5435', // -11 %
  landStroke: 'rgba(31, 84, 53, 0.55)',
  border: 'rgba(4, 28, 14, 0.4)',
  graticule: 'rgba(255, 255, 255, 0.12)',
  atmosphere: 'rgba(56, 182, 255, 0.3)',
  highlight: 'rgba(212, 238, 255, 0.28)',
  pin: '#b16cea',
  pinCore: '#e2c6f7',
  pinMe: '#ffc24b',
  pinMeCore: '#fff0cc',
  pinRim: 'rgba(255, 255, 255, 0.45)',
};

type LonLat = [number, number];

// Aeroports affiches (illustration : pas de donnees en direct sur le site).
// Nom en francais et, s'il differe, en anglais ; code IATA.
type Airport = { p: LonLat; code: string; fr: string; en?: string };
const AIRPORT_LIST: Airport[] = [
  { p: [2.55, 49.01], code: 'CDG', fr: 'Paris-Charles de Gaulle' },
  { p: [-0.45, 51.47], code: 'LHR', fr: 'Londres-Heathrow', en: 'London Heathrow' },
  { p: [8.56, 50.04], code: 'FRA', fr: 'Francfort', en: 'Frankfurt' },
  { p: [4.76, 52.31], code: 'AMS', fr: 'Amsterdam-Schiphol', en: 'Amsterdam Schiphol' },
  { p: [-3.57, 40.5], code: 'MAD', fr: 'Madrid-Barajas', en: 'Madrid Barajas' },
  { p: [2.08, 41.3], code: 'BCN', fr: 'Barcelone', en: 'Barcelona' },
  { p: [-9.13, 38.77], code: 'LIS', fr: 'Lisbonne', en: 'Lisbon' },
  { p: [7.22, 43.66], code: 'NCE', fr: "Nice-Côte d'Azur", en: "Nice Côte d'Azur" },
  { p: [5.08, 45.73], code: 'LYS', fr: 'Lyon-Saint-Exupéry', en: 'Lyon Saint-Exupéry' },
  { p: [1.36, 43.63], code: 'TLS', fr: 'Toulouse-Blagnac', en: 'Toulouse Blagnac' },
  { p: [6.11, 46.24], code: 'GVA', fr: 'Genève', en: 'Geneva' },
  { p: [28.75, 41.28], code: 'IST', fr: 'Istanbul' },
  { p: [55.37, 25.25], code: 'DXB', fr: 'Dubaï', en: 'Dubai' },
  { p: [51.61, 25.27], code: 'DOH', fr: 'Doha' },
  { p: [31.41, 30.12], code: 'CAI', fr: 'Le Caire', en: 'Cairo' },
  { p: [36.93, -1.32], code: 'NBO', fr: 'Nairobi' },
  { p: [28.24, -26.13], code: 'JNB', fr: 'Johannesburg' },
  { p: [77.1, 28.56], code: 'DEL', fr: 'Delhi' },
  { p: [103.99, 1.36], code: 'SIN', fr: 'Singapour', en: 'Singapore' },
  { p: [113.92, 22.31], code: 'HKG', fr: 'Hong Kong' },
  { p: [139.78, 35.55], code: 'HND', fr: 'Tokyo-Haneda', en: 'Tokyo Haneda' },
  { p: [126.44, 37.46], code: 'ICN', fr: 'Séoul-Incheon', en: 'Seoul Incheon' },
  { p: [151.18, -33.94], code: 'SYD', fr: 'Sydney' },
  { p: [174.79, -37.01], code: 'AKL', fr: 'Auckland' },
  { p: [-73.78, 40.64], code: 'JFK', fr: 'New York-JFK', en: 'New York JFK' },
  { p: [-87.91, 41.97], code: 'ORD', fr: "Chicago-O'Hare", en: "Chicago O'Hare" },
  { p: [-118.41, 33.94], code: 'LAX', fr: 'Los Angeles' },
  { p: [-122.38, 37.62], code: 'SFO', fr: 'San Francisco' },
  { p: [-80.29, 25.8], code: 'MIA', fr: 'Miami' },
  { p: [-73.74, 45.47], code: 'YUL', fr: 'Montréal-Trudeau', en: 'Montréal Trudeau' },
  { p: [-123.18, 49.2], code: 'YVR', fr: 'Vancouver' },
  { p: [-99.07, 19.44], code: 'MEX', fr: 'Mexico', en: 'Mexico City' },
  { p: [-74.15, 4.7], code: 'BOG', fr: 'Bogota', en: 'Bogotá' },
  { p: [-46.47, -23.44], code: 'GRU', fr: 'São Paulo-Guarulhos', en: 'São Paulo Guarulhos' },
  { p: [-70.79, -33.39], code: 'SCL', fr: 'Santiago' },
];
const AIRPORTS: LonLat[] = AIRPORT_LIST.map((a) => a.p);
const ME: LonLat = AIRPORTS[0];

// Routes de decor (indices dans AIRPORTS) parcourues par les avions.
const ROUTES: [number, number][] = [
  [0, 24], [1, 26], [0, 12], [2, 20], [12, 18], [11, 13], [24, 33], [26, 22],
  [4, 33], [0, 16], [19, 22], [5, 31], [3, 29], [6, 32], [28, 30], [17, 21],
];

const PLANE = new Path2D(
  'M5.6 0L1.6 -1.1 0.8 -4.4 -0.2 -4.4 0 -1 -2.6 -0.6 -3.5 -1.7 -4.1 -1.7 -3.6 0 -4.1 1.7 -3.5 1.7 -2.6 0.6 0 1 -0.2 4.4 0.8 4.4 1.6 1.1Z',
);

export function mountGlobe(
  canvas: HTMLCanvasElement,
  { reduce, lang = 'fr', onSelect }: { reduce: boolean; lang?: string; onSelect?: (label: string | null) => void },
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const land = { type: 'MultiPolygon', coordinates: (data.land as LonLat[][]).map((ring) => [ring]) } as GeoPermissibleObjects;
  const borders = { type: 'MultiLineString', coordinates: data.borders as LonLat[][] } as GeoPermissibleObjects;
  const graticule = geoGraticule10() as GeoPermissibleObjects;
  const sphere = { type: 'Sphere' } as GeoPermissibleObjects;
  const routes = ROUTES.map(([a, b]) => geoInterpolate(AIRPORTS[a], AIRPORTS[b]));
  const flights = routes.map((_, i) => ({ route: i, t: (i * 0.37) % 1, speed: 0.00006 + ((i * 7) % 5) * 0.000012 }));

  const projection = geoOrthographic().clipAngle(90).precision(0.6);
  const path = geoPath(projection, ctx);

  // Vue de depart : l'Atlantique, l'Europe et l'Amerique a la fois.
  let lambda = 28;
  let phi = -24;
  let velocity = 0;
  let dragging = false;
  let lastInteraction = -Infinity;
  // Aeroport touche : le globe tourne vers lui et affiche son nom.
  let selected: Airport | null = null;
  let tween: { from: [number, number]; to: [number, number]; t0: number } | null = null;
  let size = 0;
  let dpr = 1;
  let stars: [number, number, number][] = [];

  function resize() {
    const css = canvas.clientWidth;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    size = css;
    canvas.width = Math.round(css * dpr);
    canvas.height = Math.round(css * dpr);
    // Champ d'etoiles fixe autour du globe (comme globe_starfield.dart).
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    stars = Array.from({ length: 70 }, () => [rand() * css, rand() * css, 0.4 + rand() * 0.9]);
  }

  function radial(cx: number, cy: number, r: number, ax: number, ay: number, scale: number, stops: [number, string][]) {
    const g = ctx!.createRadialGradient(cx + ax * r, cy + ay * r, 0, cx + ax * r, cy + ay * r, r * scale);
    stops.forEach(([o, c]) => g.addColorStop(o, c));
    return g;
  }

  function visible(p: LonLat) {
    return geoDistance(p, [-lambda, -phi]) < Math.PI / 2 - 0.02;
  }

  function drawPin(p: LonLat, me: boolean) {
    if (!visible(p)) return;
    const xy = projection(p);
    if (!xy) return;
    const [x, y] = xy;
    const s = me ? 5 : 4;
    const color = me ? C.pinMe : C.pin;
    const c = ctx!;
    if (me) {
      c.fillStyle = 'rgba(255, 194, 75, 0.22)';
      c.beginPath();
      c.arc(x, y, s * 2.8, 0, Math.PI * 2);
      c.fill();
    }
    c.globalAlpha = 0.28;
    c.fillStyle = color;
    c.beginPath();
    c.arc(x, y, s * 2.1, 0, Math.PI * 2);
    c.fill();
    c.globalAlpha = 1;
    c.beginPath();
    c.arc(x, y, s, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = me ? C.pinMeCore : C.pinCore;
    c.globalAlpha = 0.95;
    c.beginPath();
    c.arc(x, y, s * 0.42, 0, Math.PI * 2);
    c.fill();
    c.globalAlpha = 1;
    c.strokeStyle = C.pinRim;
    c.lineWidth = 0.7;
    c.beginPath();
    c.arc(x, y, s, 0, Math.PI * 2);
    c.stroke();
  }

  function drawFlight(f: { route: number; t: number }) {
    const at = routes[f.route];
    const c = ctx!;
    // Courte trainee derriere l'avion, comme dans l'app.
    let prev: [number, number] | null = null;
    for (let s = 6; s >= 0; s--) {
      const t = f.t - 0.05 * (s / 6);
      if (t < 0) continue;
      const p = at(t) as LonLat;
      if (!visible(p)) {
        prev = null;
        continue;
      }
      const xy = projection(p)!;
      if (prev) {
        const fade = 1 - s / 6;
        c.strokeStyle = `rgba(177, 108, 234, ${(fade * 0.28).toFixed(3)})`;
        c.lineWidth = fade * 1.2 + 0.3;
        c.lineCap = 'round';
        c.beginPath();
        c.moveTo(prev[0], prev[1]);
        c.lineTo(xy[0], xy[1]);
        c.stroke();
      }
      prev = xy as [number, number];
    }
    const p0 = at(f.t) as LonLat;
    const p1 = at(Math.min(f.t + 0.004, 1)) as LonLat;
    if (!visible(p0) || !visible(p1)) return;
    const a = projection(p0)!;
    const b = projection(p1)!;
    const heading = Math.atan2(b[1] - a[1], b[0] - a[0]);
    c.save();
    c.translate(a[0], a[1]);
    c.rotate(heading);
    c.scale(1.05, 1.05);
    c.fillStyle = 'rgba(177, 108, 234, 0.95)';
    c.fill(PLANE);
    c.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    c.lineWidth = 0.6;
    c.stroke(PLANE);
    c.restore();
  }

  function draw() {
    const c = ctx!;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, size, size);
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.4;
    projection.scale(r).translate([cx, cy]).rotate([lambda, phi]);

    // Etoiles
    c.fillStyle = 'rgba(207, 230, 255, 0.55)';
    for (const [x, y, s] of stars) {
      if (Math.hypot(x - cx, y - cy) < r * 1.05) continue;
      c.fillRect(x, y, s, s);
    }

    // 1. Atmosphere
    c.fillStyle = radial(cx, cy, r * 1.18, 0, 0, 1, [
      [0.82, C.atmosphere],
      [1, 'rgba(56, 182, 255, 0)'],
    ]);
    c.beginPath();
    c.arc(cx, cy, r * 1.18, 0, Math.PI * 2);
    c.fill();

    // 2. Ocean
    c.fillStyle = radial(cx, cy, r, -0.35, -0.35, 1.35, [
      [0, C.oceanShallow],
      [0.55, C.ocean],
      [1, C.oceanDeep],
    ]);
    c.beginPath();
    path(sphere);
    c.fill();

    // 3. Graticule
    c.strokeStyle = C.graticule;
    c.lineWidth = 1;
    c.beginPath();
    path(graticule);
    c.stroke();

    // 4. Terres, puis frontieres
    c.fillStyle = radial(cx, cy, r, -0.35, -0.35, 1.3, [
      [0, C.landHigh],
      [0.5, C.land],
      [1, C.landLow],
    ]);
    c.beginPath();
    path(land);
    c.fill();
    c.strokeStyle = C.landStroke;
    c.lineWidth = 1;
    c.stroke();
    c.strokeStyle = C.border;
    c.lineWidth = 0.9;
    c.beginPath();
    path(borders);
    c.stroke();

    // 5. Volume : limbe assombri, ombre du terminateur, reflet
    c.fillStyle = radial(cx, cy, r, 0, 0, 1, [
      [0, 'rgba(0,0,0,0)'],
      [0.86, 'rgba(0,0,0,0)'],
      [1, 'rgba(0,0,0,0.25)'],
    ]);
    c.beginPath();
    c.arc(cx, cy, r, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = radial(cx, cy, r, 0.5, 0.5, 1.05, [
      [0.45, 'rgba(0,0,0,0)'],
      [1, 'rgba(0,0,0,0.36)'],
    ]);
    c.fill();
    c.fillStyle = radial(cx, cy, r, -0.45, -0.5, 0.75, [
      [0, C.highlight],
      [1, 'rgba(212, 238, 255, 0)'],
    ]);
    c.fill();

    // 6. Avions puis pastilles
    for (const f of flights) drawFlight(f);
    for (const a of AIRPORTS) if (a !== ME) drawPin(a, false);
    drawPin(ME, true);
    if (selected) drawLabel(selected);
  }

  // Etiquette de l'aeroport touche : nom, puis code IATA.
  function drawLabel(a: Airport) {
    if (!visible(a.p)) return;
    const xy = projection(a.p);
    if (!xy) return;
    const [x, y] = xy;
    const c = ctx!;
    c.strokeStyle = 'rgba(232, 241, 251, 0.9)';
    c.lineWidth = 1.4;
    c.beginPath();
    c.arc(x, y, 9, 0, Math.PI * 2);
    c.stroke();
    const name = (lang === 'en' && a.en) || a.fr;
    c.font = '600 13px "IBM Plex Sans", system-ui, sans-serif';
    const wName = c.measureText(name).width;
    c.font = '500 11px "IBM Plex Mono", ui-monospace, monospace';
    const wCode = c.measureText(a.code).width;
    const w = Math.max(wName, wCode) + 20;
    const h = 44;
    let bx = x + 14;
    if (bx + w > size - 4) bx = x - 14 - w;
    const by = Math.max(4, Math.min(size - h - 4, y - h / 2));
    c.fillStyle = 'rgba(5, 10, 21, 0.9)';
    c.strokeStyle = 'rgba(56, 182, 255, 0.6)';
    c.lineWidth = 1;
    c.beginPath();
    if (c.roundRect) c.roundRect(bx, by, w, h, 8);
    else c.rect(bx, by, w, h);
    c.fill();
    c.stroke();
    c.textBaseline = 'alphabetic';
    c.fillStyle = '#e8f1fb';
    c.font = '600 13px "IBM Plex Sans", system-ui, sans-serif';
    c.fillText(name, bx + 10, by + 19);
    c.fillStyle = '#8fd6ff';
    c.font = '500 11px "IBM Plex Mono", ui-monospace, monospace';
    c.fillText(a.code, bx + 10, by + 35);
  }

  function pinAt(px: number, py: number) {
    let best: Airport | null = null;
    let bestD = 16;
    for (const a of AIRPORT_LIST) {
      if (!visible(a.p)) continue;
      const xy = projection(a.p);
      if (!xy) continue;
      const d = Math.hypot(xy[0] - px, xy[1] - py);
      if (d < bestD) {
        bestD = d;
        best = a;
      }
    }
    return best;
  }

  function select(a: Airport | null) {
    selected = a;
    onSelect?.(a ? `${(lang === 'en' && a.en) || a.fr}, ${a.code}` : null);
    if (!a) {
      draw();
      return;
    }
    velocity = 0;
    const to: [number, number] = [-a.p[0], Math.max(-60, Math.min(60, -a.p[1]))];
    // Plus court chemin en longitude.
    let from0 = lambda;
    while (to[0] - from0 > 180) from0 += 360;
    while (to[0] - from0 < -180) from0 -= 360;
    lambda = from0;
    if (reduce) {
      lambda = to[0];
      phi = to[1];
      draw();
      return;
    }
    tween = { from: [lambda, phi], to, t0: performance.now() };
    start();
  }

  // Rotation a la souris ou au doigt, avec un peu d'elan ; rotation lente au repos.
  let lastX = 0;
  let lastY = 0;
  let lastT = 0;
  let downX = 0;
  let downY = 0;
  let downT = 0;
  function onDown(e: PointerEvent) {
    downX = e.clientX;
    downY = e.clientY;
    downT = performance.now();
    tween = null;
    dragging = true;
    velocity = 0;
    lastX = e.clientX;
    lastY = e.clientY;
    lastT = performance.now();
    canvas.setPointerCapture(e.pointerId);
    canvas.classList.add('grabbing');
  }
  function onMove(e: PointerEvent) {
    if (!dragging) {
      if (e.pointerType === 'mouse') {
        const r = canvas.getBoundingClientRect();
        canvas.classList.toggle('on-pin', !!pinAt(e.clientX - r.left, e.clientY - r.top));
      }
      return;
    }
    const k = 180 / (size * 0.4 * Math.PI);
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const now = performance.now();
    lambda += dx * k;
    phi = Math.max(-60, Math.min(60, phi - dy * k));
    velocity = (dx * k) / Math.max(now - lastT, 8);
    lastX = e.clientX;
    lastY = e.clientY;
    lastT = now;
    lastInteraction = now;
    if (reduce) draw();
  }
  function onUp(e: PointerEvent) {
    // Un toucher bref sans glisser = choisir un aeroport (ou fermer l'etiquette).
    if (dragging && Math.hypot(e.clientX - downX, e.clientY - downY) < 6 && performance.now() - downT < 450) {
      const r = canvas.getBoundingClientRect();
      const a = pinAt(e.clientX - r.left, e.clientY - r.top);
      select(a && a !== selected ? a : null);
    }
    dragging = false;
    lastInteraction = performance.now();
    canvas.classList.remove('grabbing');
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    if (reduce) velocity = 0;
  }
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);

  // Clavier : fleches pour tourner le globe.
  function onKey(e: KeyboardEvent) {
    const step = { ArrowLeft: -12, ArrowRight: 12, ArrowUp: 0, ArrowDown: 0 }[e.key];
    if (step === undefined) return;
    e.preventDefault();
    if (e.key === 'ArrowUp') phi = Math.max(-60, phi - 8);
    else if (e.key === 'ArrowDown') phi = Math.min(60, phi + 8);
    else lambda += step;
    lastInteraction = performance.now();
    draw();
  }
  canvas.addEventListener('keydown', onKey);

  let running = false;
  let raf = 0;
  let prevFrame = 0;
  function frame(now: number) {
    if (!running) return;
    const dt = Math.min(now - (prevFrame || now), 50);
    prevFrame = now;
    if (tween) {
      const k = Math.min((now - tween.t0) / 900, 1);
      const e = 1 - Math.pow(1 - k, 3);
      lambda = tween.from[0] + (tween.to[0] - tween.from[0]) * e;
      phi = tween.from[1] + (tween.to[1] - tween.from[1]) * e;
      if (k >= 1) tween = null;
    } else if (!dragging && !selected) {
      if (Math.abs(velocity) > 0.0005) {
        lambda += velocity * dt;
        velocity *= Math.pow(0.94, dt / 16);
      } else if (now - lastInteraction > 1800) {
        lambda += 0.004 * dt; // environ 4 degres par seconde
      }
    }
    for (const f of flights) f.t = (f.t + f.speed * dt) % 1;
    draw();
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduce) return;
    running = true;
    prevFrame = 0;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  resize();
  draw();

  const ro = new ResizeObserver(() => {
    resize();
    draw();
  });
  ro.observe(canvas);

  // N'anime que si le globe est a l'ecran et l'onglet visible.
  let onScreen = false;
  const io = new IntersectionObserver((entries) => {
    onScreen = entries.some((e) => e.isIntersecting);
    if (onScreen && !document.hidden) start();
    else stop();
  });
  io.observe(canvas);
  const onVis = () => (document.hidden || !onScreen ? stop() : start());
  document.addEventListener('visibilitychange', onVis);

  return () => {
    stop();
    ro.disconnect();
    io.disconnect();
    document.removeEventListener('visibilitychange', onVis);
  };
}
