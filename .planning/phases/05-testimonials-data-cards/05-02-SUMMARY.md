---
id: 05-02
phase: "05"
title: "Testimonial card — next/image headshot + LinkedIn verification badge"
status: complete
completed: "2026-06-19"
---

# Plan 05-02 Summary

## What Was Done

Updated `components/sections/Testimonials.tsx` to deliver the presentation slice of Phase 05:

**T1 — next/image headshot swap**
- Added `import Image from 'next/image'`
- Replaced plain `<img src={t.photo}>` with `<Image src={t.photo} alt={t.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover shrink-0" />`
- Changed name/title wrapper div from `min-w-0` to `min-w-0 flex-1` so truncate text shrinks correctly when the badge sits to its right
- `getInitials` initials fallback preserved unchanged

**T2 — LinkedIn verification badge**
- Added `import { FaLinkedin } from 'react-icons/fa'`
- Added conditional anchor immediately after the name/title wrapper: renders only when `t.source === 'linkedin' && t.linkedinUrl`
- Anchor: `href={t.linkedinUrl}`, `target="_blank"`, `rel="noopener noreferrer"`, `aria-label="View on LinkedIn"`, `className="ml-auto text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors duration-150 shrink-0"`
- Icon: `<FaLinkedin size={16} />` — icon-only, no visible text label
- Direct-source cards (`source: 'direct'`) render no badge

## Acceptance Criteria Verification

- [x] `import Image from 'next/image'` present
- [x] File does NOT contain `'use client'` (grep returns 0)
- [x] Avatar conditional keys on `t.photo`; `grep -c "avatarUrl"` returns 0
- [x] `<Image` with `width={40}`, `height={40}`, `alt={t.name}`, `className="w-10 h-10 rounded-full object-cover shrink-0"`
- [x] `getInitials(t.name)` initials fallback still present
- [x] Name/title wrapper className is `min-w-0 flex-1`
- [x] Grid still reads `grid grid-cols-1 md:grid-cols-3 gap-6`
- [x] `import { FaLinkedin } from 'react-icons/fa'` present
- [x] Conditional gated on `t.source === 'linkedin' && t.linkedinUrl`
- [x] Anchor has `target="_blank"` and `rel="noopener noreferrer"`
- [x] Anchor has `aria-label="View on LinkedIn"`
- [x] Anchor className includes `ml-auto`, `text-[#a3a3a3]`, `hover:text-[#f5f5f5]`, `transition-colors duration-150`
- [x] Anchor renders `<FaLinkedin size={16} />`
- [x] `npx tsc --noEmit` exits 0
- [x] `npx next build` completes without errors

## Commits

1. `a6fd714` — feat(testimonials): swap `<img>` for next/image headshot in card attribution row (T1)
2. `5872051` — feat(testimonials): add conditional LinkedIn verification badge to card attribution row (T2)

## Artifacts Modified

- `components/sections/Testimonials.tsx` — adds `import Image from 'next/image'` and `import { FaLinkedin } from 'react-icons/fa'`; swaps `<img>`/`t.avatarUrl` for `<Image>`/`t.photo`; changes name wrapper to `min-w-0 flex-1`; adds conditional LinkedIn badge anchor

## Notes

- The pre-existing `Clients.tsx` ESLint warning about `<img>` appeared in `next build` output — this is unrelated to Plan 05-02 and was present before this plan
- Phase 05 is now fully complete (both plans executed). Phase 06 (carousel) is next.
