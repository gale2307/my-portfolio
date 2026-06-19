'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full bg-[#111111] border border-white/[0.07] rounded-sm px-4 py-3 text-sm text-[#e8e8e8] placeholder:text-[#444444] font-mono focus:outline-none focus:ring-1 focus:ring-[#00d9b8]/50 transition-shadow';

const labelClass = 'text-xs font-mono text-[#555555] tracking-widest uppercase mb-2 block';

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
        className="self-start px-6 py-3 text-sm font-mono text-[#e8e8e8] border border-white/[0.12] rounded-sm hover:border-[#00d9b8]/50 hover:text-[#00d9b8] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00d9b8] cursor-pointer"
      >
        {status === 'loading' ? 'sending...' : 'send message'}
      </button>

      {status === 'success' && (
        <p role="alert" className="font-mono text-xs text-[#00d9b8]">
          ✓ message sent — I&apos;ll be in touch soon.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="font-mono text-xs text-red-400">
          ✗ something went wrong. please try again.
        </p>
      )}
    </form>
  );
}
