'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { heroData } from '@/lib/data/hero';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const anim = (delay: number, duration = 0.5) => ({
    initial: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay: delay / 1000, ease: 'easeOut' as const },
  });

  return (
    <section id="hero" className="min-h-[90vh] pt-14 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-3xl">
          <motion.p
            {...anim(0, 0.4)}
            className="font-mono text-xs text-[#555555] mb-10"
          >
            $ whoami
          </motion.p>

          <motion.h1
            {...anim(100)}
            className="font-bold text-[#e8e8e8] mb-4"
            style={{ fontSize: 'clamp(56px, 9vw, 104px)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
          >
            Nicholas
            <br />
            William
            <span className="text-[#00d9b8] cursor-blink" aria-hidden="true">_</span>
          </motion.h1>

          <motion.p
            {...anim(220, 0.4)}
            className="font-mono text-sm text-[#555555] tracking-wide mb-6"
          >
            freelance software engineer
          </motion.p>

          <motion.p
            {...anim(380)}
            className="text-base font-light text-[#888888] max-w-lg mb-10 leading-relaxed"
          >
            {heroData.tagline}
          </motion.p>

          <motion.div {...anim(520, 0.4)} className="flex items-center gap-6">
            <Button href="#contact">Get in touch</Button>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d9b8] animate-pulse" />
              <span className="font-mono text-xs text-[#555555]">available</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
