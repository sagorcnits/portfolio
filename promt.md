# Task: Add a cinematic "system initialization" intro to my portfolio

Add a one-time intro overlay that plays on every page load/reload, then reveals my
existing portfolio. This is an ADDITIVE change only.

## Hard constraint — do not touch the existing site

Do NOT modify any existing portfolio content, layout, navigation, typography, colors,
spacing, components, or responsive behavior. The intro must live in its own isolated
component (e.g. `<IntroSequence />`) with its own scoped styles, mounted once at the
root, layered above the page. If removed, the site must look exactly as it does today.

## Design system (reuse, don't invent)

- Background: #121212
- Primary text: #FAFAFA
- Secondary text: #9D9D9D
- Font: Instrument Sans (the site's existing font — no new fonts)
- Lines/grid: #FAFAFA at 4–8% opacity
- No other colors, gradients, glows, blur, or shadows.

## Composition (centered, full viewport)

1. **Grid:** a sparse 12-column vertical grid + a few horizontal rules, 1px, very low
   opacity. Aligned to the site's existing content grid/margins if possible.
2. **Corner marks:** four small 8px crosshair "+" marks near the viewport corners,
   like registration marks on a print layout.
3. **Headline:** three stacked lines, large, tight leading, uppercase, left-aligned
   as a block but centered in the viewport:
   BUILD
   DIGITAL
   EXPERIENCES
   Size: clamp(3rem, 11vw, 9rem). Weight: 500–600. Letter-spacing: -0.04em.
   Color: #FAFAFA. Optionally render "DIGITAL" in #9D9D9D for hierarchy.
4. **Metadata:** small uppercase mono-style labels (11–12px, letter-spacing 0.15em,
   #9D9D9D) placed on the grid like an editorial spread:
   - top-left: `SH — PORTFOLIO`
   - top-right: `EDITION 2026`
   - bottom-left: `SYS.INIT`
   - bottom-right: `FULL-STACK / AI / SAAS`
     These are static labels — NOT a percentage counter or loading indicator.

## Timeline (total ≈ 1.4s, then overlay is removed from the DOM)

Easing for all motion: cubic-bezier(0.22, 1, 0.36, 1) unless noted.

| Time (ms) | Event                                                                                                                                                                                                                                                                                                                                                                               |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0–300     | Grid lines draw in: vertical lines scaleY 0→1, horizontal lines scaleX 0→1, staggered 20ms, opacity 0→1. Corner marks fade in.                                                                                                                                                                                                                                                      |
| 100–350   | Metadata labels fade in + translateY(6px→0), staggered 40ms.                                                                                                                                                                                                                                                                                                                        |
| 150–700   | Headline reveal: each line sits inside an `overflow: hidden` mask; text slides translateY(105%→0). Stagger 90ms per line, 450ms each.                                                                                                                                                                                                                                               |
| 700–1150  | **Line sweep + reveal (key moment):** a 1px #FAFAFA horizontal line, vertically centered, draws from left to right (scaleX 0→1, transform-origin left), easing cubic-bezier(0.76, 0, 0.24, 1). The overlay is clipped in sync with the line's leading tip: `clip-path: inset(0 0 0 0)` → `inset(0 0 0 100%)`, so the real portfolio is uncovered exactly where the line has passed. |
| 700–950   | As the sweep begins, headline lines exit upward (translateY 0→-105% inside their masks, stagger 50ms); grid, corners, and metadata fade to 0.                                                                                                                                                                                                                                       |
| 1000–1400 | Portfolio content (already rendered underneath) eases in: opacity 0→1, translateY(12px→0), 400ms.                                                                                                                                                                                                                                                                                   |
| ~1400     | Line fades out. Overlay unmounts. Scroll + pointer events restored.                                                                                                                                                                                                                                                                                                                 |

## Implementation requirements

- The portfolio renders normally underneath from the start (no delayed mount, no
  remount) — the intro only covers it. Never block content loading.
- Animate only `transform`, `opacity`, and `clip-path` (GPU-friendly, 60fps).
  No layout-affecting properties, no canvas, no animation libraries required
  (CSS keyframes or Web Animations API; Framer Motion is fine only if the project
  already uses it).
- Render the overlay server-side / in initial HTML so the page never flashes
  before the intro appears (important for Next.js hydration).
- Lock scroll during the intro; restore it exactly at the end.
- Overlay: `position: fixed; inset: 0; z-index` above everything;
  `aria-hidden="true"`; must not steal focus or be read by screen readers.
- Any click, scroll, or keypress skips straight to the final reveal (fast 200ms fade).
- Wait for the existing font (document.fonts.ready, max 300ms timeout) before
  starting, so the headline never renders in a fallback font.
- Fully responsive: on mobile, reduce the grid to 4 columns, keep headline legible,
  hide the two right-side metadata labels if they collide.

## Reduced motion

If `prefers-reduced-motion: reduce`: no grid drawing, no slides, no sweep.
Show the overlay with the static headline for ~300ms, then a 250ms opacity fade to
the portfolio. Total ≤ 600ms.

## Avoid

Spinners, progress bars, percentage counters, neon, glow, blur, glassmorphism,
gradients, particles, 3D, glitch/scramble text effects, typewriter effects,
bounce/elastic easing, and anything that looks like a template loader.

## Acceptance checklist

- [ ] Total time to interactive portfolio ≤ 1.5s (≤ 0.6s reduced motion)
- [ ] Zero changes to existing components, styles, or layout (diff only adds files + one mount line)
- [ ] No layout shift (CLS 0) when the overlay is removed
- [ ] Smooth 60fps on a mid-range phone
- [ ] Works on reload, on desktop/tablet/mobile, and in light of reduced-motion
- [ ] Skippable by click, scroll, or keypress

Deliver: the isolated intro component, its scoped styles, and the single line needed
to mount it in the root layout — with a short note on where to place it.
