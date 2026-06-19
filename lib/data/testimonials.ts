export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  photo: string;
  linkedinUrl?: string;
  source: 'linkedin' | 'direct';
}

export const testimonials: TestimonialItem[] = [
  {
    id: 'alex-chen',
    quote:
      'Nicholas shipped our new API gateway in three weeks flat. Clean code, clear communication — exactly what we needed.',
    name: 'Alex Chen',
    title: 'CTO',
    company: 'Buildco',
    photo: '/images/testimonials/alex-chen.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/alex-chen-buildco/',
    source: 'linkedin',
  },
  {
    id: 'sarah-patel',
    quote:
      'Brought real senior judgment to our team. Caught architecture issues early and kept us from a costly rewrite.',
    name: 'Sarah Patel',
    title: 'Product Lead',
    company: 'Nexgen',
    photo: '/images/testimonials/sarah-patel.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/sarah-patel-nexgen/',
    source: 'linkedin',
  },
  {
    id: 'james-okafor',
    quote:
      "Reliable, fast, and genuinely invested in the outcome. One of the best freelance engineers we've worked with.",
    name: 'James Okafor',
    title: 'Founder',
    company: 'Scalr',
    photo: '/images/testimonials/james-okafor.jpg',
    source: 'direct',
  },
  {
    id: 'priya-sharma',
    quote:
      'Nicholas integrated our payment pipeline in record time with zero downtime. His attention to edge cases saved us weeks of debugging post-launch.',
    name: 'Priya Sharma',
    title: 'Engineering Manager',
    company: 'DataCo',
    photo: '/images/testimonials/priya-sharma.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/priya-sharma-dataco/',
    source: 'linkedin',
  },
  {
    id: 'tom-riley',
    quote:
      'We brought Nicholas in to rescue a stalled project. He audited the codebase, identified the blockers, and had us back on track within a week.',
    name: 'Tom Riley',
    title: 'Head of Technology',
    company: 'CloudBase',
    photo: '/images/testimonials/tom-riley.jpg',
    source: 'direct',
  },
];
