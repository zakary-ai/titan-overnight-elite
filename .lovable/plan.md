# Goal

Make everything below the hero video read as a single continuous background — no per-section overlays, no visible seams. The body's fixed atmospheric gradient becomes the only background; every section underneath becomes fully transparent.

## Root cause of the current "lines"

Each section currently applies `.section-depth` / `.section-depth-soft`, which paints a radial pool inside that section. Where two sections meet, the fade-out of one pool butts against the fade-in of the next — that visible step is the "line" in the screenshots. Even soft overlays produce a seam because the body's gradient is fixed (camera-locked) while the section overlays scroll, so they drift in and out of alignment.

## Approach

Stop painting backgrounds per-section entirely. Let the body's single fixed gradient show through every section. That gradient already exists and looks like the "live portal" feel the user likes — we just need to remove everything that overrides it.

## Changes

### 1. `src/styles.css` — neutralize section overlays

- Delete the `::before` overlay on `.section-depth` and `.section-depth-soft`. Keep the class names as no-ops so existing markup doesn't break, but they apply no styles.
- Result: only the body's fixed radial wash + warm grain renders behind every section.

### 2. `src/styles.css` — strengthen the body background so it carries the whole page

Since per-section depth is gone, the body wash should be the entire visual identity below the hero:

- Replace the current top-only radial focus with a vertically stretched ellipse that gently varies across the full scroll, not just the first viewport.
- Use `background-attachment: fixed` (already implied via `position: fixed` on `body::before`) so the gradient stays camera-locked and there is no scroll-banding.
- Add one extra warm pool low-center so the lower half doesn't go flat black.
- Keep the warm gold tint and grain at the same opacity.

### 3. `src/routes/index.tsx` — remove any remaining per-section backgrounds and borders

Pass through all sections and strip anything that paints over the body:

- Remove `border-y border-border`, `border-t border-border`, `border-b border-gold/60` between sections (hero's bottom border stays — that's the intentional seam between video and dark page).
- Remove `bg-ink/40`, `bg-black/40`, `bg-ink` (footer) and any other section-level background colors. Footer keeps a single top hairline only.
- Leave the existing glow orbs / grid overlays in place — they're decorative, not section backgrounds, and they fade to transparent at their edges.
- Keep the `.section-depth` class names in markup (they're inert now) so we don't have to touch every section file just to remove a class.

### 4. `CredentialBand` — the band right under the hero

This section is the brightest culprit in the screenshots because the marquee + stats row sits right at the hero boundary. Make sure it's fully transparent:

- Remove the bottom hairline at the marquee/stats divider only if it reads as a section seam in testing; otherwise keep it (it's a 1px gold/15 line inside the band, not between sections).
- Confirm no `bg-*` class on the section element.

### 5. Footer

- Remove `bg-ink` so the footer also shows through the global gradient. Keep the top divider as a single thin gold hairline so the footer still feels grounded.

## What stays

- Hero video and its overlays — untouched.
- Cards (`.card-elite`) — still have their own surface treatment, that's intentional.
- All copy, layout, components, animations.

## Verification

After the edit, scroll the page top-to-bottom in the preview at desktop width and confirm there are no visible horizontal bands between sections. Screenshot at the previously problem spots (band → who, services → system, partners → contact) to confirm seams are gone.

## Out of scope

- No layout changes, no copy changes, no new components, no new dependencies.
- Not touching the hero's `border-b border-gold/60` — that's the deliberate transition from the video to the dark page.
