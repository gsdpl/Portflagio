"use client";

import { useRef } from "react";
import { SmashGameProvider, useSmashGame } from "./smash-game-provider";
import { FakePortfolio } from "./fake-portfolio";
import { SmashCanvas } from "./smash-canvas";
import { SmashHud } from "./smash-hud";
import { SmashEndScreen } from "./smash-end-screen";
import type { Locale } from "@/types/project";

function DormantPrompt({
  locale,
  onReplay,
  onSkip,
}: {
  locale: Locale;
  onReplay: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="smash-dormant-backdrop" aria-hidden="true">
      <div className="smash-dormant-dialog">
        <p>
          {locale === "fr"
            ? "Vous avez déjà détruit le faux portfolio !"
            : "You already destroyed the fake portfolio!"}
        </p>
        <div className="smash-dormant-actions">
          <button className="smash-dormant-replay" onClick={onReplay}>
            {locale === "fr" ? "Rejouer" : "Play again"}
          </button>
          <button className="smash-dormant-skip" onClick={onSkip}>
            {locale === "fr" ? "Voir le portfolio" : "View portfolio"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SmashGameInner({ locale }: { locale: Locale }) {
  const { phase, replay, dismiss } = useSmashGame();
  const fakeRef = useRef<HTMLDivElement | null>(null);

  if (phase === "dismissed") return null;

  if (phase === "dormant") {
    return <DormantPrompt locale={locale} onReplay={replay} onSkip={dismiss} />;
  }

  return (
    <>
      <div className="smash-overlay" aria-hidden="true">
        <div ref={fakeRef} className="smash-fake-wrapper">
          <FakePortfolio locale={locale} />
        </div>
        <SmashCanvas fakeRef={fakeRef} />
      </div>
      <SmashHud locale={locale} />
      <SmashEndScreen locale={locale} />
    </>
  );
}

export function SmashGameOverlay({ locale }: { locale: Locale }) {
  return (
    <SmashGameProvider>
      <SmashGameInner locale={locale} />
    </SmashGameProvider>
  );
}
