"use client";

export function NavBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
        <a
          href="#top"
          className="text-sm font-medium text-[#f5f5f5] hover:text-[#c8964a] transition-colors duration-200"
        >
          NW
        </a>
        <ul className="flex items-center gap-8 list-none m-0 p-0">
          <li>
            <a
              href="#about"
              className="text-sm font-medium text-[#a3a3a3] hover:text-[#c8964a] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8964a] rounded-sm"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="text-sm font-medium text-[#a3a3a3] hover:text-[#c8964a] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8964a] rounded-sm"
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#work"
              className="text-sm font-medium text-[#a3a3a3] hover:text-[#c8964a] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8964a] rounded-sm"
            >
              Work
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-sm font-medium text-[#a3a3a3] hover:text-[#c8964a] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8964a] rounded-sm"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
