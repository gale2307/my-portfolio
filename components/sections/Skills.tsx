'use client';

import { FadeIn } from '@/components/ui/FadeIn';
import { skills } from '@/lib/data/skills';

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-xs text-[#555555] tracking-widest uppercase mb-10">
          {"// stack"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <FadeIn key={skill.name} delay={index * 0.07}>
                <div className="group flex flex-col items-center gap-2.5 p-4 border border-white/[0.06] hover:border-[#00d9b8]/30 rounded-sm transition-colors duration-200 cursor-default">
                  <Icon
                    size={28}
                    className="text-[#555555] group-hover:text-[#00d9b8] transition-colors duration-200"
                  />
                  <span className="text-xs font-mono text-[#555555] group-hover:text-[#888888] transition-colors duration-200">
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
