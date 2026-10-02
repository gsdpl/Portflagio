export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export type ProjectCategory = "development" | "design" | "product";

export type ProjectMedia = {
  src: string;
  width: number;
  height: number;
};

export type ProjectMetadata = {
  slug: string;
  year: number;
  technologies: string[];
  categories: ProjectCategory[];
  accent: string;
  accentSoft: string;
  thumbnail: ProjectMedia;
  gallery: ProjectMedia[];
  externalUrl?: string;
};

export type ProjectFrontmatter = {
  title: string;
  summary: string;
  kicker: string;
  galleryAlt: string[];
};

export type ProjectListItem = ProjectMetadata & ProjectFrontmatter;
