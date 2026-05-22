## Goals

Reduce visual density, refine the cert strip typography, modernize the Services block, replace mailto CTAs with a popup partnership form, prep the portal for embedding, and remove all em dashes.

## Changes

### 1. Certification strip typography (above-the-fold band)
- Currently uses the elite letter-spaced micro caps which read as harsh and cluttered ("NSF Certified · Avendra Approved · Marriott Partner · 365 Nights Per Year ...").
- Switch to the serif (`font-serif`) at a calmer size, normal letter-spacing, lighter weight, with thin gold separator hairlines instead of dots. Reduce the number of items to 5 (drop "365 Nights Per Year" and "New York Based" since the stat band and hero already say it) to declutter.

### 2. Services section ("Everything your property needs, nothing it doesn't")
- Replace the current full-width stacked rows (01–05) with a compact rounded-tile grid:
  - 2 columns on tablet, 3 on desktop, with `rounded-2xl` cards, generous internal padding, soft gold border-on-hover.
  - Each tile: small gold numeral chip, short title, 2-line description, tag pill at the bottom.
- Drop the giant 5xl numerals and the long body copy preamble paragraph to reduce clutter; keep just the heading + tiles.

### 3. Titan System portal — make embeddable
- Replace `PortalMock` internals with an `<iframe>` wrapper sized to a 16:10 aspect ratio inside the existing card frame, with `src="about:blank"` and a clear `TODO` comment for the real embed URL.
- Keep the small header bar ("Property Portal · Live Shift") above the iframe so the framing still feels branded.

### 4. Partners section ("Built for the brands that demand the best")
- Current 4-up logo grid feels sterile. Clean it up by:
  - Removing the harsh grid lines, using a single soft row of brand wordmarks in muted gold with thin vertical dividers.
  - Reducing the heading scale slightly and tightening spacing.
  - Keeping the pull quote, but moving it inline under the brand row with lighter treatment.

### 5. Become a Partner — popup form
- New `PartnerDialog` component using existing shadcn `Dialog`, opened by a shared context/state.
- Fields: Name, Property / Hotel, Email, Phone, Message — all validated with zod (trim, length caps, email format).
- Submit handler: opens `mailto:frank@titansolutionsco.com` with a prefilled subject + body (no backend wired). Shows a success state inside the dialog.
- Wire ALL "Become a Partner" triggers to open the dialog:
  - Top nav button (`Nav`)
  - Final CTA section button (replaces the mailto link)
  - Remove the secondary "Email Frank" / "Call Frank" duplication in the final CTA — keep only the primary "Become a Partner" + a single "Call Frank" tel link to reduce clutter.
- Delete `MobileStickyCTA` entirely and remove it from `Index`.

### 6. Em dash removal
- Sweep all copy in `src/routes/index.tsx` and replace every `—` with either a comma, period, or " - " (regular hyphen with spaces), choosing based on sentence flow. This includes hero subhead, Who We Are paragraphs, service descriptions, Leadership bio bullets, Partners quote, Final CTA copy, and footer.

### 7. General declutter pass
- Reduce vertical section padding from `py-32 lg:py-40` to `py-24 lg:py-32` across sections.
- Remove the `diagonal-texture` overlay from Who We Are and Final CTA (keep only in hero) so backgrounds breathe.
- Tighten the hero meta row to 3 chips instead of 4 (drop "CRM Live Reporting" since the System section covers it).
- Trim duplicated body paragraphs in Who We Are and Titan System to a single tighter paragraph each.

## Technical notes

- New file: `src/components/partner-dialog.tsx` exporting `PartnerDialog` + a `usePartnerDialog` hook backed by a tiny module-level store (avoids prop drilling across `Nav`, `Hero`, `FinalCTA`).
- Uses existing `Dialog`, `Input`, `Textarea`, `Label`, `Button` from `src/components/ui/*` and `zod` (already available) for validation.
- Portal iframe: add `loading="lazy"`, `referrerPolicy="no-referrer"`, `sandbox="allow-scripts allow-same-origin"`, and a `// TODO: replace src with portal embed URL` marker.
- No backend, no Lovable Cloud changes, no route changes — pure frontend edits in `src/routes/index.tsx`, new dialog component, and a small `src/styles.css` adjustment if needed for the new tile hover.
