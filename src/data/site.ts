// Donnees partagees du site : langues, adresses des pages legales, liens des stores.
// Les adresses ci-dessous sont aussi celles vers lesquelles redirigent les anciens
// liens #privacy, #terms, #legal et #delete (voir public/index.html, public/fr/index.html
// et public/en/index.html) : les garder synchronisees.

export type Lang = 'fr' | 'en';
export type LegalKey = 'privacy' | 'terms' | 'legal' | 'delete';

export const STORE_LINKS = {
  ios: 'https://apps.apple.com/fr/app/scanhorizon/id6761936970',
  android: 'https://play.google.com/store/apps/details?id=com.app.flighttracktest',
};

export const CONTACT_EMAIL = 'contact@scan-horizon.com';
export const DELETION_FORM_URL = 'https://forms.gle/rJrmhro8WhCAsTFM9';

interface LegalPage {
  slug: string;
  title: string;
  navLabel: string;
  description: string;
}

export const LEGAL_PAGES: Record<LegalKey, Record<Lang, LegalPage>> = {
  privacy: {
    fr: {
      slug: 'confidentialite',
      title: 'Politique de confidentialité',
      navLabel: 'Confidentialité',
      description: "Politique de confidentialité et de protection des données de l'application ScanHorizon.",
    },
    en: {
      slug: 'privacy',
      title: 'Privacy policy',
      navLabel: 'Privacy',
      description: 'Privacy and data protection policy of the ScanHorizon app.',
    },
  },
  terms: {
    fr: {
      slug: 'cgu',
      title: 'Conditions générales (CGU / CGV)',
      navLabel: 'CGU / CGV',
      description: "Conditions générales d'utilisation et de vente de l'application ScanHorizon.",
    },
    en: {
      slug: 'terms',
      title: 'Terms & conditions',
      navLabel: 'Terms',
      description: 'Terms of use and terms of sale of the ScanHorizon app.',
    },
  },
  legal: {
    fr: {
      slug: 'mentions-legales',
      title: 'Mentions légales',
      navLabel: 'Mentions légales',
      description: 'Mentions légales du site scan-horizon.com et de l’application ScanHorizon.',
    },
    en: {
      slug: 'legal-notice',
      title: 'Legal notice',
      navLabel: 'Legal notice',
      description: 'Legal notice of scan-horizon.com and the ScanHorizon app.',
    },
  },
  delete: {
    fr: {
      slug: 'supprimer-mes-donnees',
      title: 'Suppression de compte',
      navLabel: 'Supprimer mes données',
      description: 'Demander la suppression de votre compte ScanHorizon et de vos données.',
    },
    en: {
      slug: 'delete-my-data',
      title: 'Delete account',
      navLabel: 'Delete my data',
      description: 'Request the deletion of your ScanHorizon account and data.',
    },
  },
};

export const LEGAL_ORDER: LegalKey[] = ['privacy', 'terms', 'legal', 'delete'];

export function legalPath(key: LegalKey, lang: Lang): string {
  return `/${lang}/${LEGAL_PAGES[key][lang].slug}/`;
}

export function homePath(lang: Lang): string {
  return `/${lang}/`;
}

export const UI = {
  fr: {
    home: 'Accueil',
    legalEyebrow: 'Textes légaux',
    toc: 'Sommaire',
    footerTagline: 'Scanne le ciel, capture chaque avion.',
    footerLegal: 'Légal',
    footerContact: 'Contact',
    footerApp: "L'application",
    switchTo: 'English',
    switchLabel: 'Read this page in English',
    skip: 'Aller au contenu',
    backToTop: 'Haut de page',
  },
  en: {
    home: 'Home',
    legalEyebrow: 'Legal',
    toc: 'Contents',
    footerTagline: 'Scan the sky, unlock every aircraft.',
    footerLegal: 'Legal',
    footerContact: 'Contact',
    footerApp: 'The app',
    switchTo: 'Français',
    switchLabel: 'Lire cette page en français',
    skip: 'Skip to content',
    backToTop: 'Back to top',
  },
} as const;
