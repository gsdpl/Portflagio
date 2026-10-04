import { cn } from "@/lib/utils";

let counter = 0;

function Corner({ fill, accent }: { fill: string; accent: string }) {
  return (
    <>
      <circle cx="14" cy="14" r="3.6" fill={fill} />
      <circle cx="14" cy="14" r="1.6" fill={accent} />
      <path
        d="M21 14 C 27 13.4 30 15.6 31.5 19"
        stroke={fill}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M14 21 C 13.4 27 15.6 30 19 31.5"
        stroke={fill}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24.5 24.5 C 27 22 30.5 22.5 31.6 25.6 C 29 25 26.7 26 24.5 24.5 Z"
        fill={accent}
      />
    </>
  );
}

export function Lettrine({
  letter,
  className,
  color,
}: {
  letter: string;
  className?: string;
  color?: string;
}) {
  const char = letter.slice(0, 1).toUpperCase();
  const isProject = !!color;
  const fill = color ?? "var(--blue, #1a00ff)";
  const accent = isProject ? fill : "var(--pink, #ff8284)";
  const uid = `lt-${++counter}`;

  return (
    <svg
      className={cn("lettrine-svg", className)}
      viewBox="0 0 100 100"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          id={`${uid}-r`}
          x="-6%"
          y="-6%"
          width="112%"
          height="112%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.86 0.9"
            numOctaves={2}
            seed={11}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={1.7}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter
          id={`${uid}-g`}
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.62}
            numOctaves={3}
            seed={4}
            stitchTiles="stitch"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.09 0"
          />
        </filter>
      </defs>

      <g filter={`url(#${uid}-r)`}>
        <rect x="4" y="4" width="92" height="92" rx="12" fill={isProject ? "none" : "#FFFFFF"} />
        <rect x="4" y="4" width="92" height="92" rx="12" fill="none" stroke={fill} strokeWidth="2.6" />
        <rect x="9.5" y="9.5" width="81" height="81" rx="8" fill="none" stroke={accent} strokeWidth="1.3" opacity="0.9" />

        <g fill={fill}>
          <circle cx="50" cy="7.6" r="1.6" />
          <circle cx="50" cy="92.4" r="1.6" />
          <circle cx="7.6" cy="50" r="1.6" />
          <circle cx="92.4" cy="50" r="1.6" />
        </g>

        <g><Corner fill={fill} accent={accent} /></g>
        <g transform="rotate(90 50 50)"><Corner fill={fill} accent={accent} /></g>
        <g transform="rotate(180 50 50)"><Corner fill={fill} accent={accent} /></g>
        <g transform="rotate(270 50 50)"><Corner fill={fill} accent={accent} /></g>
      </g>

      {!isProject && <rect x="4" y="4" width="92" height="92" rx="12" filter={`url(#${uid}-g)`} />}

      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fill={fill}
        fontFamily="var(--font-initial, 'UnifrakturCook', serif)"
        fontWeight="700"
        fontSize="74"
        textRendering="geometricPrecision"
      >
        {char}
      </text>
    </svg>
  );
}
