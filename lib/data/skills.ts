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
} from 'react-icons/si';

export interface SkillItem {
  name: string;
  icon: IconType;
}

export const skills: SkillItem[] = [
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Docker', icon: SiDocker },
  { name: 'Git', icon: SiGit },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
];
