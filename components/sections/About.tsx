import { FadeIn } from '@/components/ui/FadeIn';
import { aboutData } from '@/lib/data/about';

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-2xl">
          <h2 className="font-mono text-xs text-[#555555] tracking-widest uppercase mb-8">
            {"// about"}
          </h2>
          <FadeIn>
            <p className="text-base font-light text-[#c0c0c0] leading-relaxed border-l-2 border-[#00d9b8]/20 pl-5">
              {aboutData.bio}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
