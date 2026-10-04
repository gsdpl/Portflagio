import { locales, type Locale } from "@/types/project";

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const dictionaries = {
  en: {
    skip: "Skip to content",
    navigation: "Main navigation",
    home: "Home",
    work: "Selected work",
    about: "CV",
    contact: "Contact",
    menu: "Open navigation",
    close: "Close navigation",
    language: "Switch language",
    availability: "Seeking a first role from September 2026",
    heroEyebrow: "Digital project lead · Product designer",
    heroLead: "I turn digital ideas into useful, memorable experiences.",
    heroBody:
      "I connect product thinking, interface design and development to open clear conversations for a first digital role after my studies in September 2026.",
    explore: "Explore selected work",
    selected: "Selected work",
    selectedIntro:
      "Six projects across product strategy, interface design and development.",
    filters: {
      all: "All",
      development: "Development",
      design: "Design",
      product: "Product",
    },
    viewProject: "View case study",
    startConversation: "Start a conversation",
    email: "Email me",
    linkedin: "LinkedIn",
    footerLine: "A digital practice between strategy, design and code.",
    brandLabel: "Gaspard Duplaix brand emblem",
    resume: {
      eyebrow: "My path, in a few honest lines",
      portraitAlt: "Portrait of Gaspard Duplaix",
      download: "Download CV",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      languages: "Languages",
      passions: "Outside the screen",
      contactTitle: "Have a project, a role or a curious idea?",
      contactBody:
        "I am looking for a first role from September 2026, after my work-study year, in a team that cares about useful products and thoughtful digital craft.",
    },
    project: {
      overview: "Project overview",
      stack: "Tools & technologies",
      visit: "Open live project",
      gallery: "Selected screens",
      next: "Next case study",
      back: "Back to all work",
      openImage: "Open enlarged image",
      closeImage: "Close enlarged image",
    },
    notFound: {
      eyebrow: "404 · Lost in the interface",
      title: "This page has wandered off.",
      body: "The project may have moved, or the link may be taking a creative detour.",
      action: "Return home",
    },
  },
  fr: {
    skip: "Aller au contenu",
    navigation: "Navigation principale",
    home: "Accueil",
    work: "Projets",
    about: "CV",
    contact: "Contact",
    menu: "Ouvrir la navigation",
    close: "Fermer la navigation",
    language: "Changer de langue",
    availability: "En recherche d’un premier poste dès septembre 2026",
    heroEyebrow: "Chef de projet digital · Product designer",
    heroLead: "Je transforme les idées numériques en expériences utiles et mémorables.",
    heroBody:
      "Je relie réflexion produit, design d’interface et développement pour ouvrir des discussions concrètes autour d’un premier poste après mes études en septembre 2026.",
    explore: "Découvrir les projets",
    selected: "Projets sélectionnés",
    selectedIntro:
      "Six projets entre stratégie produit, design d’interface et développement.",
    filters: {
      all: "Tous",
      development: "Développement",
      design: "Design",
      product: "Produit",
    },
    viewProject: "Voir l’étude de cas",
    startConversation: "Commençons une conversation",
    email: "M’écrire",
    linkedin: "LinkedIn",
    footerLine: "Une pratique numérique entre stratégie, design et code.",
    brandLabel: "Emblème de marque de Gaspard Duplaix",
    resume: {
      eyebrow: "Mon parcours, en quelques lignes sincères",
      portraitAlt: "Portrait de Gaspard Duplaix",
      download: "Télécharger le CV",
      experience: "Expériences",
      education: "Formation",
      skills: "Compétences",
      languages: "Langues",
      passions: "Hors écran",
      contactTitle: "Un projet, un poste ou une idée curieuse ?",
      contactBody:
        "Je recherche un premier poste à partir de septembre 2026, après mon alternance, dans une équipe qui conçoit des produits utiles avec soin.",
    },
    project: {
      overview: "Vue d’ensemble",
      stack: "Outils et technologies",
      visit: "Voir le projet en ligne",
      gallery: "Écrans sélectionnés",
      next: "Projet suivant",
      back: "Retour aux projets",
      openImage: "Ouvrir l’image agrandie",
      closeImage: "Fermer l’image agrandie",
    },
    notFound: {
      eyebrow: "404 · Perdu dans l’interface",
      title: "Cette page est partie se promener.",
      body: "Le projet a peut-être déménagé, ou le lien prend un détour un peu trop créatif.",
      action: "Retour à l’accueil",
    },
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
