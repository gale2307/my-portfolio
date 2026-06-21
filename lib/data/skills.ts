import type { IconType } from 'react-icons';
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiTailwindcss,
  SiGo,
  SiPython,
  SiOpenjdk,
  SiSpringboot,
  SiRedis,
  SiElasticsearch,
} from 'react-icons/si';

export type Category = 'languages' | 'frontend' | 'backend' | 'devops';

export const CATEGORIES = ['all', 'languages', 'frontend', 'backend', 'devops'] as const;
export type Filter = typeof CATEGORIES[number];

export interface SkillItem {
  name: string;
  icon: IconType;
  category: Category;
}

export const skills: SkillItem[] = [
  // Languages
  { name: 'TypeScript',    icon: SiTypescript,    category: 'languages' },
  { name: 'Python',        icon: SiPython,        category: 'languages' },
  { name: 'Golang',        icon: SiGo,            category: 'languages' },
  { name: 'Java',          icon: SiOpenjdk,       category: 'languages' },
  // Frontend
  { name: 'React',         icon: SiReact,         category: 'frontend'  },
  { name: 'Next.js',       icon: SiNextdotjs,     category: 'frontend'  },
  { name: 'Tailwind CSS',  icon: SiTailwindcss,   category: 'frontend'  },
  { name: 'React Native',  icon: SiReact,         category: 'frontend'  },
  // Backend
  { name: 'Node.js',       icon: SiNodedotjs,     category: 'backend'   },
  { name: 'Spring Boot',   icon: SiSpringboot,    category: 'backend'   },
  { name: 'PostgreSQL',    icon: SiPostgresql,    category: 'backend'   },
  { name: 'Redis',         icon: SiRedis,         category: 'backend'   },
  { name: 'Elasticsearch', icon: SiElasticsearch, category: 'backend'   },
  // DevOps
  { name: 'Docker',        icon: SiDocker,        category: 'devops'    },
  { name: 'Git',           icon: SiGit,           category: 'devops'    },
];
