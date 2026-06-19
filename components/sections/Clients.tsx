import { FadeIn } from '@/components/ui/FadeIn';
import { employers, clients } from '@/lib/data/clients';

export function Clients() {
  return (
    <section id="work" className="py-24">
      <div className="max-w-5xl mx-auto px-6">

        <p className="font-mono text-xs text-[#555555] tracking-widest uppercase mb-6">
          {"// previously at"}
        </p>
        <FadeIn>
          <div className="flex flex-wrap gap-3 mb-16">
            {employers.map((employer) =>
              employer.logo ? (
                <div key={employer.name} className="h-12 px-6 flex items-center justify-center border border-white/[0.08] rounded-sm">
                  <img
                    src={employer.logo}
                    alt={employer.name}
                    className="h-5 w-auto"
                    style={{ filter: 'grayscale(1) opacity(0.5)' }}
                  />
                </div>
              ) : (
                <div
                  key={employer.name}
                  className="h-12 px-6 flex items-center justify-center border border-white/[0.08] rounded-sm font-mono text-sm font-medium text-[#888888] tracking-wide"
                >
                  {employer.name}
                </div>
              )
            )}
          </div>
        </FadeIn>

        <p className="font-mono text-xs text-[#555555] tracking-widest uppercase mb-6">
          {"// clients"}
        </p>
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {clients.map((client) =>
              client.logo ? (
                <div key={client.name} className="h-14 flex items-center justify-center border border-white/[0.06] rounded-sm">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-6 w-auto"
                    style={{ filter: 'grayscale(1) opacity(0.45)' }}
                  />
                </div>
              ) : (
                <div
                  key={client.name}
                  className="border border-white/[0.06] rounded-sm h-14 flex items-center justify-center font-mono text-xs text-[#555555] tracking-widest uppercase px-4"
                >
                  {client.name}
                </div>
              )
            )}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
