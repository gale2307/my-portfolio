import { NavBar } from '@/components/ui/NavBar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Clients } from '@/components/sections/Clients';
import { Testimonials } from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <>
      <NavBar />
      <main id="top">
        <Hero />
        <About />
        <Skills />
        <Clients />
        <Testimonials />
        <div id="contact" />
      </main>
    </>
  );
}
