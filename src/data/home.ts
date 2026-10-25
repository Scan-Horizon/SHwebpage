// Textes de l'accueil, en francais (tutoiement, comme l'app) et en anglais.
// Regle : n'ecrire que ce que l'app fait vraiment. Aucun chiffre qui depend de
// Remote Config (portee en km, nombre de boosts...), aucun indice sur les cartes
// Evenement (decision produit).
import type { Lang } from './site';

export interface CardData {
  key: 'common' | 'frequent' | 'rare' | 'epic' | 'legendary';
  img: string;
  aircraft: string;
  color: string;
}

export const CARDS: CardData[] = [
  { key: 'common', img: '/common.webp', aircraft: 'Airbus A320', color: 'var(--c-rarity-common)' },
  { key: 'frequent', img: '/frequent.webp', aircraft: 'Boeing 747-400', color: 'var(--c-rarity-frequent)' },
  { key: 'rare', img: '/rare.webp', aircraft: 'Aérospatiale AS332 Super Puma', color: 'var(--c-rarity-rare)' },
  { key: 'epic', img: '/epic.webp', aircraft: 'Airbus A300-600', color: 'var(--c-rarity-epic)' },
  { key: 'legendary', img: '/legendary.webp', aircraft: 'Dassault Rafale', color: 'var(--c-rarity-legendary)' },
];

export const HOME = {
  fr: {
    title: 'Scanne le ciel, capture chaque avion',
    description:
      "ScanHorizon identifie les avions que tu vises avec ton téléphone grâce aux données de vol en direct, puis ajoute leur carte à ton hangar. Gratuit sur iPhone et Android.",
    nav: { collection: 'Collection', clans: 'Clans', business: 'Business Class', help: 'Aide', download: 'Télécharger' },
    hero: {
      h1: 'Scanne le ciel, capture chaque avion.',
      lead: "Vise un avion avec ton téléphone, en vol ou au sol. L'app le reconnaît grâce à ta position, ta boussole et le trafic aérien en direct, puis ajoute sa carte à ton Hangar.",
      counterLabel: 'avions scannés par les joueurs',
      board: { label: 'Avions scannés', live: 'En direct' },
      rating: "4,9 sur l'App Store",
      demo: {
        label:
          "Démo du scanner : le ciel au-dessus de toi, avec les avions qui passent. Touche un avion, ou le bouton Scan, pour le scanner.",
        scan: "Scanner l'avion le plus proche du viseur",
        again: 'Scanner un autre avion',
        hint: 'Vise un avion et touche-le',
        result: 'Carte {rarity} : {aircraft}',
        caption: 'Démo : les avions qui passent au-dessus de toi.',
        compass: { n: 'N', e: 'E', s: 'S', w: 'O' },
      },
    },
    steps: {
      h2: 'Comment ça marche',
      items: [
        { title: 'Vise', text: "Lève ton téléphone vers l'avion : le viseur s'affiche sur l'image de la caméra." },
        { title: 'Scanne', text: "L'app compare ta position, ton cap et les vols autour de toi pour trouver l'avion que tu vises." },
        { title: 'Collectionne', text: 'Sa carte arrive dans ton Hangar. Chaque nouveau scan du même modèle la fait progresser.' },
      ],
    },
    collection: {
      h2: 'Cinq raretés, du Commun au Légendaire.',
      text: [
        "Chaque modèle d'avion a sa carte, avec sa fiche technique. Retourne-la : au dos, tu retrouves les compagnies avec lesquelles tu l'as scanné.",
        'Un A320 est Commun, un Rafale est Légendaire.',
      ],
      hint: 'Glisse pour faire tourner la carte, touche-la pour la retourner.',
      rarities: { common: 'Commun', frequent: 'Fréquent', rare: 'Rare', epic: 'Épique', legendary: 'Légendaire', event: 'Événement' },
      backTitle: 'Opérateurs',
      eventBack: 'Carte Événement',
      prev: 'Carte précédente',
      next: 'Carte suivante',
      flip: 'Retourner',
      regionLabel: 'Cartes avion en 3D. Flèches gauche et droite pour changer de carte, Entrée pour la retourner.',
    },
    progression: {
      h2: 'Dix niveaux, trois missions à chaque niveau.',
      text: "Les missions te font chercher des avions précis : un Airbus, une compagnie donnée, plusieurs scans dans la même journée. Termine les trois et tu passes au niveau suivant, avec un nouvel outil à la clé.",
      unlocks: [
        { level: 2, label: 'Le Hangar' },
        { level: 3, label: 'Le choix de la distance' },
        { level: 4, label: 'Les Boosts' },
        { level: 5, label: 'Le HUD personnalisable' },
      ],
      levelWord: 'Niveau',
      weekly: 'Chaque semaine, un défi se joue en équipes.',
    },
    clans: {
      h2: 'Rejoins le clan de ton aéroport.',
      text: "Chaque aéroport a son clan. Les scans de ses membres lui rapportent des points, et les clans sont classés entre eux. Un chat permet de discuter avec les autres membres.",
      globeLabel: "Globe des aéroports, comme dans l'app : des pastilles d'aéroports et des avions sur leurs routes. Flèches gauche et droite pour le faire tourner.",
      globeHint: 'Fais tourner le globe, touche un aéroport pour voir son nom.',
    },
    features: {
      h2: "Aussi dans l'app",
      items: [
        { title: 'Vision nocturne', text: 'Le viseur passe en vert, comme des jumelles de nuit, pour scanner une fois le soleil couché.' },
        { title: 'Historique et séries', text: "Tous tes scans restent dans ton historique, avec le nombre de jours d'affilée où tu as scanné." },
        { title: 'Bilan mensuel', text: 'À la fin du mois, un résumé de tes scans, à partager.' },
        { title: 'Profil', text: "Le nombre d'avions, de compagnies et de pays que tu as scannés, et ton record sur une journée." },
        { title: 'Parrainage', text: 'Invite des amis avec ton code : chaque parrainage complété te rapporte un cadeau.' },
        { title: 'Cinq langues', text: 'Français, anglais, espagnol, portugais et allemand.' },
      ],
    },
    reviews: {
      h2: 'Ce que disent les joueurs',
      items: [
        { quote: 'Application élégante et immersive.', author: 'ENES INC.' },
        { quote: 'Ludique, claire, très agréable à utiliser.', author: 'ibdo99' },
      ],
      source: "Avis App Store",
    },
    business: {
      h2: 'Business Class',
      lead: "L'abonnement de l'app, pour ceux qui scannent souvent.",
      items: [
        'Scans illimités, sans publicité',
        'Portée de scan doublée',
        'Boosts de portée offerts chaque jour',
        'Lentilles Rareté offertes chaque semaine',
        'Avatar exclusif et récompenses de série premium',
      ],
      note: "Prix affiché dans l'app, selon ton pays.",
      card: {
        flip: 'Carte Business Class : touche-la pour la retourner',
        memberLabel: 'NOM MEMBRE',
        memberName: 'TON PSEUDO',
        statusLabel: 'STATUT',
        benefitsTitle: 'AVANTAGES BUSINESS CLASS',
        hint: 'Touche la carte pour la retourner.',
      },
    },
    cta: {
      h2: 'Télécharge ScanHorizon.',
      text: 'Gratuit, avec achats intégrés, sur iPhone et Android.',
      qr: 'Scanne ce code avec ton téléphone pour ouvrir le bon store.',
    },
  },
  en: {
    title: 'Scan the sky, unlock every aircraft',
    description:
      'ScanHorizon identifies the aircraft you point your phone at using live flight data, then adds its card to your hangar. Free on iPhone and Android.',
    nav: { collection: 'Collection', clans: 'Clans', business: 'Business Class', help: 'Help', download: 'Download' },
    hero: {
      h1: 'Scan the sky, unlock every aircraft.',
      lead: 'Aim your phone at an aircraft, in the air or on the ground. The app recognises it from your position, your compass and live air traffic, then adds its card to your Hangar.',
      counterLabel: 'aircraft scanned by players',
      board: { label: 'Aircraft scanned', live: 'Live' },
      rating: '4.9 on the App Store',
      demo: {
        label: 'Scanner demo: the sky above you, with aircraft passing over. Tap an aircraft, or the Scan button, to scan it.',
        scan: 'Scan the aircraft closest to the reticle',
        again: 'Scan another aircraft',
        hint: 'Aim at an aircraft and tap it',
        result: '{rarity} card: {aircraft}',
        caption: 'Demo: the aircraft flying over you.',
        compass: { n: 'N', e: 'E', s: 'S', w: 'W' },
      },
    },
    steps: {
      h2: 'How it works',
      items: [
        { title: 'Aim', text: 'Raise your phone towards the aircraft: the viewfinder appears over the camera image.' },
        { title: 'Scan', text: 'The app compares your position, your heading and the flights around you to find the aircraft you are aiming at.' },
        { title: 'Collect', text: 'Its card lands in your Hangar. Every new scan of the same model moves it towards the next level.' },
      ],
    },
    collection: {
      h2: 'Five rarities, from Common to Legendary.',
      text: [
        'Every aircraft model has its card, with its spec sheet. Flip it: the back shows the airlines you scanned it with.',
        'An A320 is Common, a Rafale is Legendary.',
      ],
      hint: 'Drag to spin the card, tap it to flip it.',
      rarities: { common: 'Common', frequent: 'Frequent', rare: 'Rare', epic: 'Epic', legendary: 'Legendary', event: 'Event' },
      backTitle: 'Operators',
      eventBack: 'Event card',
      prev: 'Previous card',
      next: 'Next card',
      flip: 'Flip',
      regionLabel: 'Aircraft cards in 3D. Left and right arrows to change card, Enter to flip it.',
    },
    progression: {
      h2: 'Ten levels, three missions each.',
      text: 'Missions send you looking for specific aircraft: an Airbus, a given airline, several scans on the same day. Finish all three to reach the next level and unlock a new tool.',
      unlocks: [
        { level: 2, label: 'The Hangar' },
        { level: 3, label: 'Distance selector' },
        { level: 4, label: 'Boosts' },
        { level: 5, label: 'Custom HUD' },
      ],
      levelWord: 'Level',
      weekly: 'Every week, a challenge played in teams.',
    },
    clans: {
      h2: "Join your airport's clan.",
      text: "Every airport has a clan. Its members' scans earn it points, and clans are ranked against each other. A chat lets members talk to each other.",
      globeLabel: 'Airport globe, as in the app: airport pins and aircraft on their routes. Left and right arrows to spin it.',
      globeHint: 'Spin the globe, tap an airport to see its name.',
    },
    features: {
      h2: 'Also in the app',
      items: [
        { title: 'Night vision', text: 'The viewfinder turns green, like night goggles, so you can scan after sunset.' },
        { title: 'History and streaks', text: 'All your scans stay in your history, with the number of days in a row you scanned.' },
        { title: 'Monthly review', text: 'At the end of each month, a summary of your scans to share.' },
        { title: 'Profile', text: 'How many aircraft, airlines and countries you have scanned, and your best day.' },
        { title: 'Referrals', text: 'Invite friends with your code: each completed referral earns you a gift.' },
        { title: 'Five languages', text: 'English, French, Spanish, Portuguese and German.' },
      ],
    },
    reviews: {
      h2: 'What players say',
      items: [
        { quote: 'Elegant and immersive.', author: 'ENES INC.' },
        { quote: 'Playful, clear, and very enjoyable.', author: 'ibdo99' },
      ],
      source: 'App Store reviews',
    },
    business: {
      h2: 'Business Class',
      lead: 'The app subscription, for people who scan often.',
      items: [
        'Unlimited scans, no ads',
        'Double scan range',
        'Free range boosts every day',
        'Free Rarity Lenses every week',
        'Exclusive avatar and premium streak rewards',
      ],
      note: 'Price shown in the app, depending on your country.',
      card: {
        flip: 'Business Class card: tap it to flip it',
        memberLabel: 'MEMBER NAME',
        memberName: 'YOUR NAME',
        statusLabel: 'STATUS',
        benefitsTitle: 'BUSINESS CLASS BENEFITS',
        hint: 'Tap the card to flip it.',
      },
    },
    cta: {
      h2: 'Download ScanHorizon.',
      text: 'Free, with in-app purchases, on iPhone and Android.',
      qr: 'Scan this code with your phone to open the right store.',
    },
  },
} satisfies Record<Lang, unknown>;
