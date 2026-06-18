---
plan: 03-01
phase: 03
status: complete
completed: "2026-06-18T00:00:00.000Z"
requirements_covered:
  - TEST-01
  - TEST-02
---

# Plan 03-01 Summary — Testimonials Section

## What was built

Implemented the Testimonials section with three placeholder testimonial cards, each showing a quote, full attribution (name, title, company), and a circular initials avatar. The section uses FadeIn scroll animation with a stagger delay per card, matching the established section pattern.

## Files created / modified

- `lib/data/testimonials.ts` — `TestimonialItem` interface + `testimonials` array (3 entries)
- `components/sections/Testimonials.tsx` — Server Component; card grid with initials avatar, FadeIn stagger
- `app/page.tsx` — `<Testimonials />` added after `<Clients />`

## Key decisions / deviations

- Used double-quoted string for James O.'s quote which contained an apostrophe (single-quoted string caused TS parse error)
- `img` element used for optional avatarUrl — build shows a lint warning (same pre-existing warning in Clients.tsx); acceptable for MVP since avatarUrl is optional and unused in default data
- `Testimonials.tsx` is a Server Component — FadeIn wrapper handles client-side animation without requiring `'use client'` on the section itself

## Self-Check: PASSED

- [x] `lib/data/testimonials.ts` exports `TestimonialItem` interface and `testimonials` array with 3 entries
- [x] Each card renders quote, name, title, company
- [x] Each card renders a circular initials avatar (no avatarUrl set in default data)
- [x] `// testimonials` mono label with correct style
- [x] Cards use FadeIn with stagger delay (index * 0.1)
- [x] Section renders after Clients in page
- [x] `tsc --noEmit` exits 0
- [x] `next build` exits 0 (warnings only, no errors)

## Commits

- `feat(03-01): create lib/data/testimonials.ts with typed TestimonialItem`
- `feat(03-01): create components/sections/Testimonials.tsx with card layout`
- `feat(03-01): add Testimonials section to app/page.tsx`
- `fix(03-01): use double quotes in testimonials.ts to escape apostrophe`
