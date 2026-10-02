import type { ResumeData } from "@/types/resume";

export const resumeData: Record<"en" | "fr", ResumeData> = {
  en: {
    locale: "en",
    title: "Digital project lead with a designer’s eye and a builder’s hands.",
    introduction:
      "I am completing my fourth year at Epitech Digital School, specialising in digital transformation. I design useful, optimised solutions around real user needs, from product framing to interface and implementation.",
    availability:
      "Looking for a first digital or product role from September 2026, after my work-study year.",
    location: "Bordeaux, France",
    email: "contact@duplaixgaspard.fr",
    experiences: [
      {
        company: "Mediatic Conseils",
        context: "Training organisation for radio sales teams",
        role: "Digital Project Lead",
        period: "September 2025 — September 2026",
        location: "France",
        highlights: [
          "Designed and developed a multimodal RAG system for a cloud knowledge base containing PDFs, videos and audio.",
          "Defined the architecture and built the Supabase database, storage and ingestion pipelines.",
          "Tested hybrid, API and local retrieval strategies, with vector and semantic relevance analysis.",
        ],
      },
      {
        company: "Enjoy 33",
        context: "Independent commercial radio station",
        role: "Web Developer",
        period: "January 2025 — July 2025",
        location: "Bordeaux",
        highlights: [
          "Redesigned the radio website and added an audio player, client directory and Graph API integration.",
          "Created a detailed persona to clarify the station’s audience.",
          "Implemented the SEO structure and configured push notifications.",
        ],
      },
      {
        company: "MaxSea",
        context: "Marine navigation software company",
        role: "UI/UX Designer",
        period: "February 2023 — June 2023",
        location: "Bidart",
        highlights: [
          "Joined and collaborated with an established UI/UX team.",
          "Designed software interface mock-ups.",
          "Studied competing applications with a focus on gamification.",
        ],
      },
    ],
    education: [
      {
        school: "Epitech Digital School",
        credential: "MSc Business & Tech Management",
        period: "2021 — 2026",
        details: [
          "UI/UX design",
          "Project management",
          "Digital marketing",
          "Data analysis",
          "Web development",
          "LLM and AI",
        ],
      },
      {
        school: "St Joseph de Tivoli",
        credential: "French and American Baccalaureates",
        period: "2014 — 2021",
        details: ["Economics and social sciences", "Academica dual diploma"],
      },
    ],
    skills: [
      "Design thinking",
      "Agile methods",
      "Project leadership",
      "UX/UI design",
      "Web development",
      "Data & AI",
    ],
    languages: ["English · B2", "Spanish · A2"],
    passions: ["Music production", "Tennis", "Golf"],
  },
  fr: {
    locale: "fr",
    title: "Chef de projet digital, avec un œil de designer et des mains de développeur.",
    introduction:
      "Étudiant en quatrième année à Epitech Digital School, je me spécialise dans la transformation digitale. Je conçois des solutions utiles et optimisées autour des besoins réels des utilisateurs, du cadrage produit à l’interface et à son développement.",
    availability:
      "À la recherche d’un premier poste en digital ou product design à partir de septembre 2026, après mon alternance.",
    location: "Bordeaux, France",
    email: "contact@duplaixgaspard.fr",
    experiences: [
      {
        company: "Mediatic Conseils",
        context: "Organisme de formation pour les commerciaux radio",
        role: "Chef de projet Digital",
        period: "Septembre 2025 — Septembre 2026",
        location: "France",
        highlights: [
          "Conception et développement d’un RAG multimodal pour une base documentaire cloud composée de PDF, vidéos et audios.",
          "Définition de l’architecture et construction de la base Supabase, du stockage et des pipelines d’ingestion.",
          "Expérimentation de stratégies de recherche hybrides, API et locales avec analyses vectorielles et sémantiques.",
        ],
      },
      {
        company: "Enjoy 33",
        context: "Radio commerciale indépendante",
        role: "Web Developer",
        period: "Janvier 2025 — Juillet 2025",
        location: "Bordeaux",
        highlights: [
          "Refonte du site et ajout d’un player audio, d’un annuaire clients et de l’intégration Graph API.",
          "Création d’un persona détaillé pour clarifier l’audience de la radio.",
          "Mise en place de la structure SEO et configuration des notifications push.",
        ],
      },
      {
        company: "MaxSea",
        context: "Éditeur de logiciels de navigation maritime",
        role: "UI/UX Designer",
        period: "Février 2023 — Juin 2023",
        location: "Bidart",
        highlights: [
          "Intégration et collaboration au sein d’une équipe UI/UX.",
          "Conception de maquettes de logiciel.",
          "Analyse concurrentielle d’applications centrées sur la gamification.",
        ],
      },
    ],
    education: [
      {
        school: "Epitech Digital School",
        credential: "MSc Business & Tech Management",
        period: "2021 — 2026",
        details: [
          "Design UI/UX",
          "Gestion de projet",
          "Marketing digital",
          "Data analyse",
          "Développement web",
          "LLM et IA",
        ],
      },
      {
        school: "St Joseph de Tivoli",
        credential: "Baccalauréats français et américain",
        period: "2014 — 2021",
        details: ["Économie et sciences sociales", "Double diplôme Academica"],
      },
    ],
    skills: [
      "Design thinking",
      "Méthodes agiles",
      "Conduite de projets",
      "UX/UI design",
      "Développement web",
      "Data & IA",
    ],
    languages: ["Anglais · B2", "Espagnol · A2"],
    passions: ["Composition musicale", "Tennis", "Golf"],
  },
};
