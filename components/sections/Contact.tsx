import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ContactForm } from '@/components/ui/ContactForm';
import { socialLinks } from '@/lib/data/contact';

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-lg">
          <p className="font-mono text-xs text-[#a3a3a3] tracking-widest uppercase mb-4">
            {'// contact'}
          </p>
          <p className="text-[#a3a3a3] text-sm mb-8">
            Have a project in mind? Get in touch.
          </p>
          <ContactForm />
          <div className="flex items-center gap-6 mt-8">
            <a
              href={socialLinks.github.url}
              aria-label={socialLinks.github.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors duration-200"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={socialLinks.linkedin.url}
              aria-label={socialLinks.linkedin.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors duration-200"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
