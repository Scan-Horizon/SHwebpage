// Compagnies affichees au dos des cartes du carrousel, comme la grille
// « Operateurs » du Hangar de l'app. Ce sont des compagnies INVENTEES pour le site,
// avec des logos dessines ici : aucune vraie marque n'est utilisee.
// Chaque logo est un SVG 40 x 40 pose sur une tuile blanche, comme dans l'app.

export interface Operator {
  name: string;
  svg: string;
}

export const OPERATORS: Record<string, Operator> = {
  aerolis: {
    name: 'Aerolis',
    svg: '<circle cx="20" cy="20" r="16" fill="#1f6fd1"/><path d="M7 24C15 15 26 13 34 15C26 18 18 22 12 29Z" fill="#fff"/>',
  },
  nordvik: {
    name: 'Nordvik Air',
    svg: '<path d="M9 35L18 5H29L25 35Z" fill="#0e2a4f"/><path d="M22 13l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6Z" fill="#fff"/>',
  },
  solanor: {
    name: 'Solanor',
    svg: '<path d="M8 27a12 12 0 0 1 24 0Z" fill="#f28c28"/><path d="M20 8v5M9 13l3.5 3.5M31 13l-3.5 3.5M4 22h4M32 22h4" stroke="#f28c28" stroke-width="2.4" stroke-linecap="round"/><path d="M4 31h32" stroke="#1d2b3a" stroke-width="2.4" stroke-linecap="round"/>',
  },
  cielmar: {
    name: 'Cielmar',
    svg: '<rect x="4" y="4" width="32" height="32" rx="9" fill="#0f8b8d"/><path d="M8 19c4-4 8 4 12 0s8 4 12 0M8 27c4-4 8 4 12 0s8 4 12 0" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/>',
  },
  ventoria: {
    name: 'Ventoria',
    svg: '<path d="M6 10l10 10-10 10h7l10-10-10-10Z" fill="#d7263d"/><path d="M19 10l10 10-10 10h7l10-10-10-10Z" fill="#8a1526"/>',
  },
  orizon: {
    name: 'Orizon',
    svg: '<circle cx="20" cy="20" r="16" fill="#3b2a8f"/><path d="M4 22h32" stroke="#f5b942" stroke-width="2.6"/><path d="M20 9l1.5 7 6 3v2l-6-1.5v5l2 1.5v1.5l-3.5-1-3.5 1V27l2-1.5v-5l-6 1.5v-2l6-3Z" fill="#fff"/>',
  },
  calypsa: {
    name: 'Calypsa',
    svg: '<circle cx="20" cy="20" r="16" fill="#f6c94c"/><path d="M6 23c6-1 10-6 14-11 1 6 5 10 14 11-7 2-11 2-14 7-3-5-7-5-14-7Z" fill="#14a3a8"/>',
  },
  brisaero: {
    name: 'Brisaero',
    svg: '<rect x="4" y="4" width="32" height="32" rx="16" fill="#e8f3ff"/><path d="M8 28L24 8h5L13 28ZM15 32L31 12h4L19 32Z" fill="#3c8ce7"/>',
  },
  altair: {
    name: 'Altair Air',
    svg: '<path d="M4 34L17 10l6 10 4-6 9 20Z" fill="#1f5e3b"/><path d="M28 6l1.2 2.8L32 10l-2.8 1.2L28 14l-1.2-2.8L24 10l2.8-1.2Z" fill="#e0a526"/>',
  },
  heliazur: {
    name: 'Héliazur',
    svg: '<circle cx="20" cy="20" r="16" fill="#1c4f9c"/><path d="M8 14h24M20 14v6" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="M13 20h12a4 4 0 0 1 0 8H17a4 4 0 0 1-4-4Z" fill="#fff"/><path d="M29 24h5" stroke="#fff" stroke-width="2"/>',
  },
  offshore: {
    name: 'Offshore Lift',
    svg: '<rect x="4" y="4" width="32" height="32" rx="7" fill="#ef6c1a"/><path d="M20 30V12M13 18l7-7 7 7" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  escadron: {
    name: 'Escadron de chasse',
    svg: '<circle cx="20" cy="20" r="16" fill="#4b5d73"/><path d="M8 17l12 7 12-7v5l-12 7-12-7Z" fill="#fff"/><path d="M20 8l2 4.5 5 .5-3.8 3.3 1.1 4.7L20 18.6 15.7 21l1.1-4.7L13 13l5-.5Z" fill="#fff"/>',
  },
};

/** Compagnies au dos de chaque carte du carrousel (meme cle que CARDS). */
export const CARD_OPERATORS: Record<string, string[]> = {
  common: ['aerolis', 'nordvik', 'solanor', 'cielmar', 'ventoria', 'orizon', 'calypsa', 'brisaero'],
  frequent: ['nordvik', 'altair', 'cielmar', 'orizon', 'ventoria'],
  rare: ['heliazur', 'offshore'],
  epic: ['solanor', 'altair', 'calypsa'],
  legendary: ['escadron'],
};
