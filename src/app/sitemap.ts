import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { locales } from "@/types/project";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://duplaixgaspard.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const homePages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: {
        en: `${baseUrl}/en`,
        fr: `${baseUrl}/fr`,
      },
    },
  }));

  const projectPages = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: `${baseUrl}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/projects/${project.slug}`,
          fr: `${baseUrl}/fr/projects/${project.slug}`,
        },
      },
    })),
  );

  return [...homePages, ...projectPages];
}
