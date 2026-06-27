"use client";

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const navLinks = [
  { href: '#about', label: 'about', sectionId: 'about' },
  { href: '#testimonials', label: 'testimonials', sectionId: 'testimonials' },
  { href: '#services', label: 'services', sectionId: 'services' },
  { href: '#contact', label: 'contact', sectionId: 'contact' },
];

export function NavBar() {
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Active section tracking + close menu on scroll
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.sectionId);

    const handleScroll = () => {
      if (menuOpen) setMenuOpen(false);

      let active = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          active = id;
        }
      }
      setActiveSection(active);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  // Close on Escape, return focus to hamburger button
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const linkClass = (sectionId: string) =>
    [
      'font-mono text-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00d9b8] rounded-sm',
      activeSection === sectionId
        ? 'text-[#00d9b8]'
        : 'text-[#555555] hover:text-[#00d9b8]',
    ].join(' ');

  const barTransition = { duration: prefersReducedMotion ? 0 : 0.2 };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#0d0d0d]/85 backdrop-blur-md border-b border-white/[0.05]">
        <nav className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <a
            href="#top"
            onClick={closeMenu}
            className="font-mono text-sm font-medium text-[#e8e8e8] hover:text-[#00d9b8] transition-colors duration-200"
          >
            nw
          </a>

          {/* Desktop links */}
          <ul className="hidden sm:flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map(({ href, label, sectionId }) => (
              <li key={href}>
                <a href={href} className={linkClass(sectionId)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger — mobile only */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            className="sm:hidden flex flex-col justify-center items-center w-10 h-10 -mr-2 gap-[5px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00d9b8] rounded-sm"
          >
            <motion.span
              className="block w-5 h-px bg-[#888888]"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={barTransition}
            />
            <motion.span
              className="block w-5 h-px bg-[#888888]"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={barTransition}
            />
            <motion.span
              className="block w-5 h-px bg-[#888888]"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={barTransition}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed top-14 left-0 right-0 z-40 sm:hidden bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/[0.05]"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -6 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.2, ease: 'easeOut' }}
          >
            <nav aria-label="Mobile navigation" className="max-w-5xl mx-auto px-6 py-2 flex flex-col">
              {navLinks.map(({ href, label, sectionId }) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className={[
                    'font-mono text-sm py-3.5 border-b border-white/[0.04] last:border-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00d9b8] rounded-sm',
                    activeSection === sectionId
                      ? 'text-[#00d9b8]'
                      : 'text-[#555555] hover:text-[#00d9b8]',
                  ].join(' ')}
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
