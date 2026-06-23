import type { IconType } from 'react-icons';
import { LuGlobe, LuSmartphone, LuServer, LuCloud, LuBot } from 'react-icons/lu';

export interface ServiceItem {
  icon: IconType;
  name: string;
  description: string;
  stack: string[];
}

export const services: ServiceItem[] = [
  {
    icon: LuGlobe,
    name: 'Web Development',
    description: 'Web apps from system design to production deploy.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    icon: LuSmartphone,
    name: 'Mobile Apps',
    description: 'Cross-platform iOS and Android apps.',
    stack: ['React Native', 'Expo'],
  },
  {
    icon: LuServer,
    name: 'Backend Microservices',
    description: 'Production-grade APIs, event-driven services, and data pipelines.',
    stack: ['Go', 'Java', 'Node.js', 'PostgreSQL', 'Redis', 'Elasticsearch'],
  },
  {
    icon: LuCloud,
    name: 'Cloud Infrastructure',
    description: 'Container-based deployments, CI/CD pipelines, and cloud-native architecture.',
    stack: ['Docker', 'AWS', 'GCP', 'Kubernetes'],
  },
  {
    icon: LuBot,
    name: 'Agentic Applications',
    description: 'LLM-powered workflows, autonomous agents, and AI integrations.',
    stack: ['Python', 'Vercel', 'LangChain', 'Claude API', 'OpenAI'],
  },
];
