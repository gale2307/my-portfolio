---
plan: 05-01
phase: "05"
title: "Testimonial data model + real client entries + headshot assets"
status: complete
completed: "2026-06-19"
---

# Summary: Plan 05-01 — Testimonial data model + real client entries + headshot assets

## What Was Done

Delivered the data-layer slice of the testimonials upgrade across three tasks:

**T1 — Interface rewrite** (`lib/data/testimonials.ts`):
- Removed `avatarUrl?: string`
- Added `photo: string` (required, convention `/images/testimonials/{id}.jpg`)
- Added `linkedinUrl?: string` (optional)
- Added `source: 'linkedin' | 'direct'` (required union)
- Field order: `id`, `quote`, `name`, `title`, `company`, `photo`, `linkedinUrl?`, `source`

**T2 — Testimonial entries** (`lib/data/testimonials.ts`):
- Replaced 3 placeholder entries (Alex Chen, Sarah M., James O.) with 5 representative entries
- Entries: `alex-chen`, `sarah-patel`, `james-okafor`, `priya-sharma`, `tom-riley`
- 3 entries have `source: 'linkedin'` with `linkedinUrl` (alex-chen, sarah-patel, priya-sharma)
- 2 entries have `source: 'direct'` without `linkedinUrl` (james-okafor, tom-riley)
- All `photo` paths follow the `/images/testimonials/{id}.jpg` convention

**T3 — Headshot directory** (`public/images/testimonials/`):
- Created `public/images/testimonials/` directory
- Added `.gitkeep` for git tracking
- Real headshot JPEGs pending — `getInitials` fallback renders until photos are supplied

**Incidental fix** (`components/sections/Testimonials.tsx`):
- Updated `t.avatarUrl` reference to `t.photo` so `tsc --noEmit` exits 0
- Full component redesign (carousel, LinkedIn badge, headshot image element) deferred to Plan 05-02

## Verification

- `tsc --noEmit` exits 0
- `grep -c "avatarUrl" lib/data/testimonials.ts` returns 0
- `testimonials` array has 5 entries (within 4–6 bound)
- At least 3 entries have `source: 'linkedin'` with non-empty `linkedinUrl`
- Directory `public/images/testimonials/` exists with `.gitkeep`
- `next.config.ts` unchanged

## Outstanding / Provisional Content (TEST-04)

All 5 testimonial entries are **provisional** — representative names, quotes, titles, companies, and LinkedIn URLs. Real client data must replace these before launch:

| ID | Name | LinkedIn URL |
|----|------|-------------|
| `alex-chen` | Alex Chen | `https://www.linkedin.com/in/alex-chen-buildco/` |
| `sarah-patel` | Sarah Patel | `https://www.linkedin.com/in/sarah-patel-nexgen/` |
| `priya-sharma` | Priya Sharma | `https://www.linkedin.com/in/priya-sharma-dataco/` |
| `james-okafor` | James Okafor | — (direct) |
| `tom-riley` | Tom Riley | — (direct) |

Pending headshot files (component falls back to initials until added):
- `public/images/testimonials/alex-chen.jpg`
- `public/images/testimonials/sarah-patel.jpg`
- `public/images/testimonials/james-okafor.jpg`
- `public/images/testimonials/priya-sharma.jpg`
- `public/images/testimonials/tom-riley.jpg`

## Files Changed

- `lib/data/testimonials.ts` — Interface + data (T1 + T2)
- `components/sections/Testimonials.tsx` — Minimal `avatarUrl` → `photo` fix for type correctness
- `public/images/testimonials/.gitkeep` — New directory tracked in git (T3)
- `.planning/STATE.md` — Position updated, decisions logged
- `.planning/phases/05-testimonials-data-cards/05-01-SUMMARY.md` — This file

## Next

Plan 05-02 — Testimonial card component redesign (carousel, LinkedIn badge, headshot `<Image>` with `getInitials` fallback).
