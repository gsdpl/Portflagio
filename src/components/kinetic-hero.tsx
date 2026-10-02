import { ArrowDownRight, Asterisk } from "lucide-react";
import Link from "next/link";
import { BrandEmblem } from "@/components/brand-emblem";
import { GlassPanel } from "@/components/glass/glass-panel";
import { Lettrine } from "@/components/lettrine";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/types/project";

export function KineticHero({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="paper-burn hero-burn hero-burn-left" />
        <span className="paper-burn hero-burn hero-burn-right" />
        <BrandEmblem tone="ornament" className="hero-brand-emblem" />
      </div>
      <BlurFade className="hero-topline">
        <span>
          <Asterisk size={16} aria-hidden="true" />
          {dictionary.heroEyebrow}
        </span>
        <span>Bordeaux · 44.8378° N</span>
      </BlurFade>

      <BlurFade className="hero-title-wrap" delay={0.12}>
        <h1 id="hero-title">
          <Lettrine letter={dictionary.heroLead.slice(0, 1)} />
          {dictionary.heroLead.slice(1)}
        </h1>
      </BlurFade>

      <BlurFade className="hero-bottom" delay={0.24}>
        <GlassPanel
          className="hero-description-glass"
          variant="lens"
          overlay={
            <BorderBeam
              size={64}
              duration={9}
              borderWidth={1.5}
              colorFrom="var(--blue)"
              colorTo="var(--pink)"
            />
          }
        >
          <p>{dictionary.heroBody}</p>
        </GlassPanel>
        <Link className="hero-scroll-link" href={`/${locale}#work`}>
          {dictionary.explore}
          <ArrowDownRight aria-hidden="true" />
        </Link>
      </BlurFade>
    </section>
  );
}
