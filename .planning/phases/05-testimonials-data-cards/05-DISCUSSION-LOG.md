# Phase 5: Testimonials — Data & Cards - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-19
**Phase:** 5-Testimonials-Data-Cards
**Areas discussed:** Photo storage, LinkedIn badge design, Image rendering

---

## Photo Storage

| Option | Description | Selected |
|--------|-------------|----------|
| Local /public/ | Download headshots, commit to repo in /public/images/testimonials/. Works offline, no external dep, no next.config changes needed | ✓ |
| External URL | Reference LinkedIn photo URLs or hosted CDN. Requires next.config.ts remote patterns config. LinkedIn CDN URLs can become stale | |

**User's choice:** Local /public/ (Recommended)
**Notes:** No follow-up; clear preference for simplicity and stability.

**Format sub-decision:**

| Option | Description | Selected |
|--------|-------------|----------|
| JPEG | Standard for photos, widely compatible, smallest file size for headshots | ✓ |
| WebP | Better compression but requires conversion from LinkedIn downloads | |

**User's choice:** JPEG

---

## LinkedIn Badge Design

| Option | Description | Selected |
|--------|-------------|----------|
| In the attribution row | Small FaLinkedin icon sits beside the name/title — taps the existing footer, stays compact | ✓ |
| Below the attribution | Separate line under name/title: "View on LinkedIn →" — more visible but adds card height | |
| Top-right corner of card | Floating badge in corner — decorative but less semantically clear | |

**User's choice:** In the attribution row (Recommended)

**UI sub-decision:**

| Option | Description | Selected |
|--------|-------------|----------|
| Icon only, links to recommendation | Small FaLinkedin icon as an anchor. Minimal, not noisy. aria-label="View on LinkedIn" | ✓ |
| Icon + "LinkedIn" text link | FaLinkedin + the word "LinkedIn" as a link. More explicit but adds width | |

**User's choice:** Icon only, links to recommendation (Recommended)

---

## Image Rendering

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, use next/image | Automatic lazy load, responsive srcset, WebP conversion. Since photos are in /public/, no next.config changes needed | ✓ |
| Keep plain <img> | Simpler, no import change. Photos are small (40px circular) | |

**User's choice:** Yes, use next/image (Recommended)

**Dimension sub-decision:**

| Option | Description | Selected |
|--------|-------------|----------|
| 40x40 (current size) | Matches existing w-10 h-10 Tailwind class — no visual change | ✓ |
| 80x80 (2× for retina) | Render at 80x80 for crisp display on high-DPI screens, scale to 40px via CSS | |

**User's choice:** 40x40 (current size)

---

## Claude's Discretion

- LinkedIn icon color/opacity: match muted `#a3a3a3` palette, hover state bumps to `#f5f5f5`
- `getInitials` fallback logic retained in case any entry lacks a photo at content population time

## Deferred Ideas

- Carousel/slider layout → Phase 6 (already in roadmap as TEST-07, TEST-08)
- Retina/2× images (80×80 at 40px CSS) → could revisit during Phase 6 carousel work
