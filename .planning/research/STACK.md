# Stack Research — Personal Portfolio (Next.js)

## Recommended Stack

### Core

| Library | Version | Rationale | Confidence |
|---------|---------|-----------|------------|
| Next.js | 15.x (App Router) | Current stable; App Router is the standard for new projects in 2025; RSC reduces JS sent to client | High |
| React | 19.x | Required by Next.js 15 | High |
| Tailwind CSS | 4.x | CSS-first config (no tailwind.config.js needed), faster builds, better dark mode with CSS vars | High |
| TypeScript | 5.x | Type safety for component props, content data structures | High |

### Animation

**Recommendation: Framer Motion 11.x**

- Best-in-class declarative animation for React
- `motion.div` with `initial`/`animate`/`whileInView` covers all portfolio needs (fade-ins, stagger)
- Must be used in Client Components (`'use client'`) — not a blocker for a single-page portfolio
- Alternative: CSS `@keyframes` + Tailwind `animate-*` utilities — simpler but less composable
- Avoid: React Spring (heavier API for this use case), GSAP (overkill, license cost for commercial)

### Contact / Email

**Recommendation: Resend + React Email**

- Resend: transactional email API with generous free tier (3,000 emails/month), excellent deliverability
- React Email: compose emails as React components, pairs naturally with the stack
- Implementation: Next.js Route Handler (`app/api/contact/route.ts`) receives form POST, calls Resend SDK
- Alternative: EmailJS — client-side only (exposes API key), no server-side processing
- Avoid: Nodemailer directly — requires SMTP server setup, deliverability issues; Formspree adds third-party branding

### Fonts

**Recommendation: next/font with Google Fonts**

- `next/font/google` eliminates layout shift and external font requests
- For dark typographic portfolio: **Geist** (by Vercel, clean modern sans-serif) or **Inter** as body; **Geist Mono** for code/tech accent
- Alternative pairing: **DM Sans** (body) + **DM Mono** (accent) — popular in minimal dark portfolios
- Avoid: multiple font weights (each adds to LCP); loading fonts via `<link>` tags (FOUT)

### Icons

**Recommendation: react-icons (Simple Icons set)**

- `react-icons/si` includes Simple Icons — the standard brand icon set for tech logos
- Tree-shakeable, SVG-based, no external requests
- Alternative: Devicons via CDN — less control, external dependency
- Avoid: image files for tech icons (harder to theme, larger payload)

**For UI icons (arrows, social links, etc.):** Lucide React — lightweight, consistent stroke style

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
