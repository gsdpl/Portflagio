"use client";

import { Hammer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSmashGame } from "./smash-game-provider";
import type { Locale } from "@/types/project";

function Timer() {
  const { startTime, phase } = useSmashGame();
  const [elapsed, setElapsed] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (phase !== "playing" || !startTime) return;
    function tick() {
      setElapsed(Date.now() - startTime!);
      raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [phase, startTime]);

  const secs = Math.floor(elapsed / 1000);
  const mins = Math.floor(secs / 60);
  const s = secs % 60;
  const ms = Math.floor((elapsed % 1000) / 100);

  return (
    <span className="smash-timer">
      {String(mins).padStart(2, "0")}:{String(s).padStart(2, "0")}.{ms}
    </span>
  );
}

function ComboDisplay() {
  const { combo } = useSmashGame();

  return (
    <AnimatePresence>
      {combo > 1 && (
        <motion.span
          key={combo}
          className="smash-combo"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.4, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 18 }}
        >
          x{combo}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function SmashHud({ locale }: { locale: Locale }) {
  const { phase, progress, score, activate, skip } = useSmashGame();

  if (phase !== "active" && phase !== "playing") return null;

  return (
    <div className="smash-hud" aria-hidden="true">
      {phase === "active" && (
        <>
          <button className="smash-hammer-btn" onClick={activate}>
            <Hammer size={28} />
            <span>
              {locale === "fr" ? "Prendre le marteau" : "Grab the hammer"}
            </span>
          </button>
          <button className="smash-skip" onClick={skip}>
            {locale === "fr"
              ? "Voir le vrai portfolio"
              : "Skip to real portfolio"}
          </button>
        </>
      )}

      {phase === "playing" && (
        <>
          <div className="smash-progress-bar">
            <motion.div
              className="smash-progress-fill"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
            <span className="smash-progress-label">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="smash-hud-right">
            <span className="smash-score">{score.toLocaleString()}</span>
            <Timer />
          </div>
          <ComboDisplay />
          <button className="smash-skip smash-skip-small" onClick={skip}>
            {locale === "fr" ? "Passer" : "Skip"}
          </button>
        </>
      )}
    </div>
  );
}
