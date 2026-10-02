"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AUTO_COMPLETE_THRESHOLD,
  COMBO_WINDOW_MS,
  SMASH_STORAGE_KEY,
  type SmashPhase,
  type SmashSave,
  type SmashState,
} from "./smash-types";
import { type HitCategory, pointsFor } from "./smash-scoring";

type SmashActions = {
  activate: () => void;
  hit: (category: HitCategory) => void;
  setProgress: (p: number) => void;
  skip: () => void;
  dismiss: () => void;
  replay: () => void;
};

type SmashContext = SmashState & SmashActions;

const Ctx = createContext<SmashContext | null>(null);

export function useSmashGame() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSmashGame must be inside SmashGameProvider");
  return ctx;
}

function loadSave(): SmashSave | null {
  try {
    const raw = localStorage.getItem(SMASH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SmashSave) : null;
  } catch {
    return null;
  }
}

function writeSave(save: SmashSave) {
  try {
    localStorage.setItem(SMASH_STORAGE_KEY, JSON.stringify(save));
  } catch { /* quota or private mode */ }
}

const INITIAL: SmashState = {
  phase: "active",
  score: 0,
  combo: 0,
  maxCombo: 0,
  progress: 0,
  startTime: null,
  endTime: null,
  totalHits: 0,
};

export function SmashGameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SmashState>(INITIAL);
  const comboTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setState((s) => ({ ...s, phase: "dismissed" }));
      return;
    }
    const save = loadSave();
    if (save?.completed) {
      setState((s) => ({ ...s, phase: "dormant" }));
    }
  }, []);

  const activate = useCallback(() => {
    setState((s) => ({
      ...s,
      phase: "playing",
      startTime: Date.now(),
      score: 0,
      combo: 0,
      maxCombo: 0,
      progress: 0,
      totalHits: 0,
      endTime: null,
    }));
  }, []);

  const hit = useCallback((category: HitCategory) => {
    setState((prev) => {
      if (prev.phase !== "playing") return prev;
      const newCombo = prev.combo + 1;
      const earned = pointsFor(category, prev.combo);
      return {
        ...prev,
        score: prev.score + earned,
        combo: newCombo,
        maxCombo: Math.max(prev.maxCombo, newCombo),
        totalHits: prev.totalHits + 1,
      };
    });
    if (comboTimer.current) clearTimeout(comboTimer.current);
    comboTimer.current = setTimeout(() => {
      setState((prev) => (prev.phase === "playing" ? { ...prev, combo: 0 } : prev));
    }, COMBO_WINDOW_MS);
  }, []);

  const setProgress = useCallback((p: number) => {
    setState((prev) => {
      if (prev.phase !== "playing") return prev;
      const clamped = Math.min(p, 100);
      if (clamped >= AUTO_COMPLETE_THRESHOLD && prev.phase === "playing") {
        const endTime = Date.now();
        const elapsed = (endTime - (prev.startTime ?? endTime)) / 1000;
        const save = loadSave();
        writeSave({
          completed: true,
          bestTime: save ? Math.min(save.bestTime, elapsed) : elapsed,
          bestScore: save ? Math.max(save.bestScore, prev.score) : prev.score,
        });
        return { ...prev, progress: 100, phase: "complete", endTime };
      }
      return { ...prev, progress: clamped };
    });
  }, []);

  const skip = useCallback(() => {
    setState((s) => ({ ...s, phase: "dismissed" }));
  }, []);

  const dismiss = useCallback(() => {
    setState((s) => ({ ...s, phase: "dismissed" }));
  }, []);

  const replay = useCallback(() => {
    setState({ ...INITIAL, phase: "active" });
  }, []);

  useEffect(() => {
    return () => {
      if (comboTimer.current) clearTimeout(comboTimer.current);
    };
  }, []);

  const ctx: SmashContext = {
    ...state,
    activate,
    hit,
    setProgress,
    skip,
    dismiss,
    replay,
  };

  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}
