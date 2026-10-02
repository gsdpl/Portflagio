export type HitCategory =
  | "interactive"
  | "card"
  | "heading"
  | "text"
  | "empty";

const POINTS: Record<HitCategory, number> = {
  interactive: 100,
  card: 75,
  heading: 50,
  text: 25,
  empty: 10,
};

export function categoriseHit(el: Element | null): HitCategory {
  if (!el) return "empty";
  const tag = el.tagName.toLowerCase();
  const cls = el.className?.toString?.() ?? "";
  if (
    tag === "button" ||
    tag === "a" ||
    el.getAttribute("role") === "button" ||
    cls.includes("fake-cta") ||
    cls.includes("fake-nav-cta")
  )
    return "interactive";
  if (cls.includes("fake-card") || cls.includes("fake-service"))
    return "card";
  if (tag === "h1" || tag === "h2" || tag === "h3") return "heading";
  if (tag === "p" || tag === "span" || tag === "li") return "text";
  return "empty";
}

export function pointsFor(category: HitCategory, combo: number): number {
  const multiplier = Math.min(1 + combo * 0.25, 4);
  return Math.round(POINTS[category] * multiplier);
}

export type Rank = {
  key: string;
  en: string;
  fr: string;
};

const RANKS: { threshold: number; rank: Rank }[] = [
  {
    threshold: 30,
    rank: { key: "artisan", en: "Artisan of the Middle Ages", fr: "Artisan du Moyen Âge" },
  },
  {
    threshold: 45,
    rank: { key: "chevalier", en: "Digital Knight", fr: "Chevalier du Pixel" },
  },
  {
    threshold: 60,
    rank: { key: "ecuyer", en: "Apprentice Destroyer", fr: "Écuyer Destructeur" },
  },
  {
    threshold: 90,
    rank: { key: "paysan", en: "Pixel Peasant", fr: "Paysan du Pixel" },
  },
  {
    threshold: Infinity,
    rank: { key: "touriste", en: "Tourist", fr: "Touriste" },
  },
];

export function rankForTime(seconds: number): Rank {
  for (const { threshold, rank } of RANKS) {
    if (seconds < threshold) return rank;
  }
  return RANKS[RANKS.length - 1].rank;
}
