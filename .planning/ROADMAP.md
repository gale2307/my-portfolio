# Roadmap: Personal Portfolio

**Project:** Personal Portfolio — Freelance Software Engineer
**Mode:** Vertical MVP — each phase delivers a visible, deployable increment
**Granularity:** Coarse (6 phases)
**Requirements covered:** 23 / 23 ✓

---

## Phases Overview

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Foundation + Hero | Live dark site with hero visible | FOUND-01, FOUND-02, FOUND-03, FOUND-04, HERO-01, HERO-02 | 5 |
| 2 | Core Content Sections | About, Skills, Client Logos live | ABOUT-01, SKILL-01, SKILL-02, CLIENT-01 | 4 |
| 3 | Social Proof + Contact | 2/2 | Complete   | 2026-06-18 |
| 4 | Animation + SEO + Polish | 2/2 | Complete   | 2026-06-18 |
| 5 | Testimonials — Data & Cards | Real data, photos, LinkedIn badges live | TEST-03, TEST-04, TEST-05, TEST-06 | 4 |
| 6 | Testimonials — Carousel | Carousel layout with accessible controls | TEST-07, TEST-08 | 3 |

---

### Phase 1: Foundation + Hero — COMPLETE

**Goal:** Get the project scaffolded, dark theme configured, and the hero section live on a custom Vercel domain. End state: share a URL and see the dark typographic hero.
**Mode:** mvp
**Requirements:** FOUND-01, FOUND-02, FOUND-03, FOUND-04, HERO-01, HERO-02

**Success Criteria:**

1. `next dev` runs without errors; TypeScript compiles clean
2. Dark background renders on page load with no flash of white/light theme
3. Hero section displays name, tagline, and CTA button with correct typography
4. Hero entrance animation (fade + drift) plays on first load
5. Site is accessible at a custom domain via Vercel

**Plans:**

1. ~~Scaffold Next.js 15 + TypeScript + Tailwind CSS v4 — configure `globals.css` with dark theme CSS vars, `next/font/google`, and base layout~~ ✓ Complete
2. ~~Build Hero section component — name, tagline, CTA button, Framer Motion entrance animation~~ ✓ Complete
3. ~~Deploy to Vercel and configure custom domain~~ ✓ Complete

---

### Phase 2: Core Content Sections — COMPLETE

**Goal:** About, Skills, and Client Logos sections are implemented, populated with real content, and visible on the live site.
**Mode:** mvp
**Requirements:** ABOUT-01, SKILL-01, SKILL-02, CLIENT-01

**Success Criteria:**

1. About section renders short prose bio with correct typographic treatment
2. Skills section displays icon grid (Simple Icons) with technology name labels
3. Skills icons animate in with a visible stagger as the section enters viewport
4. Client logos section renders grayscale logos in a consistent grid

**Plans:**

1. ~~Build About section — prose layout component, FadeIn wrapper, static content~~ ✓ Complete
2. ~~Build Skills section — icon grid from `lib/data/skills.ts`, stagger animation~~ ✓ Complete
3. ~~Build Clients section — logo grid from `lib/data/clients.ts`, grayscale filter~~ ✓ Complete

---

### Phase 3: Social Proof + Contact

**Goal:** Testimonials section and working contact form are live — a visitor can read past client quotes and send a message.
**Mode:** mvp
**Requirements:** TEST-01, TEST-02, CONT-01, CONT-02

**Success Criteria:**

1. Testimonials section renders cards with quote, full attribution (name, title, company), and avatar/initials
2. Contact form accepts name, email, and message; submits successfully and owner receives the email
3. GitHub and LinkedIn icon links are present, accessible (aria-labels), and point to correct profiles
4. Form shows a success state after submission; shows an error state if submission fails

**Plans:**

- [x] 03-01-PLAN.md

2/2 plans complete

- [x] 03-02-PLAN.md

1/2 plans executed

2. Build Contact section — form component with client state, API Route Handler (`app/api/contact/route.ts`), Resend integration, social icon links

---

### Phase 4: Animation + SEO + Polish

**Goal:** Full site animation pass, SEO metadata, accessibility audit, and mobile QA complete — the portfolio is ready to share with prospective clients.
**Mode:** mvp
**Requirements:** ANIM-01, ANIM-02, SEO-01

**Success Criteria:**

1. Every section (About, Skills, Clients, Testimonials, Contact) fades in on scroll; animation plays once and does not re-trigger on scroll back
2. All animations are suppressed when `prefers-reduced-motion` is enabled
3. Sharing the site URL on LinkedIn/Slack/X renders the correct OG title, description, and image preview
4. Site passes WCAG AA contrast on all text elements (minimum 4.5:1 for body, 3:1 for large text)

**Plans:**

- [x] 04-01-PLAN.md

2/2 plans complete

- [x] 04-02-PLAN.md

1/2 plans executed

2. SEO + polish — Open Graph metadata, accessibility audit (contrast, focus states, aria-labels), mobile responsiveness check

---

### Phase 5: Testimonials — Data & Cards

**Goal:** Real client testimonials are live on the site — with profile photos and LinkedIn verification badges — replacing all placeholder content.
**Mode:** mvp
**Requirements:** TEST-03, TEST-04, TEST-05, TEST-06

**Success Criteria:**

1. `TestimonialItem` TypeScript interface has `photo`, `linkedinUrl` (optional), and `source` fields with no type errors
2. Testimonials section displays 4–6 real entries with actual client names, titles, companies, and quote text
3. Each card shows a circular profile headshot rendered via `next/image` (no initials avatars)
4. LinkedIn-sourced cards display a LinkedIn icon badge and a "View on LinkedIn" link that opens the recommendation

**Plans:**

1. Extend `TestimonialItem` interface, add photo/linkedinUrl/source fields, populate `lib/data/testimonials.ts` with real client data, add headshot images to `/public/images/testimonials/`
2. Update `components/sections/Testimonials.tsx` card design — circular `next/image` headshot, LinkedIn badge + link for `source: 'linkedin'` entries

---

### Phase 6: Testimonials — Carousel

**Goal:** The testimonials section uses a carousel layout with keyboard-accessible prev/next controls, replacing the static grid.
**Mode:** mvp
**Requirements:** TEST-07, TEST-08

**Success Criteria:**

1. Testimonials display in a carousel/slider — one card (or a peek of the next) visible at a time
2. Prev/next buttons are visible, labelled with aria-labels, and advance the carousel
3. Carousel responds to keyboard navigation (Tab to buttons, Enter/Space to activate)

**Plans:**

1. Install carousel library (e.g. Embla Carousel), convert `Testimonials.tsx` from grid to carousel, add accessible prev/next controls

---

## Requirement Coverage

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete (Plan 01-01) |
| FOUND-02 | Phase 1 | Complete (Plan 01-01) |
| FOUND-03 | Phase 1 | Complete (Plan 01-01) |
| FOUND-04 | Phase 1 | Complete (Plan 01-03) |
| HERO-01 | Phase 1 | Complete (Plan 01-01) |
| HERO-02 | Phase 1 | Complete (Plan 01-02) |
| ABOUT-01 | Phase 2 | Complete (Plan 02-01) |
| SKILL-01 | Phase 2 | Complete (Plan 02-02) |
| SKILL-02 | Phase 2 | Complete (Plan 02-02) |
| CLIENT-01 | Phase 2 | Complete (Plan 02-03) |
| TEST-01 | Phase 3 | Complete (Plan 03-01) |
| TEST-02 | Phase 3 | Complete (Plan 03-01) |
| CONT-01 | Phase 3 | Complete (Plan 03-02) |
| CONT-02 | Phase 3 | Complete (Plan 03-02) |
| ANIM-01 | Phase 4 | Complete (Plan 04-01) |
| ANIM-02 | Phase 4 | Complete (Plan 04-01) |
| SEO-01 | Phase 4 | Complete (Plan 04-02) |
| TEST-03 | Phase 5 | Pending |
| TEST-04 | Phase 5 | Pending |
| TEST-05 | Phase 5 | Pending |
| TEST-06 | Phase 5 | Pending |
| TEST-07 | Phase 6 | Pending |
| TEST-08 | Phase 6 | Pending |

**Coverage:** 23 / 23 ✓

---
*Roadmap created: 2026-06-18*
*Last updated: 2026-06-19 — v1.1 Testimonials phases 5–6 added*
