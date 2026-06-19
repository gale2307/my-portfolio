'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { skills } from '@/lib/data/skills';

export function Skills() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      scale: prefersReducedMotion ? 1 : 0.95,
      y: prefersReducedMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' as const },
    },
  };

  return (
    <section id="skills" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-xs text-[#555555] tracking-widest uppercase mb-10">
          {"// stack"}
        </p>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-64px' }}
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                variants={cardVariants}
                className="group flex flex-col items-center gap-2.5 p-4 border border-white/[0.06] hover:border-[#00d9b8]/30 rounded-sm transition-colors duration-200 cursor-default"
              >
                <Icon
                  size={28}
                  className="text-[#555555] group-hover:text-[#00d9b8] transition-colors duration-200"
                />
                <span className="text-xs font-mono text-[#555555] group-hover:text-[#888888] transition-colors duration-200">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
