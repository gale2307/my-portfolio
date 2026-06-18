# Requirements: Personal Portfolio

**Defined:** 2026-06-18
**Core Value:** A prospective client lands on the site and knows within seconds whether to reach out — the portfolio closes deals, not just impressions.

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Project scaffolded with Next.js 15 (App Router), TypeScript, and Tailwind CSS v4
- [x] **FOUND-02**: Dark theme configured via CSS custom properties in `globals.css` (no JS class toggle — prevents dark mode flash)
- [x] **FOUND-03**: Typography setup with `next/font/google` — fonts self-hosted, zero FOUT
- [ ] **FOUND-04**: Site deployed on Vercel and accessible on a custom domain

### Hero

- [x] **HERO-01**: Visitor sees name, one-line tagline, and a single CTA button linking to the contact section within 3 seconds of page load
- [ ] **HERO-02**: Hero content (name, tagline, CTA) animates in with a fade + upward drift on initial page load

### About

- [ ] **ABOUT-01**: About section displays short prose bio (2–4 sentences) describing who you are and what kind of work you do

### Skills

- [ ] **SKILL-01**: Skills section displays a grid of technology icons (Simple Icons) with name labels
- [ ] **SKILL-02**: Skills grid items animate in with a stagger fade as the section enters the viewport

### Clients

- [ ] **CLIENT-01**: Client logos section displays a grid of client logos rendered in grayscale to match the dark theme

### Testimonials

- [ ] **TEST-01**: Testimonials section displays cards, each with a quote, and full attribution (name, title, company)
- [ ] **TEST-02**: Each testimonial card shows a circular avatar or initials placeholder

### Contact

- [ ] **CONT-01**: Contact section includes a form (name, email, message) that sends submissions to the owner's inbox via Resend
- [ ] **CONT-02**: Contact section includes icon links to GitHub and LinkedIn with accessible aria-labels

### Animation

- [ ] **ANIM-01**: Each page section fades in with a subtle upward drift when it enters the viewport (once — does not re-trigger on scroll back)
- [ ] **ANIM-02**: All animations are skipped when the user has `prefers-reduced-motion` enabled

### SEO

- [ ] **SEO-01**: Page has Open Graph metadata (title, description, image) for social sharing previews

## v2 Requirements

### Hero Enhancements

- **HERO-V2-01**: Availability status indicator in the hero ("Currently available" / "Booked until X")

### Client Logos Enhancements

- **CLIENT-V2-01**: Client logos animate from grayscale to color on hover
- **CLIENT-V2-02**: Hover tooltip shows company name

### Contact Enhancements

- **CONT-V2-01**: One-click copy-to-clipboard button for email address
- **CONT-V2-02**: Response time copy beneath the CTA ("I'll get back to you within 24 hours")

### SEO Enhancements

- **SEO-V2-01**: Custom OG image (1200×630) designed for social sharing
- **SEO-V2-02**: Structured data (Person schema JSON-LD) in the page head

## Out of Scope

| Feature | Reason |
|---------|--------|
| Projects / case studies section | Client logos + testimonials make the case; case studies add scope and aren't needed for v1 |
| Blog / writing section | Not the focus; scope creep for v1 |
| Dark/light mode toggle | Dark-only is an intentional aesthetic identity choice |
| CMS / content management | Static TypeScript data files are sufficient for a personal site |
| Animated typing effect in hero | Dated, conflicts with nonchalant tone |
| Skill progress bars / star ratings | Convey nothing meaningful, look unprofessional |
| Testimonial carousel/slider | Users won't swipe; hides content |
| PDF resume download | Directs attention away from the site |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Pending |
| HERO-01 | Phase 1 | Complete |
| HERO-02 | Phase 1 | Pending |
| ABOUT-01 | Phase 2 | Pending |
| SKILL-01 | Phase 2 | Pending |
| SKILL-02 | Phase 2 | Pending |
| CLIENT-01 | Phase 2 | Pending |
| TEST-01 | Phase 3 | Pending |
| TEST-02 | Phase 3 | Pending |
| CONT-01 | Phase 3 | Pending |
| CONT-02 | Phase 3 | Pending |
| ANIM-01 | Phase 4 | Pending |
| ANIM-02 | Phase 4 | Pending |
| SEO-01 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 17 total
- Mapped to phases: 17
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-18*
*Last updated: 2026-06-18 after initial definition*
