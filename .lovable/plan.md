# Goal

Move the site away from flat black and toward an "aged leather / dark velvet" feel: warm radial depth in the global background, a faint gold-tinted grain, gentle per-section gradient fades, and a consistent gold hairline between sections so scrolling feels layered rather than stacked.

## Changes

All work is in `src/styles.css` plus light cleanup in `src/routes/index.tsx`. No component logic changes.

### 1. Warm up the global atmosphere (`src/styles.css`, `body::before` / `body::after`)

- Shift the fixed radial wash from neutral charcoal to a warm-tinted one: deep charcoal `#141210` at the focal center, bleeding to near-black `#050505` at the edges, with subtle warm gold pools top and bottom.
- Replace the current cool/neutral grain with a warmer, gold-tinted SVG noise at ~3–4% opacity using `mix-blend-mode: overlay`. Tone stays warm so highlights pick up gold instead of going gray.

### 2. Section depth utility (`src/styles.css`)

Add a reusable utility so every major section gets the same top-to-bottom fade without each section reinventing it:

- `.section-depth` — vertical gradient from `#1a1714` at the top edge → `#0a0908` mid → `#050505` at the bottom, fully transparent overlay so the global wash still shows through. Implemented via a `::before` overlay at low opacity (~55–70%) so it layers rather than overrides.
- `.section-depth-soft` — same idea at half strength for short sections (stat band, marquee) where a full fade would feel heavy.

### 3. Gold hairline between sections (`src/styles.css`)

- New `.section-divider` utility: 1px line with `linear-gradient(90deg, transparent, rgba(213,175,76,0.22) 20%, rgba(213,175,76,0.22) 80%, transparent)` so the gold fades in/out at the edges and doesn't feel harsh.
- Replace ad-hoc `border-b border-gold/60` / `border-t border-gold/60` calls between sections with this single utility for consistency.

### 4. "Catching light" treatment for gold (`src/styles.css`)

- Add `.gold-lit` utility: text color `var(--gold)` with a very soft `text-shadow: 0 0 24px rgba(213,175,76,0.18)` so gold headings and accents glow gently against the warmer background.
- Apply to existing key gold elements (hero headline accent span, the `gold-shimmer` heading, eyebrow rules) without changing layout.

### 5. Apply across sections (`src/routes/index.tsx`)

Light, surgical edits only:

- Add `section-depth` to the major sections (Who We Are, Services, Titan System, Partners, Contact) and `section-depth-soft` to the stat band and cert marquee.
- Replace inter-section gold borders with `<div className="section-divider" />` placed between sections, or swap the existing border classes for `section-divider` on the section element itself.
- No changes to copy, layout, components, or animations.

## Technical notes

- All color values defined as CSS custom properties at the top of `src/styles.css` (`--surface-warm-top`, `--surface-warm-mid`, `--surface-deep`, `--gold-hairline`) so future tweaks are one-line changes.
- Gradients use `oklch`-friendly hex stops chosen to match the existing `--background` oklch token; no token values change, so shadcn components remain consistent.
- All overlays are `pointer-events: none` and sit on negative `z-index` so they never intercept clicks.
- No new dependencies, no JS, no animation — pure CSS, zero runtime cost.

## Out of scope

- No copy edits, no component restructure, no new sections.
- Not touching the hero video overlay (it already has its own treatment).
