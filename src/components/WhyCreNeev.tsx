import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal, Eyebrow } from './UI';

const reasons = [
  'Modern Design',
  'Lightning Fast',
  'SEO Optimized',
  'Mobile Responsive',
  'Conversion Focused',
  'Affordable',
  'Dedicated Support',
  'Beautiful Animations',
];

export const WhyCreNeev: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 border-t border-[var(--border-color)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="mb-16">
          <Eyebrow className="block mb-4">05 — Why CreNeev</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
            Eight reasons this{' '}
            <span className="italic gradient-text">won’t feel like a template.</span>
          </h2>
        </SectionReveal>

        <div className="relative min-h-[560px] md:min-h-[680px] flex items-center justify-center">
          <div className="relative z-10 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
            {reasons.map((reason) => (
              <motion.button
                key={reason}
                onClick={() => setActive(active === reason ? null : reason)}
                className={`rounded-[1.25rem] border border-[var(--border-color)] bg-[var(--card-bg)]/80 backdrop-blur-sm p-4 text-center min-h-[110px] flex items-center justify-center text-xs md:text-sm font-display font-medium tracking-wide hover:border-[var(--gradient-start)]/40 transition-all duration-300 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.45)]`}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-[var(--text)]">{reason}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 px-6 py-4 rounded-full border border-[var(--border-color)] bg-[var(--bg)]/80 backdrop-blur-xl"
              >
                <span className="font-body text-sm text-[var(--text-muted)]">Selected focus: </span>
                <span className="font-display text-base text-[var(--text)]">{active}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
