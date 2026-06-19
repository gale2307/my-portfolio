# Phase 5: Testimonials — Data & Cards - Context

**Gathered:** 2026-06-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Upgrade the testimonials section with real client data, circular profile headshots (`next/image`), and LinkedIn verification badges on the cards. Layout stays as the existing 3-column grid — carousel conversion happens in Phase 6.

Files in scope: `lib/data/testimonials.ts`, `components/sections/Testimonials.tsx`, new `/public/images/testimonials/*.jpg` assets.

</domain>

<decisions>
## Implementation Decisions

### Photo Storage
- **D-01:** Headshots stored as local JPEG files in `/public/images/testimonials/{slug}.jpg`. Committed to the repo alongside source code.
- **D-02:** No external CDN or remote URL approach — avoids `next.config.ts` remote patterns config and URL staleness issues.

### LinkedIn Badge Design
- **D-03:** LinkedIn badge position: **in the attribution row** (the footer `flex` row that already holds the avatar + name/title/company). The icon slots in alongside the existing text block — no extra card height.
- **D-04:** Badge UI: `FaLinkedin` icon-only as an `<a>` anchor with `aria-label="View on LinkedIn"`, `target="_blank" rel="noopener noreferrer"`. No visible text label — keeps the attribution row compact.
- **D-05:** Badge is conditional — only rendered when `source === 'linkedin'` AND `linkedinUrl` is present.

### Image Rendering
- **D-06:** Use `next/image` — first adoption in the codebase. Photos are in `/public/` so no `next.config.ts` changes needed.
- **D-07:** Props: `width={40}` `height={40}` matching the existing `w-10 h-10` Tailwind classes. `className="w-10 h-10 rounded-full object-cover shrink-0"` to preserve the circular avatar appearance.

### TestimonialItem Interface
- **D-08:** Replace the existing `avatarUrl?: string` field with:
  - `photo: string` — path to local image (e.g., `/images/testimonials/alex-chen.jpg`)
  - `linkedinUrl?: string` — URL to the specific LinkedIn recommendation
  - `source: 'linkedin' | 'direct'` — determines whether the LinkedIn badge renders

### Claude's Discretion
- Icon color/opacity for the LinkedIn badge: match the muted `#a3a3a3` palette used elsewhere in the card, with a hover state that bumps to `#f5f5f5`. Consistent with the existing typographic tone.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Files to Modify
- `lib/data/testimonials.ts` — Current `TestimonialItem` interface and 3 placeholder entries; will be replaced with real data
- `components/sections/Testimonials.tsx` — Server Component; card layout, avatar rendering, FadeIn stagger pattern

### Established Patterns to Follow
- `components/sections/Contact.tsx` — Already uses `FaLinkedin` from `react-icons/fa`; reference for LinkedIn icon import pattern and `target="_blank" rel="noopener noreferrer"` usage
- `components/ui/FadeIn.tsx` — Scroll-triggered animation wrapper; existing stagger pattern (delay = index * 0.1) should be preserved

### No external specs
No external specs — requirements fully captured in decisions above and `.planning/REQUIREMENTS.md` (TEST-03 through TEST-06).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `FaLinkedin` from `react-icons/fa` — already in `package.json`, imported in `components/sections/Contact.tsx`. Can be imported directly in `Testimonials.tsx`.
- `FadeIn` component — already wraps each testimonial card with `delay={index * 0.1}`. Keep unchanged.

### Established Patterns
- **Dark theme palette:** Card background `#1e1e1e`, borders `border-white/[0.08]`, muted text `#a3a3a3`, primary text `#f5f5f5`, body text `#d4d4d4`.
- **Mono label pattern:** `{'// testimonials'}` section label — do not modify.
- **Server Component:** `Testimonials.tsx` has no `'use client'` directive and should stay a Server Component. `next/image` works in Server Components.
- **Attribution row structure:** `flex items-center gap-3` container, `w-10 h-10 rounded-full` circular avatar, then `div.min-w-0` with name + title/company stacked.

### Integration Points
- `app/page.tsx` — Imports `<Testimonials />` directly; no changes needed there.
- `/public/images/testimonials/` — New directory to create; files referenced as `/images/testimonials/{slug}.jpg` in `next/image` `src` prop.

</code_context>

<specifics>
## Specific Ideas

- Cards with LinkedIn-sourced testimonials get the `FaLinkedin` icon in the attribution row — same icon already used in the Contact section's social links.
- All 4–6 real entries should have a `photo` field. If any entry is missing a photo at content population time, keep the existing `getInitials` fallback logic in Testimonials.tsx rather than requiring every entry to have a photo.

</specifics>

<deferred>
## Deferred Ideas

- Carousel/slider layout → Phase 6 (TEST-07, TEST-08)
- Retina/2× images (80×80 rendered at 40px CSS) → can revisit in Phase 6 if desired during carousel work

</deferred>

---

*Phase: 5-Testimonials-Data-Cards*
*Context gathered: 2026-06-19*
