export type SmashPhase =
  | "dormant"
  | "active"
  | "playing"
  | "complete"
  | "dismissed";

export type SmashState = {
  phase: SmashPhase;
  score: number;
  combo: number;
  maxCombo: number;
  progress: number;
  startTime: number | null;
  endTime: number | null;
  totalHits: number;
};

export type SmashSave = {
  completed: boolean;
  bestTime: number;
  bestScore: number;
};

export const SMASH_STORAGE_KEY = "smash-game-completed";

export const COMBO_WINDOW_MS = 800;
export const COMBO_MAX_MULTIPLIER = 4;
export const AUTO_COMPLETE_THRESHOLD = 95;
export const HIT_RADIUS_DESKTOP = 60;
export const HIT_RADIUS_MOBILE = 80;
export const HIT_RADIUS_INTERACTIVE_MULT = 1.5;
