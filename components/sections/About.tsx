import { FadeIn } from '@/components/ui/FadeIn';
import { EmployerCard } from '@/components/ui/EmployerCard';
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
              <EmployerCard
                key={employer.name}
                employer={employer}
                showDivider={index < employers.length - 1}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
