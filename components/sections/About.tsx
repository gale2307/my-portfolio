import { FadeIn } from '@/components/ui/FadeIn';
import { aboutData } from '@/lib/data/about';

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs text-[#a3a3a3] tracking-widest uppercase mb-6">
            {"// about"}
          </p>
          <FadeIn>
            <p className="text-base font-light text-[#f5f5f5] leading-relaxed">
              {aboutData.bio}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
