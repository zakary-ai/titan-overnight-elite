# Goal

Merge the cert marquee (NSF Certified, Avendra Approved, Marriott Partner…) and the stat band (365 / 5+ / 5★) into a single compact section that sits at the bottom of the viewport when the page is scrolled to the top. The hero shrinks just enough so nav + hero + merged band = 100vh on desktop.

## Changes — `src/routes/index.tsx`

### 1. New `CredentialBand` component (replaces `CertMarquee` + `StatBand`)

Single section with two rows, no border between them so it reads as one unit:

```text
+----------------------------------------------------+
| • NSF CERTIFIED  • AVENDRA APPROVED  • MARRIOTT …  |   <- marquee row, ~44px
+----------------------------------------------------+
|     365              5+              5★            |   <- stats row, ~96px
|   Nights/Year   Years Active   Luxury Properties   |
+----------------------------------------------------+
```

- Marquee row: keep existing scrolling animation, slightly smaller padding (`py-3`) and `text-[0.68rem]`.
- Stats row: shrink display from `text-5xl md:text-6xl` to `text-3xl md:text-4xl`, padding from `py-10` to `py-5`, label kept at current size.
- Thin gold hairline between the two rows (`opacity ~ 0.15`) so they feel grouped but distinct.
- Section keeps `section-depth-soft` and the glow orbs from the current `StatBand`.

Total combined height target: ~140–160px on desktop (sits between the old ~50px marquee and the old ~200px stat band — "a size in between").

### 2. Hero height — make merged band finish at viewport bottom

The nav is `h-20` (80px). The merged band is ~150px. Hero needs to take the remaining viewport so `nav + hero + band = 100vh`.

- Change hero from `min-h-[88vh] md:min-h-[720px]` to `min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-230px)]`.
- Mobile keeps the taller hero (band wraps and sits below the fold on phones — that's fine; the "fit in viewport" request is desktop-driven from the screenshot).
- Keep all existing hero content, padding, copy, and CTAs untouched.

### 3. Wire-up — `Index` component

- Remove `<CertMarquee />` and `<StatBand />` from `<main>`.
- Replace with a single `<CredentialBand />` directly under `<Hero />`.
- Delete the now-unused `CertMarquee` and `StatBand` function definitions.

## Out of scope

- No changes to hero copy, CTAs, navigation, or any section below the band.
- No new dependencies, no new assets.
- No changes to `src/styles.css` — uses existing utilities (`marquee-track`, `section-depth-soft`, `glow-orb`, `eyebrow`, `font-serif`, `text-gold`).
