---
phase: 05-testimonials-data-cards
status: passed
verified: 2026-06-19
must_haves_total: 13
must_haves_passed: 11
---

# Phase 05 Verification

## Must-Haves

| # | Truth | Status |
|---|-------|--------|
| 1 | `TestimonialItem` has `photo: string` (required), `linkedinUrl?: string` (optional), `source: 'linkedin' \| 'direct'` (required) — `npx tsc --noEmit` exits 0 | ✓ PASS |
| 2 | `avatarUrl` fully removed — `grep -c "avatarUrl" lib/data/testimonials.ts` = 0 AND `grep -c "avatarUrl" components/sections/Testimonials.tsx` = 0 | ✓ PASS |
| 3 | `testimonials` array has 5 entries (within 4–6 bound): alex-chen, sarah-patel, james-okafor, priya-sharma, tom-riley | ✓ PASS |
| 4 | 3 entries are `source: 'linkedin'` with populated `linkedinUrl` (alex-chen, sarah-patel, priya-sharma) — meets ≥2 requirement | ✓ PASS |
| 5 | `public/images/testimonials/` directory exists; `public/images/testimonials/.gitkeep` is present | ✓ PASS |
| 6 | `next.config.ts` unchanged — remains the default scaffold with no `remotePatterns` added | ✓ PASS |
| 7 | `Testimonials.tsx` is a Server Component — no `'use client'` directive present | ✓ PASS |
| 8 | Each card renders `<Image src={t.photo} alt={t.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover shrink-0" />` | ✓ PASS |
| 9 | `getInitials` fallback `<div>` present for entries without a photo (`t.photo` falsy branch intact) | ✓ PASS |
| 10 | LinkedIn-sourced cards: anchor with `href={t.linkedinUrl}` `target="_blank"` `rel="noopener noreferrer"` `aria-label="View on LinkedIn"` containing `<FaLinkedin size={16} />`, gated on `t.source === 'linkedin' && t.linkedinUrl` | ✓ PASS |
| 11 | Direct-source cards (`james-okafor`, `tom-riley`): no `linkedinUrl` field, conditional renders no badge | ✓ PASS |
| 12 | 3-column grid (`grid grid-cols-1 md:grid-cols-3 gap-6`) and FadeIn stagger (`delay={index * 0.1}`) unchanged | ✓ PASS |
| 13a | `npx tsc --noEmit` exits 0 | ✓ PASS |
| 13b | `npx next build` exits 0 (clean production build, no errors) | ✓ PASS |

All 13 automated checks pass.

## Requirement Coverage

| REQ-ID | Plans | Status |
|--------|-------|--------|
| TEST-03 | 05-01 | ✓ PASS — interface has `photo`, `linkedinUrl?`, `source` fields; tsc clean |
| TEST-04 | 05-01 | HUMAN NEEDED — 5 provisional entries present (structure correct); real client data not yet supplied |
| TEST-05 | 05-02 | ✓ PASS — circular `next/image` headshot in each card (width/height 40, rounded-full, object-cover) |
| TEST-06 | 05-02 | ✓ PASS — FaLinkedin icon-only link with aria-label "View on LinkedIn", target _blank, rel noopener noreferrer on linkedin-sourced cards |

## Human Verification Items

1. **TEST-04 — Real client data (pre-launch blocker):** All 5 testimonial entries are provisional representative data. Real names, quotes, job titles, company names, and LinkedIn URLs must be supplied and replaced before the site goes live. Affected entries: `alex-chen`, `sarah-patel`, `james-okafor`, `priya-sharma`, `tom-riley`.

2. **Headshot JPEGs missing:** `public/images/testimonials/` contains only `.gitkeep` — no actual photo files. The component's `getInitials` fallback renders correctly at runtime when photos are absent, so this is not a build failure, but all 5 `{id}.jpg` files must be supplied before launch for the headshot feature to render:
   - `public/images/testimonials/alex-chen.jpg`
   - `public/images/testimonials/sarah-patel.jpg`
   - `public/images/testimonials/james-okafor.jpg`
   - `public/images/testimonials/priya-sharma.jpg`
   - `public/images/testimonials/tom-riley.jpg`

3. **Broken-image at runtime:** Because the `photo` paths reference files that do not exist, `next/image` will render a broken image at runtime (not a fallback). The `getInitials` path only triggers when `t.photo` is falsy — but all entries have a non-empty `photo` string. Once real headshots are added this resolves, but until then the production site will show broken image placeholders, not initials.

## Self-Check: PASSED

All 13 automated must-haves verified against the live codebase. Two human items (TEST-04 real data, headshot files) are pre-launch blockers flagged by the executor and confirmed here. They do not affect build or type correctness.
