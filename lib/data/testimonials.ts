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
    id: 'hamdi-muzakkiy',
    quote:
      'Nicholas contributed to media moderation initiatives in our Risk Management team at Tokopedia, helping strengthen our ability to detect and filter inappropriate content - keeping the platform safe and maintaining user trust. He\'s reliable, open to feedback, and genuinely motivated to grow. I believe he\'ll bring positive impact to any engineering team he joins.',
    name: 'Hamdi Muzakkiy',
    title: 'SE Team Lead',
    company: 'Tokopedia',
    photo: '/images/testimonials/hamdi-muzakkiy.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/hamdiahmadi',
    source: 'linkedin',
  },
  {
    id: 'teguh-utama',
    quote:
      'Nicholas delivered beyond our expectations on a server migration project, moving us to a newer cloud VPS with minimal disruption. What stood out was how clearly he communicated at every stage - the planning and design process was straightforward to follow throughout. We\'re already planning to work with him again.',
    name: 'Teguh Utama',
    title: 'Co-Founder',
    company: 'Autoparts',
    photo: '/images/testimonials/teguh-utama.jpg',
    source: 'direct',
  },
  {
    id: 'teguh-wibowo',
    quote:
      'When our last engineer left, we found that we had no source code for our internal mobile app. Nicholas stepped in, rebuilt the entire app from scratch, and delivered it with new features our team had been wanting for years. Looking to get him again for our next project',
    name: 'Teguh Wibowo',
    title: 'CEO',
    company: 'Autoservice',
    photo: '/images/testimonials/teguh-wibowo.jpeg',
    source: 'direct',
  },
];
