import { NavBar } from '@/components/ui/NavBar';
import { Hero } from '@/components/sections/Hero';

export default function Home() {
  return (
    <>
      <NavBar />
      <main id="top">
        <Hero />
        <div id="about" />
        <div id="skills" />
        <div id="work" />
        <div id="contact" />
      </main>
    </>
  );
}
