import React, { useEffect, useState, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, useReducedMotion } from '../lib/theme';

// ─── CN Monogram SVG ────────────────────────────────────────
export const CNMonogram: React.FC<{ className?: string; size?: number; animate?: boolean }> = ({
  className = '',
  size = 32,
  animate = false,
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
    >
      {/* C path - thick stroke */}
      <motion.path
        d="M70 20 C 50 10, 15 15, 15 50 C 15 85, 50 90, 70 80"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="butt"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ duration: 1 }}
      />
      {/* N thin vertical line */}
      <motion.path
        d="M52 45 V 85"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      {/* N thick diagonal + vertical */}
      <motion.path
        d="M52 45 L 85 85 V 15"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="butt"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ duration: 1, delay: 0.5 }}
      />
      {/* Serif accents */}
      <path d="M82 15 H 88" stroke="currentColor" strokeWidth="1.5" />
      <path d="M82 85 H 88" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
};

// ─── Section Reveal ──────────────────────────────────────────
export const SectionReveal: React.FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}> = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const prefersReduced = useReducedMotion();

  const variants = {
    hidden: prefersReduced
      ? { opacity: 0 }
      : direction === 'up'
        ? { opacity: 0, y: 24 }
        : direction === 'left'
          ? { opacity: 0, x: 24 }
          : { opacity: 0, x: -24 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Eyebrow Label ───────────────────────────────────────────
export const Eyebrow: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <span
    className={`font-mono text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] ${className}`}
  >
    {children}
  </span>
);

// ─── Gradient Button ─────────────────────────────────────────
export const GradientButton: React.FC<{
  children: ReactNode;
  variant?: 'filled' | 'outline';
  className?: string;
  onClick?: () => void;
  href?: string;
  magnetic?: boolean;
}> = ({ children, variant = 'filled', className = '', onClick, href, magnetic = true }) => {
  const btnRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!magnetic || !btnRef.current) return;
    const el = btnRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      setTimeout(() => {
        el.style.transition = '';
      }, 400);
    };

    const handleMouseEnter = () => {
      el.style.transition = '';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [magnetic]);

  const baseClasses =
    'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-body font-semibold text-sm tracking-wide btn-press transition-all duration-300 cursor-pointer';

  const filledClasses = `${baseClasses} bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white hover:shadow-lg hover:shadow-[var(--gradient-start)]/20`;
  const outlineClasses = `${baseClasses} border border-[var(--border-color)] text-[var(--text)] hover:border-[var(--text)] hover:bg-[var(--surface)]`;

  const classes = variant === 'filled' ? filledClasses : outlineClasses;

  if (href) {
    return (
      <a ref={btnRef as React.RefObject<HTMLAnchorElement>} href={href} className={`${classes} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button ref={btnRef as React.RefObject<HTMLButtonElement>} onClick={onClick} className={`${classes} ${className}`}>
      {children}
    </button>
  );
};

// ─── Scroll Progress Indicator ───────────────────────────────
export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px]">
      <div
        className="h-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

// ─── Custom Cursor ───────────────────────────────────────────
export const CustomCursor: React.FC = () => {
  const { theme } = useTheme();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    
    // Only show custom cursor on non-touch devices
    const isTouch = 'ontouchstart' in window;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track interactive elements
    const handleElementEnter = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const addListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-hover');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', handleElementEnter);
        el.addEventListener('mouseleave', handleElementLeave);
      });
      return interactives;
    };

    const elements = addListeners();

    // Re-add listeners periodically for dynamic content
    const interval = setInterval(() => {
      const newElements = addListeners();
      return newElements;
    }, 2000);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
      clearInterval(interval);
    };
  }, [prefersReduced, isVisible]);

  if (prefersReduced) return null;

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{
          left: position.x,
          top: position.y,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {theme === 'dark' && (
        <div
          className="cursor-spotlight"
          style={{
            left: position.x,
            top: position.y,
            opacity: isVisible ? 1 : 0,
          }}
        />
      )}
    </>
  );
};

// ─── Loading Screen ──────────────────────────────────────────
export const LoadingScreen: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('creneev-visited');
  });

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('creneev-visited', 'true');
    }, 1200);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg)' }}
          >
            <CNMonogram size={64} animate />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={isLoading ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};

// ─── Section Divider ─────────────────────────────────────────
export const SectionDivider: React.FC = () => (
  <div className="w-full h-px bg-[var(--border-color)] my-0" />
);
