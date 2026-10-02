import type { Metadata } from "next";
import { Grenze_Gotisch, Manrope, UnifrakturCook } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { GlassFilterDefs } from "@/components/glass/glass-filter-defs";
import { PaperEdges } from "@/components/paper-edges";
import { SiteFooter } from "@/components/site-footer";
import { TransitionProvider } from "@/components/transition-provider";
import { getDictionary, isLocale } from "@/lib/i18n";
import { locales, type Locale } from "@/types/project";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://duplaixgaspard.com";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const grenzeGotisch = Grenze_Gotisch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-grenze",
  display: "swap",
});

const unifrakturCook = UnifrakturCook({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-lettrine",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const locale = value as Locale;
  const isFrench = locale === "fr";
  const title = isFrench
    ? "Gaspard Duplaix — Product designer & développeur créatif"
    : "Gaspard Duplaix — Product designer & creative developer";
  const description = isFrench
    ? "Portfolio de Gaspard Duplaix : product design, UX/UI et développement d’expériences numériques."
    : "Gaspard Duplaix's portfolio: product design, UX/UI and creative development for thoughtful digital experiences.";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s — Gaspard Duplaix`,
    },
    description,
    icons: {
      icon: "/icon.svg",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isFrench ? "fr_FR" : "en_US",
      alternateLocale: isFrench ? ["en_US"] : ["fr_FR"],
      url: `/${locale}`,
      siteName: "Gaspard Duplaix",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value as Locale;
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${grenzeGotisch.variable} ${unifrakturCook.variable}`}
    >
      <body>
        <GlassFilterDefs />
        <PaperEdges />
        <a className="skip-link" href="#main-content">
          {dictionary.skip}
        </a>
        <TransitionProvider>{children}</TransitionProvider>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
