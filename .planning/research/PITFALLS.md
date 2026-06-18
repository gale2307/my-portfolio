# Pitfalls Research — Portfolio Website

## Technical Pitfalls

### Next.js / React

**Framer Motion + Server Components**
- Warning sign: `Error: You're importing a component that needs... but none of its parents are marked with 'use client'`
- Prevention: Never import `motion` directly in a Server Component. Use the `FadeIn` wrapper pattern (see ARCHITECTURE.md) — a small client component that wraps server-rendered children
- Phase: Foundation / Animation pass

**Hydration mismatches**
- Warning sign: Console errors about server/client render differences; flickering on load
- Prevention: Avoid `typeof window` checks at render time; don't read `localStorage` during SSR; use `useEffect` for any client-only side effects
- Phase: Foundation

**`viewport: { once: false }` (default)**
- Warning sign: Animations re-trigger every time user scrolls back up past a section — feels jittery
- Prevention: Always set `viewport={{ once: true }}` on `whileInView` animations
- Phase: Animation pass

**Route Handler forgetting to validate input**
- Warning sign: Contact form sends empty or malformed data to Resend API, causing confusing errors
- Prevention: Validate `name`, `email`, `message` fields server-side in `app/api/contact/route.ts` before calling Resend; return 400 with field-level errors
- Phase: Contact section

### Tailwind / Styling

**Tailwind v4 CSS-first config learning curve**
- Warning sign: Trying to add custom colors/fonts in `tailwind.config.ts` with v4 syntax and nothing applying
- Prevention: In v4, custom tokens go in `globals.css` under `@theme` block, not in config file. Follow v4 docs explicitly.
- Phase: Foundation

**Dark mode flash (FOUC)**
- Warning sign: Momentary white flash on page load before dark styles apply
- Prevention: Since this is dark-only (no toggle), set `background-color` on `<html>` or `<body>` directly in `globals.css` — it applies before JS loads. Do NOT rely on a `dark` class toggled by JavaScript.
- Phase: Foundation

**Tailwind purging custom CSS classes**
- Warning sign: Styles work in dev, disappear in production build
- Prevention: Only use complete Tailwind class names in JSX (no string concatenation like `'text-' + size`); use `cn()` helper for conditional classes
- Phase: Throughout

### Performance

**Unoptimized client logos**
- Warning sign: Multiple PNG client logos at full resolution; network tab shows 200KB+ per logo
- Prevention: Use SVGs where possible; use `next/image` with explicit dimensions for raster logos; consider `loading="lazy"` for below-the-fold logos
- Phase: Clients section

**Layout Shift (CLS) from fonts**
- Warning sign: Text jumps/reflows after page loads; Lighthouse CLS > 0.1
- Prevention: Use `next/font` exclusively — it eliminates FOUT by self-hosting fonts; set `font-display: swap` is handled automatically
- Phase: Foundation

**Over-animating**
- Warning sign: Every element has an entrance animation; page feels like a PowerPoint presentation
- Prevention: Animate sections as units (one FadeIn per section), not individual words or icons. Reserve motion for page load hero and section reveals.
- Phase: Animation pass

### Animation

**Stagger animation with too many items**
- Warning sign: Skills grid stagger takes 2+ seconds to complete because there are 20+ items
- Prevention: Keep stagger delay small (0.05-0.08s); cap stagger at ~0.5s total for the group; consider animating rows rather than individual items
- Phase: Skills section

**Motion reducing accessibility**
- Warning sign: Users with vestibular disorders report dizziness; `prefers-reduced-motion` not respected
- Prevention: Wrap all Framer Motion animations with `useReducedMotion()` hook; if `prefersReducedMotion` is true, skip animations entirely
- Phase: Animation pass

### Deployment

**Resend API key in client-side code**
- Warning sign: `RESEND_API_KEY` referenced in a file without `'use server'` or in a Client Component
- Prevention: API key must only be used in Server Components or Route Handlers; use `RESEND_API_KEY` (no `NEXT_PUBLIC_` prefix) so it's never exposed to the browser
- Phase: Contact / Deployment

**Environment variables not set on Vercel**
- Warning sign: Contact form returns 500 errors in production but works locally
- Prevention: After deploying, set `RESEND_API_KEY` in Vercel project settings > Environment Variables before testing
- Phase: Deployment

**Custom domain DNS propagation**
- Warning sign: Domain shows "not configured" in Vercel for up to 48 hours
- Prevention: Add Vercel nameservers or A/CNAME records immediately after deployment; don't wait until "launch day"
- Phase: Deployment

## Design / UX Pitfalls

### Accessibility

**Insufficient contrast on dark backgrounds**
- Warning sign: Lighthouse accessibility score < 90; users report text is hard to read
- Prevention: Minimum contrast ratio 4.5:1 for body text, 3:1 for large text (WCAG AA). Check every color combination, not just the default. Gray text on dark backgrounds is a common failure.
- Phase: Foundation / Polish

**Missing focus styles**
- Warning sign: Tab navigation shows no visible focus indicator; Tailwind's `outline-none` applied globally
- Prevention: Never use `outline: none` without a replacement. Use `focus-visible:ring-2 focus-visible:ring-[accent]` on all interactive elements.
- Phase: Polish

**Low-contrast social icon links**
- Warning sign: Icon-only links with no text label fail screen readers
- Prevention: Add `aria-label` to all icon-only buttons/links (e.g., `aria-label="GitHub profile"`)
- Phase: Contact section

### Mobile

**Desktop-first typography that breaks on small screens**
- Warning sign: Hero display text overflows or wraps awkwardly on 375px viewport
- Prevention: Use fluid typography (`clamp()` or Tailwind responsive prefixes); test on 375px, 390px, 430px widths during development, not just at the end
- Phase: Throughout (build mobile-first)

**Touch targets too small**
- Warning sign: Social links / nav items are hard to tap on mobile
- Prevention: Minimum 44×44px touch target for all interactive elements; add padding generously

### Typography

**Too many font weights loaded**
- Warning sign: Font loading takes 500ms+; multiple FOUT events
- Prevention: Load only the weights you actually use (e.g., 400, 500, 700 — not 100-900)
- Phase: Foundation

**Line length too wide on large screens**
- Warning sign: Paragraphs span full width on 1440px+ displays — hard to read
- Prevention: Cap body text width at ~65-75 characters (`max-w-prose` in Tailwind); center sections with a container `max-w-5xl` or similar

## Content Pitfalls

### Testimonials

**Vague testimonials that don't convert**
- Warning sign: Quotes like "Great developer, would recommend" — could be anyone
- Prevention: Work with clients to get specific quotes. Prompt them: "What did I help you achieve? What was the result?" Specific outcomes ("launched in 6 weeks", "reduced backend costs") are far more credible.
- Phase: Content preparation (before build)

**First-name-only attribution**
- Warning sign: "— John, Startup CEO" — feels fake, unverifiable
- Prevention: Full name, title, company for every testimonial. If a client can't be named publicly, don't use the testimonial.

**Too many testimonials**
- Warning sign: 8+ testimonials on a single-page site feels like padding
- Prevention: 2-4 strong, specific testimonials > 8 generic ones

### About Section

**Generic bio language**
- Warning sign: "Passionate developer with X years of experience who loves solving complex problems"
- Prevention: Write what you actually do and who you do it for. Be specific about the type of work (e.g., "I build backend APIs and data pipelines for early-stage startups"). Personality is fine; cliché is not.

**About section that's just a resume**
- Warning sign: Bullet-pointed career history, dates, job titles
- Prevention: The About section is a human connection point. 2-4 sentences of direct prose. The resume is LinkedIn.

### Contact

**Ambiguous CTA copy**
- Warning sign: CTA says "Contact me" — tells visitors nothing about what happens next
- Prevention: Set expectations: "Have a project in mind? Tell me about it and I'll get back to you within 24 hours."

## Phase Mapping

| Phase | Pitfalls to Watch |
|-------|------------------|
| Foundation | Dark mode flash, Tailwind v4 config, font loading, hydration mismatches |
| Hero | Typography overflow on mobile, entrance animation once-only |
| About + Skills | Generic bio copy, skill list inflation, stagger timing |
| Clients + Testimonials | Unoptimized logos, vague testimonial quotes, carousel trap |
| Contact | API key exposure, form validation, missing aria-labels |
| Animation pass | re-trigger on scroll, motion reduction, over-animation |
| Polish | Contrast ratios, focus states, touch targets, line length |
| Deploy | Missing env vars, DNS setup, custom domain timing |
