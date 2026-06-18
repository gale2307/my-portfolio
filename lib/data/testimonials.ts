export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  avatarUrl?: string;
}

export const testimonials: TestimonialItem[] = [
  {
    id: 'alex-chen',
    quote:
      'Nicholas shipped our new API gateway in three weeks flat. Clean code, clear communication — exactly what we needed.',
    name: 'Alex Chen',
    title: 'CTO',
    company: 'Buildco',
  },
  {
    id: 'sarah-m',
    quote:
      'Brought real senior judgment to our team. Caught architecture issues early and kept us from a costly rewrite.',
    name: 'Sarah M.',
    title: 'Product Lead',
    company: 'Nexgen',
  },
  {
    id: 'james-o',
    quote:
      "Reliable, fast, and genuinely invested in the outcome. One of the best freelance engineers we've worked with.",
    name: 'James O.',
    title: 'Founder',
    company: 'Scalr',
  },
];
