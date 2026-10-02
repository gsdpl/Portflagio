import { KineticHero } from "@/components/kinetic-hero";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ProjectExplorer } from "@/components/project-explorer";
import { ResumeSection } from "@/components/resume-section";
import { SiteHeader } from "@/components/site-header";
import { isLocale } from "@/lib/i18n";
import { getAllProjects } from "@/lib/projects";
import type { Locale } from "@/types/project";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value as Locale;
  const projects = await getAllProjects(locale);

  const alternate = locale === "en" ? "fr" : "en";

  return (
    <>
      <SiteHeader
        locale={locale}
        alternateHref={`/${alternate}`}
        onHome
      />
      <main id="main-content">
        <KineticHero locale={locale} />
        <BlurFade inView inViewMargin="-120px">
          <ProjectExplorer locale={locale} projects={projects} />
        </BlurFade>
        <BlurFade inView inViewMargin="-120px">
          <ResumeSection locale={locale} />
        </BlurFade>
      </main>
    </>
  );
}
