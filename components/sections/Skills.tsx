'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skills, CATEGORIES, type Filter } from '@/lib/data/skills';

const CYCLE_INTERVAL = 2500;

export function Skills() {
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [userInteracted, setUserInteracted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Detect when section enters/exits viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle: runs only when in view, not hovered, not user-controlled
  useEffect(() => {
    if (prefersReducedMotion || userInteracted || hovered || !inView) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveFilter((current) => {
        const idx = CATEGORIES.indexOf(current);
        return CATEGORIES[(idx + 1) % CATEGORIES.length];
      });
    }, CYCLE_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [prefersReducedMotion, userInteracted, hovered, inView]);

  const handleTabClick = (filter: Filter) => {
    setActiveFilter(filter);
    setUserInteracted(true);
  };

  const filtered = activeFilter === 'all'
    ? skills
    : skills.filter((s) => s.category === activeFilter);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.04 },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      scale: prefersReducedMotion ? 1 : 0.95,
      y: prefersReducedMotion ? 0 : 8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-mono text-xs text-[#555555] tracking-widest uppercase mb-8">
          {'// stack'}
        </h2>

        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="flex items-center gap-6 mb-10 overflow-x-auto pb-1"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeFilter === cat}
              onClick={() => handleTabClick(cat)}
              className={[
                'relative shrink-0 font-mono text-xs pb-2 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00d9b8] rounded-sm',
                activeFilter === cat
                  ? 'text-[#e8e8e8]'
                  : 'text-[#555555] hover:text-[#888888]',
              ].join(' ')}
            >
              {cat}
              {activeFilter === cat && (
                <motion.span
                  layoutId="filter-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#00d9b8]"
                  transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: 'easeInOut' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Skills grid — key change re-triggers stagger on filter switch */}
        <motion.div
          key={activeFilter}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filtered.map((skill) => {
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
                <span className="text-xs font-mono text-[#555555] group-hover:text-[#888888] transition-colors duration-200 text-center leading-tight">
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
