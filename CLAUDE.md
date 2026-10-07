# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is **pnpm** (pinned via `packageManager`; `pnpm-workspace.yaml` disables build scripts for `sharp` and `unrs-resolver`).

- `pnpm dev` — dev server on http://localhost:3000 (also rewrites `AGENTS.md`, see above)
- `pnpm build` — production build; also the type check (no separate `tsc` script)
- `pnpm lint` — ESLint 9 flat config (`eslint.config.mjs`, `eslint-config-next`)
- `pnpm dlx shadcn@latest add <component>` — add shadcn/ui components into `src/components/ui`

No test framework is configured.

## Stack and architecture

- **Next.js 16 App Router** under `src/app/`, React 19. Route props use the generated global helpers (e.g. `LayoutProps<"/">`, `PageProps<...>`) instead of hand-written prop types — check `node_modules/next/dist/docs/` before using any Next API from memory.
- **Path alias** `@/*` → `src/*`.
- **Tailwind CSS v4**, CSS-first: there is no `tailwind.config.*`. Theme tokens (oklch CSS variables for light and `.dark`), `@theme inline` mappings, and the `dark` custom variant (`.dark` class, not media query) all live in `src/app/globals.css`, which also imports `tw-animate-css` and `shadcn/tailwind.css`.
- **shadcn/ui, `base-nova` style** (`components.json`): components are built on **Base UI** (`@base-ui/react`), not Radix — primitives and props differ from classic shadcn examples. Variants use `class-variance-authority`; icons are `lucide-react`.
- **`cn` helper** comes from the `cn` npm package; `src/lib/utils.ts` just re-exports it. Generated components import from `"cn"` directly.
- **Branding (dark-only, monochrome):** Instrument Sans (`next/font/google` → `--font-instrument-sans` → `font-sans`/`font-heading`) is the only font. Palette lives as tokens in `:root` of `globals.css`: `background` #121212, `foreground` #FAFAFA, `muted-foreground` #9D9D9D, `primary` #FAFAFA on #121212 text, borders white at 8–10% opacity. `<html>` always has the `dark` class so shadcn `dark:` styles apply. Style with tokens (`bg-background`, `text-muted-foreground`, `border-border`…), never raw hex or zinc/black/white utilities.

## Portfolio structure

Single-page portfolio (design brief: `promt.md`). All copy lives in `src/content/site.ts`; components in `src/components/portfolio/` only render it. `sidebar.tsx` is the sticky left column on `md+` and a compact sticky top bar below `md`; it scroll-spies sections listed in `navItems`. `sections.tsx` holds every right-column section; `<Reveal>` + the `.reveal` CSS in `globals.css` handle fade-ins (disabled under `prefers-reduced-motion`).
