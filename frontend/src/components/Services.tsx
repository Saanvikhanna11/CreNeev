import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ────────────────────────────────────────────────────────────
   Custom abstract illustrations per service (no stock icons)
   ──────────────────────────────────────────────────────────── */
const Visual: React.FC<{ id: string }> = ({ id }) => {
  const stroke = 'url(#svcGrad)';
  const common = { fill: 'none', stroke, strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="svcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--gradient-start)" />
          <stop offset="100%" stopColor="var(--gradient-end)" />
        </linearGradient>
        <radialGradient id="svcGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--gradient-start)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--gradient-end)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft glow disc behind every visual */}
      <circle cx="60" cy="60" r="46" fill="url(#svcGlow)" />

      {id === 'web' && (
        <g {...common}>
          <rect x="22" y="30" width="76" height="54" rx="6" />
          <path d="M22 42h76" />
          <circle cx="28" cy="36" r="1.5" fill={stroke} />
          <circle cx="34" cy="36" r="1.5" fill={stroke} />
          <circle cx="40" cy="36" r="1.5" fill={stroke} />
          <rect x="30" y="50" width="26" height="14" rx="2" />
          <path d="M62 52h28M62 58h22M62 64h16" />
          <path d="M30 72h60" opacity="0.5" />
        </g>
      )}

      {id === 'uiux' && (
        <g {...common}>
          <rect x="24" y="28" width="50" height="36" rx="6" />
          <rect x="46" y="56" width="50" height="36" rx="6" />
          <circle cx="36" cy="46" r="4" />
          <circle cx="72" cy="74" r="4" />
          <path d="M40 46l28 28" strokeDasharray="3 3" opacity="0.6" />
        </g>
      )}

      {id === 'landing' && (
        <g {...common}>
          <path d="M20 84L44 60l14 14 22-30 20 20" />
          <circle cx="100" cy="64" r="6" />
          <circle cx="100" cy="64" r="2" fill={stroke} />
          <path d="M20 94h80" opacity="0.4" />
          <path d="M44 60v34M58 74v20M80 44v50" opacity="0.3" />
        </g>
      )}

      {id === 'business' && (
        <g {...common}>
          <rect x="24" y="28" width="22" height="22" rx="4" />
          <rect x="50" y="28" width="22" height="22" rx="4" />
          <rect x="76" y="28" width="22" height="22" rx="4" />
          <rect x="24" y="58" width="22" height="22" rx="4" />
          <rect x="50" y="58" width="22" height="22" rx="4" />
          <rect x="76" y="58" width="22" height="22" rx="4" />
          <path d="M35 50v8M61 50v8M87 50v8M46 39h4M46 69h4M72 39h4M72 69h4" opacity="0.5" />
        </g>
      )}

      {id === 'brand' && (
        <g {...common}>
          <circle cx="60" cy="60" r="30" />
          <circle cx="60" cy="60" r="18" opacity="0.7" />
          <circle cx="60" cy="60" r="6" fill={stroke} />
          <path d="M60 16v8M60 96v8M16 60h8M96 60h8" />
          <path d="M88 32l-6 6M38 82l-6 6M88 88l-6-6M38 38l-6-6" opacity="0.5" />
        </g>
      )}

      {id === 'seo' && (
        <g {...common}>
          <circle cx="48" cy="50" r="20" />
          <path d="M62 64l18 18" strokeWidth="2" />
          <path d="M40 54v-6M48 54v-12M56 54v-4" />
        </g>
      )}
    </svg>
  );
};

/* ────────────────────────────────────────────────────────────
   Service data — outcome-focused
   ──────────────────────────────────────────────────────────── */
const services = [
  {
    id: 'web',
    title: 'Premium Website Design',
    outcome: 'Build trust from the first impression.',
    blurb: 'Custom-crafted websites that feel unmistakably yours — designed to convert visitors into believers.',
    details: [
      'Editorial layouts with intentional whitespace',
      'Conversion-driven information architecture',
      'Responsive across every device and screen',
    ],
  },
  {
    id: 'uiux',
    title: 'UI / UX Design',
    outcome: 'Make every interaction feel effortless.',
    blurb: 'Interfaces shaped by real user journeys — intuitive, delightful, and impossible to misuse.',
    details: [
      'User research & journey mapping',
      'Interactive prototypes & usability testing',
      'Design systems that scale with your team',
    ],
  },
  {
    id: 'landing',
    title: 'High-Converting Landing Pages',
    outcome: 'Turn clicks into customers, faster.',
    blurb: 'Single-page experiences engineered around one goal — driving qualified enquiries.',
    details: [
      'A/B-testable headline & CTA structures',
      'Performance-first, sub-second loads',
      'Analytics-ready tracking and funnels',
    ],
  },
  {
    id: 'business',
    title: 'Custom Development',
    outcome: 'Scale with solutions built for your business.',
    blurb: 'From CMS integrations to bespoke features — engineered to grow alongside your ambitions.',
    details: [
      'Headless CMS & admin dashboards',
      'Secure authentication & payments',
      'API integrations & automation hooks',
    ],
  },
  {
    id: 'brand',
    title: 'Brand Identity',
    outcome: 'Become instantly memorable.',
    blurb: 'A complete visual language — logo, palette, typography, motion — that customers remember.',
    details: [
      'Logo systems & wordmarks',
      'Colour, type and motion guidelines',
      'Brand voice & messaging frameworks',
    ],
  },
  {
    id: 'seo',
    title: 'SEO & Performance',
    outcome: 'Get discovered, and convert more visitors.',
    blurb: 'Technical SEO and Core Web Vitals optimisation that compound traffic month after month.',
    details: [
      'Technical audits & schema markup',
      'On-page optimisation & content strategy',
      'Core Web Vitals & image optimisation',
    ],
  },
];

/* ────────────────────────────────────────────────────────────
   Service Card
   ──────────────────────────────────────────────────────────── */
const ServiceCard: React.FC<{ service: typeof services[0]; index: number }> = ({ service, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      onClick={() => setOpen((v) => !v)}
      className="group relative rounded-[1.75rem] border bg-[var(--card-bg)]/55 backdrop-blur-xl p-7 md:p-8 cursor-pointer overflow-hidden transition-colors duration-500"
      style={{
        borderColor: open ? 'color-mix(in srgb, var(--gradient-start) 45%, var(--border-color))' : 'var(--border-color)',
        boxShadow: open
          ? '0 30px 70px -25px color-mix(in srgb, var(--gradient-start) 35%, transparent), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 20px 50px -30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Animated conic border on hover/open */}
      <span
        className="absolute inset-0 rounded-[1.75rem] p-[1px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700"
        style={{
          background: 'conic-gradient(from 0deg, var(--gradient-start), var(--gradient-end), transparent 50%, var(--gradient-start))',
          animation: 'slow-spin 8s linear infinite',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: open ? 1 : undefined,
        }}
      />

      {/* Ambient hover glow */}
      <div className="absolute -top-24 -right-16 w-60 h-60 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gradient-start) 22%, transparent), transparent 70%)' }} />

      {/* Glass reflection sweep */}
      <div className="absolute inset-0 rounded-[1.75rem] overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -inset-y-10 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
          animate={{ x: ['0%', '400%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Visual + index */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]/50 backdrop-blur-md p-2 md:p-3 overflow-hidden"
            whileHover={{ rotate: [0, -4, 4, 0], scale: 1.04 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <Visual id={service.id} />
            </motion.div>
          </motion.div>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)]">0{index + 1}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl md:text-3xl font-medium text-[var(--text)] mb-3 transition-colors duration-500 group-hover:text-[var(--gradient-start)]">
          {service.title}
        </h3>

        {/* Value prop */}
        <p className="text-sm md:text-base text-[var(--text-muted)] font-body leading-relaxed mb-5">
          {service.blurb}
        </p>

        {/* Outcome chip */}
        <div className="mt-auto inline-flex items-start gap-2.5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]/50 backdrop-blur px-4 py-3">
          <span className="mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }} />
          <span className="text-xs md:text-sm font-body text-[var(--text)] leading-snug">
            <span className="text-[var(--text-muted)]">Outcome · </span>
            {service.outcome}
          </span>
        </div>

        {/* Learn More toggle */}
        <div className="mt-5 flex items-center justify-between">
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--gradient-start)]">
            {open ? 'Close' : 'Learn More'}
          </span>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.35 }}
            className="w-8 h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--gradient-start)] group-hover:border-[var(--gradient-start)]/40 transition-colors duration-500"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M7 3v8M3 7h8" />
            </svg>
          </motion.div>
        </div>

        {/* Expandable details */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-[var(--border-color)] space-y-2.5">
                {service.details.map((d, i) => (
                  <motion.div
                    key={d}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 text-sm text-[var(--text-muted)] font-body"
                  >
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[var(--gradient-start)]" />
                    <span>{d}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────
   SECTION
   ──────────────────────────────────────────────────────────── */
export const Services: React.FC = () => {
  return (
    <section id="services" className="relative py-24 md:py-32 px-6 lg:px-8 overflow-hidden">
      {/* Top blend with previous section */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/70 to-transparent pointer-events-none" />

      {/* Ambient lighting */}
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gradient-start) 10%, transparent), transparent 70%)' }} />
      <div className="absolute bottom-1/3 -right-40 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gradient-end) 10%, transparent), transparent 70%)' }} />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[160px] pointer-events-none"
        animate={{ x: ['-10%', '10%', '-10%'], y: ['-6%', '6%', '-6%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--gradient-start) 6%, transparent), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] mb-6"
          >
            02 — What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]"
          >
            Crafting digital experiences
            <br />
            <span className="italic gradient-text">that grow businesses.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-8 text-base md:text-lg text-[var(--text-muted)] font-body leading-relaxed max-w-2xl"
          >
            Every engagement is designed around a business outcome — not a deliverable. Explore the craft behind what we build.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-start">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom blend */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[var(--bg)] pointer-events-none" />
    </section>
  );
};
