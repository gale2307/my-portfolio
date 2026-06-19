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
        <p className="font-mono text-xs text-[#a3a3a3] tracking-widest uppercase mb-10">
          {'// testimonials'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <FadeIn key={t.id} delay={index * 0.1}>
              <div className="bg-[#1e1e1e] border border-white/[0.08] rounded-lg p-6 flex flex-col gap-4 h-full">
                <p className="text-[#d4d4d4] text-sm leading-relaxed italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-white/10 flex items-center justify-center shrink-0">
                      <span className="font-mono text-xs text-[#a3a3a3]">
                        {getInitials(t.name)}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-[#f5f5f5] text-sm truncate">{t.name}</p>
                    <p className="text-xs text-[#a3a3a3] font-mono truncate">
                      {t.title} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
