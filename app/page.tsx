import { NavBar } from '@/components/ui/NavBar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';

export default function Home() {
  return (
    <>
      <NavBar />
      <main id="top">
        <Hero />
        <About />
        <div id="skills" />
        <div id="work" />
        <div id="contact" />
      </main>
    </>
  );
}
