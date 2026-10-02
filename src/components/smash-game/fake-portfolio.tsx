"use client";

import type { Locale } from "@/types/project";

const t = (locale: Locale, en: string, fr: string) =>
  locale === "fr" ? fr : en;

export function FakePortfolio({ locale }: { locale: Locale }) {
  return (
    <div className="fake-portfolio" aria-hidden="true">
      {/* ---- Navbar ---- */}
      <nav className="fake-nav">
        <div className="fake-nav-left">
          <span className="fake-nav-logo">GD</span>
          <span className="fake-nav-name">Gaspard Duplaix</span>
        </div>
        <div className="fake-nav-links">
          <span>About</span>
          <span>Work</span>
          <span>Contact</span>
          <button className="fake-nav-cta">
            {t(locale, "Let’s Connect", "Connectons-nous")}
          </button>
        </div>
      </nav>

      {/* ---- Hero ---- */}
      <section className="fake-hero">
        <h1>
          {t(
            locale,
            "Crafting seamless digital experiences — where innovation meets purpose.",
            "Créer des expériences digitales sans couture — quand l’innovation rencontre le sens.",
          )}
        </h1>
        <p>
          {t(
            locale,
            "I blend strategy, design, and technology to build products that truly matter — not just visually, but at their core.",
            "Je fusionne stratégie, design et technologie pour construire des produits qui comptent vraiment — pas seulement visuellement, mais en profondeur.",
          )}
        </p>
        <button className="fake-hero-cta">
          {t(locale, "Explore my work →", "Découvrir mon travail →")}
        </button>
      </section>

      {/* ---- Services ---- */}
      <section className="fake-services-section">
        <h2>
          {t(locale, "What I Do", "Ce que je fais")}
        </h2>
        <div className="fake-services">
          <div className="fake-service">
            <div className="fake-service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <h3>{t(locale, "Strategy & Vision", "Stratégie & Vision")}</h3>
            <p>
              {t(
                locale,
                "It’s not just about building — it’s about envisioning the future. I align stakeholder goals with user needs to craft roadmaps that deliver measurable impact.",
                "Ce n’est pas seulement construire — c’est envisager l’avenir. J’aligne les objectifs des parties prenantes avec les besoins utilisateurs pour créer des feuilles de route à impact mesurable.",
              )}
            </p>
          </div>
          <div className="fake-service">
            <div className="fake-service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
            </div>
            <h3>{t(locale, "UX/UI Design", "Design UX/UI")}</h3>
            <p>
              {t(
                locale,
                "Not just pixels on a screen, but carefully orchestrated journeys. Every interaction is an opportunity to delight — and I never miss one.",
                "Pas juste des pixels sur un écran, mais des parcours soigneusement orchestrés. Chaque interaction est une opportunité d’émerveiller — et je n’en rate aucune.",
              )}
            </p>
          </div>
          <div className="fake-service">
            <div className="fake-service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
            </div>
            <h3>{t(locale, "Development", "Développement")}</h3>
            <p>
              {t(
                locale,
                "Clean, scalable, future-proof code — because great design deserves great engineering. I bridge the gap between vision and execution.",
                "Du code propre, scalable et pérenne — parce qu’un grand design mérite une grande ingénierie. Je fais le pont entre vision et exécution.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Selected Work ---- */}
      <section className="fake-work-section">
        <h2>{t(locale, "Selected Work", "Projets sélectionnés")}</h2>
        <div className="fake-work-grid">
          <div className="fake-card">
            <div className="fake-card-thumb fake-card-thumb-1" />
            <h3>{t(locale, "E-Commerce Reimagined", "E-Commerce Réinventé")}</h3>
            <p>{t(locale, "A seamless shopping experience that drives conversion.", "Une expérience d’achat fluide qui booste la conversion.")}</p>
          </div>
          <div className="fake-card">
            <div className="fake-card-thumb fake-card-thumb-2" />
            <h3>{t(locale, "SaaS Dashboard", "Tableau de Bord SaaS")}</h3>
            <p>{t(locale, "Data-driven insights, beautifully visualized.", "Des données transformées en insights visuels.")}</p>
          </div>
          <div className="fake-card">
            <div className="fake-card-thumb fake-card-thumb-3" />
            <h3>{t(locale, "Mobile Experience", "Expérience Mobile")}</h3>
            <p>{t(locale, "Intuitive, fast, and delightful on every screen.", "Intuitive, rapide et agréable sur chaque écran.")}</p>
          </div>
        </div>
      </section>

      {/* ---- About ---- */}
      <section className="fake-about-section">
        <div className="fake-about-avatar" />
        <div className="fake-about-text">
          <h2>{t(locale, "About Me", "À Propos")}</h2>
          <p>
            {t(
              locale,
              "Passionate about creating meaningful digital experiences that drive impact and deliver value. With years of expertise in design and development, I transform complex challenges into elegant solutions — one pixel at a time.",
              "Passionné par la création d’expériences digitales qui génèrent de l’impact et de la valeur. Avec des années d’expertise en design et développement, je transforme les défis complexes en solutions élégantes — un pixel à la fois.",
            )}
          </p>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="fake-cta-section">
        <h2>
          {t(
            locale,
            "Ready to bring your vision to life?",
            "Prêt à donner vie à votre vision ?",
          )}
        </h2>
        <p>
          {t(
            locale,
            "Let’s create something extraordinary together.",
            "Créons quelque chose d’extraordinaire ensemble.",
          )}
        </p>
        <button className="fake-cta-btn">
          {t(locale, "Get in Touch →", "Me contacter →")}
        </button>
      </section>

      {/* ---- Footer ---- */}
      <footer className="fake-footer">
        <p>Made with love and pixels ✨</p>
      </footer>

      {/* ---- Pre-existing tears ---- */}
      <div className="fake-tear fake-tear-1" />
      <div className="fake-tear fake-tear-2" />
      <div className="fake-tear fake-tear-3" />
    </div>
  );
}
