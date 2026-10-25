// Textes de la page Aide (/fr/aide/, /en/help/).
// Sources, verifiees dans le code le 2026-10-25 :
// - le guide de visee de l'app (lib/widgets/dialogs/aiming_wiki_dialog.dart) et sa FAQ
//   (lib/screens/control_tower/control_tower_faq_page.dart), depot ScanHorizon_Frontend ;
// - les paliers de rarete (services/rarity-tiers.js) et la zone couverte par le radar
//   (BBOX par defaut de services/diffusion.js), depot ScanHorizon_Backend.
// Meme regle que l'accueil : n'ecrire que ce que l'app fait vraiment, aucun chiffre de
// Remote Config (portee en km...), aucun indice sur les cartes Evenement.
// Les reponses peuvent contenir un lien <a> : elles sont injectees telles quelles.
import type { Lang } from './site';

export type HelpIcon = 'aim' | 'compass' | 'missing' | 'rarity' | 'account';

export interface HelpQA {
  q: string;
  a: string[];
}

export interface HelpReason {
  title: string;
  text: string;
}

export interface HelpSection {
  id: string;
  icon: HelpIcon;
  /** Libelle court du panneau d'orientation en haut de page. */
  sign: string;
  title: string;
  intro?: string;
  reasons?: HelpReason[];
  rarity?: boolean;
  items: HelpQA[];
}

export interface RarityRow {
  key: 'common' | 'frequent' | 'rare' | 'epic' | 'legendary';
  label: string;
  share: string;
}

interface HelpCopy {
  title: string;
  description: string;
  h1: string;
  lead: string;
  signsLabel: string;
  sections: HelpSection[];
  rarityTable: { caption: string; tier: string; share: string; rows: RarityRow[]; note: string; examples: string };
  contact: { h2: string; text: string; screenshot: string };
}

export const HELP: Record<Lang, HelpCopy> = {
  fr: {
    title: 'Aide',
    description:
      "Aide de ScanHorizon : bien viser, calibrer la boussole, comprendre pourquoi un avion n'apparaît pas et comment la rareté des cartes est calculée.",
    h1: 'Aide',
    lead: "Les réponses aux questions qu'on nous pose le plus souvent, à commencer par le scan.",
    signsLabel: 'Rubriques',
    sections: [
      {
        id: 'viser',
        icon: 'aim',
        sign: 'Viser',
        title: 'Viser et scanner',
        intro:
          "L'app ne reconnaît pas l'avion sur l'image de la caméra. Elle compare ta position, la direction dans laquelle pointe ton téléphone et la position des avions autour de toi, que leur transpondeur diffuse en direct. L'avion retenu est celui qui se trouve dans ton axe.",
        items: [
          {
            q: 'Comment régler la distance ?',
            a: [
              "À partir du niveau 3, un sélecteur te permet de choisir la plage de distance dans laquelle l'app cherche. La borne basse compte autant que la borne haute : si un avion passe devant celui que tu vises, il est ignoré tant qu'il est plus proche que la borne basse.",
            ],
          },
          {
            q: 'Pourquoi les avions proches sont-ils plus faciles à scanner ?',
            a: [
              "Près de toi, la zone de détection s'élargit. Un avion proche traverse ton champ de vision très vite, et sa position met un instant à nous parvenir : la zone plus large compense ce décalage. Au loin, elle se resserre, et il faut viser plus juste.",
            ],
          },
          {
            q: 'Le zoom augmente-t-il la portée ?',
            a: [
              "Non. Le zoom ne change pas la distance à laquelle l'app cherche. Il sert à placer un avion lointain bien au centre du viseur.",
            ],
          },
          {
            q: 'Comment scanner un avion plus lointain ?',
            a: [
              "Ta portée s'allonge au niveau 7. À partir du niveau 4, le mode x2 l'étend pendant 15 minutes : active-le juste avant de viser un avion qui semble hors de portée. L'abonnement Business Class double aussi ta portée de base.",
            ],
          },
        ],
      },
      {
        id: 'boussole',
        icon: 'compass',
        sign: 'Boussole',
        title: 'Calibrer la boussole',
        intro:
          "La boussole indique dans quelle direction pointe ton téléphone. Si elle se trompe de quelques degrés, l'app cherche à côté de l'avion.",
        items: [
          {
            q: 'Comment la recalibrer ?',
            a: [
              "Avant de scanner, trace trois à cinq « 8 » dans l'air avec ton téléphone. Ce geste recalibre la boussole et améliore nettement la précision du scan.",
            ],
          },
          {
            q: 'Qu’est-ce qui fausse la boussole ?',
            a: [
              "Les aimants et le métal : une coque ou un support aimanté, l'habitacle d'une voiture, une rambarde métallique. Éloigne-toi-en avant de viser.",
            ],
          },
          {
            q: 'Quel est le moment le plus facile pour scanner ?',
            a: [
              "Quand un avion passe presque au-dessus de toi. L'app tient alors beaucoup moins compte de la boussole, et une petite erreur de direction ne t'empêche plus de l'attraper.",
            ],
          },
          {
            q: 'Le scanner reste bloqué sur la calibration',
            a: [
              "Vérifie que l'app a accès à ta position et que ta connexion est stable, puis relance le scan.",
            ],
          },
        ],
      },
      {
        id: 'avion-absent',
        icon: 'missing',
        sign: 'Avion absent',
        title: "Pourquoi un avion n'apparaît pas",
        intro: "Tu vois un avion, mais l'app ne le trouve pas ? Voici les raisons les plus fréquentes.",
        reasons: [
          {
            title: 'Son transpondeur est éteint.',
            text: "L'app ne voit que les avions qui diffusent leur position. Certains avions militaires et privés volent sans la diffuser.",
          },
          {
            title: 'Il est au sol, à l’arrêt.',
            text: "Au sol, seuls les avions dont le transpondeur est allumé, en roulage par exemple, peuvent être scannés. Un avion garé n'apparaît pas.",
          },
          {
            title: 'Il est trop loin.',
            text: 'Il se trouve au-delà de ta portée, ou en dehors de la plage de distance que tu as réglée.',
          },
          {
            title: 'Tu es hors de la zone couverte.',
            text: "Pour l'instant, le radar de l'app couvre la France métropolitaine. Ailleurs, l'app te le signale au moment du scan.",
          },
          {
            title: 'Ta position est imprécise.',
            text: 'Autorise la localisation précise et laisse le GPS se stabiliser quelques secondes, de préférence à découvert.',
          },
          {
            title: 'La réception a sauté.',
            text: "Nous ne recevons pas toujours la position de chaque avion à chaque instant. Réessaie quelques secondes plus tard.",
          },
        ],
        items: [
          {
            q: 'Pourquoi certaines cartes n’ont pas le modèle ou le trajet ?',
            a: [
              "Les équipages ne renseignent pas toujours toutes les informations du vol, ou leur réception a été incomplète. Nous y travaillons.",
            ],
          },
        ],
      },
      {
        id: 'rarete',
        icon: 'rarity',
        sign: 'Rareté',
        title: 'Comment la rareté est calculée',
        intro:
          "La rareté d'une carte dépend du modèle d'avion, jamais du hasard. Notre radar compte chaque appareil qu'il détecte, et chaque modèle reçoit un palier selon sa part dans ce trafic.",
        rarity: true,
        items: [
          {
            q: 'Comment une carte monte-t-elle de niveau ?',
            a: [
              'Chaque fois que tu scannes un modèle que tu as déjà, sa carte progresse. Chaque niveau demande un peu plus de scans que le précédent.',
              'Au niveau 5, la carte passe au grade Aluminum, au niveau 15 au grade Carbon, et au niveau 50 au grade Onyx.',
            ],
          },
        ],
      },
      {
        id: 'compte',
        icon: 'account',
        sign: 'Compte',
        title: 'Compte et abonnement',
        items: [
          {
            q: 'Comment garder ma progression ?',
            a: [
              "Si tu joues en invité, va dans l'onglet Tour de Contrôle et touche « Sauvegarder mon compte », puis choisis Google ou Apple. Tu gardes ta progression et ton pseudo.",
            ],
          },
          {
            q: "Pourquoi je n'apparais pas dans le classement ?",
            a: [
              'Les comptes invités ne figurent pas au classement. Sauvegarde ton compte avec Google ou Apple pour y apparaître. Le classement est mis à jour toutes les 15 minutes.',
            ],
          },
          {
            q: "J'ai payé Business Class, mais rien n'a changé",
            a: [
              "Ouvre le Centre d'abonnement dans l'onglet Tour de Contrôle et touche « Restaurer les achats ». Si rien ne change, écris-nous.",
            ],
          },
          {
            q: 'Comment résilier mon abonnement ?',
            a: ["L'abonnement se gère depuis les réglages de l'App Store ou de Google Play, sur ton téléphone."],
          },
          {
            q: 'Comment supprimer mon compte ?',
            a: [
              'Dans l\'app, en bas de l\'onglet Tour de Contrôle, touche « Supprimer mon compte ». Tu peux aussi faire la demande depuis la page <a href="/fr/supprimer-mes-donnees/">Supprimer mes données</a>.',
            ],
          },
        ],
      },
    ],
    rarityTable: {
      caption: 'Les cinq paliers de rareté',
      tier: 'Palier',
      share: 'Part du trafic détecté',
      rows: [
        { key: 'common', label: 'Commun', share: '1 avion sur 50 ou plus' },
        { key: 'frequent', label: 'Fréquent', share: 'de 1 sur 50 à 1 sur 400' },
        { key: 'rare', label: 'Rare', share: 'de 1 sur 400 à 1 sur 1 500' },
        { key: 'epic', label: 'Épique', share: 'de 1 sur 1 500 à 1 sur 6 000' },
        { key: 'legendary', label: 'Légendaire', share: 'moins de 1 sur 6 000' },
      ],
      note: 'Valeurs arrondies. Les paliers peuvent être réajustés quand le trafic évolue.',
      examples: "Par exemple, l'A320 est Commun et le Rafale est Légendaire.",
    },
    contact: {
      h2: 'Une autre question ?',
      text: 'Écris-nous à',
      screenshot: "Si l'app affiche une erreur, joins une capture d'écran.",
    },
  },
  en: {
    title: 'Help',
    description:
      'ScanHorizon help: how to aim, calibrate your compass, why an aircraft may not show up and how card rarity is calculated.',
    h1: 'Help',
    lead: 'Answers to the questions we hear most, starting with scanning.',
    signsLabel: 'Topics',
    sections: [
      {
        id: 'aiming',
        icon: 'aim',
        sign: 'Aiming',
        title: 'Aiming and scanning',
        intro:
          'The app does not recognise the aircraft in the camera image. It compares your position, the direction your phone is pointing and the position of the aircraft around you, broadcast live by their transponders. The aircraft it picks is the one in your line of sight.',
        items: [
          {
            q: 'How do I set the distance?',
            a: [
              'From level 3, a selector lets you choose the distance range the app searches. The lower bound matters as much as the upper one: if an aircraft passes in front of the one you are aiming at, it is ignored as long as it is closer than the lower bound.',
            ],
          },
          {
            q: 'Why are nearby aircraft easier to scan?',
            a: [
              'Close to you, the detection area widens. A nearby aircraft crosses your view very quickly, and its position takes a moment to reach us: the wider area makes up for that delay. Far away, it narrows, so you need to aim more precisely.',
            ],
          },
          {
            q: 'Does the zoom increase my range?',
            a: [
              'No. The zoom does not change how far the app searches. It helps you put a distant aircraft right in the centre of the reticle.',
            ],
          },
          {
            q: 'How do I scan an aircraft that is further away?',
            a: [
              'Your range grows at level 7. From level 4, x2 mode extends it for 15 minutes: turn it on just before aiming at an aircraft that seems out of reach. A Business Class subscription also doubles your base range.',
            ],
          },
        ],
      },
      {
        id: 'compass',
        icon: 'compass',
        sign: 'Compass',
        title: 'Calibrating the compass',
        intro:
          'The compass tells the app which way your phone is pointing. If it is off by a few degrees, the app searches beside the aircraft.',
        items: [
          {
            q: 'How do I recalibrate it?',
            a: [
              'Before scanning, draw three to five figure eights in the air with your phone. This recalibrates the compass and makes scans noticeably more accurate.',
            ],
          },
          {
            q: 'What throws the compass off?',
            a: [
              'Magnets and metal: a magnetic case or mount, the inside of a car, a metal railing. Step away from them before aiming.',
            ],
          },
          {
            q: 'When is it easiest to scan?',
            a: [
              'When an aircraft passes almost overhead. The app then relies much less on the compass, so a small heading error no longer stops you from catching it.',
            ],
          },
          {
            q: 'The scanner is stuck on calibration',
            a: ['Check that the app can access your location and that your connection is stable, then restart the scan.'],
          },
        ],
      },
      {
        id: 'missing-aircraft',
        icon: 'missing',
        sign: 'Missing aircraft',
        title: 'Why an aircraft does not show up',
        intro: 'You can see an aircraft but the app cannot find it? These are the most common reasons.',
        reasons: [
          {
            title: 'Its transponder is off.',
            text: 'The app only sees aircraft that broadcast their position. Some military and private aircraft fly without broadcasting it.',
          },
          {
            title: 'It is parked on the ground.',
            text: 'On the ground, only aircraft with their transponder on, while taxiing for example, can be scanned. A parked aircraft does not show up.',
          },
          {
            title: 'It is too far away.',
            text: 'It is beyond your range, or outside the distance range you have set.',
          },
          {
            title: 'You are outside the covered area.',
            text: 'For now, the app radar covers mainland France. Elsewhere, the app tells you when you scan.',
          },
          {
            title: 'Your position is imprecise.',
            text: 'Allow precise location and give the GPS a few seconds to settle, ideally in the open.',
          },
          {
            title: 'Reception dropped.',
            text: 'We do not always receive every aircraft position at every moment. Try again a few seconds later.',
          },
        ],
        items: [
          {
            q: 'Why do some cards lack the aircraft model or the route?',
            a: [
              'Crews do not always fill in every flight detail, or the reception was incomplete. We are working on it.',
            ],
          },
        ],
      },
      {
        id: 'rarity',
        icon: 'rarity',
        sign: 'Rarity',
        title: 'How rarity is calculated',
        intro:
          'A card’s rarity depends on the aircraft model, never on luck. Our radar counts every aircraft it detects, and each model gets a tier based on its share of that traffic.',
        rarity: true,
        items: [
          {
            q: 'How does a card level up?',
            a: [
              'Every time you scan a model you already have, its card progresses. Each level takes a few more scans than the one before.',
              'At level 5 the card reaches the Aluminum grade, at level 15 Carbon, and at level 50 Onyx.',
            ],
          },
        ],
      },
      {
        id: 'account',
        icon: 'account',
        sign: 'Account',
        title: 'Account and subscription',
        items: [
          {
            q: 'How do I keep my progress?',
            a: [
              'If you play as a guest, open the Control Tower tab, tap “Save account” and choose Google or Apple. You keep your progress and your username.',
            ],
          },
          {
            q: 'Why am I not on the leaderboard?',
            a: [
              'Guest accounts are not listed. Save your account with Google or Apple to appear. The leaderboard is updated every 15 minutes.',
            ],
          },
          {
            q: 'I paid for Business Class but nothing changed',
            a: [
              'Open the Subscription Center in the Control Tower tab and tap “Restore purchases”. If nothing changes, write to us.',
            ],
          },
          {
            q: 'How do I cancel my subscription?',
            a: ['Subscriptions are managed in the App Store or Google Play settings on your phone.'],
          },
          {
            q: 'How do I delete my account?',
            a: [
              'In the app, at the bottom of the Control Tower tab, tap “Delete My Account”. You can also request it from the <a href="/en/delete-my-data/">Delete my data</a> page.',
            ],
          },
        ],
      },
    ],
    rarityTable: {
      caption: 'The five rarity tiers',
      tier: 'Tier',
      share: 'Share of detected traffic',
      rows: [
        { key: 'common', label: 'Common', share: '1 aircraft in 50 or more' },
        { key: 'frequent', label: 'Frequent', share: '1 in 50 to 1 in 400' },
        { key: 'rare', label: 'Rare', share: '1 in 400 to 1 in 1,500' },
        { key: 'epic', label: 'Epic', share: '1 in 1,500 to 1 in 6,000' },
        { key: 'legendary', label: 'Legendary', share: 'fewer than 1 in 6,000' },
      ],
      note: 'Rounded figures. Tiers may be adjusted as traffic changes.',
      examples: 'For example, the A320 is Common and the Rafale is Legendary.',
    },
    contact: {
      h2: 'Another question?',
      text: 'Write to us at',
      screenshot: 'If the app shows an error, attach a screenshot.',
    },
  },
};

export function helpPath(lang: Lang): string {
  return lang === 'fr' ? '/fr/aide/' : '/en/help/';
}
