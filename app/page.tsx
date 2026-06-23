import { NavBar } from '@/components/ui/NavBar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Clients } from '@/components/sections/Clients';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/ui/Footer';

export default function Home() {
  return (
    <>
      <NavBar />
      <main id="top">
        <Hero />
        <About />
        <Testimonials />
        <Services />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
