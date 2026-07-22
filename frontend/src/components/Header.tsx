import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../lib/theme';
import { CNMonogram } from './UI';

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Industries', path: '/industries' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Process', path: '/process' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
];

/* ────────────────────────────────────────────────────────────
   Magnetic premium CTA
   ──────────────────────────────────────────────────────────── */
const MagneticCTA: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    setPos({ x: x * 0.28, y: y * 0.32 });
  };
  const onLeave = () => {
    setPos({ x: 0, y: 0 });
    setHover(false);
  };

  const lift = hover ? -2 : 0;

  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-[13px] font-semibold tracking-wide text-white overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gradient-start)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y + lift}px, 0)`,
        transition: 'transform 300ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 400ms ease',
        boxShadow: hover
          ? '0 18px 40px -12px var(--gradient-start), 0 4px 12px -4px rgba(0,0,0,0.25)'
          : '0 8px 20px -10px var(--gradient-start)',
      }}
    >
      {/* Gradient fill */}
      <span
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}
      />
      {/* Animated conic border on hover */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          padding: '1px',
          background: 'conic-gradient(from 0deg, rgba(255,255,255,0.8), transparent 40%, rgba(255,255,255,0.6), transparent 80%, rgba(255,255,255,0.8))',
          animation: 'slow-spin 4s linear infinite',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* Dot */}
      <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse" />
      <span className="relative z-10">{children}</span>
      <motion.span
        className="relative z-10"
        animate={{ x: hover ? 3 : 0 }}
        transition={{ duration: 0.3 }}
      >
        →
      </motion.span>
    </Link>
  );
};

/* ────────────────────────────────────────────────────────────
   Desktop nav link with premium hover + active pill
   ──────────────────────────────────────────────────────────── */
const NavLink: React.FC<{
  to: string;
  label: string;
  active: boolean;
}> = ({ to, label, active }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative rounded-full px-4 py-2 text-[13px] font-medium tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gradient-start)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
      style={{
        color: active || hover ? 'var(--text)' : 'var(--text-muted)',
        transition: 'color 350ms ease',
      }}
    >
      {/* Active sliding pill */}
      {active && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-full"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 14px -6px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.4)',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}

      {/* Hover glass pill */}
      {!active && hover && (
        <motion.span
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 rounded-full"
          style={{
            background: 'color-mix(in srgb, var(--surface) 55%, transparent)',
            backdropFilter: 'blur(6px)',
          }}
        />
      )}

      {/* Center-growing underline on hover */}
      <span
        className="absolute left-1/2 -bottom-0.5 h-px -translate-x-1/2"
        style={{
          width: hover && !active ? '60%' : '0%',
          background: 'linear-gradient(90deg, transparent, var(--gradient-start), var(--gradient-end), transparent)',
          transition: 'width 400ms cubic-bezier(0.2,0.8,0.2,1)',
        }}
      />

      {/* Soft glow on hover */}
      <span
        className="relative z-10"
        style={{
          textShadow: hover && !active ? '0 0 18px color-mix(in srgb, var(--gradient-start) 40%, transparent)' : 'none',
          transition: 'text-shadow 400ms ease',
        }}
      >
        {label}
      </span>
    </Link>
  );
};

/* ────────────────────────────────────────────────────────────
   HEADER
   ──────────────────────────────────────────────────────────── */
export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ── Floating outer wrapper ── */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-center transition-all duration-500"
          style={{ paddingTop: scrolled ? '0.75rem' : '1.25rem', paddingBottom: scrolled ? '0.75rem' : '1.25rem' }}
        >
          {/* ── Glass pill ── */}
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto relative w-full max-w-7xl"
          >
            {/* Ambient glow behind pill (only when scrolled) */}
            <div
              className="absolute inset-x-6 -inset-y-2 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--gradient-start) 12%, transparent), transparent 70%)',
                opacity: scrolled ? 1 : 0,
              }}
            />

            <div
              className="relative flex items-center justify-between gap-3 rounded-full transition-all duration-500"
              style={{
                padding: scrolled ? '0.5rem 0.75rem 0.5rem 1.25rem' : '0.75rem 1rem 0.75rem 1.75rem',
                background: scrolled ? 'color-mix(in srgb, var(--bg) 72%, transparent)' : 'color-mix(in srgb, var(--bg) 30%, transparent)',
                border: `1px solid ${scrolled ? 'var(--border-color)' : 'color-mix(in srgb, var(--border-color) 40%, transparent)'}`,
                backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(8px) saturate(140%)',
                WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(8px) saturate(140%)',
                boxShadow: scrolled
                  ? '0 20px 50px -20px rgba(0,0,0,0.35), 0 4px 16px -8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)'
                  : '0 4px 20px -12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* ── Logo ── */}
              <Link
                to="/"
                className="group flex items-center shrink-0 relative"
                style={{ padding: scrolled ? '0.35rem 0.75rem 0.35rem 0.25rem' : '0.45rem 1rem 0.45rem 0.35rem', transition: 'padding 500ms ease' }}
              >
                {/* Soft halo on hover */}
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--gradient-start) 18%, transparent), transparent 70%)' }} />
                <motion.span
                  className="relative z-10"
                  whileHover={{ scale: 1.06, rotate: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <CNMonogram size={scrolled ? 30 : 36} className="text-[var(--text)]" />
                </motion.span>
                <span
                  className="relative z-10 font-display font-semibold tracking-tight text-[var(--text)]"
                  style={{
                    fontSize: scrolled ? '1.15rem' : '1.35rem',
                    marginLeft: scrolled ? '0.6rem' : '0.8rem',
                    transition: 'font-size 500ms ease, margin-left 500ms ease, letter-spacing 500ms ease',
                    letterSpacing: '0.01em',
                  }}
                >
                  CreNeev
                </span>
              </Link>

              {/* ── Desktop Nav ── */}
              <nav className="hidden lg:flex items-center gap-0.5 px-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    label={link.label}
                    active={location.pathname === link.path}
                  />
                ))}
              </nav>

              {/* ── Right cluster ── */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Theme toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={toggleTheme}
                  className="relative w-9 h-9 rounded-full flex items-center justify-center text-[var(--text)] hover:bg-[var(--surface)] transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gradient-start)]"
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  <AnimatePresence mode="wait">
                    {theme === 'light' ? (
                      <motion.svg
                        key="sun"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                        width="17" height="17" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
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
                        transition={{ duration: 0.3 }}
                        width="17" height="17" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* CTA — desktop */}
                <div className="hidden lg:block">
                  <MagneticCTA to="/contact">Book a Free Chat</MagneticCTA>
                </div>

                {/* Hamburger — mobile */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMenuOpen((v) => !v)}
                  className="lg:hidden relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--surface)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gradient-start)]"
                  aria-label="Toggle menu"
                  aria-expanded={menuOpen}
                >
                  <div className="relative w-5 h-4 flex flex-col justify-between">
                    <motion.span
                      animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="block h-0.5 w-full rounded-full origin-center"
                      style={{ background: 'var(--text)' }}
                    />
                    <motion.span
                      animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.25 }}
                      className="block h-0.5 w-full rounded-full"
                      style={{ background: 'var(--text)' }}
                    />
                    <motion.span
                      animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="block h-0.5 w-full rounded-full origin-center"
                      style={{ background: 'var(--text)' }}
                    />
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Premium Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{
                background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
                backdropFilter: 'blur(28px) saturate(180%)',
                WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Glass panel */}
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 top-20 z-40 lg:hidden rounded-[2rem] p-6 sm:p-8"
              style={{
                background: 'color-mix(in srgb, var(--bg) 75%, transparent)',
                border: '1px solid var(--border-color)',
                backdropFilter: 'blur(32px) saturate(180%)',
                WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                boxShadow: '0 30px 80px -30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {/* Ambient corner glow */}
              <div className="absolute -top-20 -right-10 w-60 h-60 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gradient-start) 22%, transparent), transparent 70%)' }} />

              <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)]">Navigate</span>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)]">
                  0{navLinks.findIndex((l) => l.path === location.pathname) + 1} / 0{navLinks.length}
                </span>
              </div>

              <nav className="flex flex-col gap-1 relative z-10">
                {navLinks.map((link, i) => {
                  const active = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center justify-between py-3 border-b border-[var(--border-color)] last:border-b-0"
                      >
                        <span className="flex items-center gap-4">
                          <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--gradient-start)]">0{i + 1}</span>
                          <span
                            className="font-display text-2xl sm:text-3xl font-medium transition-colors duration-300"
                            style={{ color: active ? 'var(--gradient-start)' : 'var(--text)' }}
                          >
                            {link.label}
                          </span>
                        </span>
                        <motion.span
                          className="text-[var(--text-muted)] group-hover:text-[var(--gradient-start)] transition-colors duration-300"
                          animate={{ x: 0 }}
                          whileHover={{ x: 4 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile CTA + theme */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.45 }}
                className="mt-8 flex items-center gap-3 relative z-10"
              >
                <MagneticCTA to="/contact">Book a Free Chat</MagneticCTA>
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface)]/60 px-4 py-2.5 text-[13px] font-body font-medium text-[var(--text)] hover:bg-[var(--surface)] transition-colors duration-300"
                >
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
