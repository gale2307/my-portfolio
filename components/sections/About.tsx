import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';
import { aboutData } from '@/lib/data/about';
import { employers } from '@/lib/data/clients';

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-2xl">
          <h2 className="font-mono text-xs text-[#555555] tracking-widest uppercase mb-8">
            {"// about"}
          </h2>
          <FadeIn>
            <p className="text-base font-light text-[#c0c0c0] leading-relaxed border-l-2 border-[#00d9b8]/40 pl-5">
              {aboutData.bio}
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div className="flex flex-wrap gap-6 mt-12">
            {employers.map((employer, index) => (
              <div key={employer.name} className="flex items-center gap-6">
                <div className="group flex flex-col items-start gap-1 cursor-default transition-transform duration-200 hover:scale-105">
                  {employer.logo ? (
                    <Image
                      src={employer.logo}
                      alt={employer.name}
                      width={100}
                      height={28}
                      className="h-7 w-auto transition-all duration-200"
                      style={{
                        filter: employer.current
                          ? 'opacity(0.9)'
                          : `${employer.invert ? 'invert(1) ' : ''}grayscale(1) opacity(0.4)`,
                      }}
                    />
                  ) : (
                    <span
                      className={`font-mono text-sm font-medium tracking-wide transition-colors duration-200 ${
                        employer.current
                          ? 'text-[#888888] group-hover:text-[#b0b0b0]'
                          : 'text-[#555555] group-hover:text-[#888888]'
                      }`}
                    >
                      {employer.name}
                    </span>
                  )}
                  <span className="font-mono text-[10px] text-[#444444] tracking-widest uppercase transition-colors duration-200 group-hover:text-[#777777]">
                    {employer.role}
                  </span>
                </div>
                {index < employers.length - 1 && (
                  <span className="text-[#333333] font-mono text-xs select-none">→</span>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
