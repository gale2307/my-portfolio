# Walking Skeleton — Phase 1: Foundation + Hero

**Phase:** 1-Foundation + Hero
**Created:** 2026-06-18
**Status:** Ready for execution

---

## What Is the Walking Skeleton?

A Walking Skeleton is the thinnest possible slice of the system that proves end-to-end delivery works. For this static portfolio site there is no database, no backend runtime, and no API to integrate against in Phase 1. The skeleton proves the full deployment pipeline: local dev → production build → Vercel URL.

**End-to-End Capability:**
> "A visitor opens a live Vercel URL and sees a dark hero section with the owner's name, role descriptor, tagline, and CTA button — rendered without a flash of white, in the correct typography, on a custom domain."

This is the minimum observable outcome that proves the entire stack is wired together.

---

## Architecture Decisions Encoded in the Skeleton

| Decision | Value | Why |
|----------|-------|-----|
| Framework | Next.js 15 App Router | RSC by default; zero-config Vercel deploy; `next/font` for FOUT elimination |
| Language | TypeScript 5.x | Type safety for component props and content data structures |
| Styling | Tailwind CSS v4, CSS-first | Tokens in `@theme {}` block in `globals.css`; no `tailwind.config.ts` needed |
| Dark theme | Plain CSS on `<html>` in `globals.css` | `background-color: #1a1a1a` applied before JS loads — zero FOUC |
| Fonts | `next/font/google` — Geist + Geist Mono | Self-hosted by Next.js; eliminates external font requests and FOUT |
| Animation | Framer Motion | `'use client'` FadeIn wrapper keeps Server Components pure |
| Deployment | Vercel (Git integration) | Zero-config Next.js; custom domain via Vercel dashboard |
| Content | Static TypeScript in `lib/data/` | No CMS; type-safe; single file to update |

---

## Stack Items Proven by the Skeleton

| Item | Proven When |
|------|-------------|
| Next.js 15 App Router | `next dev` starts; `app/layout.tsx` and `app/page.tsx` render without errors |
| TypeScript 5.x | `tsc --noEmit` passes with zero errors |
| Tailwind CSS v4 | `@theme` tokens resolve; `bg-bg`, `text-text`, `text-accent` classes apply correctly |
| `next/font/google` (Geist) | DevTools network tab shows no requests to `fonts.googleapis.com`; font is self-hosted |
| Dark background flash prevention | Page load shows `#1a1a1a` background before React hydrates |
| Framer Motion stagger | Five hero elements animate in sequence on first mount; `prefers-reduced-motion` skips animation |
| Vercel deployment pipeline | Push to `main` → Vercel build succeeds → public URL accessible |
| Custom domain | HTTPS resolves on custom domain; SSL cert issued by Vercel |

---

## Skeleton File Tree

```
my-portfolio/
├── app/
│   ├── layout.tsx          # Fonts, metadata, body wrapper, dark class on html
│   ├── page.tsx            # Composes NavBar + Hero; section anchors for future phases
│   └── globals.css         # @import "tailwindcss"; @theme tokens; html background flash fix
├── components/
│   ├── sections/
│   │   └── Hero.tsx        # Content stack + Framer Motion mount animation
│   └── ui/
│       ├── Button.tsx      # Reusable ghost/outline CTA button
│       ├── FadeIn.tsx      # Reusable whileInView wrapper for future sections
│       └── NavBar.tsx      # Fixed glassmorphism nav with smooth-scroll links
├── lib/
│   └── data/
│       └── hero.ts         # { name, tagline } — typed content for Hero component
├── public/                 # Static assets (empty at skeleton stage)
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## What Is Deferred

| Item | Deferred To | Reason |
|------|-------------|--------|
| About, Skills, Clients, Testimonials sections | Phase 2 | Out of Phase 1 scope |
| Contact form + Resend API route | Phase 3 | Requires email provider setup |
| `#contact` anchor target | Phase 3 | CTA button present; section not yet built — anchor scrolls to page bottom harmlessly |
| Scroll-triggered section animations | Phase 4 | FadeIn wrapper is established but not applied to non-existent sections yet |
| Open Graph image | Phase 4 | Metadata API wired; `og-image.png` deferred |
| Mobile responsiveness polish | Phase 4 | Desktop-first in Phase 1; fluid `clamp()` typography prevents overflow |
| `npm audit` zero high/critical | Wave 1 | Run immediately after `npm install` |

---

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this skeleton without altering its architectural decisions:

- Phase 2: About + Skills + Client Logos sections (content + scroll animations)
- Phase 3: Testimonials + Contact form (Resend integration, social links)
- Phase 4: Animation polish + SEO + Open Graph + mobile responsiveness

---

## Definition of Done

The skeleton is complete when all of the following are true:

- [ ] `next dev` starts without TypeScript errors
- [ ] `next build` completes without errors or warnings
- [ ] Page loads with `#1a1a1a` background — no white flash visible on repeat hard-refresh
- [ ] Hero displays: `// freelance` label, full name, `Freelance Software Engineer`, tagline, and "Get in touch" CTA
- [ ] Hero stagger animation plays once on first load; does not replay on navigation or scroll
- [ ] Geist font is served from `/_next/static/media/` (not `fonts.googleapis.com`) per DevTools network tab
- [ ] `tsc --noEmit` exits with code 0
- [ ] Site is accessible at a Vercel HTTPS URL
- [ ] Site is accessible at the custom domain (DNS propagated)
