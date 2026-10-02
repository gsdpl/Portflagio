"use client";

import { Trophy } from "lucide-react";
import { motion } from "motion/react";
import { GlassPanel } from "@/components/glass/glass-panel";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { useSmashGame } from "./smash-game-provider";
import { rankForTime } from "./smash-scoring";
import type { Locale } from "@/types/project";

export function SmashEndScreen({ locale }: { locale: Locale }) {
  const { phase, score, maxCombo, totalHits, startTime, endTime, dismiss } =
    useSmashGame();

  if (phase !== "complete") return null;

  const elapsed = ((endTime ?? Date.now()) - (startTime ?? Date.now())) / 1000;
  const rank = rankForTime(elapsed);
  const rankLabel = locale === "fr" ? rank.fr : rank.en;

  return (
    <div className="smash-end-backdrop" aria-hidden="true">
      <motion.div
        className="smash-end"
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.3 }}
      >
        <GlassPanel variant="card" className="smash-end-panel">
          <Trophy size={40} className="smash-end-trophy" />
          <h2 className="smash-end-title">
            {locale === "fr"
              ? "Portfolio IA détruit !"
              : "AI Portfolio destroyed!"}
          </h2>
          <p className="smash-end-rank">{rankLabel}</p>

          <div className="smash-end-stats">
            <div className="smash-end-stat">
              <span className="smash-end-stat-value">
                <NumberTicker value={Math.round(elapsed * 10) / 10} />s
              </span>
              <span className="smash-end-stat-label">
                {locale === "fr" ? "Temps" : "Time"}
              </span>
            </div>
            <div className="smash-end-stat">
              <span className="smash-end-stat-value">
                <NumberTicker value={score} />
              </span>
              <span className="smash-end-stat-label">Score</span>
            </div>
            <div className="smash-end-stat">
              <span className="smash-end-stat-value">
                x<NumberTicker value={maxCombo} />
              </span>
              <span className="smash-end-stat-label">
                {locale === "fr" ? "Combo max" : "Max combo"}
              </span>
            </div>
            <div className="smash-end-stat">
              <span className="smash-end-stat-value">
                <NumberTicker value={totalHits} />
              </span>
              <span className="smash-end-stat-label">
                {locale === "fr" ? "Coups" : "Hits"}
              </span>
            </div>
          </div>

          <button className="smash-end-cta" onClick={dismiss}>
            {locale === "fr"
              ? "Entrer dans le vrai portfolio"
              : "Enter the real portfolio"}
          </button>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
