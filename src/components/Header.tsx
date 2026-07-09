import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../lib/theme';
import { CNMonogram } from './UI';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Industries', path: '/industries' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Process', path: '/process' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
];

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3'
            : 'py-5'
        }`}
      >
        <div className={`max-w-7xl mx-auto px-6 lg:px-10 transition-all duration-500 ${
          isScrolled 
            ? 'max-w-[95%] lg:max-w-[90%]' 
            : 'max-w-7xl'
        }`}>
          <div className={`rounded-[2rem] border transition-all duration-500 flex items-center justify-between px-6 py-3 ${
            isScrolled
              ? 'bg-[var(--bg)]/80 border-[var(--border-color)] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] backdrop-blur-xl'
              : 'bg-transparent border-transparent'
          }`}>
            
            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 group shrink-0 -ml-2">
              <CNMonogram size={38} className="text-[var(--text)] transition-transform duration-300 group-hover:scale-105" />
              <span className="font-display text-2xl lg:text-[1.7rem] font-semibold tracking-tight text-[var(--text)]">
                CreNeev
              </span>
            </Link>

            {/* ── Desktop Nav (Pill Navigation) ── */}
            <nav className="hidden lg:flex items-center gap-1 rounded-full border border-[var(--border-color)] bg-[var(--bg)]/60 px-2 py-1.5 shadow-lg backdrop-blur-xl">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`relative rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gradient-start)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${
                      isActive
                        ? 'bg-[var(--surface)] text-[var(--text)] shadow-sm'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right side: Theme + Contact CTA ── */}
            <div className="flex items-center gap-3">

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--surface)] transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gradient-start)]"
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
                      width="18" height="18" viewBox="0 0 24 24"
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
                      width="18" height="18" viewBox="0 0 24 24"
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
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-5 py-2.5 text-sm font-body font-semibold text-white shadow-lg shadow-[var(--gradient-start)]/20 transition-all duration-300 hover:shadow-[var(--gradient-start)]/40 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gradient-start)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
                >
                  <span className="w-2 h-2 rounded-full bg-white/80 shrink-0" />
                  Book a Free Chat
                </Link>
              </div>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--surface)] transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gradient-start)]"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-[var(--text)] origin-center transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                  <span className={`w-full h-0.5 bg-[var(--text)] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`w-full h-0.5 bg-[var(--text)] origin-center transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 pt-24 lg:hidden bg-[var(--bg)]/95 backdrop-blur-2xl"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={link.path}
                  className={`font-display text-3xl font-medium transition-colors duration-300 ${
                    location.pathname === link.path ? 'text-[var(--gradient-start)]' : 'text-[var(--text)] hover:text-[var(--gradient-start)]'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-6 py-3 text-base font-body font-semibold text-white shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-white/80" />
                Book a Free Chat
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
