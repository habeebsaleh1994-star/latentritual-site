# Quiet Page — Ambient Motion for Latent the Ritual

**Date:** 2026-05-15
**Status:** Approved, implementing

## Thesis

The site currently has no motion after the hero's 1.6s rise-in. Visitors feel
a gap between Latent's interactive app and Latent's static website. The fix
is not to demonstrate the app (Direction A was rejected as too SaaS-coded
for a photography brand and too asset-heavy for a solo founder). The fix
is to make the page *breathe* — ambient, restrained, photographic.

This is Direction C in the brainstorming: the Quiet Page.

## The Motion Vocabulary (seven breaths)

| Element | Effect | Trigger | Duration |
|---|---|---|---|
| Section headings & bodies | Fade up + translateY 16px | Viewport intersection 15% | 600ms |
| Major section headings | Letter-spacing 0.025em → -0.01em (rack focus) | Viewport intersection | 800ms |
| Children inside a section | Staggered fade-up via `--reveal-delay` | Cascades with parent | 80ms increments |
| Hero radial gradient | Opacity pulse 0.04 ↔ 0.075 | Always | 8s loop |
| "Scroll" cue | translateY 0 ↔ 4px | After hero loads | 2.4s loop |
| Stock swatches | Scale 1 → 1.12 + faint glow | On hover | 180ms |
| Materials heading | Color tints toward hovered swatch | On swatch hover | 200ms |
| Featured price card | Border opacity pulse | Always | 5s loop |

## Architecture

- **No framework, no library, no Astro island.** Vanilla JS in
  `src/scripts/quiet.js` (~50 lines) loaded via `<script>` tag in `Base.astro`.
- **One IntersectionObserver** watches every `.reveal` element. On entry,
  adds `.is-visible` class. CSS handles the rest.
- **Stagger via CSS custom property** `--reveal-delay`, set per-element
  inline. The observer doesn't sequence anything; children just have
  different `transition-delay` values.
- **Materials hover** uses a tiny event listener on the grid container
  that sets `--hover-tint` on the parent. The heading reads it via
  `color: var(--hover-tint, var(--text))`.
- **Looping animations** (radial, scroll cue, featured card) are pure
  CSS `@keyframes`. No JS.

Total shipped JS: ~50 lines, <2 KB minified.

## Reduced Motion

`@media (prefers-reduced-motion: reduce)` disables **all** animations
including the existing hero rise-in. Users who set this preference
get the static layout with all elements at final values. No exceptions.

## Files Changed

- `src/scripts/quiet.js` — new
- `src/styles/global.css` — appended motion section + reduced-motion overrides
- `src/layouts/Base.astro` — new `<script>` tag
- `src/components/Field.astro` — `.reveal` + `--reveal-delay`
- `src/components/FilmLightPaper.astro` — `.reveal` + `--reveal-delay` on stages
- `src/components/Complete.astro` — `.reveal` + `--reveal-delay`
- `src/components/Materials.astro` — `.reveal` + `data-swatch` on stocks
- `src/components/Moment.astro` — `.reveal`
- `src/components/Price.astro` — `.reveal` + featured card breath class
- `src/components/Footer.astro` — `.reveal`
- `src/components/Hero.astro` — only adds the slow radial pulse (existing rise-in is preserved)
