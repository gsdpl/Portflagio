"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type InkTarget = { image: string; href: string; title: string; accent?: string };
type Phase = "idle" | "in" | "hold" | "out";

const InkContext = createContext<(target: InkTarget) => void>(() => {});

/** Trigger the full-page Ink Transition Effect, then navigate to `href`. */
export function useInkTransition() {
  return useContext(InkContext);
}

const INK_IN_MS = 950;
const OUT_MS = 480;
// Title reveal: each letter of the project name is drawn on in Grenze Gotisch.
const LETTER_BASE = 450; // delay before the first letter
const LETTER_STEP = 62; // per-letter stagger
const LETTER_ANIM = 420; // per-letter animation duration

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [target, setTarget] = useState<InkTarget | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const targetHref = useRef<string | null>(null);
  const startedAt = useRef(0);

  const start = useCallback(
    (next: InkTarget) => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        router.push(next.href);
        return;
      }

      const kick = () => {
        targetHref.current = next.href;
        startedAt.current = Date.now();
        setTarget(next);
        setPhase("in");
      };

      const img = new Image();
      img.src = next.image;
      if (img.complete) {
        kick();
      } else {
        img.onload = kick;
        img.onerror = kick;
      }
    },
    [router],
  );

  // 1. Once the ink has drawn the image in, kick off the real navigation.
  useEffect(() => {
    if (phase !== "in") return;
    const timer = setTimeout(() => {
      setPhase("hold");
      if (targetHref.current) router.push(targetHref.current);
    }, INK_IN_MS);
    return () => clearTimeout(timer);
  }, [phase, router]);

  // 2. Hold the overlay until the destination has rendered AND the title has
  //    finished writing itself letter by letter, then fade the ink away.
  useEffect(() => {
    if (phase !== "hold" || !target) return;
    if (pathname !== targetHref.current) return;
    const titleDone =
      LETTER_BASE + target.title.length * LETTER_STEP + LETTER_ANIM + 300;
    const wait = Math.max(120, titleDone - (Date.now() - startedAt.current));
    const timer = setTimeout(() => setPhase("out"), wait);
    return () => clearTimeout(timer);
  }, [phase, pathname, target]);

  // 3. Tear down after the fade-out.
  useEffect(() => {
    if (phase !== "out") return;
    const timer = setTimeout(() => {
      setPhase("idle");
      setTarget(null);
      targetHref.current = null;
    }, OUT_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <InkContext.Provider value={start}>
      {children}
      {target && phase !== "idle" ? (
        <div className={`ink-overlay ink-${phase}`} aria-hidden="true">
          <svg
            className="ink-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter
                id="ink-bleed"
                x="-60%"
                y="-60%"
                width="220%"
                height="220%"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.045"
                  numOctaves="3"
                  seed="11"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="14"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
              <filter id="ink-lighten" colorInterpolationFilters="sRGB">
                <feComponentTransfer>
                  <feFuncR type="linear" slope="0.45" intercept="0.55" />
                  <feFuncG type="linear" slope="0.45" intercept="0.55" />
                  <feFuncB type="linear" slope="0.45" intercept="0.55" />
                </feComponentTransfer>
              </filter>
              <mask id="ink-reveal">
                <rect x="0" y="0" width="100" height="100" fill="black" />
                <circle
                  className="ink-blob"
                  cx="50"
                  cy="50"
                  r="14"
                  fill="white"
                  filter="url(#ink-bleed)"
                />
              </mask>
            </defs>
            <image
              href={target.image}
              x="0"
              y="0"
              width="100"
              height="100"
              preserveAspectRatio="xMidYMid slice"
              mask="url(#ink-reveal)"
              filter="url(#ink-lighten)"
            />
          </svg>
          <div className="ink-title" style={target.accent ? { '--ink-title-color': target.accent } as React.CSSProperties : undefined}>
            {Array.from(target.title).map((char, i) => (
              <span
                key={i}
                style={{ animationDelay: `${LETTER_BASE + i * LETTER_STEP}ms` }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </InkContext.Provider>
  );
}
