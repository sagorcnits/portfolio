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
- **Branding (dark-only, monochrome):** Instrument Sans (`next/font/google` → `--font-instrument-sans` → `font-sans`/`font-heading`) is the only font. Palette lives as tokens in `:root` of `globals.css`: `background` #121212, `foreground` #FAFAFA, `muted-foreground` #9D9D9D, `primary` #FAFAFA on #121212 text, borders white at 8–10% opacity. `<html>` always has the `dark` class so shadcn `dark:` styles apply. Style with tokens (`bg-background`, `text-muted-foreground`, `border-border`…), never raw hex or zinc/black/white utilities. Only exception: the floating WhatsApp button uses official WhatsApp green `#25D366`.

## Portfolio structure

Single-page portfolio (design brief: `promt.md`). All copy lives in `src/content/site.ts`; components in `src/components/portfolio/` only render it. `sidebar.tsx` is the sticky left column on `md+` and a compact sticky top bar below `md`; it scroll-spies sections listed in `navItems`. `sections.tsx` holds every right-column section; `<Reveal>` + the `.reveal` CSS in `globals.css` handle fade-ins (disabled under `prefers-reduced-motion`).

## Running code: no inline scripts

This project uses permissions.blockReadsOutsideWorkingDirectories, so inline code cannot be checked and triggers a permission prompt.

Rules:

- NEVER use `python -c`, `python3 -c`, `node -e`, `node -p`, `node --eval`, or heredocs piped into python/node (e.g. `python - <<EOF`).
- Instead, write the code to a file inside the project, in `.claude/tmp/` (create it if missing), then run it:
  python .claude/tmp/check.py
  node .claude/tmp/check.js
- Use only relative paths or paths inside the working directory in these scripts. Never read files outside the project (no ~, /etc, /tmp, or absolute paths outside the repo).
- Delete the temp script when done, unless I ask to keep it.
- For simple tasks, prefer built-in tools (Read, Grep, Glob) or plain shell commands (cat, grep, ls) over writing a script at all.

Make the entire website fully responsive across all devices and screen sizes: mobile, tablet, laptop, desktop, and ultrawide (320px up to 1920px+).

Goals:

- No horizontal overflow, broken layouts, or overlapping content at any width.
- Properly adjust spacing, typography, images, grids, buttons, navbar, sections, and components for smaller screens.
- Keep the existing design, UI, colors, animations, and functionality exactly the same. Only change what is needed for responsiveness.

Test at these widths and fix every issue you find: 320px, 375px, 425px, 768px, 1024px, 1280px, 1440px, 1920px, and 2560px.

Checklist:

- Navbar: collapses into a working mobile menu on small screens.
- Images and media: scale with max-width: 100% and keep their aspect ratio.
- Grids and flex layouts: stack or reduce columns on smaller screens.
- Typography: scales smoothly (use clamp() where helpful) and stays readable.
- Buttons and inputs: easy to tap on mobile (at least 44px tall).
- Tables, code blocks, and wide elements: scroll inside their own container, never the whole page.
- Ultrawide screens: content stays centered with a sensible max-width.

Command rules (important):

- Use only literal relative paths in shell commands, for example: ls src/components
- Do not use shell variables, $(...), backticks, or computed paths in commands.
- Prefer the built-in Read, Glob, Grep, and Edit tools over shell commands for exploring and editing files.
- Stay inside the current project folder. Do not read files outside it.

When finished, give me a short summary of the files you changed and the issues you fixed.
