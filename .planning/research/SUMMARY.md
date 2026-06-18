# Project Research Summary

## Key Findings

### Stack

**Recommended:** Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript + Framer Motion 11 + Resend

- **App Router is the standard** for new Next.js projects in 2025 — no reason to use Pages Router
- **Tailwind v4** uses CSS-first config (tokens in `globals.css` under `@theme`, not `tailwind.config.ts`) — important to follow v4 docs specifically
- **Framer Motion** is the right animation library; must be used in Client Components only — use a shared `FadeIn` wrapper pattern to keep section components as Server Components
- **Resend + React Email** for contact form: clean API, generous free tier, no deliverability headaches
- **next/font** for fonts — eliminates FOUT; **react-icons/si** (Simple Icons) for tech stack icons; **Lucide** for UI icons

### Features That Matter

**Table stakes:**
- Name and role visible within 3 seconds
- Single CTA in hero
- Visual tech stack (icons + categories, no progress bars)
- 2-4 attributed testimonials (full name, title, company)
- Working contact form + GitHub + LinkedIn links
- Mobile responsive, < 2s load

**Differentiators for this project:**
- Strong typographic hero (the name IS the design)
- Specific, quantified testimonials ("shipped in 3 weeks")
- Availability status indicator in hero (high signal for freelance)
- `viewport: { once: true }` on all animations (professional feel)
- Subtle stagger on skills grid

**Confirmed anti-features:** typing animation effect, skill progress bars, carousel for testimonials, dark/light toggle

### Architecture

**Pattern:** Server Components for all content sections, wrapped with a shared `FadeIn` client component for animations. Contact form is the only fully client-interactive section.

**Content in `lib/data/`:** Typed TypeScript files for skills, testimonials, clients — no CMS, easy to update.

**Build order:** Foundation → Hero → About + Skills → Clients + Testimonials → Contact → Animation pass → Polish → Deploy

### Critical Pitfalls

| Risk | Prevention |
|------|-----------|
| Dark mode flash (FOUC) | Set background-color in `globals.css` on `<html>` — never rely on JS class toggle |
| Framer Motion in Server Component | Use `FadeIn` wrapper pattern exclusively |
| Resend API key exposed | Never use `NEXT_PUBLIC_` prefix; Route Handler only |
| Animation re-triggering on scroll | `viewport={{ once: true }}` everywhere |
| Low contrast text | Verify every combination meets WCAG AA (4.5:1 body, 3:1 large) |
| Mobile typography overflow | Build mobile-first; test at 375px during development |
| Missing env vars on Vercel | Set `RESEND_API_KEY` before testing production contact form |
| Vague testimonials | Specific outcomes ("shipped in 6 weeks") > generic praise |

## Implications for Roadmap

**Phase structure should follow build order:**
1. **Foundation** — Next.js setup, Tailwind config, fonts, colors, layout shell
2. **Core Sections** — Hero, About, Skills (content-only, no interactivity)
3. **Social Proof** — Client logos, Testimonials (data-driven, test content architecture)
4. **Contact** — Form + API route (most complex; isolated phase)
5. **Polish + Deploy** — Animation pass, SEO, accessibility, Vercel + custom domain

**Key cross-phase concerns:**
- Mobile-first from Phase 1 (not a polish afterthought)
- `FadeIn` wrapper available from Phase 2 (used across sections)
- Content (testimonials, client logos) needs to be ready before Phase 3

## Sources

- Next.js 15 App Router documentation
- Tailwind CSS v4 migration guide
- Framer Motion whileInView documentation
- Resend API documentation
- WCAG 2.1 contrast requirements
- Common patterns from dark typographic developer portfolios (2024-2025)
