---
phase: 5
slug: testimonials-data-cards
status: approved
shadcn_initialized: false
preset: none
created: 2026-06-19
---

# Phase 5 — UI Design Contract
## Testimonials: Data & Cards

> Visual and interaction contract for Phase 5. Covers the upgrade from placeholder cards to real-data cards with `next/image` headshots and LinkedIn verification badges.

---

## Scope

This phase modifies two existing files only — no new sections, no layout changes, no new packages. The 3-column grid is **frozen** (carousel is Phase 6). The contract locks down the visual delta: headshot rendering, LinkedIn badge appearance, hover/focus states, and conditional rendering logic.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none |
| Preset | not applicable |
| Component library | none |
| Icon library | react-icons/fa (already installed) |
| Font | Geist (body/heading) + Geist Mono (labels) — via next/font/google, already configured |

---

## Spacing Scale

Inherited from existing codebase (Tailwind v4 defaults). Phase 5 introduces no new spacing tokens.

| Token | Value | Usage in this phase |
|-------|-------|---------------------|
| xs | 4px | — |
| sm | 8px | — |
| md | 16px | Card internal padding (`p-6`), attribution row top border (`pt-4`), gap-4 |
| lg | 24px | Card padding (`p-6`), section padding (`px-6`), gap-6 |
| xl | 32px | — |
| 2xl | 48px | — |
| 3xl | 64px | — |

Attribution row gap: `gap-3` (12px) — **do not change** from existing.
Avatar size: `w-10 h-10` (40×40px) — **do not change**. Matches `next/image` width/height props exactly.

Exceptions: none

---

## Typography

Inherited from existing card design. No changes in Phase 5.

| Role | Size | Weight | Line Height | Tailwind |
|------|------|--------|-------------|---------|
| Section label | 12px | normal | — | `font-mono text-xs tracking-widest uppercase` |
| Quote | 14px | normal | relaxed (1.625) | `text-sm leading-relaxed italic` |
| Name | 14px | medium (500) | — | `font-medium text-sm` |
| Attribution (title · company) | 12px | normal | — | `font-mono text-xs` |
| LinkedIn badge | 16px | — | — | Icon size matches attribution row height naturally |

---

## Color

Inherited palette. Phase 5 adds one new state: LinkedIn badge hover.

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | #0a0a0a | Page background |
| Secondary (30%) | #1e1e1e | Card background |
| Card border | rgba(255,255,255,0.08) | `border-white/[0.08]` |
| Primary text | #f5f5f5 | Name, hover state for LinkedIn badge |
| Body text | #d4d4d4 | Quote text |
| Muted text | #a3a3a3 | Section label, attribution (title · company), **LinkedIn badge default color** |
| Avatar fallback bg | #2a2a2a | Initials fallback only (kept for entries without photo) |
| Avatar fallback border | rgba(255,255,255,0.10) | `border-white/10` |
| Amber accent | #c8964a | Not used in this phase |

**LinkedIn badge color states:**
- Default: `text-[#a3a3a3]` — matches the muted mono palette used for attribution text
- Hover: `hover:text-[#f5f5f5]` — bumps to primary text color
- Transition: `transition-colors duration-150` — subtle, not distracting

Accent (`#c8964a`) is **not used** in this phase — the LinkedIn badge is intentionally muted to keep the card typographic tone.

---

## Component Contracts

### 1. Circular Headshot (next/image)

Replaces the `<img>` and the initials fallback `<div>` for entries that have a `photo` field.

```
<Image
  src={t.photo}              // e.g. "/images/testimonials/alex-chen.jpg"
  alt={t.name}
  width={40}
  height={40}
  className="w-10 h-10 rounded-full object-cover shrink-0"
/>
```

- Images live in `/public/images/testimonials/{slug}.jpg` — no `next.config.ts` changes needed
- `object-cover` + `rounded-full` + `shrink-0` — identical visual result to the current `<img>` but with Next.js optimization
- The initials fallback (`getInitials` + `<div>`) is **preserved** for any entry where `photo` is absent or empty

### 2. LinkedIn Badge

Renders only when `t.source === 'linkedin' && t.linkedinUrl`.

```
<a
  href={t.linkedinUrl}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="View on LinkedIn"
  className="ml-auto text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors duration-150 shrink-0"
>
  <FaLinkedin size={16} />
</a>
```

**Position:** `ml-auto` pushes it to the right edge of the attribution row (`flex items-center gap-3`). No extra card height — sits in the existing `flex` row.
**No visible text label** — icon-only per D-04.
**Icon size:** 16px. Visually balanced with the 12px mono text in the attribution row.
**Import:** `import { FaLinkedin } from 'react-icons/fa'` — same import already used in `Contact.tsx`.

### 3. Attribution Row Structure (after Phase 5)

```
<div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
  {/* Headshot: next/image OR initials fallback */}
  <div className="min-w-0 flex-1">
    <p className="font-medium text-[#f5f5f5] text-sm truncate">{t.name}</p>
    <p className="text-xs text-[#a3a3a3] font-mono truncate">{t.title} · {t.company}</p>
  </div>
  {/* LinkedIn badge: conditional */}
</div>
```

Note the `min-w-0 flex-1` on the name/title wrapper — required so `truncate` works correctly when the LinkedIn badge is present. The existing code has `min-w-0` but not `flex-1`; adding `flex-1` ensures the text block grows to fill available space before the `ml-auto` badge.

---

## Data Interface Contract

### TestimonialItem (after Phase 5)

```typescript
export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  photo: string;            // path to local image: "/images/testimonials/{slug}.jpg"
  linkedinUrl?: string;     // URL to specific LinkedIn recommendation
  source: 'linkedin' | 'direct';
}
```

- `avatarUrl?: string` is **removed** — replaced by `photo: string`
- `source` is required — drives conditional badge rendering
- `linkedinUrl` is optional — badge only shows when both `source === 'linkedin'` AND `linkedinUrl` is truthy

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| LinkedIn badge aria-label | `"View on LinkedIn"` |
| next/image alt text | `{t.name}` — the person's full name |
| Initials fallback aria | None needed (presentational) |
| Section label | `{'// testimonials'}` — **do not change** |

No new empty states, error states, or CTAs in this phase.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| react-icons/fa | `FaLinkedin` | Not required — already installed and used in `Contact.tsx` |
| next/image | Built-in Next.js | Not required |

No new packages. No shadcn. No third-party registries.

---

## Accessibility Contract

- `<a>` badge: `aria-label="View on LinkedIn"` + `target="_blank" rel="noopener noreferrer"`
- `<Image>`: `alt={t.name}` — descriptive, not empty
- Initials fallback div: `aria-hidden` is acceptable (purely decorative initials); the name text in the attribution row provides the accessible label
- Focus state on LinkedIn badge: inherited browser default (`:focus-visible` outline) — acceptable at this scope; no custom ring needed

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-06-19

---

*Phase: 5-Testimonials-Data-Cards*
*UI-SPEC authored: 2026-06-19*
