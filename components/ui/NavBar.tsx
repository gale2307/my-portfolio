"use client";

import { useEffect, useState } from 'react';

const navLinks = [
  { href: '#about', label: 'about', sectionId: 'about' },
  { href: '#skills', label: 'stack', sectionId: 'skills' },
  { href: '#work', label: 'work', sectionId: 'work' },
  { href: '#contact', label: 'contact', sectionId: 'contact' },
];

export function NavBar() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.sectionId);

    const handleScroll = () => {
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
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#0d0d0d]/85 backdrop-blur-md border-b border-white/[0.05]">
      <nav className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
        <a
          href="#top"
          className="font-mono text-sm font-medium text-[#e8e8e8] hover:text-[#00d9b8] transition-colors duration-200"
        >
          nw
        </a>
        <ul className="flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map(({ href, label, sectionId }) => (
            <li key={href}>
              <a
                href={href}
                className={[
                  'font-mono text-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00d9b8] rounded-sm',
                  activeSection === sectionId
                    ? 'text-[#00d9b8]'
                    : 'text-[#555555] hover:text-[#00d9b8]',
                ].join(' ')}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
