'use client';

import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';

export function SpotlightCursor() {
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);
  const radius = useMotionValue(600);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 });
  const springRadius = useSpring(radius, { stiffness: 60, damping: 25, mass: 0.8 });

  const background = useMotionTemplate`radial-gradient(${springRadius}px circle at ${springX}px ${springY}px, rgba(0, 217, 184, 0.07), transparent 70%)`;

  useEffect(() => {
    if (prefersReducedMotion) return;

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = now - lastTime;

      if (dt > 0 && lastTime > 0) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const speed = Math.sqrt(dx * dx + dy * dy) / dt; // px/ms
        radius.set(600 + Math.min(speed * 150, 300));
      }

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion, mouseX, mouseY, radius]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1]"
      style={{ background }}
    />
  );
}
