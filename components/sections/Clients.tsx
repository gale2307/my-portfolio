import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';
import { employers, clients } from '@/lib/data/clients';

export function Clients() {
  return (
    <section id="work" className="py-24">
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="font-mono text-xs text-[#555555] tracking-widest uppercase mb-6">
          {"// previously at"}
        </h2>
        <FadeIn>
          <div className="flex flex-wrap gap-3 mb-16">
            {employers.map((employer) => (
              <div
                key={employer.name}
                className="h-16 px-6 flex flex-col items-start justify-center border border-white/[0.08] rounded-sm gap-0.5"
              >
                {employer.logo ? (
                  <Image
                    src={employer.logo}
                    alt={employer.name}
                    width={120}
                    height={20}
                    className="h-5 w-auto"
                    style={{ filter: 'grayscale(1) opacity(0.5)' }}
                  />
                ) : (
                  <span className="font-mono text-sm font-medium text-[#888888] tracking-wide">
                    {employer.name}
                  </span>
                )}
                <span className="font-mono text-xs text-[#555555]">
                  {employer.role}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        <h2 className="font-mono text-xs text-[#555555] tracking-widest uppercase mb-6">
          {"// clients"}
        </h2>
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {clients.map((client) =>
              client.logo ? (
                <div key={client.name} className="h-14 flex items-center justify-center border border-white/[0.06] rounded-sm">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={120}
                    height={24}
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
