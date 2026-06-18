import { NavBar } from "@/components/ui/NavBar";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <NavBar />
      <main id="top">
        <section
          id="hero"
          className="h-[75vh] flex flex-col justify-center"
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-2xl">
              <p className="font-mono text-xs text-[#a3a3a3] tracking-widest uppercase mb-6">
                {"// freelance"}
              </p>
              <h1
                className="font-bold text-[#f5f5f5] mb-2"
                style={{
                  fontSize: "clamp(48px, 6vw + 8px, 72px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Nicholas Willian
              </h1>
              <p className="text-lg font-light text-[#a3a3a3] tracking-wide mb-4">
                Freelance Software Engineer
              </p>
              <p className="text-base font-light text-[#f5f5f5] mb-8">
                Building fast, scalable web products for ambitious teams.
              </p>
              <Button href="#contact">Get in touch</Button>
            </div>
          </div>
        </section>

        <div id="about" />
        <div id="skills" />
        <div id="work" />
        <div id="contact" />
      </main>
    </>
  );
}
