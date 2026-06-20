'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { heroData } from '@/lib/data/hero';
import { Button } from '@/components/ui/Button';

const ROLE_TEXT = 'freelance software engineer';

function useTypewriter(text: string, speed: number, startDelay: number, skip: boolean) {
  const [displayed, setDisplayed] = useState(skip ? text : '');

  useEffect(() => {
    if (skip) {
      setDisplayed(text);
      return;
    }

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const timeoutId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length && intervalId) clearInterval(intervalId);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay, skip]);

  return displayed;
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const roleText = useTypewriter(ROLE_TEXT, 45, 750, !!prefersReducedMotion);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const anim = (delay: number, duration = 0.5) => ({
    initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay: delay / 1000, ease: 'easeOut' as const },
  });

  const nameVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.025,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
  };

  return (
    <section id="hero" className="relative min-h-[90vh] pt-14 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-3xl">
          <motion.p
            {...anim(0, 0.4)}
            className="font-mono text-xs text-[#555555] mb-10"
          >
            $ whoami
          </motion.p>

          <motion.h1
            variants={nameVariants}
            initial="hidden"
            animate="visible"
            className="font-bold text-[#e8e8e8] mb-4"
            style={{ fontSize: 'clamp(56px, 9vw, 104px)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
          >
            {'Nicholas'.split('').map((char, i) => (
              <motion.span key={`n${i}`} variants={letterVariants} style={{ display: 'inline-block' }}>
                {char}
              </motion.span>
            ))}
            <br />
            {'William'.split('').map((char, i) => (
              <motion.span key={`w${i}`} variants={letterVariants} style={{ display: 'inline-block' }}>
                {char}
              </motion.span>
            ))}
            <span className="text-[#00d9b8] cursor-blink" aria-hidden="true">_</span>
          </motion.h1>

          <motion.p
            {...anim(650, 0.25)}
            className="font-mono text-sm text-[#555555] tracking-wide mb-6 h-5"
            aria-label={ROLE_TEXT}
          >
            {roleText || ' '}
          </motion.p>

          <motion.p
            {...anim(1000, 0.5)}
            className="text-base font-light text-[#888888] max-w-lg mb-10 leading-relaxed"
          >
            {heroData.tagline}
          </motion.p>

          <motion.div {...anim(1200, 0.4)} className="flex items-center gap-6">
            <Button href="#contact">Get in touch</Button>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d9b8] animate-pulse" />
              <span className="font-mono text-xs text-[#555555]">available</span>
            </div>
          </motion.div>
        </div>
      </div>

      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ delay: scrolled ? 0 : 2.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          >
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <path d="M1 1l7 7 7-7" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
