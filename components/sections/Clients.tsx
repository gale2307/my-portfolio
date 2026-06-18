import { FadeIn } from '@/components/ui/FadeIn';
import { clients } from '@/lib/data/clients';

export function Clients() {
  return (
    <section id="work" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-xs text-[#a3a3a3] tracking-widest uppercase mb-8">
          {"// clients"}
        </p>
        <FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {clients.map((client) => {
              if (client.logo) {
                return (
                  <div key={client.name} className="h-16 flex items-center justify-center">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-8 w-auto"
                      style={{ filter: 'grayscale(1) opacity(0.6)' }}
                    />
                  </div>
                );
              }
              return (
                <div
                  key={client.name}
                  className="border border-white/10 rounded-sm h-16 flex items-center justify-center font-mono text-xs text-[#a3a3a3] tracking-widest uppercase px-4"
                >
                  {client.name}
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
