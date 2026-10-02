import { Menu, X } from "lucide-react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/types/project";

export function SiteHeader({
  locale,
  alternateHref,
  onHome = false,
}: {
  locale: Locale;
  alternateHref: string;
  onHome?: boolean;
}) {
  const dictionary = getDictionary(locale);
  const links = [
    { href: `/${locale}#work`, label: dictionary.work },
    { href: `/${locale}#cv`, label: dictionary.about },
    { href: `/${locale}#contact`, label: dictionary.contact },
  ];

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="wordmark" href={`/${locale}`} aria-label={dictionary.home}>
          <span>Gaspard</span>
          <span className="wordmark-dot" aria-hidden="true" />
        </Link>

        <nav className="desktop-nav" aria-label={dictionary.navigation}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageSwitcher
            locale={locale}
            label={dictionary.language}
            href={alternateHref}
          />
          <details className="menu-root">
            <summary className="menu-trigger">
              <span className="sr-only">{dictionary.menu}</span>
              <Menu className="menu-icon-open" aria-hidden="true" />
              <X className="menu-icon-close" aria-hidden="true" />
            </summary>
            <div className="menu-panel">
                <div className="menu-index" aria-hidden="true">
                  00—03
                </div>
                <nav className="mobile-nav" aria-label={dictionary.navigation}>
                  {onHome ? null : (
                    <Link href={`/${locale}`}>{dictionary.home}</Link>
                  )}
                  {links.map((link, index) => (
                    <Link href={link.href} key={link.href}>
                      <small>0{index + 1}</small>
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <p className="menu-note">{dictionary.availability}</p>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
