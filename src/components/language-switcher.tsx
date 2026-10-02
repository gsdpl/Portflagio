import Link from "next/link";
import type { Locale } from "@/types/project";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  href: string;
};

export function LanguageSwitcher({
  locale,
  label,
  href,
}: LanguageSwitcherProps) {
  const alternate = locale === "en" ? "fr" : "en";

  return (
    <Link
      className="language-switcher"
      href={href}
      hrefLang={alternate}
      aria-label={`${label}: ${alternate.toUpperCase()}`}
    >
      <span aria-hidden="true">{locale.toUpperCase()}</span>
      <span className="language-divider" aria-hidden="true" />
      <span>{alternate.toUpperCase()}</span>
    </Link>
  );
}
