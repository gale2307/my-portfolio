# Phase 1: Foundation + Hero - Context

**Gathered:** 2026-06-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold the Next.js 15 project, configure the dark theme and typography system, build the Hero section with entrance animation, and deploy to Vercel with a custom domain. End state: a live URL where a visitor sees a dark, typographic hero with name + role descriptor + tagline + CTA.

**In scope:** Project scaffolding, Tailwind CSS v4 dark theme, font setup, base layout shell, sticky navigation bar, Hero section (content + animation), Vercel deployment, custom domain configuration.

**Out of scope:** About, Skills, Clients, Testimonials, Contact sections (Phase 2/3). Section scroll animations (Phase 4). Contact form / Resend integration (Phase 3).

</domain>

<decisions>
## Implementation Decisions

### Typography

- **D-01:** Body font — **Geist** (via `next/font/google`). Modern, clean, Vercel's own — natural fit for a dark developer portfolio.
- **D-02:** Mono accent font — **Geist Mono** (via `next/font/google`). Paired with Geist for design language consistency.
- **D-03:** Mono accent usage — **Section labels only.** Small monospace labels above section headings using the `// label` convention (e.g., `// about`, `// skills`, `// contact`). Not used in navigation.
- **D-04:** Hero name size — **Large but restrained**, ~56–72px range. Prominent without overwhelming. Leaves room for tagline to breathe.
- **D-05:** Font weight strategy — **High contrast.** Thin/light weights (`font-light`, `font-normal`) for body copy, labels, and secondary text. Bold/heavy weights (`font-bold`, `font-semibold`) for headings. Strong visual hierarchy throughout.

### Color Palette

- **D-06:** Background — `#1a1a1a` (dark charcoal). Premium, polished — the 2025 standard for dark-mode products (Apple, Linear, Vercel). Applied directly on `<html>` in `globals.css` to prevent dark mode flash (never via JS class toggle).
- **D-07:** Primary text — `#f5f5f5` (off-white). Maximum contrast, clean, neutral.
- **D-08:** Secondary text — A mid-gray, approximately `#a3a3a3` or `#737373` — used for labels, meta text, section mono labels. Claude's discretion on exact shade.
- **D-09:** Accent color — **Muted warm amber/gold.** Direction: desaturated amber, something in the `#c4903a`–`#d4a855` range. Should whisper rather than shout — used for CTA button, hover states, and link highlights. Exact shade is Claude's discretion within this direction.
- **D-10:** No other colors. Dark background, off-white text, one muted amber accent — nothing else.

### Hero Layout

- **D-11:** Text alignment — **Left-aligned.** Anchors to left margin, editorial and confident.
- **D-12:** Section height — **70–80vh.** Prominent but the top of the next section peeks at the bottom, inviting scroll.
- **D-13:** Vertical positioning — **Vertically centered** within the 70–80vh space.
- **D-14:** Hero content stack (top → bottom):
  1. Name (display size, bold — the dominant visual element)
  2. Role descriptor label — `Freelance Software Engineer` (smaller, lighter weight, possibly in Geist Mono)
  3. One-line tagline (body size, light weight)
  4. CTA button — "Get in touch" (scrolls to Contact section)
- **D-15:** Hero entrance animation — **Fade + upward drift** on page load. Staggered so name animates first, then role descriptor, then tagline, then CTA. Uses Framer Motion. `viewport: once: true` not applicable here (load animation, not scroll). Plays once only.

### Navigation Bar

- **D-16:** Type — **Minimal sticky nav.** Fixed to the top on scroll, always visible after initial load.
- **D-17:** Links — **About, Skills, Work, Contact.** Smooth-scroll to corresponding sections. Note: "Work" maps to the Clients/Testimonials area (not a projects section).
- **D-18:** Sticky background — **Transparent with blur backdrop** (`backdrop-blur` + `bg-[#1a1a1a]/80` or similar). Glassmorphism — background content blurs behind nav bar on scroll.
- **D-19:** Nav typography — Geist, medium weight, smaller than body copy. No mono in nav (mono is section labels only per D-03).

### Claude's Discretion

- Exact muted amber accent shade within the `#c4903a`–`#d4a855` direction
- Secondary/muted text gray shade (around `#a3a3a3`)
- CTA button style — ghost/outline vs subtle filled, border radius — should match "nonchalant" tone
- Whether name includes a subtle cursor blink or is purely static text
- Exact Tailwind configuration structure for design tokens
- Padding/spacing values and container max-width
- Whether the nav includes the user's name/logo on the left (common pattern) or is links-only

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Planning
- `.planning/PROJECT.md` — Project goals, constraints, key decisions (dark theme only, nonchalant tone)
- `.planning/REQUIREMENTS.md` — v1 requirements; Phase 1 covers FOUND-01 through FOUND-04 and HERO-01 through HERO-02
- `.planning/ROADMAP.md` — Phase 1 scope and success criteria

### Research
- `.planning/research/STACK.md` — Recommended stack with rationale (Next.js 15, Tailwind v4, Framer Motion, fonts, icons)
- `.planning/research/ARCHITECTURE.md` — Folder structure, component breakdown, build order, FadeIn wrapper pattern
- `.planning/research/PITFALLS.md` — Critical pitfalls for Foundation phase: dark mode flash, Tailwind v4 config, font loading, hydration mismatches

### No external specs
No ADRs or external specification documents — all decisions captured above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None yet — greenfield project. Phase 1 establishes the patterns all subsequent phases reuse.

### Established Patterns
- **FadeIn wrapper pattern** (to be established in this phase): A small `'use client'` Framer Motion wrapper that section Server Components are placed inside. All subsequent phases reuse this component. See `.planning/research/ARCHITECTURE.md` for the reference implementation.
- **CSS custom properties for theme tokens** (to be established): `--color-bg`, `--color-text`, `--color-accent`, `--font-sans`, `--font-mono` defined in `globals.css` and consumed via Tailwind config. All subsequent phases consume these tokens — changes to palette require only one file edit.

### Integration Points
- Phase 1 creates the `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, and base component structure that every subsequent phase adds to.
- The Hero section's FadeIn wrapper is the first concrete use of the animation pattern — get it right here and the rest of the phases inherit it for free.

</code_context>

<specifics>
## Specific Ideas

- The `// section-name` mono label convention (using Geist Mono, lighter weight, above section headings) is a distinctive typographic detail that ties the sections together. Implement this pattern in Phase 1's design system so subsequent phases can reuse it.
- "Work" is used as the nav label for the Clients/Testimonials section — not "Clients" or "Projects". This is intentional framing.
- The amber accent should feel like a warm ember glow rather than a loud yellow. Muted is the operative word.

</specifics>

<deferred>
## Deferred Ideas

- Availability status indicator in hero (`// available for work` or similar) — v2 requirement, not Phase 1 scope
- Custom OG image design — v2 SEO enhancement
- Hover color reveal on client logos — Phase 3 enhancement

None of these came up as scope creep during discussion — noted from requirements for future reference.

</deferred>

---

*Phase: 1-Foundation + Hero*
*Context gathered: 2026-06-18*
