import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lettrine } from "@/components/lettrine";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ProjectGallery } from "@/components/project-gallery";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { FlagBackground } from "@/components/flag-background";
import { NextProjectLink } from "@/components/next-project-link";
import { projects } from "@/data/projects";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getProjectContent, getProjectFrontmatter } from "@/lib/projects";
import { threadFor } from "@/lib/threads";
import { locales, type Locale } from "@/types/project";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

function withLettrine(text: string, color?: string) {
  return (
    <span aria-hidden="true">
      <Lettrine letter={text.slice(0, 1)} color={color} className="proj-lettrine-svg" />
      {text.slice(1)}
    </span>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: value, slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!isLocale(value) || !project) return {};
  const locale = value as Locale;
  const frontmatter = await getProjectFrontmatter(slug, locale);

  return {
    title: frontmatter.title,
    description: frontmatter.summary,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        en: `/en/projects/${slug}`,
        fr: `/fr/projects/${slug}`,
      },
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary,
      type: "article",
      images: [project.thumbnail.src],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: value, slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  if (!isLocale(value) || projectIndex === -1) notFound();
  const locale = value as Locale;
  const dictionary = getDictionary(locale);
  const alternate = locale === "en" ? "fr" : "en";
  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const [{ content, frontmatter }, nextFrontmatter] = await Promise.all([
    getProjectContent(slug, locale),
    getProjectFrontmatter(nextProject.slug, locale),
  ]);

  return (
    <>
      <SiteHeader
        locale={locale}
        alternateHref={`/${alternate}/projects/${slug}`}
      />
      <main
      id="main-content"
      className="project-page"
      style={
        {
          "--accent": project.accent,
          "--accent-soft": project.accentSoft,
          "--thread-color": threadFor(projectIndex).color,
          "--thumb-filter": `url(#${threadFor(projectIndex).filter})`,
          "--logo-filter": `url(#${threadFor(projectIndex).logoFilter})`,
          "--card-thumb": `url(${project.thumbnail.src})`,
        } as React.CSSProperties
      }
    >
      <FlagBackground
        textureSrc={project.thumbnail.src}
        tint={threadFor(projectIndex).color}
      />
      <section className="project-hero">
        <div className="project-hero-meta">
          <Link href={`/${locale}#work`}>
            <ArrowLeft aria-hidden="true" />
            {dictionary.project.back}
          </Link>
          <span>{project.year}</span>
        </div>
        <BlurFade className="project-hero-title">
          <span>{frontmatter.kicker}</span>
          <h1 aria-label={frontmatter.title}>{withLettrine(frontmatter.title, threadFor(projectIndex).color)}</h1>
          <p>{frontmatter.summary}</p>
        </BlurFade>
        <div className="project-cover">
          <Image
            src={project.thumbnail.src}
            alt=""
            width={project.thumbnail.width}
            height={project.thumbnail.height}
            priority
            unoptimized={project.thumbnail.src.endsWith(".svg")}
            sizes="(max-width: 760px) 92vw, 1040px"
          />
          <span className="project-cover-label">Case study / {project.year}</span>
          <BorderBeam
            size={80}
            duration={11}
            borderWidth={1.5}
            colorFrom="var(--thread-color)"
            colorTo="var(--thread-color)"
          />
        </div>
      </section>

      <BlurFade inView inViewMargin="-120px">
      <section className="project-content-section">
        <aside className="project-sidebar">
          <span>{dictionary.project.stack}</span>
          <ul>
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          {project.externalUrl ? (
            <Button asChild>
              <a href={project.externalUrl} target="_blank" rel="noreferrer">
                {dictionary.project.visit}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          ) : null}
        </aside>
        <article className="mdx-content">
          <span className="content-kicker">{dictionary.project.overview}</span>
          {content}
        </article>
      </section>
      </BlurFade>

      <BlurFade inView inViewMargin="-120px">
      <section className="gallery-section" aria-labelledby="gallery-title">
        <div className="gallery-heading">
          <span>02</span>
          <h2 id="gallery-title">
            <Lettrine letter={dictionary.project.gallery.slice(0, 1)} color={threadFor(projectIndex).color} className="proj-lettrine-svg" />
            {dictionary.project.gallery.slice(1)}
          </h2>
        </div>
        <ProjectGallery
          media={project.gallery}
          alt={frontmatter.galleryAlt}
          openLabel={dictionary.project.openImage}
          closeLabel={dictionary.project.closeImage}
        />
      </section>
      </BlurFade>

      <NextProjectLink
        href={`/${locale}/projects/${nextProject.slug}`}
        slug={nextProject.slug}
        title={nextFrontmatter.title}
        accent={nextProject.accent}
        style={
          {
            "--next-accent": nextProject.accent,
            "--next-thread": threadFor(
              (projectIndex + 1) % projects.length,
            ).color,
          } as React.CSSProperties
        }
      >
        <span>{dictionary.project.next}</span>
        <strong aria-label={nextFrontmatter.title}>
          {withLettrine(nextFrontmatter.title, threadFor((projectIndex + 1) % projects.length).color)}
        </strong>
        <ArrowUpRight aria-hidden="true" />
      </NextProjectLink>
      </main>
    </>
  );
}
