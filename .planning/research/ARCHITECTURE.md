# Architecture Research — Next.js Portfolio

## Recommended Folder Structure

```
my-portfolio/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, global styles
│   ├── page.tsx            # Home page — composes all sections
│   ├── globals.css         # Tailwind directives, CSS custom properties (colors, fonts)
│   └── api/
│       └── contact/
│           └── route.ts    # POST handler: receives form data, calls Resend
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Clients.tsx
│   │   ├── Testimonials.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── FadeIn.tsx      # Reusable Framer Motion wrapper (client component)
│   │   └── NavBar.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── data/
│   │   ├── skills.ts       # Tech stack data (name, icon key, category)
│   │   ├── testimonials.ts # Testimonial objects (quote, name, title, company)
│   │   └── clients.ts      # Client logo data (name, logo path/key)
│   └── utils.ts            # cn() helper, misc utilities
├── public/
│   ├── images/
│   │   └── clients/        # Client logo SVGs/PNGs
│   └── og-image.png        # Open Graph image
├── next.config.ts
├── tailwind.config.ts      # Minimal — mostly handled by CSS vars in globals.css
└── tsconfig.json
```

## Component Breakdown

| Component | Type | Responsibility |
|-----------|------|----------------|
| `app/layout.tsx` | Server | Global metadata, font loading, body wrapper |
| `app/page.tsx` | Server | Page composition — imports and orders all sections |
| `Header` | Client (sticky scroll detection) | Navigation, smooth scroll links |
| `Hero` | Server + FadeIn wrapper | Name, tagline, CTA button |
| `About` | Server + FadeIn wrapper | Short bio prose |
| `Skills` | Server + FadeIn wrapper | Icon grid by category |
| `Clients` | Server + FadeIn wrapper | Logo grid/marquee |
| `Testimonials` | Server + FadeIn wrapper | Testimonial cards |
| `Contact` | Client | Form with state, submission handler |
| `FadeIn` | Client (`'use client'`) | Reusable motion wrapper using Framer Motion's `whileInView` |
| `Button` | Client or Server | Styled button with variants |

**Key principle:** Keep Server Components as leaf nodes where possible. Use the `FadeIn` client wrapper to animate any section without making the entire section a client component.

## Content / Data Architecture

Static content lives in `lib/data/` as typed TypeScript objects — no CMS, no API calls at runtime.

```typescript
// lib/data/skills.ts
export type Skill = {
  name: string;
  icon: string;       // Simple Icons slug (e.g., 'typescript', 'nextdotjs')
  category: 'Frontend' | 'Backend' | 'Tools' | 'Cloud';
};

export const skills: Skill[] = [ ... ];

// lib/data/testimonials.ts
export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;    // optional path to image
};

// lib/data/clients.ts
export type Client = {
  name: string;
  logo: string;       // path in public/images/clients/
};
```

Benefits: TypeScript catches typos, data is colocated with type definitions, easy to update.

## Performance Strategy

**Images:**
- Use `next/image` for all images (avatar, client logos, OG image)
- Client logos: prefer SVG in `public/images/clients/` — vector, no size concerns
- If raster: set explicit `width` and `height` to prevent CLS

**Fonts:**
- Load via `next/font/google` in `app/layout.tsx` — zero FOUT, self-hosted by Next.js
- Define as CSS variables and apply via Tailwind

```typescript
// app/layout.tsx
import { Inter, Geist_Mono } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });
```

**LCP target:** Hero section — large display text renders immediately (no image LCP)

**JS bundle:** Only sections with interactivity (Contact form, FadeIn wrappers) are Client Components — most of the page is static HTML from the server.

## SEO Setup

```typescript
// app/layout.tsx — base metadata
export const metadata: Metadata = {
  title: 'Nicholas William — Freelance Software Engineer',
  description: 'Freelance software engineer building fast, scalable web products.',
  openGraph: {
    title: 'Nicholas William — Freelance Software Engineer',
    description: '...',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};
```

**Structured data (Person schema):**

```typescript
// app/layout.tsx — inside <head> via Script or inline JSON-LD
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nicholas William",
  "jobTitle": "Freelance Software Engineer",
  "url": "https://[domain]",
  "sameAs": ["https://github.com/...", "https://linkedin.com/in/..."]
}
```

## Animation Architecture

**Constraint:** Framer Motion requires Client Components. Server Components cannot use `motion.*`.

**Pattern — FadeIn wrapper:**

```typescript
// components/ui/FadeIn.tsx
'use client';
import { motion } from 'framer-motion';

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}  // critical — don't re-animate on scroll back up
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
```

**Stagger pattern** for Skills grid:

```typescript
// Use motion.ul + staggerChildren on the container
// Each skill card is motion.li with no explicit animation — inherits stagger from parent
```

**Rule:** `viewport: { once: true }` on ALL whileInView animations — animations play on first scroll past the element only.

## Build Order

1. **Foundation** — `app/layout.tsx`, `globals.css`, font setup, color variables, Tailwind config
2. **Static shell** — `app/page.tsx` with section placeholders, Header, Footer, NavBar
3. **Hero** — highest-value section, sets the tone for everything else
4. **About + Skills** — content sections, no interactivity; validates component patterns
5. **Clients + Testimonials** — data-driven sections; finalize data types
6. **Contact** — API route + form state; most complex (client component, server action)
7. **Animation pass** — add FadeIn wrappers across all sections once content is stable
8. **Polish** — SEO metadata, OG image, accessibility audit, mobile review
9. **Deploy** — Vercel setup, custom domain, environment variables (Resend API key)
