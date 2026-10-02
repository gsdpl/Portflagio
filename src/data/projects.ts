import type { ProjectMetadata } from "@/types/project";

export const projects: ProjectMetadata[] = [
  {
    slug: "neo-travel",
    year: 2025,
    technologies: ["Next.js", "React", "Tailwind CSS", "Figma", "Radix UI"],
    categories: ["development", "product"],
    accent: "#d7ff5f",
    accentSoft: "#293113",
    thumbnail: {
      src: "/projects/neo-travel/thumbnail.png",
      width: 2880,
      height: 1620,
    },
    gallery: [
      { src: "/projects/neo-travel/dashboard.png", width: 1891, height: 1078 },
      { src: "/projects/neo-travel/offers.png", width: 1891, height: 1079 },
      { src: "/projects/neo-travel/messages.png", width: 1892, height: 1079 },
    ],
    externalUrl: "https://v0-neocarplatform-topaz.vercel.app/login",
  },
  {
    slug: "commbot",
    year: 2026,
    technologies: ["Python", "FastAPI", "Supabase", "Claude API", "RAG", "Coolify"],
    categories: ["development", "product"],
    accent: "#00b4d8",
    accentSoft: "#0a2a33",
    thumbnail: {
      src: "/projects/commbot/thumbnail.svg",
      width: 2880,
      height: 1800,
    },
    gallery: [
      { src: "/projects/commbot/preparation.webp", width: 2000, height: 1250 },
      { src: "/projects/commbot/fiche.webp", width: 2000, height: 1250 },
      { src: "/projects/commbot/accueil.webp", width: 2000, height: 1250 },
    ],
  },
  {
    slug: "enjoy-33",
    year: 2025,
    technologies: ["JavaScript", "Velo.js", "Meta API", "UX/UI"],
    categories: ["development", "design"],
    accent: "#ff2c91",
    accentSoft: "#3a1027",
    thumbnail: {
      src: "/projects/enjoy-33/thumbnail.png",
      width: 2880,
      height: 1620,
    },
    gallery: [
      { src: "/projects/enjoy-33/home.png", width: 2533, height: 1599 },
      { src: "/projects/enjoy-33/radio.png", width: 2533, height: 1599 },
      { src: "/projects/enjoy-33/directory.png", width: 2536, height: 1599 },
    ],
  },
  {
    slug: "meurtre-au-manoir",
    year: 2025,
    technologies: ["Python", "Pygame", "Whisper", "Ollama", "Gemma 2"],
    categories: ["development", "product"],
    accent: "#b927ff",
    accentSoft: "#291036",
    thumbnail: {
      src: "/projects/meurtre-au-manoir/thumbnail.png",
      width: 2880,
      height: 1620,
    },
    gallery: [
      { src: "/projects/meurtre-au-manoir/context.png", width: 2270, height: 1468 },
      { src: "/projects/meurtre-au-manoir/suspects.png", width: 2267, height: 1464 },
      { src: "/projects/meurtre-au-manoir/explanation.png", width: 2270, height: 1465 },
    ],
  },
  {
    slug: "we-happers",
    year: 2024,
    technologies: ["Figma", "Webflow", "Branding", "Teamwork"],
    categories: ["design", "product"],
    accent: "#617df4",
    accentSoft: "#121a3c",
    thumbnail: {
      src: "/projects/we-happers/thumbnail.svg",
      width: 2880,
      height: 1800,
    },
    gallery: [
      { src: "/projects/we-happers/questions.png", width: 786, height: 1704 },
      { src: "/projects/we-happers/pyramid-two.png", width: 786, height: 1704 },
      { src: "/projects/we-happers/pyramid-one.png", width: 590, height: 1278 },
    ],
  },
  {
    slug: "naviroll",
    year: 2024,
    technologies: ["FlutterFlow", "Figma", "Kanban", "Luma AI"],
    categories: ["design", "product"],
    accent: "#ff7d65",
    accentSoft: "#3a1713",
    thumbnail: {
      src: "/projects/naviroll/thumbnail.svg",
      width: 2880,
      height: 1800,
    },
    gallery: [
      { src: "/projects/naviroll/overview.png", width: 350, height: 765 },
      { src: "/projects/naviroll/flutterflow.png", width: 778, height: 1692 },
      { src: "/projects/naviroll/content.png", width: 778, height: 1692 },
    ],
  },
  {
    slug: "festivault",
    year: 2022,
    technologies: ["Figma", "Illustrator", "Photoshop", "Notion"],
    categories: ["design", "product"],
    accent: "#40c99a",
    accentSoft: "#102f25",
    thumbnail: {
      src: "/projects/festivault/thumbnail.svg",
      width: 2880,
      height: 1800,
    },
    gallery: [
      { src: "/projects/festivault/timeline.png", width: 1560, height: 3376 },
      { src: "/projects/festivault/map.png", width: 1560, height: 3379 },
      { src: "/projects/festivault/emergencies.png", width: 1560, height: 3408 },
    ],
  },
];

export const projectSlugs = projects.map((project) => project.slug);
