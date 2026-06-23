'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { FadeIn } from '@/components/ui/FadeIn';
import { caseStudy } from '@/lib/data/caseStudy';

const narrative = [
  { label: 'Problem',  text: caseStudy.problem  },
  { label: 'Approach', text: caseStudy.approach },
  { label: 'Outcome',  text: caseStudy.outcome  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

export function CaseStudy() {
  const shots = caseStudy.screenshots;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };
  const prev = () => go(current === 0 ? shots.length - 1 : current - 1);
  const next = () => go(current === shots.length - 1 ? 0 : current + 1);

  const shot = shots[current];

  return (
    <section id="work" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-mono text-xs text-[#555555] tracking-widest uppercase mb-10">
          {'// case study'}
        </h2>

        <FadeIn>
          {/* Header */}
          <div className="mb-10">
            <p className="font-mono text-xs text-[#00d9b8] tracking-widest uppercase mb-2">
              {caseStudy.client}
            </p>
            <h3 className="text-xl font-light text-[#e8e8e8] leading-snug mb-4">
              {caseStudy.project}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] text-[#555555] border border-white/[0.08] px-2 py-0.5 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Two-column body */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Narrative */}
            <div className="flex flex-col gap-8">
              {narrative.map(({ label, text }) => (
                <div key={label}>
                  <span className="font-mono text-[10px] text-[#444444] tracking-widest uppercase block mb-2">
                    {label}
                  </span>
                  <p className="text-sm font-light text-[#888888] leading-relaxed border-l border-white/[0.06] pl-4">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Carousel */}
            <div className="flex flex-col gap-3">
              {/* Slide */}
              <div className="relative aspect-[9/19] rounded-sm overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                <AnimatePresence custom={direction} initial={false}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    {shot?.src ? (
                      <Image src={shot.src} alt={shot.alt} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="h-full flex items-end p-4">
                        <span className="font-mono text-[9px] text-[#333333] tracking-widest">
                          {shot?.alt}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Arrows — overlaid, only shown when multiple slides */}
                {shots.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      aria-label="Previous screenshot"
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-sm bg-black/50 text-[#888888] hover:text-[#e8e8e8] hover:bg-black/70 transition-colors duration-150 cursor-pointer"
                    >
                      <LuChevronLeft size={14} />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next screenshot"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-sm bg-black/50 text-[#888888] hover:text-[#e8e8e8] hover:bg-black/70 transition-colors duration-150 cursor-pointer"
                    >
                      <LuChevronRight size={14} />
                    </button>
                  </>
                )}
              </div>

              {/* Dot indicators */}
              {shots.length > 1 && (
                <div className="flex justify-center gap-2">
                  {shots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      aria-label={`Go to screenshot ${i + 1}`}
                      className={[
                        'w-1.5 h-1.5 rounded-full transition-colors duration-200 cursor-pointer',
                        i === current ? 'bg-[#00d9b8]' : 'bg-white/20 hover:bg-white/40',
                      ].join(' ')}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
