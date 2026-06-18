---
phase: "04"
phase_name: "Animation + SEO + Polish"
status: has_findings
files_reviewed: 4
depth: standard
reviewed_at: "2026-06-18"
findings:
  critical: 0
  warning: 2
  info: 2
  total: 4
---

# Phase 04 Code Review — Animation + SEO + Polish

**Scope:** 4 files | standard depth

## Summary

The Phase 4 additions are structurally sound — metadata wiring, JSON-LD schema, OG image generation, and scroll animations all follow correct Next.js 15 patterns. Two issues need attention before ship: the Twitter card metadata omits an `images` field (the OG image will not appear in X/Twitter previews), and the contact form status messages lack an ARIA live region (screen readers won't announce success or error feedback).

## Findings

### CR-01 — Twitter card missing `images` field (Warning)
**File:** `app/layout.tsx:30`
**Issue:** The `twitter` metadata object declares `card: 'summary_large_image'` but omits the `images` property. Next.js does not automatically inherit Open Graph images for Twitter — the card will render as text-only in X/Twitter link previews, defeating the purpose of the `summary_large_image` card type.
**Fix:** Add `images` to the Twitter block, mirroring the OG image:
```ts
twitter: {
  card: 'summary_large_image',
  title: 'Nicholas William — Freelance Software Engineer',
  description: 'Freelance software engineer building fast, scalable web products. Available for projects.',
  images: ['/opengraph-image'],
},
```

### CR-02 — Contact form status messages not announced to screen readers (Warning)
**File:** `components/ui/ContactForm.tsx:100-109`
**Issue:** The success and error `<p>` elements appear conditionally after submission, but nothing signals their appearance to assistive technology. A keyboard or screen-reader user who submits the form will receive no audible confirmation that anything happened.
**Fix:** Add `role="alert"` (which implies `aria-live="assertive"`) to both status paragraphs:
```tsx
{status === 'success' && (
  <p role="alert" className="text-sm text-green-400">
    Message sent — I&apos;ll be in touch soon.
  </p>
)}
{status === 'error' && (
  <p role="alert" className="text-sm text-red-400">
    Something went wrong. Please try again or email me directly.
  </p>
)}
```

### CR-03 — JSON-LD Person schema omits `url` property (Info)
**File:** `app/layout.tsx:49-59`
**Issue:** The Schema.org `Person` object does not include a `url` field pointing to the canonical site URL. This is not required but is recommended — Google's rich-result documentation lists `url` as a recommended property for Person markup, and its absence means the structured data cannot be associated with a canonical page URL.
**Fix:** Add `url` using the same env-based logic as `metadataBase`:
```ts
url: process.env.NEXT_PUBLIC_SITE_URL ?? `https://${process.env.VERCEL_URL}`,
```
(Guard for production only; `localhost` is not useful in structured data.)

### CR-04 — Section heading comment is excluded from scroll animation (Info)
**File:** `components/sections/Contact.tsx:11-13`
**Issue:** The `{'// contact'}` eyebrow label is rendered outside any `FadeIn` wrapper, so it appears immediately on mount while the description and form animate in below it. This is likely an oversight rather than intentional — every other section follows the pattern of animating all visible content together.
**Fix:** Wrap the eyebrow in a `FadeIn` or include it in the existing first `FadeIn` block if the stagger is not desired:
```tsx
<FadeIn>
  <p className="font-mono text-xs text-[#a3a3a3] tracking-widest uppercase mb-4">
    {'// contact'}
  </p>
</FadeIn>
<FadeIn delay={0.1}>
  <p className="text-[#a3a3a3] text-sm mb-8">
    Have a project in mind? Get in touch.
  </p>
</FadeIn>
```

## Verdict

⚠ Issues found: 0 critical, 2 warning, 2 info

CR-01 (Twitter images) and CR-02 (ARIA alert) should be fixed before shipping — the first silently breaks social sharing and the second breaks screen-reader accessibility. CR-03 and CR-04 are minor polish items with no functional impact.
