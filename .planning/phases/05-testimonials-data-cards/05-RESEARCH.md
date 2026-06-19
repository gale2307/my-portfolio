# Phase 05 Research: Testimonials — Data & Cards

**Researched:** 2026-06-19
**Phase requirements:** TEST-03, TEST-04, TEST-05, TEST-06

---

## Existing Codebase State

### `lib/data/testimonials.ts` (current)

The file exports a `TestimonialItem` interface and a `testimonials` array with 3 placeholder entries.

Current interface:
```typescript
export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  avatarUrl?: string;   // ← optional, not populated in any entry
}
```

Placeholder entries: Alex Chen (CTO, Buildco), Sarah M. (Product Lead, Nexgen), James O. (Founder, Scalr). All are clearly synthetic — abbreviated last names, generic companies that match the `lib/data/clients.ts` placeholders.

No `photo`, `linkedinUrl`, or `source` fields exist yet.

### `components/sections/Testimonials.tsx` (current)

- Server Component (no `'use client'` directive) — correct, must stay that way
- Imports: `FadeIn` from `@/components/ui/FadeIn`, `testimonials` from `@/lib/data/testimonials`
- Grid: `grid-cols-1 md:grid-cols-3 gap-6` (3-column on desktop)
- Each card: `FadeIn` wrapper with `delay={index * 0.1}`, dark card `bg-[#1e1e1e] border border-white/[0.08] rounded-lg p-6`
- Attribution row: `flex items-center gap-3 pt-4 border-t border-white/[0.08]`
- Avatar: conditional — `avatarUrl` present → `<img>` tag (not `next/image`); absent → initials fallback `<div>` with `getInitials()`
- Name wrapper: `<div className="min-w-0">` — **missing `flex-1`**, which will be needed once LinkedIn badge uses `ml-auto`

Current avatar implementation uses plain `<img>`, not `next/image`. This phase introduces the first `next/image` usage.

### `components/sections/Contact.tsx` (current — reference for LinkedIn icon)

- Imports `FaLinkedin` from `react-icons/fa` — this is the confirmed working import path (SiLinkedin does not exist in react-icons v5)
- Uses `target="_blank" rel="noopener noreferrer"` pattern exactly as required
- `FaGithub` and `FaLinkedin` both at `size={20}` — phase 5 will use `size={16}` (smaller for inline attribution row)

### `next.config.ts` (current)

Empty minimal config:
```typescript
const nextConfig: NextConfig = {};
```

No `images.remotePatterns` configured. No `images.domains`. Since headshots will be in `/public/`, no config changes are needed — Next.js serves `/public/` assets as local paths natively.

### `public/` directory

No `images/` subdirectory exists yet. The directory `/public/images/testimonials/` must be created and populated with `{slug}.jpg` files before the component renders correctly.

### No `lib/types.ts`

Types are colocated in their respective data files (e.g. `TestimonialItem` lives in `lib/data/testimonials.ts`). Follow this pattern — do not create a separate types file.

---

## Interface Changes Required

### Current → Required

| Field | Current | Required |
|-------|---------|----------|
| `id` | `string` | `string` (unchanged) |
| `quote` | `string` | `string` (unchanged) |
| `name` | `string` | `string` (unchanged) |
| `title` | `string` | `string` (unchanged) |
| `company` | `string` | `string` (unchanged) |
| `avatarUrl` | `string?` | **Remove** |
| `photo` | — | **Add** `string` (required) |
| `linkedinUrl` | — | **Add** `string?` (optional) |
| `source` | — | **Add** `'linkedin' \| 'direct'` (required) |

### Final Interface

```typescript
export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  photo: string;               // "/images/testimonials/{slug}.jpg"
  linkedinUrl?: string;        // URL to LinkedIn recommendation (optional)
  source: 'linkedin' | 'direct';
}
```

Per D-08 and the UI-SPEC data contract: `avatarUrl` is dropped entirely (not kept as optional). The `photo` field is required — but the `getInitials` fallback should be kept for runtime safety (render guard: `t.photo ? <Image .../> : <initials div />`).

Note from CONTEXT.md specifics: "If any entry is missing a photo at content population time, keep the existing `getInitials` fallback logic." This means the component conditional stays in place even though the interface marks `photo` as required.

---

## Component Changes Required

### `components/sections/Testimonials.tsx` changes

1. **Add import:** `import Image from 'next/image'`
2. **Add import:** `import { FaLinkedin } from 'react-icons/fa'` (same as Contact.tsx)
3. **Avatar rendering:** Replace the `t.avatarUrl ?` conditional with `t.photo ?` and swap `<img>` for `<Image>` with `width={40} height={40}` props
4. **Name/title wrapper:** Add `flex-1` to the existing `min-w-0` div so truncation works when badge is present: `className="min-w-0 flex-1"`
5. **LinkedIn badge:** Add conditional after the name/title div — renders only when `t.source === 'linkedin' && t.linkedinUrl`

### Final attribution row structure (from UI-SPEC)

```tsx
<div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
  {t.photo ? (
    <Image
      src={t.photo}
      alt={t.name}
      width={40}
      height={40}
      className="w-10 h-10 rounded-full object-cover shrink-0"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-white/10 flex items-center justify-center shrink-0">
      <span className="font-mono text-xs text-[#a3a3a3]">
        {getInitials(t.name)}
      </span>
    </div>
  )}
  <div className="min-w-0 flex-1">
    <p className="font-medium text-[#f5f5f5] text-sm truncate">{t.name}</p>
    <p className="text-xs text-[#a3a3a3] font-mono truncate">
      {t.title} · {t.company}
    </p>
  </div>
  {t.source === 'linkedin' && t.linkedinUrl && (
    <a
      href={t.linkedinUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View on LinkedIn"
      className="ml-auto text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors duration-150 shrink-0"
    >
      <FaLinkedin size={16} />
    </a>
  )}
</div>
```

The `getInitials` helper function stays unchanged. No other parts of the component change (section wrapper, grid, card structure, quote rendering, FadeIn stagger).

---

## Image Strategy

- **Storage:** Local JPEG files at `/public/images/testimonials/{slug}.jpg`
- **Slug convention:** Matches the `id` field of each `TestimonialItem` (e.g. id `"alex-chen"` → file `alex-chen.jpg`)
- **Directory:** `/public/images/testimonials/` — does not exist yet, must be created
- **Serving:** Next.js serves `/public/` as static assets at the root path. `src="/images/testimonials/alex-chen.jpg"` in `next/image` resolves correctly without any config changes.
- **No remote patterns config needed:** D-02 explicitly rules out remote URLs, so `next.config.ts` stays untouched.
- **Image sizing:** `width={40} height={40}` (40×40px intrinsic) with `className="w-10 h-10"` (40px CSS). No retina/2× in this phase — deferred to Phase 6.
- **Format:** JPEG. No WebP conversion requirement stated. Next.js will auto-optimize on serve regardless.
- **Placeholder images:** The data file will reference real photo paths. If actual headshots are not available at implementation time, the `getInitials` fallback renders instead (runtime guard, not a build error).

---

## LinkedIn Badge Implementation

- **Icon:** `FaLinkedin` from `react-icons/fa` — already installed (react-icons in package.json), already imported in Contact.tsx. Direct import works: `import { FaLinkedin } from 'react-icons/fa'`
- **Note:** `SiLinkedin` from `react-icons/si` does NOT exist in react-icons v5 — confirmed in STATE.md Plan 03-02 notes. Must use `FaLinkedin` from `react-icons/fa`.
- **Size:** `size={16}` (16px) — smaller than the Contact section's `size={20}`, appropriate for inline attribution row
- **Colors:** `text-[#a3a3a3]` default, `hover:text-[#f5f5f5]` hover, `transition-colors duration-150`
- **Position:** `ml-auto` on the `<a>` wrapper pushes it to the right edge of the `flex items-center gap-3` attribution row
- **Condition:** Render only when `t.source === 'linkedin' && t.linkedinUrl` — both must be truthy
- **Accessibility:** `aria-label="View on LinkedIn"` on the `<a>` tag (icon-only link requires explicit label)
- **Security:** `target="_blank" rel="noopener noreferrer"` — same pattern as Contact.tsx social links

---

## MVP Vertical Slice Path

The thinnest path that satisfies all 4 success criteria in sequence:

**Step 1 — Interface (TEST-03):** Update `TestimonialItem` in `lib/data/testimonials.ts`: remove `avatarUrl`, add `photo: string`, `linkedinUrl?: string`, `source: 'linkedin' | 'direct'`. TypeScript will immediately flag the 3 existing data objects as errors (they lack `photo` and `source`), forcing Step 2.

**Step 2 — Data (TEST-04):** Replace the 3 placeholder entries with 4–6 real client entries. Each entry needs: real name, title, company, quote, `photo` path matching a file in `/public/images/testimonials/`, `source`, and optionally `linkedinUrl`. Also create the `/public/images/testimonials/` directory and add headshot images. TypeScript errors from Step 1 are resolved here.

**Step 3 — Component: headshot (TEST-05):** In `Testimonials.tsx`, add `import Image from 'next/image'`, change the avatar conditional from `t.avatarUrl` to `t.photo`, replace `<img>` with `<Image width={40} height={40} .../>`, add `flex-1` to name wrapper div.

**Step 4 — Component: LinkedIn badge (TEST-06):** Add `import { FaLinkedin } from 'react-icons/fa'`, add the conditional `<a>` badge element in the attribution row after the name/title block.

**Verification:** `tsc --noEmit` exits clean (no type errors), `next build` passes, dev server shows cards with real photos and LinkedIn badges where applicable.

---

## Key Files to Modify

| File | Current State | Change Required |
|------|--------------|-----------------|
| `lib/data/testimonials.ts` | `TestimonialItem` interface with `avatarUrl?: string`; 3 placeholder entries | Replace interface (remove `avatarUrl`, add `photo`, `linkedinUrl?`, `source`); replace all 3 entries with 4–6 real entries |
| `components/sections/Testimonials.tsx` | Uses `<img>` for avatar, `t.avatarUrl` conditional, `min-w-0` name wrapper, no LinkedIn badge | Add `next/image` import + `FaLinkedin` import; change avatar to `<Image>`; add `flex-1` to name wrapper; add LinkedIn badge conditional |
| `/public/images/testimonials/` | Directory does not exist | Create directory; add `{slug}.jpg` files for each real testimonial entry |

No other files require changes:
- `next.config.ts` — no change (local images only)
- `app/page.tsx` — no change (`<Testimonials />` import stays the same)
- `components/ui/FadeIn.tsx` — no change (stagger pattern preserved)
- `package.json` — no change (react-icons already installed)

---

## Risks and Unknowns

1. **Real testimonial content availability:** The data file needs real client names, titles, companies, quotes, and LinkedIn recommendation URLs. If these don't exist yet, placeholder real-looking data cannot satisfy TEST-04's requirement for "actual client names." The plan should note that content must be provided by the developer before execution can complete TEST-04.

2. **Headshot image files:** The `/public/images/testimonials/{slug}.jpg` files must actually exist at build time for `next/image` to serve them. Missing files won't cause a TypeScript or build error (the path is just a string) but will result in broken images at runtime. The plan should include a step to create/place image files.

3. **`flex-1` addition to name wrapper:** The existing `min-w-0` div becomes `min-w-0 flex-1`. This is a layout change that could affect cards without a LinkedIn badge (adds flex growth even when badge is absent). Visual impact is minimal since the attribution row is `flex items-center` and the name block already effectively fills available space, but it should be noted.

4. **`photo` as required field:** Making `photo: string` required (not optional) means any future data entry without a photo causes a TypeScript error at development time. This is intentional but the plan should confirm the fallback render guard (`t.photo ? <Image/> : <initials/>`) matches the interface reality — TypeScript will not require the guard if `photo` is required, but keeping it adds defensive runtime safety.

5. **TEST-07/TEST-08 not in scope:** The requirements traceability table in REQUIREMENTS.md maps TEST-07 and TEST-08 to Phase 5, but STATE.md and CONTEXT.md explicitly defer the carousel to Phase 6. The plan should not touch the grid layout. No risk — just confirming the boundary.

6. **No `avatarUrl` backward compatibility:** Dropping `avatarUrl` is a breaking change to the interface. Since there are only 3 entries and no external consumers of this type, this is safe. The plan just needs to update all 3 (actually replace all) entries simultaneously.

---

## RESEARCH COMPLETE
