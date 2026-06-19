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
        "inline-block border border-[#00d9b8] text-[#00d9b8] px-6 py-3 rounded-sm tracking-wide text-sm font-mono transition-colors duration-200 hover:bg-[#00d9b8]/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00d9b8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </a>
  );
}
