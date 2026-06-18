'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { heroData } from '@/lib/data/hero';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const anim = (delay: number, duration = 0.5) => ({
    initial: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 16,
    },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay: delay / 1000, ease: 'easeOut' as const },
  });

  return (
    <section id="hero" className="h-[75vh] flex flex-col justify-center">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-2xl">
          <motion.p
            {...anim(0, 0.4)}
            className="font-mono text-xs text-[#a3a3a3] tracking-widest uppercase mb-6"
          >
            {"// freelance"}
          </motion.p>

          <motion.h1
            {...anim(100)}
            className="font-bold text-[#f5f5f5] mb-2"
            style={{ fontSize: 'clamp(48px, 6vw + 8px, 72px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            {heroData.name}
          </motion.h1>

          <motion.p
            {...anim(200)}
            className="text-lg font-light text-[#a3a3a3] tracking-wide mb-4"
          >
            Freelance Software Engineer
          </motion.p>

          <motion.p
            {...anim(300)}
            className="text-base font-light text-[#f5f5f5] mb-8"
          >
            {heroData.tagline}
          </motion.p>

          <motion.div {...anim(450, 0.4)}>
            <Button href="#contact">Get in touch</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
