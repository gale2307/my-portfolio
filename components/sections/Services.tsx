import { FadeIn } from '@/components/ui/FadeIn';
import { services } from '@/lib/data/services';

export function Services() {
  return (
    <section id="services" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-mono text-xs text-[#555555] tracking-widest uppercase mb-10">
          {'// services'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.name} delay={i * 0.07}>
                <div className="group h-full flex flex-col gap-4 p-6 bg-black/70 backdrop-blur-sm border border-white/[0.08] hover:border-[#00d9b8]/30 rounded-sm transition-colors duration-200">
                  <Icon
                    size={20}
                    className="text-[#00d9b8] opacity-70 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
                  />

                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="font-mono text-sm font-medium text-[#e8e8e8]">
                      {service.name}
                    </h3>
                    <p className="text-xs font-light text-[#666666] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-white/[0.05]">
                    {service.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] text-[#555555] tracking-wide border border-white/[0.08] px-2 py-0.5 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
