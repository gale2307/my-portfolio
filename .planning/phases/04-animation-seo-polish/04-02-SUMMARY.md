---
plan: 04-02
phase: 04
status: complete
completed: "2026-06-18T00:00:00.000Z"
requirements_covered:
  - SEO-01
---

# Plan 04-02 Summary — SEO + Polish

## What Was Built

Three deliverables completing Phase 4's SEO and accessibility requirements:

1. **Extended metadata in `app/layout.tsx`** — `metadataBase` with environment-aware URL resolution (`NEXT_PUBLIC_SITE_URL` → `VERCEL_URL` → `localhost:3000`), full `openGraph` block (type, title, description, image), and `twitter` card fields. A JSON-LD `Person` schema was added to `<body>` via `dangerouslySetInnerHTML`.

2. **`app/opengraph-image.tsx`** — Edge runtime `ImageResponse` generating a 1200×630 PNG OG card. Dark background (`#0a0a0a`) with `// freelance` mono label, `Nicholas William` at 80px, and `Software Engineer` at 32px. Matches the site's typographic aesthetic.

3. **ContactForm focus-visible ring** — Added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8964a]` to the submit button, consistent with the focus-visible pattern used in NavBar.

## Files Created / Modified

| File | Action |
|------|--------|
| `app/layout.tsx` | Modified — metadataBase, openGraph, twitter, JSON-LD |
| `app/opengraph-image.tsx` | Created — edge ImageResponse OG card |
| `components/ui/ContactForm.tsx` | Modified — focus-visible ring on submit button |
| `.planning/STATE.md` | Modified — plan 04-02 deliverables, Phase 4 marked Complete, progress 100% |

## Key Decisions / Deviations

- **No custom font loading in OG image** — ImageResponse uses system fonts by default. Custom font loading adds complexity and network fetches at edge runtime for minimal visual gain on an OG card.
- **ESLint fix required** — `// freelance` as bare JSX text triggered `react/jsx-no-comment-textnodes`. Wrapped in `{'// freelance'}` per the established pattern used across all section headers.
- **`metadataBase` env resolution order** — `NEXT_PUBLIC_SITE_URL` (explicit, highest priority) → `VERCEL_URL` injected by Vercel (production) → `localhost:3000` (local dev fallback). Covers all deployment scenarios without hardcoding a domain.

## Self-Check

- [x] `app/layout.tsx` exports `metadataBase`, `openGraph`, and `twitter` metadata fields
- [x] `metadataBase` resolves via `NEXT_PUBLIC_SITE_URL` or `VERCEL_URL`, falls back to `localhost:3000`
- [x] `app/opengraph-image.tsx` exists and uses `ImageResponse` with dark background (1200×630)
- [x] OG image renders: `// freelance`, `Nicholas William`, `Software Engineer`
- [x] JSON-LD Person schema present in root layout `<body>`
- [x] ContactForm submit button has `focus-visible:ring-2 focus-visible:ring-[#c8964a]`
- [x] `tsc --noEmit` exits 0
- [x] `next build` exits 0
- [x] SUMMARY.md created at `.planning/phases/04-animation-seo-polish/04-02-SUMMARY.md`
- [x] STATE.md updated with plan 04-02 deliverables and Phase 4 marked complete
- [x] No Self-Check: FAILED items

## Commits

1. `feat(04-02): add OG metadata, twitter card, metadataBase, and JSON-LD schema to layout`
2. `feat(04-02): add app/opengraph-image.tsx for dynamic OG card generation`
3. `fix(04-02): add focus-visible ring to ContactForm submit button`
4. `fix(04-02): wrap // freelance in JSX expression to satisfy react/jsx-no-comment-textnodes`
5. `docs(phase-04): update STATE.md after plan 04-02 completion`
6. `docs(04-02): create SUMMARY.md for SEO and polish plan`
