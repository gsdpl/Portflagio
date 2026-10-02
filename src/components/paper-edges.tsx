import type { CSSProperties } from "react";

const CORNERS = ["tl", "br"] as const;
const LAYERS = [0];

/**
 * Burnt-corner artwork ("Coin brûlée") placed at the top-left and bottom-right
 * corners of the page. Positioned relative to the document (scrolls with the
 * page) and sits in the foreground.
 */
export function PaperEdges() {
  return (
    <div className="paper-edges" aria-hidden="true">
      {CORNERS.map((corner) => (
        <span key={corner} className={`scorch scorch-${corner}`}>
          {LAYERS.map((layer) => (
            <span
              key={layer}
              className="scorch-layer"
              style={{ "--l": layer } as CSSProperties}
            />
          ))}
        </span>
      ))}
    </div>
  );
}
