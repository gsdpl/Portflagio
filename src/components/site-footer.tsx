import Link from "next/link";
import { BrandEmblem } from "@/components/brand-emblem";
import { GlassPanel } from "@/components/glass/glass-panel";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/types/project";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  return (
    <footer className="site-footer">
      <div className="footer-atmosphere" aria-hidden="true">
        <span className="paper-burn footer-burn footer-burn-left" />
        <span className="paper-burn footer-burn footer-burn-right" />
      </div>
      <GlassPanel className="footer-glass" variant="lens">
        <Link className="footer-brand" href={`/${locale}`}>
          <BrandEmblem
            tone="ink"
            className="footer-emblem"
            label={dictionary.brandLabel}
          />
          <span>
            <strong>Gaspard Duplaix</strong>
            <small>{dictionary.footerLine}</small>
          </span>
        </Link>
        <div className="footer-links">
          <a href="mailto:contact@duplaixgaspard.fr">contact@duplaixgaspard.fr</a>
          <a
            href="https://www.linkedin.com/in/gaspard-duplaix-17347b23b/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </GlassPanel>
    </footer>
  );
}
