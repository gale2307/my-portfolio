'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { EmployerItem } from '@/lib/data/clients';

export function EmployerCard({ employer, showDivider }: { employer: EmployerItem; showDivider: boolean }) {
  const [hovered, setHovered] = useState(false);

  const imageFilter = employer.current
    ? hovered ? 'opacity(1) brightness(1.2)' : 'opacity(0.9)'
    : employer.invert
      ? hovered ? 'invert(1) opacity(0.85)' : 'invert(1) grayscale(1) opacity(0.4)'
      : hovered ? 'opacity(0.85)' : 'grayscale(1) opacity(0.4)';

  return (
    <div className="flex items-center gap-6">
      <div
        className="flex flex-col items-start gap-1 cursor-default transition-transform duration-200 hover:scale-105"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {employer.logo ? (
          <Image
            src={employer.logo}
            alt={employer.name}
            width={100}
            height={28}
            className="h-7 w-auto transition-all duration-200"
            style={{ filter: imageFilter }}
          />
        ) : (
          <span
            className={`font-mono text-sm font-medium tracking-wide transition-colors duration-200 ${
              employer.current
                ? hovered ? 'text-[#b0b0b0]' : 'text-[#888888]'
                : hovered ? 'text-[#888888]' : 'text-[#555555]'
            }`}
          >
            {employer.name}
          </span>
        )}
        <span
          className={`font-mono text-[10px] tracking-widest uppercase transition-colors duration-200 ${
            hovered ? 'text-[#777777]' : 'text-[#444444]'
          }`}
        >
          {employer.role}
        </span>
      </div>
      {showDivider && (
        <span className="text-[#333333] font-mono text-xs select-none">→</span>
      )}
    </div>
  );
}
