import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';
import { clients } from '@/lib/data/clients';

export function Clients() {
  return (
    <section id="work" className="py-24">
      <div className="max-w-5xl mx-auto px-6">

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
