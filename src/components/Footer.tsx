import React from 'react';
import { SectionReveal, Eyebrow, GradientButton, CNMonogram } from './UI';

export const FinalCTA: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 lg:px-8 border-t border-[var(--border-color)] relative overflow-hidden">
      {/* Aurora blob */}
      <div
        className="aurora-blob"
        style={{
          width: 600,
          height: 600,
          bottom: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <SectionReveal>
          <Eyebrow className="block mb-4">09 — Let's Talk</Eyebrow>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] mb-6">
            Let's build
            <br />
            your <span className="italic gradient-text">brand.</span>
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.2}>
          <p className="text-lg text-[var(--text-muted)] font-body max-w-md mx-auto mb-10 leading-relaxed">
            One conversation. No obligations. Just a clear sense of what's possible.
          </p>
        </SectionReveal>
        <SectionReveal delay={0.3}>
          <GradientButton href="#contact">
            Book a Free Discovery Call
          </GradientButton>
        </SectionReveal>
      </div>
    </section>
  );
};

const studioLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const connectLinks = [
  { label: 'Email', href: 'mailto:hello@creneev.com' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter / X', href: '#' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <CNMonogram size={32} className="text-[var(--text)]" />
              <span className="font-display text-2xl font-medium tracking-tight text-[var(--text)]">
                CreNeev
              </span>
            </a>
            <p className="text-sm text-[var(--text-muted)] font-body leading-relaxed max-w-sm">
              A branding and web design studio helping businesses make unforgettable first impressions.
            </p>
          </div>

          {/* Studio Links */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">
              Studio
            </h4>
            <ul className="space-y-2.5">
              {studioLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-body text-[var(--text)] hover:text-[var(--gradient-start)] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-body text-[var(--text)] hover:text-[var(--gradient-start)] transition-colors duration-300"
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)] font-body">
            © {new Date().getFullYear()} CreNeev. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)] font-body">
            Where Brands Begin.
          </p>
        </div>
      </div>
    </footer>
  );
};
