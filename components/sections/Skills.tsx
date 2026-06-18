'use client';

import { FadeIn } from '@/components/ui/FadeIn';
import { skills } from '@/lib/data/skills';

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-xs text-[#a3a3a3] tracking-widest uppercase mb-8">
          {"// skills"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <FadeIn key={skill.name} delay={index * 0.08}>
                <div className="flex flex-col items-center gap-2">
                  <Icon size={32} color="#a3a3a3" />
                  <span className="text-xs font-mono text-[#a3a3a3]">
                    {skill.name}
                  </span>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
