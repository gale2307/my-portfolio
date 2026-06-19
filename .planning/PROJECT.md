# Personal Portfolio — Freelance Software Engineer

## What This Is

A personal portfolio website for a freelance software engineer. Dark, minimal, and typographic — designed to be nonchalant and straight to the point. The site presents who you are, what you work with, and who's vouched for you, then gets out of the way.

## Core Value

A prospective client lands on the site and knows within seconds whether to reach out — the portfolio closes deals, not just impressions.

## Business Context

- **Customer**: Prospective freelance clients discovering the site
- **Success metric**: Contact form submissions / inquiries from qualified clients

## Current Milestone: v1.1 Testimonials

**Goal:** Upgrade the testimonials section with real client content, profile photos, LinkedIn verification, and a carousel layout.

**Target features:**
- Real testimonial data (4–6 entries) — quote, name, title, company — sourced from LinkedIn recommendations
- Profile headshots per card (stored in `/public/images/testimonials/`)
- LinkedIn source badge + "View on LinkedIn" link per card
- Carousel/slider layout replacing the current 3-column grid
- Updated `TestimonialItem` interface to support `photo`, `linkedinUrl`, and `source` fields

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section with name, tagline, and single CTA
- [ ] About section describing background and what you do
- [ ] Skills / tech-stack section showing technologies worked with
- [ ] Client logos section (who you've worked with)
- [ ] Client testimonials section with quotes from past clients
- [ ] Contact section with email link and social links
- [ ] Subtle motion (fade-ins, polish — nothing distracting)
- [ ] Deployed on Vercel with custom domain

### Out of Scope

- Projects / case studies section — client logos + testimonials speak for themselves, no case studies needed
- Blog or writing section — not the focus for v1
- CMS / content management — static content only for v1
- Dark/light mode toggle — dark only, intentional aesthetic choice

## Context

- **Stack**: Next.js + Tailwind CSS — natural fit, deploys to Vercel with zero config
- **Hosting**: Vercel, custom domain
- **Tone**: Nonchalant, confident, typographic — strong type hierarchy, muted palette, one subtle accent color (to be decided during design)
- **Motion**: Subtle only — fade-ins, maybe a cursor blink; nothing that competes with the content
- **Sections order (top → bottom)**: Hero → About → Skills → Client Logos → Testimonials → Contact

## Constraints

- **Tech stack**: Next.js + Tailwind CSS — chosen for Vercel deployment and developer familiarity
- **Hosting**: Vercel — free tier, custom domain support, zero-config Next.js deploys
- **Aesthetic**: Dark theme only — core to the nonchalant, typographic identity

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| No projects section | Client logos + testimonials make the case; case studies add friction | — Pending |
| Dark theme only | Core to the nonchalant, typographic brand — no toggle needed | — Pending |
| Next.js + Tailwind | Vercel-native, component-friendly, widely known | — Pending |
| Static content only (v1) | Keep it simple; no CMS overhead for a small personal site | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-19 — Milestone v1.1 Testimonials started*
