import fs from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import { projects } from "@/data/projects";
import type {
  Locale,
  ProjectFrontmatter,
  ProjectListItem,
} from "@/types/project";

function sourcePath(slug: string, locale: Locale) {
  return path.join(
    process.cwd(),
    "content",
    "projects",
    slug,
    `${locale}.mdx`,
  );
}

export async function getProjectFrontmatter(
  slug: string,
  locale: Locale,
): Promise<ProjectFrontmatter> {
  const source = await fs.readFile(sourcePath(slug, locale), "utf8");
  const { frontmatter } = await compileMDX<ProjectFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  });
  return frontmatter;
}

export async function getAllProjects(locale: Locale): Promise<ProjectListItem[]> {
  return Promise.all(
    projects.map(async (project) => ({
      ...project,
      ...(await getProjectFrontmatter(project.slug, locale)),
    })),
  );
}

export async function getProjectContent(slug: string, locale: Locale) {
  const source = await fs.readFile(sourcePath(slug, locale), "utf8");
  return compileMDX<ProjectFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  });
}
