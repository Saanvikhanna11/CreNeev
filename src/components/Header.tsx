import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../lib/theme';
import { CNMonogram } from './UI';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${
          isScrolled
            ? 'header-scrolled backdrop-blur-xl border-b border-[var(--border-color)] shadow-sm'
            : 'bg-transparent'
        }`}
        style={{ transition: 'background-color 400ms ease, border-color 400ms ease, box-shadow 400ms ease' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-18 lg:h-22 flex items-center justify-between py-4">

          {/* ── Logo ── */}
          <a href="#" className="flex items-center gap-3 group shrink-0 mr-5 lg:mr-7">
            <CNMonogram size={36} className="text-[var(--text)]" />
            <span className="font-display text-2xl lg:text-[1.7rem] font-semibold tracking-tight text-[var(--text)] leading-none">
              CreNeev
            </span>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg)]/70 px-2 py-2 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative rounded-full px-4 py-2 font-display text-[13px] font-medium tracking-[0.18em] uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-all duration-300 group cursor-pointer"
              >
                {link.label}
                <span className="absolute inset-0 rounded-full border border-transparent group-hover:border-[var(--gradient-start)]/20 transition-all duration-300" />
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--gradient-start)]/0 to-[var(--gradient-end)]/0 group-hover:from-[var(--gradient-start)]/10 group-hover:to-[var(--gradient-end)]/10 transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* ── Right side: Theme + Contact CTA ── */}
          <div className="flex items-center gap-3 lg:gap-4">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--surface)] cursor-pointer"
              style={{ transition: 'background-color 200ms ease' }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.svg
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.28 }}
                    width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    className="text-[var(--text)]"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.28 }}
                    width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    className="text-[var(--text)]"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>

            {/* Contact CTA */}
            <div className="hidden lg:block">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface)]/70 px-4 py-2.5 text-sm font-body font-medium text-[var(--text)] transition-all duration-300 hover:bg-[var(--surface)]"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] shrink-0" />
                Book a Free Chat
              </a>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--surface)] cursor-pointer"
              style={{ transition: 'background-color 200ms ease' }}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-[var(--text)] origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
                  style={{ transition: 'transform 300ms ease' }} />
                <span className={`w-full h-0.5 bg-[var(--text)] ${isMobileMenuOpen ? 'opacity-0' : ''}`}
                  style={{ transition: 'opacity 300ms ease' }} />
                <span className={`w-full h-0.5 bg-[var(--text)] origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
                  style={{ transition: 'transform 300ms ease' }} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 pt-20 lg:hidden"
            style={{ backgroundColor: 'var(--bg)' }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-2xl font-medium text-[var(--text)] hover:text-[var(--gradient-start)]"
                style={{ transition: 'color 250ms ease' }}
              >
                {link.label}
              </motion.a>
            ))}
            <div className="mt-4">
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface)]/70 px-4 py-2.5 text-sm font-body font-medium text-[var(--text)] transition-all duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] shrink-0" />
                Book a Free Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
