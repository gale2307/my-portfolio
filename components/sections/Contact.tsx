import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ContactForm } from '@/components/ui/ContactForm';
import { FadeIn } from '@/components/ui/FadeIn';
import { socialLinks } from '@/lib/data/contact';

export function Contact() {
  return (
    <section id="contact" className="py-24 pb-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-lg">
          <h2 className="font-mono text-xs text-[#555555] tracking-widest uppercase mb-4">
            {'// contact'}
          </h2>
          <FadeIn>
            <p className="text-[#e8e8e8] text-2xl font-light tracking-tight mb-2">
              Let&apos;s build something.
            </p>
            <p className="text-[#555555] text-sm mb-8">
              Have a project in mind? Get in touch.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-6 mt-8">
              <a
                href={socialLinks.github.url}
                aria-label={socialLinks.github.label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#555555] hover:text-[#e8e8e8] transition-colors duration-200"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={socialLinks.linkedin.url}
                aria-label={socialLinks.linkedin.label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#555555] hover:text-[#e8e8e8] transition-colors duration-200"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
