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
    nav: { collection: 'Collection', clans: 'Clans', business: 'Business Class', download: 'Télécharger' },
    hero: {
      h1: 'Scanne le ciel, capture chaque avion.',
      lead: "Pointe ton téléphone vers un avion, en vol ou au sol. ScanHorizon croise ta position, ta boussole et le trafic aérien en direct pour l'identifier, puis range sa carte dans ton hangar.",
      counterLabel: 'avions scannés par les joueurs',
      rating: "5,0 sur l'App Store",
      counterLive: 'En direct',
      demo: {
        label:
          "Démo du scanner : le ciel au-dessus de toi, avec les avions qui passent. Touche un avion, ou le bouton Scan, pour le scanner.",
        scan: "Scanner l'avion le plus proche du viseur",
        again: 'Scanner un autre avion',
        hint: 'Vise un avion et touche-le',
        result: 'Carte {rarity} : {aircraft}',
        caption: 'Démo : le ciel au-dessus de toi, tel que le scanner le voit.',
        compass: { n: 'N', e: 'E', s: 'S', w: 'O' },
      },
    },
    steps: {
      h2: 'Comment ça marche',
      items: [
        { title: 'Vise', text: "Lève ton téléphone vers l'avion. Le viseur s'affiche par-dessus la caméra." },
        { title: 'Scanne', text: "L'app compare ta position, ton cap et les vols en cours, et trouve l'appareil que tu regardes." },
        { title: 'Collectionne', text: "Sa carte rejoint ton Hangar. Scanne-le encore pour la faire monter en grade." },
      ],
    },
    collection: {
      h2: 'Cinq raretés, du Commun au Légendaire.',
      text: [
        "Chaque avion identifié devient une carte. Fais-la tourner, retourne-la : au dos s'affichent les compagnies avec lesquelles tu l'as scanné.",
        "Et puis il y a les cartes Événement. On ne te dira pas comment les obtenir.",
      ],
      hint: 'Glisse pour faire tourner la carte, touche-la pour la retourner.',
      rarities: { common: 'Commun', frequent: 'Fréquent', rare: 'Rare', epic: 'Épique', legendary: 'Légendaire', event: 'Événement' },
      backTitle: 'Opérateurs',
      backText: "Les compagnies avec lesquelles tu as scanné cet avion s'affichent ici, dans ton Hangar.",
      eventBack: "On ne te dira pas comment l'obtenir.",
      prev: 'Carte précédente',
      next: 'Carte suivante',
      flip: 'Retourner',
      regionLabel: 'Cartes avion en 3D. Flèches gauche et droite pour changer de carte, Entrée pour la retourner.',
    },
    progression: {
      h2: 'Dix niveaux pour devenir spotter.',
      text: "Chaque niveau te donne trois missions : scanner un Airbus, une compagnie précise, plusieurs avions dans la journée... Les réussir fait monter ton niveau et débloque les outils du scanner.",
      unlocks: [
        { level: 2, label: 'Le Hangar' },
        { level: 3, label: 'Le choix de la distance' },
        { level: 4, label: 'Les Boosts' },
        { level: 5, label: 'Le HUD personnalisable' },
      ],
      levelWord: 'Niveau',
      weekly: 'Et chaque semaine, un nouveau défi.',
    },
    clans: {
      h2: 'Ton aéroport a son clan.',
      text: "Rejoins le clan de l'aéroport le plus proche, discute avec ses membres dans le chat du clan et fais-le grimper au classement. Sur le globe, chaque aéroport a sa pastille.",
      globeLabel: "Globe des aéroports, comme dans l'app : des pastilles d'aéroports et des avions sur leurs routes. Flèches gauche et droite pour le faire tourner.",
      globeHint: 'Fais tourner le globe.',
    },
    features: {
      h2: 'Et aussi',
      items: [
        { title: 'Vision nocturne', text: 'Un viseur vert, façon jumelles de nuit, pour scanner après le coucher du soleil.' },
        { title: 'Historique et séries', text: 'Chaque scan est gardé, avec ta série de jours consécutifs.' },
        { title: 'Bilan mensuel', text: 'Le récapitulatif de ton mois de spotting, prêt à partager.' },
        { title: 'Passeport', text: 'Ta carte de spotter, qui résume ta progression.' },
        { title: 'Parrainage', text: 'Invite tes amis avec ton code et gagne des récompenses.' },
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
      lead: "L'abonnement pour ceux qui scannent beaucoup.",
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
      h2: 'Lève les yeux.',
      text: 'ScanHorizon est gratuit, avec achats intégrés, sur iPhone et Android.',
      qr: 'Scanne ce code avec ton téléphone pour ouvrir le bon store.',
    },
  },
  en: {
    title: 'Scan the sky, unlock every aircraft',
    description:
      'ScanHorizon identifies the aircraft you point your phone at using live flight data, then adds its card to your hangar. Free on iPhone and Android.',
    nav: { collection: 'Collection', clans: 'Clans', business: 'Business Class', download: 'Download' },
    hero: {
      h1: 'Scan the sky, unlock every aircraft.',
      lead: 'Point your phone at an aircraft, in the air or on the ground. ScanHorizon matches your position, your compass and live air traffic to identify it, then files its card in your hangar.',
      counterLabel: 'aircraft scanned by players',
      rating: '5.0 on the App Store',
      counterLive: 'Live',
      demo: {
        label: 'Scanner demo: the sky above you, with aircraft passing over. Tap an aircraft, or the Scan button, to scan it.',
        scan: 'Scan the aircraft closest to the reticle',
        again: 'Scan another aircraft',
        hint: 'Aim at an aircraft and tap it',
        result: '{rarity} card: {aircraft}',
        caption: 'Demo: the sky above you, as the scanner sees it.',
        compass: { n: 'N', e: 'E', s: 'S', w: 'W' },
      },
    },
    steps: {
      h2: 'How it works',
      items: [
        { title: 'Aim', text: 'Raise your phone towards the aircraft. The viewfinder appears over the camera.' },
        { title: 'Scan', text: 'The app compares your position, your heading and current flights, and finds the aircraft you are looking at.' },
        { title: 'Collect', text: 'Its card joins your Hangar. Scan it again to level the card up.' },
      ],
    },
    collection: {
      h2: 'Five rarities, from Common to Legendary.',
      text: [
        'Every aircraft you identify becomes a card. Spin it, flip it: the back lists the airlines you scanned it with.',
        'And then there are Event cards. We will not tell you how to get them.',
      ],
      hint: 'Drag to spin the card, tap it to flip it.',
      rarities: { common: 'Common', frequent: 'Frequent', rare: 'Rare', epic: 'Epic', legendary: 'Legendary', event: 'Event' },
      backTitle: 'Operators',
      backText: 'The airlines you scanned this aircraft with show up here, in your Hangar.',
      eventBack: 'We will not tell you how to get it.',
      prev: 'Previous card',
      next: 'Next card',
      flip: 'Flip',
      regionLabel: 'Aircraft cards in 3D. Left and right arrows to change card, Enter to flip it.',
    },
    progression: {
      h2: 'Ten levels to become a spotter.',
      text: 'Each level gives you three missions: scan an Airbus, a given airline, several aircraft in one day... Completing them levels you up and unlocks the scanner tools.',
      unlocks: [
        { level: 2, label: 'The Hangar' },
        { level: 3, label: 'Distance selector' },
        { level: 4, label: 'Boosts' },
        { level: 5, label: 'Custom HUD' },
      ],
      levelWord: 'Level',
      weekly: 'And every week, a new challenge.',
    },
    clans: {
      h2: 'Your airport has a clan.',
      text: 'Join the clan of the airport nearest to you, talk with its members in the clan chat and push it up the leaderboard. On the globe, every airport has its pin.',
      globeLabel: 'Airport globe, as in the app: airport pins and aircraft on their routes. Left and right arrows to spin it.',
      globeHint: 'Spin the globe.',
    },
    features: {
      h2: 'Also in the app',
      items: [
        { title: 'Night vision', text: 'A green viewfinder, night-goggles style, for scanning after sunset.' },
        { title: 'History and streaks', text: 'Every scan is kept, along with your streak of consecutive days.' },
        { title: 'Monthly review', text: 'A recap of your month of spotting, ready to share.' },
        { title: 'Passport', text: 'Your spotter card, summing up your progress.' },
        { title: 'Referrals', text: 'Invite friends with your code and earn rewards.' },
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
      lead: 'The subscription for people who scan a lot.',
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
      h2: 'Look up.',
      text: 'ScanHorizon is free, with in-app purchases, on iPhone and Android.',
      qr: 'Scan this code with your phone to open the right store.',
    },
  },
} satisfies Record<Lang, unknown>;
