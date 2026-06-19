"use client";

const navLinks = [
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'stack' },
  { href: '#work', label: 'work' },
  { href: '#contact', label: 'contact' },
];

export function NavBar() {
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
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="font-mono text-xs text-[#555555] hover:text-[#00d9b8] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00d9b8] rounded-sm"
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
