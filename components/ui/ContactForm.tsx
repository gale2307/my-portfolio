'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full bg-[#1e1e1e] border border-white/10 rounded-md px-4 py-3 text-sm text-[#f5f5f5] placeholder:text-[#525252] focus:outline-none focus:ring-1 focus:ring-[#c8964a] transition-shadow';

const labelClass = 'text-xs font-mono text-[#a3a3a3] tracking-widest uppercase mb-2 block';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputClass}
          disabled={status === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={inputClass}
          disabled={status === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your project..."
          className={`${inputClass} resize-none`}
          disabled={status === 'loading'}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="self-start px-6 py-3 text-sm font-medium text-[#f5f5f5] border border-white/20 rounded-md hover:border-[#c8964a] hover:text-[#c8964a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8964a]"
      >
        {status === 'loading' ? 'Sending...' : 'Send message'}
      </button>

      {status === 'success' && (
        <p role="alert" className="text-sm text-green-400">
          Message sent — I&apos;ll be in touch soon.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-400">
          Something went wrong. Please try again or email me directly.
        </p>
      )}
    </form>
  );
}
