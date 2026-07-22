import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ────────────────────────────────────────────────────────────
   Data (unchanged)
   ──────────────────────────────────────────────────────────── */
const startOptions = ['WhatsApp integration', 'Google Maps integration'];
const elevateOptions = ['Enhanced website design', 'SEO optimization', 'Admin dashboard', 'AI chatbot'];
const premiumOptions = ['Logo redesigning', 'Fully trained AI chatbot', 'Complete admin dashboard', '3 month priority support'];

type Pkg = {
  name: string;
  price: string;
  numeric: number | null;
  suffix: string;
  desc: string;
  features: string[];
  badge: string;
  subBadge: string;
  type: 'start' | 'elevate' | 'personalise';
  accent: string;
};

const packages: Pkg[] = [
  {
    name: 'Start',
    price: '₹6,000',
    numeric: 6000,
    suffix: 'onwards',
    desc: 'A fast, polished launch for founders who want a sharp online presence without the wait.',
    features: [
      'Website Design (up to 5 pages)',
      'Static Website Build',
      'WhatsApp integration',
      'Google Maps integration',
      '48hr delivery',
      '1 week post-launch support',
    ],
    badge: '',
    subBadge: 'Best Value',
    type: 'start',
    accent: 'from-sky-500/20 to-blue-500/20',
  },
  {
    name: 'Elevate',
    price: '₹12,000',
    numeric: 12000,
    suffix: 'onwards',
    desc: 'A full-scale digital presence designed to feel premium, intelligent and scalable.',
    features: [
      'Enhanced website design',
      'SEO optimization',
      'Admin dashboard',
      'AI chatbot',
      '3 rounds of revision',
      '10 days delivery',
      '1 month post-launch support',
    ],
    badge: 'Most Popular',
    subBadge: 'Recommended',
    type: 'elevate',
    accent: 'from-[var(--gradient-start)]/25 to-[var(--gradient-end)]/25',
  },
  {
    name: 'Personalise',
    price: 'Custom',
    numeric: null,
    suffix: 'based on scope',
    desc: 'Blend the Start + Elevate layers with premium add-ons to design your ideal package.',
    features: [
      'Choose Start layer features',
      'Choose Elevate layer features',
      'Add premium upgrades',
      'Tailored experience built around your business',
    ],
    badge: 'Custom',
    subBadge: 'Bespoke',
    type: 'personalise',
    accent: 'from-violet-500/20 to-fuchsia-500/20',
  },
];

/* ────────────────────────────────────────────────────────────
   Animated price display
   ──────────────────────────────────────────────────────────── */
const AnimatedPrice: React.FC<{ value: number | null; pulse: boolean }> = ({ value, pulse }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (value === null || !inView) return;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value, inView]);

  if (value === null) {
    return (
      <span ref={ref} className="font-display text-4xl md:text-5xl font-semibold gradient-text shimmer-text">
        Custom
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      animate={pulse ? { scale: [1, 1.08, 1] } : {}}
      transition={{ duration: 0.5 }}
      className="font-display text-4xl md:text-5xl font-semibold gradient-text tabular-nums inline-block"
    >
      ₹{display.toLocaleString('en-IN')}
    </motion.span>
  );
};

/* ────────────────────────────────────────────────────────────
   Feature chip
   ──────────────────────────────────────────────────────────── */
const FeatureChip: React.FC<{ text: string; index: number }> = ({ text, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.04, duration: 0.4 }}
    whileHover={{ y: -2 }}
    className="group/chip relative flex items-center gap-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--surface)]/40 backdrop-blur px-3 py-2 transition-colors duration-300 hover:border-[var(--gradient-start)]/40 hover:bg-[var(--surface)]/70"
  >
    <span className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--gradient-start) 25%, transparent), color-mix(in srgb, var(--gradient-end) 25%, transparent))' }}>
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gradient-start)]">
        <path d="M2 6.5l2.5 2.5L10 3" />
      </svg>
    </span>
    <span className="text-xs md:text-[13px] font-body text-[var(--text)] leading-snug">{text}</span>
  </motion.div>
);

/* ────────────────────────────────────────────────────────────
   Magnetic CTA
   ──────────────────────────────────────────────────────────── */
const MagneticCta: React.FC<{ onClick: () => void; children: React.ReactNode; variant?: 'primary' | 'glass' }> = ({ onClick, children, variant = 'primary' }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.3 });
  };
  const lift = hover ? -2 : 0;

  if (variant === 'glass') {
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseMove={onMove}
        onMouseLeave={() => { setHover(false); setPos({ x: 0, y: 0 }); }}
        className="relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold overflow-hidden group"
        style={{ transform: `translate3d(${pos.x}px, ${pos.y + lift}px, 0)`, transition: 'transform 300ms cubic-bezier(0.2,0.8,0.2,1)' }}
      >
        <span className="absolute inset-0 rounded-full p-[1px]" style={{ background: 'conic-gradient(from 0deg, var(--gradient-start), var(--gradient-end), transparent 50%, var(--gradient-start))', animation: 'slow-spin 6s linear infinite', WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
        <span className="absolute inset-[1px] rounded-full bg-[var(--card-bg)]/80 backdrop-blur group-hover:bg-[var(--card-bg)] transition-colors" />
        <span className="relative z-10 text-[var(--text)]">{children}</span>
        <motion.span className="relative z-10 text-[var(--text)]" animate={{ x: hover ? 3 : 0 }} transition={{ duration: 0.3 }}>→</motion.span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseMove={onMove}
      onMouseLeave={() => { setHover(false); setPos({ x: 0, y: 0 }); }}
      className="relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold text-white overflow-hidden group"
      style={{ transform: `translate3d(${pos.x}px, ${pos.y + lift}px, 0)`, transition: 'transform 300ms cubic-bezier(0.2,0.8,0.2,1)', background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', boxShadow: hover ? '0 20px 50px -12px var(--gradient-start)' : '0 10px 25px -12px var(--gradient-start)' }}
    >
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, var(--gradient-end), var(--gradient-start))' }} />
      <span className="relative z-10">{children}</span>
      <motion.span className="relative z-10" animate={{ x: hover ? 3 : 0 }} transition={{ duration: 0.3 }}>→</motion.span>
    </button>
  );
};

/* ────────────────────────────────────────────────────────────
   Package Card (horizontal editorial)
   ──────────────────────────────────────────────────────────── */
const PackageCard: React.FC<{
  plan: Pkg;
  index: number;
  selected: boolean;
  onSelect: () => void;
  onCta: () => void;
}> = ({ plan, index, selected, onSelect, onCta }) => {
  const [hover, setHover] = useState(false);
  const active = selected || hover;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onSelect}
      className={`group relative rounded-[1.75rem] border bg-[var(--card-bg)]/55 backdrop-blur-xl p-6 md:p-8 cursor-pointer overflow-hidden transition-all duration-500 ${selected ? 'md:scale-[1.01]' : ''}`}
      style={{
        borderColor: active ? 'color-mix(in srgb, var(--gradient-start) 45%, var(--border-color))' : 'var(--border-color)',
        boxShadow: active
          ? '0 30px 70px -25px color-mix(in srgb, var(--gradient-start) 30%, transparent), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 20px 50px -30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Accent gradient wash */}
      <div className={`absolute inset-0 bg-gradient-to-br ${plan.accent} opacity-60 pointer-events-none`} />
      {/* Animated conic border when active */}
      <span className="absolute inset-0 rounded-[1.75rem] p-[1.5px] pointer-events-none transition-opacity duration-500" style={{ opacity: active ? 1 : 0, background: 'conic-gradient(from 0deg, var(--gradient-start), var(--gradient-end), transparent 50%, var(--gradient-start))', animation: 'slow-spin 8s linear infinite', WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
      {/* Glass reflection sweep */}
      <div className="absolute inset-0 rounded-[1.75rem] overflow-hidden pointer-events-none">
        <motion.div className="absolute -inset-y-10 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12" animate={{ x: ['0%', '400%'] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: index * 0.8 }} />
      </div>
      {/* Ambient glow */}
      <div className="absolute -top-24 -right-16 w-60 h-60 rounded-full blur-3xl pointer-events-none transition-opacity duration-700" style={{ opacity: active ? 1 : 0, background: 'radial-gradient(circle, color-mix(in srgb, var(--gradient-start) 22%, transparent), transparent 70%)' }} />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
        {/* Left: identity + price */}
        <div className="lg:w-72 shrink-0">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {plan.badge && (
              <span className="px-3 py-1 rounded-full text-[10px] font-body font-bold tracking-[0.18em] uppercase text-white" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}>
                {plan.badge}
              </span>
            )}
            {plan.subBadge && (
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.18em] uppercase border border-[var(--border-color)] bg-[var(--surface)]/60 text-[var(--text-muted)]">
                {plan.subBadge}
              </span>
            )}
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-medium text-[var(--text)] mb-2">{plan.name}</h3>
          <p className="text-sm text-[var(--text-muted)] font-body leading-relaxed mb-5">{plan.desc}</p>
          <div className="flex items-baseline gap-2">
            <AnimatedPrice value={plan.numeric} pulse={selected} />
            <span className="text-xs md:text-sm text-[var(--text-muted)] font-body">{plan.suffix}</span>
          </div>
        </div>

        {/* Middle: features */}
        <div className="flex-1">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-3">What's included</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {plan.features.map((f, i) => (
              <FeatureChip key={f} text={f} index={i} />
            ))}
          </div>
        </div>

        {/* Right: CTA */}
        <div className="lg:w-44 shrink-0 flex flex-col items-stretch lg:items-end gap-3">
          {plan.type === 'personalise' ? (
            <MagneticCta onClick={onCta} variant="glass">Build Yours</MagneticCta>
          ) : (
            <MagneticCta onClick={onCta} variant="primary">Get Started</MagneticCta>
          )}
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--text-muted)] text-center lg:text-right">
            {selected ? '● Selected' : 'Tap to preview'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};


/* ────────────────────────────────────────────────────────────
   Shared flow visuals (logic unchanged)
   ──────────────────────────────────────────────────────────── */
const INDUSTRIES = ['Restaurants', 'Clinics', 'Salons', 'Gyms', 'Bakery', 'Boutiques', 'Coaching', 'Local Services', 'Other'];

const FlowShell: React.FC<{
  eyebrow: string;
  title: string;
  subtitle?: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ eyebrow, title, subtitle, onClose, children, footer }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-50 flex items-start md:items-center justify-center overflow-y-auto"
    style={{ background: 'color-mix(in srgb, var(--bg) 82%, transparent)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-5xl my-0 md:my-8 rounded-none md:rounded-[2rem] border border-[var(--border-color)] bg-[var(--card-bg)] p-6 md:p-8 overflow-hidden"
      style={{ boxShadow: '0 50px 120px -30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)' }}
    >
      {/* Ambient */}
      <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gradient-start) 18%, transparent), transparent 70%)' }} />
      <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gradient-end) 14%, transparent), transparent 70%)' }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[var(--gradient-start)] mb-2">{eyebrow}</p>
            <h3 className="font-display text-2xl md:text-4xl font-medium text-[var(--text)]">{title}</h3>
            {subtitle && <div className="mt-2 text-sm text-[var(--text-muted)] font-body">{subtitle}</div>}
          </div>
          <button onClick={onClose} aria-label="Close" className="shrink-0 w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--surface)]/60 flex items-center justify-center text-[var(--text)] hover:bg-[var(--surface)] transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M1 1l12 12M13 1L1 13" /></svg>
          </button>
        </div>
        {children}
        {footer && <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4">{footer}</div>}
      </div>
    </motion.div>
  </motion.div>
);

const GlassButton: React.FC<{ onClick: () => void; children: React.ReactNode; variant?: 'solid' | 'ghost' | 'gradient'; disabled?: boolean }> = ({ onClick, children, variant = 'solid', disabled }) => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-body font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed';
  if (variant === 'ghost') return <button disabled={disabled} onClick={onClick} className={`${base} border border-[var(--border-color)] text-[var(--text)] hover:border-[var(--gradient-start)]/50 hover:bg-[var(--surface)]/60`}>{children}</button>;
  if (variant === 'gradient') return <button disabled={disabled} onClick={onClick} className={`${base} text-white`} style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))', boxShadow: '0 15px 35px -12px var(--gradient-start)' }}>{children}</button>;
  return <button disabled={disabled} onClick={onClick} className={`${base} bg-[var(--text)] text-[var(--bg)] hover:opacity-90`}>{children}</button>;
};

const IndustryPicker: React.FC<{ value: string; onChange: (v: string) => void; otherValue: string; onOtherChange: (v: string) => void }> = ({ value, onChange, otherValue, onOtherChange }) => (
  <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]/50 backdrop-blur p-5 md:p-6">
    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--gradient-start)] mb-4">Choose your industry</p>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {INDUSTRIES.map((opt) => (
        <button key={opt} onClick={() => onChange(opt)} className={`rounded-xl border p-3 text-left text-sm font-body transition-all duration-300 ${value === opt ? 'border-[var(--gradient-start)] bg-[var(--card-bg)] text-[var(--text)] shadow-[0_8px_24px_-12px_var(--gradient-start)]' : 'border-[var(--border-color)] bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--gradient-start)]/30'}`}>
          {opt}
        </button>
      ))}
    </div>
    {value === 'Other' && (
      <motion.input initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} value={otherValue} onChange={(e) => onOtherChange(e.target.value)} placeholder="Tell us your business type" className="mt-4 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--gradient-start)]" />
    )}
  </div>
);

const DetailsForm: React.FC<{ details: { name: string; email: string; phone: string; company: string; message: string }; setDetails: (d: any) => void; onSubmit: () => void; submitLabel?: string }> = ({ details, setDetails, onSubmit, submitLabel = 'Request this package' }) => {
  const valid = details.name.trim() && details.phone.trim();
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="space-y-3">
        <input value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} placeholder="Your name *" className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--gradient-start)]" />
        <input value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} placeholder="Phone / WhatsApp *" className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--gradient-start)]" />
        <input value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} placeholder="Email (optional)" className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--gradient-start)]" />
        <input value={details.company} onChange={(e) => setDetails({ ...details, company: e.target.value })} placeholder="Company / brand name" className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--gradient-start)]" />
      </div>
      <div className="space-y-3 flex flex-col">
        <textarea value={details.message} onChange={(e) => setDetails({ ...details, message: e.target.value })} placeholder="Tell us a bit about your project and goals" rows={6} className="w-full flex-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--gradient-start)]" />
        <GlassButton onClick={onSubmit} variant="gradient" disabled={!valid}>
          {submitLabel} {!valid && <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">· name & phone required</span>}
        </GlassButton>
      </div>
    </div>
  );
};

const Submitted: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]/50 p-8 md:p-10 text-center">
    <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
    </div>
    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--gradient-start)] mb-2">Request received</p>
    <h4 className="font-display text-2xl md:text-3xl text-[var(--text)] mb-3">We'll be in touch shortly.</h4>
    <p className="text-sm text-[var(--text-muted)] font-body max-w-md mx-auto mb-6">We've captured your package request and details. Expect a thoughtful follow-up from our team soon.</p>
    <GlassButton onClick={onClose} variant="ghost">Close</GlassButton>
  </motion.div>
);

/* ────────────────────────────────────────────────────────────
   Simple flow (Start / Elevate) — logic unchanged
   ──────────────────────────────────────────────────────────── */
const SimplePackageFlow: React.FC<{ packageName: string; packagePrice: string; onClose: () => void }> = ({ packageName, packagePrice, onClose }) => {
  const [step, setStep] = useState<'industry' | 'details'>('industry');
  const [industry, setIndustry] = useState('');
  const [other, setOther] = useState('');
  const [details, setDetails] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <FlowShell
      eyebrow="Package Request"
      title={packageName}
      subtitle={<>Estimated investment · <span className="gradient-text font-semibold">{packagePrice} onwards</span></>}
      onClose={onClose}
    >
      <AnimatePresence mode="wait">
        {step === 'industry' && !submitted && (
          <motion.div key="ind" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
            <IndustryPicker value={industry} onChange={setIndustry} otherValue={other} onOtherChange={setOther} />
            <div className="flex justify-end">
              <GlassButton onClick={() => setStep('details')} disabled={!industry || (industry === 'Other' && !other.trim())} variant="solid">Continue →</GlassButton>
            </div>
          </motion.div>
        )}
        {step === 'details' && !submitted && (
          <motion.div key="det" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <DetailsForm details={details} setDetails={setDetails} onSubmit={() => setSubmitted(true)} />
          </motion.div>
        )}
        {submitted && <Submitted key="sub" onClose={onClose} />}
      </AnimatePresence>
    </FlowShell>
  );
};

/* ────────────────────────────────────────────────────────────
   Personalise flow — logic unchanged, steps preserved
   ──────────────────────────────────────────────────────────── */
const PersonaliseFlow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState<'base' | 'elevate' | 'premium' | 'summary' | 'industry' | 'details'>('base');
  const [selected, setSelected] = useState<string[]>([]);
  const [details, setDetails] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [industry, setIndustry] = useState('');
  const [other, setOther] = useState('');

  const toggle = (item: string) => setSelected((p) => (p.includes(item) ? p.filter((x) => x !== item) : [...p, item]));

  const stepsDef: Array<[string, string, string]> = [
    ['Base', 'Start layer', 'base'],
    ['Elevate', 'Advanced features', 'elevate'],
    ['Premium', 'Add-on upgrades', 'premium'],
  ];
  const currentStepIdx = step === 'base' ? 0 : step === 'elevate' ? 1 : 2;

  const SelectionGrid: React.FC<{ items: string[] }> = ({ items }) => (
    <div className="grid sm:grid-cols-2 gap-3">
      {items.map((item) => {
        const on = selected.includes(item);
        return (
          <motion.button
            key={item}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggle(item)}
            className={`relative text-left rounded-2xl border p-4 transition-all duration-300 overflow-hidden ${on ? 'border-[var(--gradient-start)] bg-[var(--card-bg)]' : 'border-[var(--border-color)] bg-[var(--surface)]/30 hover:border-[var(--gradient-start)]/30'}`}
            style={{ boxShadow: on ? '0 10px 30px -15px var(--gradient-start)' : 'none' }}
          >
            {on && <span className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--gradient-start) 12%, transparent), color-mix(in srgb, var(--gradient-end) 10%, transparent))' }} />}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <span className="text-sm font-body text-[var(--text)]">{item}</span>
              <span className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${on ? 'border-transparent' : 'border-[var(--border-color)]'}`} style={on ? { background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' } : undefined}>
                {on && <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6.5l2.5 2.5L10 3" /></svg>}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );

  return (
    <FlowShell
      eyebrow="Personalise"
      title="Build your ideal package"
      onClose={onClose}
      footer={
        !submitted ? (
          <>
            <div>
              <p className="text-sm text-[var(--text-muted)] font-body">Selected · <span className="text-[var(--text)] font-semibold">{selected.length}</span> add-ons</p>
              <p className="text-sm font-body text-[var(--text)] mt-1">Estimated · <span className="gradient-text font-semibold">₹25,000 onwards</span></p>
            </div>
            <div className="flex flex-wrap gap-3">
              {step !== 'base' && step !== 'details' && (
                <GlassButton onClick={() => setStep(step === 'elevate' ? 'base' : step === 'premium' ? 'elevate' : step === 'summary' ? 'premium' : step === 'industry' ? 'summary' : 'industry')} variant="ghost">← Back</GlassButton>
              )}
              {step === 'base' && <GlassButton onClick={() => setStep('elevate')} variant="solid">Continue →</GlassButton>}
              {step === 'elevate' && <GlassButton onClick={() => setStep('premium')} variant="solid">Continue →</GlassButton>}
              {step === 'premium' && <GlassButton onClick={() => setStep('summary')} variant="solid">Review →</GlassButton>}
              {step === 'summary' && <GlassButton onClick={() => setStep('industry')} variant="solid">Continue →</GlassButton>}
              {step === 'industry' && <GlassButton onClick={() => setStep('details')} disabled={!industry || (industry === 'Other' && !other.trim())} variant="solid">Continue →</GlassButton>}
            </div>
          </>
        ) : undefined
      }
    >
      {/* Step indicator */}
      {!submitted && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stepsDef.map(([label, desc, key], i) => {
            const active = currentStepIdx === i || (['summary', 'industry', 'details'].includes(step) && i === 2);
            const done = currentStepIdx > i;
            return (
              <div key={key} className={`relative rounded-2xl border p-4 transition-all duration-300 overflow-hidden ${active ? 'border-[var(--gradient-start)] bg-[var(--card-bg)]' : 'border-[var(--border-color)] bg-[var(--surface)]/30'}`}>
                {active && <span className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--gradient-start) 10%, transparent), transparent)' }} />}
                <div className="relative z-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--gradient-start)] mb-1">Step {i + 1} {done && '· ✓'}</p>
                  <h4 className="font-display text-lg text-[var(--text)]">{label}</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 'base' && !submitted && (
          <motion.div key="base" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <p className="text-sm text-[var(--text-muted)] font-body mb-4">Pick any Start-layer features you want included.</p>
            <SelectionGrid items={startOptions} />
          </motion.div>
        )}
        {step === 'elevate' && !submitted && (
          <motion.div key="elevate" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <p className="text-sm text-[var(--text-muted)] font-body mb-4">Add advanced Elevate features.</p>
            <SelectionGrid items={elevateOptions} />
          </motion.div>
        )}
        {step === 'premium' && !submitted && (
          <motion.div key="premium" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <p className="text-sm text-[var(--text-muted)] font-body mb-4">Top it off with premium upgrades.</p>
            <SelectionGrid items={premiumOptions} />
          </motion.div>
        )}
        {step === 'summary' && !submitted && (
          <motion.div key="summary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]/50 p-5 md:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--gradient-start)] mb-4">Selected add-ons</p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {selected.length > 0 ? selected.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-3.5 py-2.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }} />
                    <span className="text-sm text-[var(--text)]">{item}</span>
                  </div>
                )) : (
                  <div className="sm:col-span-2 rounded-xl border border-dashed border-[var(--border-color)] px-4 py-3 text-sm text-[var(--text-muted)]">No add-ons selected yet — you can go back and pick some.</div>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]/50 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--gradient-start)] mb-1">Estimated investment</p>
                <p className="font-display text-3xl gradient-text">₹25,000 onwards</p>
              </div>
            </div>
          </motion.div>
        )}
        {step === 'industry' && !submitted && (
          <motion.div key="industry" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <IndustryPicker value={industry} onChange={setIndustry} otherValue={other} onOtherChange={setOther} />
          </motion.div>
        )}
        {step === 'details' && !submitted && (
          <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <DetailsForm details={details} setDetails={setDetails} onSubmit={() => setSubmitted(true)} />
          </motion.div>
        )}
        {submitted && <Submitted key="sub" onClose={onClose} />}
      </AnimatePresence>
    </FlowShell>
  );
};

/* ────────────────────────────────────────────────────────────
   SECTION
   ──────────────────────────────────────────────────────────── */
export const Pricing: React.FC = () => {
  const [openPersonalise, setOpenPersonalise] = useState(false);
  const [openSimpleFlow, setOpenSimpleFlow] = useState<{ packageName: string; packagePrice: string } | null>(null);
  const [selected, setSelected] = useState<string | null>('Elevate');

  const selectedPlan = packages.find((p) => p.name === selected) || null;

  const handleCta = (plan: Pkg) => {
    setSelected(plan.name);
    if (plan.type === 'personalise') setOpenPersonalise(true);
    else setOpenSimpleFlow({ packageName: plan.name, packagePrice: plan.price });
  };

  return (
    <section id="pricing" className="relative py-24 md:py-32 px-6 lg:px-8 overflow-hidden">
      {/* Top blend */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/70 to-transparent pointer-events-none" />

      {/* Ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gradient-start) 10%, transparent), transparent 70%)' }} />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gradient-end) 10%, transparent), transparent 70%)' }} />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[170px] pointer-events-none"
        animate={{ x: ['-8%', '8%', '-8%'], y: ['-5%', '5%', '-5%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--gradient-start) 6%, transparent), transparent 70%)' }}
      />

        <div className="w-full max-w-[1500px] xl:max-w-[1600px] mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] mb-6">
            07 — Packages
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]">
            Everything you need,
            <br />
            <span className="italic gradient-text">built around you.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }} className="mt-8 text-base md:text-lg text-[var(--text-muted)] font-body leading-relaxed max-w-2xl">
            Choose a starting point, or compose your own. Every package is tailored to your business — no hidden pages, no surprises.
          </motion.p>
        </div>

        {/* Configurator grid */}
      <div className="max-w-[1500px] mx-auto">
      <div className="space-y-5">
            {packages.map((plan, i) => (
              <PackageCard key={plan.name} plan={plan} index={i} selected={selected === plan.name} onSelect={() => setSelected(plan.name)} onCta={() => handleCta(plan)} />
            ))}
          </div>
          </div>
        </div>

      {/* Bottom blend */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[var(--bg)] pointer-events-none" />

      {/* Flows */}
      <AnimatePresence>
        {openPersonalise && <PersonaliseFlow onClose={() => setOpenPersonalise(false)} />}
        {openSimpleFlow && <SimplePackageFlow packageName={openSimpleFlow.packageName} packagePrice={openSimpleFlow.packagePrice} onClose={() => setOpenSimpleFlow(null)} />}
      </AnimatePresence>
    </section>
  );
};