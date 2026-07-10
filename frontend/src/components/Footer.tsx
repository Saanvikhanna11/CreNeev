import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionReveal, Eyebrow, CNMonogram } from './UI';

export const FinalCTA: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goToContact = () => {
    if (location.pathname === '/contact') {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/contact');
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 border-t border-[var(--border-color)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="aurora-blob" style={{ width: 620, height: 620, bottom: '-15%', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
        <div>
          <SectionReveal>
            <Eyebrow className="block mb-5">Let's Talk</Eyebrow>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95]">
              Let’s build your <span className="italic gradient-text">brand.</span>
            </h2>
          </SectionReveal>
        </div>
        <SectionReveal delay={0.15}>
          <p className="text-[var(--text-muted)] font-body text-lg leading-relaxed mb-8">
            A premium website starts with one clear conversation. Tell us what you're building and we’ll shape the foundation.
          </p>
          <button onClick={goToContact} className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-7 py-4 text-sm font-body font-semibold text-white shadow-lg shadow-[var(--gradient-start)]/20 transition-transform duration-300 hover:scale-[1.02]">
            Let’s Talk
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
          </button>
        </SectionReveal>
      </div>
    </section>
  );
};

const groups = [
  {
    title: 'Pages',
    links: [
      ['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Portfolio', '/portfolio'], ['Process', '/process'], ['Pricing', '/pricing'], ['Contact', '/contact'],
    ],
  },
  {
    title: 'Services',
    links: [
      ['Website Design', '/services'], ['UI/UX Design', '/services'], ['Landing Pages', '/services'], ['Brand Identity', '/services'], ['SEO Optimization', '/services'],
    ],
  },
  {
    title: 'Industries',
    links: [
      ['Restaurants', '/industries'], ['Clinics', '/industries'], ['Salons', '/industries'], ['Gyms', '/industries'], ['Your Business', '/industries'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['FAQ', '/'], ['Start Package', '/pricing'], ['Elevate Package', '/pricing'], ['Personalise', '/pricing'],
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--surface)]">
      <FinalCTA />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-[1.2fr_2fr] gap-14">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 group mb-6">
              <CNMonogram size={48} className="text-[var(--text)] transition-transform duration-300 group-hover:scale-105" />
              <span className="font-display text-4xl md:text-5xl font-medium tracking-tight text-[var(--text)]">CreNeev</span>
            </Link>
            <p className="text-sm md:text-base text-[var(--text-muted)] font-body leading-relaxed max-w-md">
              A branding and web design studio creating premium websites, strong brand foundations, and digital presence for growing businesses.
            </p>
            <div className="mt-8 space-y-2 text-sm font-body text-[var(--text-muted)]">
              <a href="mailto:hello@creneev.com" className="block hover:text-[var(--gradient-start)] transition-colors">hello@creneev.com</a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="block hover:text-[var(--gradient-start)] transition-colors">WhatsApp: +91 99999 99999</a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {groups.map((group) => (
              <div key={group.title}>
                <h4 className="font-mono text-xs tracking-[0.16em] uppercase text-[var(--text-muted)] mb-4">{group.title}</h4>
                <ul className="space-y-3">
                  {group.links.map(([label, path]) => (
                    <li key={label}>
                      <Link to={path} className="text-sm font-body text-[var(--text)] hover:text-[var(--gradient-start)] transition-colors duration-300">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)] font-body">© {new Date().getFullYear()} CreNeev. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-[var(--text-muted)] font-body">
            <a href="#" className="hover:text-[var(--gradient-start)] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[var(--gradient-start)] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[var(--gradient-start)] transition-colors">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
};