import Image from 'next/image';
import { FaLinkedin } from 'react-icons/fa';
import { FadeIn } from '@/components/ui/FadeIn';
import { testimonials } from '@/lib/data/testimonials';

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-xs text-[#555555] tracking-widest uppercase mb-10">
          {'// testimonials'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <FadeIn key={t.id} delay={index * 0.1}>
              <div className="bg-[#111111] border border-white/[0.07] rounded-sm p-6 flex flex-col gap-4 h-full">
                <p className="text-[#c0c0c0] text-sm leading-relaxed italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.07]">
                  {t.photo ? (
                    <Image
                      src={t.photo}
                      alt={t.name}
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <span className="font-mono text-xs text-[#555555]">
                        {getInitials(t.name)}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[#e8e8e8] text-sm truncate">{t.name}</p>
                    <p className="text-xs text-[#555555] font-mono truncate">
                      {t.title} · {t.company}
                    </p>
                  </div>
                  {t.source === 'linkedin' && t.linkedinUrl && (
                    <a
                      href={t.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View on LinkedIn"
                      className="ml-auto text-[#555555] hover:text-[#e8e8e8] transition-colors duration-150 shrink-0"
                    >
                      <FaLinkedin size={15} />
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
