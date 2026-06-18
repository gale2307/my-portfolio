---
phase: "03"
phase_name: "social-proof-contact"
status: warning
depth: standard
files_reviewed: 7
findings:
  critical: 0
  warning: 1
  info: 3
  total: 4
reviewed_at: "2026-06-18T17:00:00.000Z"
---

# Code Review: Phase 03 — Social Proof + Contact

**Depth:** standard  
**Files reviewed:** 7  
**Status:** warning (1 warning, 3 info — no critical issues; safe to ship for MVP)

---

## Files Reviewed

- `app/api/contact/route.ts`
- `components/sections/Contact.tsx`
- `components/sections/Testimonials.tsx`
- `components/ui/ContactForm.tsx`
- `lib/data/contact.ts`
- `lib/data/testimonials.ts`
- `app/page.tsx`

---

## Findings

### WR-01 — No server-side email format validation

**File:** `app/api/contact/route.ts:19`  
**Severity:** Warning

The route handler validates that `email` is non-empty (`!email`) but does not validate that it is a well-formed email address. A malformed value (e.g. `"notanemail"`) would be passed to Resend, which may reject it at their API layer rather than returning a clean 400. 

**Recommendation:** Add a lightweight email format check:
```ts
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
}
```

---

### IN-01 — Missing `aria-live` on form status messages

**File:** `components/ui/ContactForm.tsx:100–109`  
**Severity:** Info

The success and error messages that appear after form submission are not inside an `aria-live` region. Screen readers will not announce these dynamically inserted messages, making the form feedback inaccessible to assistive technology users.

**Recommendation:** Wrap status messages in an `aria-live="polite"` container:
```tsx
<div aria-live="polite" aria-atomic="true">
  {status === 'success' && <p className="text-sm text-green-400">...</p>}
  {status === 'error' && <p className="text-sm text-red-400">...</p>}
</div>
```

---

### IN-02 — `<img>` tag for optional avatarUrl (lint warning)

**File:** `components/sections/Testimonials.tsx:26`  
**Severity:** Info

The `<img>` tag for `avatarUrl` triggers `@next/next/no-img-element` lint warning (same pre-existing warning in `Clients.tsx`). Since `avatarUrl` is optional and unused in the default data, this has no user impact for the MVP. The warning is not an error and does not block builds.

**Recommendation:** If real avatar images are ever added, replace `<img>` with Next.js `<Image>` from `next/image` for automatic optimization.

---

### IN-03 — Placeholder social URLs need verification before deploy

**File:** `lib/data/contact.ts:3,8`  
**Severity:** Info

Both `github.url` (`https://github.com/nichowil`) and `linkedin.url` (`https://linkedin.com/in/nichowil`) are placeholder values. They resolve to real URLs but need to be confirmed as the correct profiles before the site goes live.

**Recommendation:** Verify both URLs resolve to the correct profiles before pushing Phase 4 or sharing the portfolio URL with clients.

---

## What's Well Done

- **API key guard**: Route handler correctly returns 500 with a clear message when `RESEND_API_KEY` is absent, rather than crashing.
- **State machine**: `ContactForm` idle/loading/success/error transitions are correct; double-submission prevented via `disabled` on loading and success states.
- **`rel="noopener noreferrer"`**: All `target="_blank"` links correctly include the security attribute.
- **Server Components preserved**: `Contact.tsx` and `Testimonials.tsx` remain Server Components; only `ContactForm.tsx` uses `'use client'`.
- **`replyTo`**: Route handler sets `replyTo: email` so owner can reply directly to the sender — a useful improvement over the plan spec.
- **Initials fallback**: `getInitials` handles both single-word and multi-word names correctly.

---

## Summary

No critical bugs found. One warning (missing server-side email format validation) that is low risk for MVP since the client `<input type="email">` provides a first layer of validation. Three info-level findings for post-MVP improvement. Safe to ship.
