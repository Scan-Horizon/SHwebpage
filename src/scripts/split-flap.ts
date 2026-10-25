// Animation des palettes de tableau d'aeroport (markup : src/components/FlapTile.astro).
// Chaque pas fait basculer la moitie haute du caractere courant, puis rabat la moitie
// basse du suivant, comme un vrai tambour a palettes.

/** Tambour des chiffres : un blanc, puis 0 a 9 (on le parcourt dans l'ordre). */
export const DIGITS = ' 0123456789';
/** Tambour des lettres (on y pioche quelques caracteres au hasard avant d'arriver). */
export const LETTERS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface FlapOptions {
  /** Ordre des caracteres sur le tambour. */
  drum?: string;
  /** Duree d'un pas complet, en millisecondes. */
  stepMs?: number;
  /**
   * Nombre maximal de pas avant d'arriver. Au-dela, la palette passe par quelques
   * caracteres tires au hasard puis tombe sur le bon (pour les lettres, ou un tour
   * complet du tambour serait trop long).
   */
  maxSteps?: number;
}

export class Flap {
  char: string;
  private readonly glyphs: HTMLElement[];
  private readonly leafTop: HTMLElement;
  private readonly leafBottom: HTMLElement;
  private readonly drum: string;
  private readonly stepMs: number;
  private readonly maxSteps: number;
  private target: string;
  private running = false;

  constructor(el: HTMLElement, { drum = DIGITS, stepMs = 104, maxSteps = Infinity }: FlapOptions = {}) {
    this.glyphs = Array.from(el.querySelectorAll<HTMLElement>('b'));
    const halves = el.querySelectorAll<HTMLElement>('.sf-leaf');
    this.leafTop = halves[0];
    this.leafBottom = halves[1];
    this.drum = drum;
    this.stepMs = stepMs;
    this.maxSteps = maxSteps;
    this.char = this.glyphs[0]?.textContent || ' ';
    this.target = this.char;
  }

  /** Affiche un caractere tout de suite, sans animation. */
  set(c: string) {
    this.char = c;
    this.target = c;
    this.glyphs.forEach((g) => (g.textContent = c));
  }

  private nextOnDrum(c: string) {
    const i = this.drum.indexOf(c);
    return this.drum[(i < 0 ? 0 : i + 1) % this.drum.length];
  }

  private sequence(from: string, to: string): string[] {
    const a = this.drum.indexOf(from);
    const b = this.drum.indexOf(to);
    if (a >= 0 && b >= 0) {
      const distance = (b - a + this.drum.length) % this.drum.length;
      if (distance <= this.maxSteps) {
        const seq: string[] = [];
        let c = from;
        while (c !== to) {
          c = this.nextOnDrum(c);
          seq.push(c);
        }
        return seq;
      }
    }
    const count = Math.max(1, Math.min(this.maxSteps, 4 + Math.floor(Math.random() * 6)) - 1);
    const seq = Array.from({ length: count }, () => this.drum[1 + Math.floor(Math.random() * (this.drum.length - 1))]);
    seq.push(to);
    return seq;
  }

  /** Fait tomber les palettes jusqu'au caractere voulu, apres `delay` ms. */
  async go(c: string, delay = 0) {
    this.target = c;
    if (this.running) return;
    this.running = true;
    await sleep(delay);
    const [top, bottom, leafTopGlyph, leafBottomGlyph] = this.glyphs;
    const half = this.stepMs / 2;
    while (this.char !== this.target) {
      const steps = this.sequence(this.char, this.target);
      for (const next of steps) {
        top.textContent = next;
        leafTopGlyph.textContent = this.char;
        leafBottomGlyph.textContent = next;
        this.leafTop.style.visibility = 'visible';
        this.leafBottom.style.visibility = 'visible';
        await this.leafTop.animate(
          [
            { transform: 'rotateX(0deg)', filter: 'brightness(1)' },
            { transform: 'rotateX(-90deg)', filter: 'brightness(0.55)' },
          ],
          { duration: half, easing: 'ease-in', fill: 'forwards' },
        ).finished;
        this.leafTop.style.visibility = 'hidden';
        await this.leafBottom.animate(
          [
            { transform: 'rotateX(90deg)', filter: 'brightness(1.5)' },
            { transform: 'rotateX(0deg)', filter: 'brightness(1)' },
          ],
          { duration: half, easing: 'ease-out', fill: 'forwards' },
        ).finished;
        bottom.textContent = next;
        this.leafBottom.style.visibility = 'hidden';
        this.char = next;
        if (this.target !== c) break; // nouvelle cible en cours de route : on recalcule
      }
      c = this.target;
    }
    this.running = false;
  }
}

/** Ecrit un texte sur une rangee de palettes (complete par des blancs). */
export function flipRow(flaps: Flap[], text: string, animate: boolean, spread = 160) {
  const chars = text.toUpperCase().padEnd(flaps.length, ' ').slice(0, flaps.length).split('');
  flaps.forEach((f, i) => {
    if (!animate || prefersReducedMotion()) f.set(chars[i]);
    else if (f.char !== chars[i]) void f.go(chars[i], Math.round(Math.random() * spread));
  });
}
