import React from "react";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({ href, children, className }: ButtonProps) {
  return (
    <a
      href={href}
      className={[
        "inline-block border border-[#c8964a] text-[#c8964a] px-6 py-3 rounded-sm tracking-wide text-[15px] font-medium transition-colors duration-200 hover:bg-[#c8964a]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8964a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </a>
  );
}
