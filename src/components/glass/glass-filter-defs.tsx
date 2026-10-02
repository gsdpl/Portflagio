import { threads } from "@/lib/threads";

const cloth = { r: 1, g: 1, b: 1 };

function toUnit(hex: string) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16) / 255,
    g: parseInt(value.slice(2, 4), 16) / 255,
    b: parseInt(value.slice(4, 6), 16) / 255,
  };
}

export function GlassFilterDefs() {
  return (
    <svg
      className="glass-filter-defs"
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter
          id="glass-refraction"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.018"
            numOctaves="2"
            seed="24"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="0.55" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="22"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
        <filter
          id="glass-refraction-soft"
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018"
            numOctaves="1"
            seed="8"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/*
          Turns any project artwork into an embroidered, two-tone "patch": the
          dark logo background becomes cream cloth, the mark becomes coloured
          thread, edges wobble like stitching and a woven grain is multiplied on
          top. One variant per brand thread colour (see lib/threads).
        */}
        {threads.map((hex, index) => {
          const ink = toUnit(hex);
          return (
            <filter
              key={hex}
              id={`embroidery-${index + 1}`}
              x="-6%"
              y="-6%"
              width="112%"
              height="112%"
              colorInterpolationFilters="sRGB"
            >
              <feColorMatrix
                in="SourceGraphic"
                type="saturate"
                values="0"
                result="gray"
              />
              <feComponentTransfer in="gray" result="lev">
                <feFuncR type="linear" slope="10" intercept="-1.7" />
                <feFuncG type="linear" slope="10" intercept="-1.7" />
                <feFuncB type="linear" slope="10" intercept="-1.7" />
              </feComponentTransfer>
              <feComponentTransfer in="lev" result="duo">
                <feFuncR type="table" tableValues={`${cloth.r} ${ink.r}`} />
                <feFuncG type="table" tableValues={`${cloth.g} ${ink.g}`} />
                <feFuncB type="table" tableValues={`${cloth.b} ${ink.b}`} />
                <feFuncA type="table" tableValues="1 1" />
              </feComponentTransfer>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="1"
                seed="7"
                result="stitchNoise"
              />
              <feDisplacementMap
                in="duo"
                in2="stitchNoise"
                scale="4"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          );
        })}

        {/*
          Mirror of the embroidery duotone used for the project-card miniatures:
          the dark logo background becomes the project's own colour and the mark
          itself becomes pure white. Thresholding first makes it work for any
          source art (white or coloured logo on the #2C2C2C ground). No stitch
          displacement here — the miniature logo stays crisp and flat.
        */}
        {threads.map((hex, index) => {
          const ground = toUnit(hex);
          return (
            <filter
              key={`logo-${hex}`}
              id={`logo-${index + 1}`}
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              <feColorMatrix
                in="SourceGraphic"
                type="saturate"
                values="0"
                result="gray"
              />
              <feComponentTransfer in="gray" result="lev">
                <feFuncR type="linear" slope="10" intercept="-1.7" />
                <feFuncG type="linear" slope="10" intercept="-1.7" />
                <feFuncB type="linear" slope="10" intercept="-1.7" />
              </feComponentTransfer>
              <feComponentTransfer in="lev">
                <feFuncR type="table" tableValues={`${ground.r} ${cloth.r}`} />
                <feFuncG type="table" tableValues={`${ground.g} ${cloth.g}`} />
                <feFuncB type="table" tableValues={`${ground.b} ${cloth.b}`} />
                <feFuncA type="table" tableValues="1 1" />
              </feComponentTransfer>
            </filter>
          );
        })}
      </defs>
    </svg>
  );
}
