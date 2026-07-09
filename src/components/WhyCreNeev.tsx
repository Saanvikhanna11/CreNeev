import React from 'react';
import { motion } from 'framer-motion';
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

const nodePositions = [
  { x: -330, y: -175 },
  { x: -115, y: -235 },
  { x: 115, y: -235 },
  { x: 330, y: -175 },
  { x: -330, y: 20 },
  { x: 330, y: 20 },
  { x: -190, y: 205 },
  { x: 190, y: 205 },
];

export const WhyCreNeev: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 border-t border-[var(--border-color)] overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 w-[680px] h-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[var(--gradient-start)]/5 to-[var(--gradient-end)]/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionReveal className="mb-16">
          <Eyebrow className="block mb-4">05 — Why CreNeev</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
            Eight reasons this{' '}
            <span className="italic gradient-text">won't feel like a template.</span>
          </h2>
        </SectionReveal>

        <div className="relative hidden lg:flex min-h-[660px] items-center justify-center">
          <svg viewBox="0 0 900 580" className="absolute inset-0 w-full h-full" fill="none">
            <defs>
              <linearGradient id="reasonRay" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="var(--gradient-start)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="var(--gradient-end)" stopOpacity="0.18" />
              </linearGradient>
            </defs>
            {nodePositions.map((pos, i) => (
              <motion.path
                key={i}
                d={`M450 345 C ${450 + pos.x * 0.15} ${330 + pos.y * 0.16}, ${450 + pos.x * 0.62} ${320 + pos.y * 0.72}, ${450 + pos.x} ${320 + pos.y}`}
                stroke="url(#reasonRay)"
                strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.85 }}
                viewport={{ once: true }}
                transition={{ duration: 1.05, delay: i * 0.08 }}
              />
            ))}
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-[340px] h-[215px] rounded-[1.8rem] border border-[var(--border-color)] bg-[var(--card-bg)]/90 p-4 shadow-[0_36px_100px_-48px_rgba(0,0,0,0.75)] backdrop-blur-xl">
              <div className="w-full h-full rounded-[1.35rem] border border-[var(--border-color)] bg-[var(--surface)]/70 flex flex-col items-center justify-center">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-3">CreNeev System</span>
                <div className="w-28 h-16 rounded-xl border border-[var(--border-color)] bg-[var(--bg)]/80" />
                <div className="mt-5 h-px w-24 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]" />
              </div>
            </div>
            <div className="mx-auto mt-2 h-2 w-[300px] rounded-full bg-[var(--border-color)]/50 blur-[1px]" />
          </motion.div>

          {reasons.map((reason, i) => {
            const pos = nodePositions[i];
            return (
              <motion.div
                key={reason}
                initial={{ opacity: 0, scale: 0.9, x: pos.x, y: pos.y + 12 }}
                whileInView={{ opacity: 1, scale: 1, x: pos.x, y: pos.y }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="absolute left-1/2 top-[56%] -ml-[85px] -mt-[26px] min-w-[170px] rounded-full border border-[var(--border-color)] bg-[var(--card-bg)]/85 px-6 py-4 text-center shadow-[0_18px_44px_-28px_rgba(0,0,0,0.75)] backdrop-blur-xl"
              >
                <span className="font-display text-sm md:text-base font-medium text-[var(--text)]">{reason}</span>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)]/80 p-4 text-center"
            >
              <span className="font-display text-sm font-medium text-[var(--text)]">{reason}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};