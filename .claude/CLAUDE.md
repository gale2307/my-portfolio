<!-- GSD:project-start source:PROJECT.md -->

## Project

**Personal Portfolio — Freelance Software Engineer**

A personal portfolio website for a freelance software engineer. Dark, minimal, and typographic — designed to be nonchalant and straight to the point. The site presents who you are, what you work with, and who's vouched for you, then gets out of the way.

**Core Value:** A prospective client lands on the site and knows within seconds whether to reach out — the portfolio closes deals, not just impressions.

### Constraints

- **Tech stack**: Next.js + Tailwind CSS — chosen for Vercel deployment and developer familiarity
- **Hosting**: Vercel — free tier, custom domain support, zero-config Next.js deploys
- **Aesthetic**: Dark theme only — core to the nonchalant, typographic identity

<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->

## Technology Stack

## Recommended Stack

### Core

| Library | Version | Rationale | Confidence |
|---------|---------|-----------|------------|
| Next.js | 15.x (App Router) | Current stable; App Router is the standard for new projects in 2025; RSC reduces JS sent to client | High |
| React | 19.x | Required by Next.js 15 | High |
| Tailwind CSS | 4.x | CSS-first config (no tailwind.config.js needed), faster builds, better dark mode with CSS vars | High |
| TypeScript | 5.x | Type safety for component props, content data structures | High |

### Animation

- Best-in-class declarative animation for React
- `motion.div` with `initial`/`animate`/`whileInView` covers all portfolio needs (fade-ins, stagger)
- Must be used in Client Components (`'use client'`) — not a blocker for a single-page portfolio
- Alternative: CSS `@keyframes` + Tailwind `animate-*` utilities — simpler but less composable
- Avoid: React Spring (heavier API for this use case), GSAP (overkill, license cost for commercial)

### Contact / Email

- Resend: transactional email API with generous free tier (3,000 emails/month), excellent deliverability
- React Email: compose emails as React components, pairs naturally with the stack
- Implementation: Next.js Route Handler (`app/api/contact/route.ts`) receives form POST, calls Resend SDK
- Alternative: EmailJS — client-side only (exposes API key), no server-side processing
- Avoid: Nodemailer directly — requires SMTP server setup, deliverability issues; Formspree adds third-party branding

### Fonts

- `next/font/google` eliminates layout shift and external font requests
- For dark typographic portfolio: **Geist** (by Vercel, clean modern sans-serif) or **Inter** as body; **Geist Mono** for code/tech accent
- Alternative pairing: **DM Sans** (body) + **DM Mono** (accent) — popular in minimal dark portfolios
- Avoid: multiple font weights (each adds to LCP); loading fonts via `<link>` tags (FOUT)

### Icons

- `react-icons/si` includes Simple Icons — the standard brand icon set for tech logos
- Tree-shakeable, SVG-based, no external requests
- Alternative: Devicons via CDN — less control, external dependency
- Avoid: image files for tech icons (harder to theme, larger payload)

### SEO

- Next.js 15 Metadata API (`export const metadata`) handles `<title>`, `<meta>`, Open Graph natively
- `next-sitemap` for sitemap generation (though a single-page portfolio barely needs it)
- Structured data: `application/ld+json` Person schema in the root layout

## What NOT to Use

| Library | Why Not |
|---------|---------|
| Create React App / Vite | No SSR, no built-in image optimization, worse SEO |
| Gatsby | Overly complex for a portfolio, ecosystem stagnating |
| Contentlayer / CMS | Unnecessary complexity for static content in v1 |
| Styled Components / Emotion | CSS-in-JS adds runtime overhead; Tailwind covers all needs |
| Three.js / WebGL effects | Kills performance, conflicts with "nonchalant" brand |
| Chakra UI / MUI | Too opinionated, harder to achieve custom dark typographic look |
| Pages Router | App Router is the standard for new Next.js projects in 2025 |

## Confidence Notes

- Tailwind v4 CSS-first config is relatively new (Feb 2025) — most tutorials still reference v3 syntax; the migration is straightforward but tooling docs are thinner
- Resend free tier limits: 3,000 emails/month, 100/day — more than sufficient for a portfolio contact form
- Framer Motion `whileInView` requires careful handling with SSR (use `once: true` to prevent re-triggering)

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
