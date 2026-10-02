/**
 * Embroidery "thread" colour for each project's motif — one per project, in the
 * same order as the `projects` array. These mirror every project's original
 * brand/logo colour (its accent) so each mark keeps its own identity instead of
 * a unified tint. neo-travel's lime accent (#d7ff5f) is darkened so the white
 * bus stays readable on a white cloth. Each colour maps to a matching
 * `#embroidery-N` SVG filter defined in GlassFilterDefs.
 */
export const threads = [
  "#82B300", // neo-travel — lime accent, darkened for contrast on white
  "#00B4D8", // commbot — cyan
  "#FF2C91", // enjoy-33 — pink
  "#B927FF", // meurtre-au-manoir — purple
  "#617DF4", // we-happers — blue
  "#FF7D65", // naviroll — coral
  "#40C99A", // festivault — teal green
] as const;

export function threadFor(index: number) {
  const safe = ((index % threads.length) + threads.length) % threads.length;
  return {
    color: threads[safe],
    filter: `embroidery-${safe + 1}`,
    // Mirror duotone: white logo on the project colour, for the card miniatures.
    logoFilter: `logo-${safe + 1}`,
  };
}
