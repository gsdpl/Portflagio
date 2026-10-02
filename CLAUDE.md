# Portfolio Gaspard Duplaix

## Quick reference

- **Stack**: Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind CSS 4, motion v12
- **Dev server**: `npm run dev` (port 3000). Use `.claude/launch.json` config "portfolio-dev" for preview.
- **Build**: `npm run build`
- **Typecheck**: `npm run typecheck`
- **Lint**: `npm run lint`
- **Visual test**: `npm run verify:ui` (requires dev server running + Edge browser)

## Important conventions

- motion v12 imports from `"motion/react"`, NOT `"framer-motion"`
- CSS custom properties are in `src/app/globals.css` (~2800+ lines) — no dark mode, medieval/burnt-paper theme
- Fonts: Manrope (body), Grenze Gotisch (display), UnifrakturCook (lettrine) — loaded via `next/font/google`
- Path alias: `@/*` → `./src/*`
- i18n: `/[locale]/` routing (en, fr). Dictionaries in `src/lib/i18n.ts`. MDX content in `content/projects/{slug}/{locale}.mdx`
- Class merging: `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge)

## Project system

- Metadata in `src/data/projects.ts` — array order = display order
- Thread colors in `src/lib/threads.ts` — MUST match same order as projects array
- SVG filters (embroidery-N, logo-N) auto-generated in `src/components/glass/glass-filter-defs.tsx`
- See `PORTFOLIO-GUIDELINES.txt` for full add-project walkthrough

## Known pitfalls

- Turbopack cache corruption: `taskkill /F /IM node.exe` then `rm -rf .next` then restart
- Embroidery filter scoped to `.card-thumb-logo` only (not carousel screenshots)
- Hover detection is on the entire `.project-card` article, not just the media zone
- The Smash Game `.smash-hit-layer` renders only when `phase === "playing"`
- No git repo initialized
