import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal, Eyebrow } from './UI';
import { useTilt } from '../lib/theme';

const startOptions = [
  'WhatsApp integration',
  'Google Maps integration',
];

const elevateOptions = [
  'Enhanced website design',
  'SEO optimization',
  'Admin dashboard',
  'AI chatbot',
];

const premiumOptions = [
  'Logo redesigning',
  'Fully trained AI chatbot',
  'Complete admin dashboard',
  '3 month priority support',
];

const packages = [
  {
    name: 'Start',
    price: '₹6,000',
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
    highlighted: false,
    badge: '',
    type: 'start',
  },
  {
    name: 'Elevate',
    price: '₹12,000',
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
    highlighted: true,
    badge: 'Most Popular',
    type: 'elevate',
  },
  {
    name: 'Personalise',
    price: 'Custom',
    suffix: 'based on scope',
    desc: 'Blend the Start + Elevate layers with premium add-ons to design your ideal package.',
    features: [
      'Choose Start layer features',
      'Choose Elevate layer features',
      'Add premium upgrades',
      'Tailored experience built around your business',
    ],
    highlighted: false,
    badge: 'Custom',
    type: 'personalise',
  },
];

const SimplePackageFlow: React.FC<{ packageName: string; packagePrice: string; onClose: () => void }> = ({ packageName, packagePrice, onClose }) => {
  const [step, setStep] = useState<'industry' | 'details'>('industry');
  const [industry, setIndustry] = useState('');
  const [details, setDetails] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg)]/95 backdrop-blur-2xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl rounded-[2rem] border border-[var(--border-color)] bg-[var(--card-bg)] p-6 md:p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gradient-start)]">Package request</p>
            <h3 className="font-display text-3xl md:text-4xl font-medium">{packageName}</h3>
            <p className="text-sm text-[var(--text-muted)] mt-2">Estimated investment: <span className="font-semibold gradient-text">{packagePrice} onwards</span></p>
          </div>
          <button onClick={onClose} className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--text)]">Close</button>
        </div>

        <AnimatePresence mode="wait">
          {step === 'industry' && !submitted && (
            <motion.div key="industry" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface)]/70 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gradient-start)]">Choose your industry</p>
                <div className="grid md:grid-cols-2 gap-4 mt-5">
                  {['Restaurants', 'Clinics', 'Salons', 'Gyms', 'Bakery', 'Boutiques', 'Coaching', 'Local Services'].map((option) => (
                    <button key={option} onClick={() => setIndustry(option)} className={`rounded-2xl border p-4 text-left transition-all duration-300 ${industry === option ? 'border-[var(--gradient-start)] bg-[var(--surface)]' : 'border-[var(--border-color)] bg-transparent'}`}>
                      <p className="font-body text-sm text-[var(--text)]">{option}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => setStep('details')} className="rounded-full bg-[var(--text)] px-6 py-3 text-sm font-body text-[var(--bg)]">Continue</button>
              </div>
            </motion.div>
          )}

          {step === 'details' && !submitted && (
            <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} placeholder="Your name" className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--gradient-start)]" />
                <input value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} placeholder="Email address" className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--gradient-start)]" />
                <input value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} placeholder="Phone number" className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--gradient-start)]" />
                <input value={details.company} onChange={(e) => setDetails({ ...details, company: e.target.value })} placeholder="Company / brand name" className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--gradient-start)]" />
              </div>
              <div className="space-y-4">
                <textarea value={details.message} onChange={(e) => setDetails({ ...details, message: e.target.value })} placeholder="Tell us a bit about your project and goals" rows={8} className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--gradient-start)]" />
                <button onClick={() => setSubmitted(true)} className="w-full rounded-full bg-[var(--text)] px-6 py-3 text-sm font-body text-[var(--bg)]">Request this package</button>
              </div>
            </motion.div>
          )}

          {submitted && (
            <motion.div key="submitted" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface)]/70 p-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gradient-start)]">Request received</p>
              <h4 className="font-display text-3xl mt-3">We’ll be in touch shortly.</h4>
              <p className="text-sm text-[var(--text-muted)] mt-3">We’ve captured your package request and your details. Expect a thoughtful follow-up from our team soon.</p>
              <button onClick={onClose} className="mt-6 rounded-full border border-[var(--border-color)] px-6 py-3 text-sm font-body">Close</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const PersonaliseFlow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState<'base' | 'elevate' | 'premium' | 'summary' | 'industry' | 'details'>('base');
  const [selected, setSelected] = useState<string[]>([]);
  const [details, setDetails] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [industry, setIndustry] = useState('');

  const toggleSelection = (item: string) => {
    setSelected((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg)]/95 backdrop-blur-2xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl rounded-[2rem] border border-[var(--border-color)] bg-[var(--card-bg)] p-6 md:p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gradient-start)]">Personalise</p>
            <h3 className="font-display text-3xl md:text-4xl font-medium">Build your ideal package</h3>
          </div>
          <button onClick={onClose} className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--text)]">Close</button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            ['Base', 'Start package layer'],
            ['Elevate', 'More advanced features'],
            ['Premium', 'Add-on upgrades'],
          ].map(([label, desc], i) => {
            const active = (step === 'base' && i === 0) || (step === 'elevate' && i === 1) || (step === 'premium' && i === 2) || (step === 'summary' && i === 2) || (step === 'industry' && i === 2) || (step === 'details' && i === 2);
            return (
              <div key={label} className={`rounded-2xl border p-4 text-left transition-all duration-300 ${active ? 'border-[var(--gradient-start)] bg-[var(--surface)]' : 'border-[var(--border-color)] bg-transparent'}`}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gradient-start)]">Step {i + 1}</p>
                <h4 className="font-display text-xl mt-2">{label}</h4>
                <p className="text-sm text-[var(--text-muted)] mt-2">{desc}</p>
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {step === 'base' && (
            <motion.div key="base" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-4">
              {startOptions.map((item) => (
                <button key={item} onClick={() => toggleSelection(item)} className={`rounded-2xl border p-4 text-left transition-all duration-300 ${selected.includes(item) ? 'border-[var(--gradient-start)] bg-[var(--surface)]' : 'border-[var(--border-color)] bg-transparent'}`}>
                  <p className="font-body text-sm text-[var(--text)]">{item}</p>
                </button>
              ))}
            </motion.div>
          )}

          {step === 'elevate' && (
            <motion.div key="elevate" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-4">
              {elevateOptions.map((item) => (
                <button key={item} onClick={() => toggleSelection(item)} className={`rounded-2xl border p-4 text-left transition-all duration-300 ${selected.includes(item) ? 'border-[var(--gradient-start)] bg-[var(--surface)]' : 'border-[var(--border-color)] bg-transparent'}`}>
                  <p className="font-body text-sm text-[var(--text)]">{item}</p>
                </button>
              ))}
            </motion.div>
          )}

          {step === 'premium' && (
            <motion.div key="premium" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-4">
              {premiumOptions.map((item) => (
                <button key={item} onClick={() => toggleSelection(item)} className={`rounded-2xl border p-4 text-left transition-all duration-300 ${selected.includes(item) ? 'border-[var(--gradient-start)] bg-[var(--surface)]' : 'border-[var(--border-color)] bg-transparent'}`}>
                  <p className="font-body text-sm text-[var(--text)]">{item}</p>
                </button>
              ))}
            </motion.div>
          )}

          {step === 'summary' && (
            <motion.div key="summary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface)]/70 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gradient-start)]">Selected add-ons</p>
                <div className="mt-4 grid md:grid-cols-2 gap-3">
                  {selected.length > 0 ? selected.map((item) => (
                    <div key={item} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)]">
                      {item}
                    </div>
                  )) : (
                    <div className="rounded-2xl border border-dashed border-[var(--border-color)] px-4 py-3 text-sm text-[var(--text-muted)]">
                      No add-ons selected yet.
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface)]/70 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gradient-start)]">Estimated investment</p>
                  <p className="font-display text-3xl mt-2 gradient-text">₹25,000 onwards</p>
                </div>
                <button onClick={() => setStep('industry')} className="rounded-full bg-[var(--text)] px-6 py-3 text-sm font-body text-[var(--bg)]">Continue to industry</button>
              </div>
            </motion.div>
          )}

          {step === 'industry' && (
            <motion.div key="industry" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface)]/70 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gradient-start)]">Choose your industry</p>
                <div className="grid md:grid-cols-2 gap-4 mt-5">
                  {['Restaurants', 'Clinics', 'Salons', 'Gyms', 'Bakery', 'Boutiques', 'Coaching', 'Local Services'].map((option) => (
                    <button key={option} onClick={() => setIndustry(option)} className={`rounded-2xl border p-4 text-left ${industry === option ? 'border-[var(--gradient-start)] bg-[var(--surface)]' : 'border-[var(--border-color)] bg-transparent'}`}>
                      <p className="font-body text-sm text-[var(--text)]">{option}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => setStep('details')} className="rounded-full bg-[var(--text)] px-6 py-3 text-sm font-body text-[var(--bg)]">Continue to details</button>
              </div>
            </motion.div>
          )}

          {step === 'details' && !submitted && (
            <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} placeholder="Your name" className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--gradient-start)]" />
                <input value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} placeholder="Email address" className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--gradient-start)]" />
                <input value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} placeholder="Phone number" className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--gradient-start)]" />
                <input value={details.company} onChange={(e) => setDetails({ ...details, company: e.target.value })} placeholder="Company / brand name" className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--gradient-start)]" />
              </div>
              <div className="space-y-4">
                <textarea value={details.message} onChange={(e) => setDetails({ ...details, message: e.target.value })} placeholder="Tell us a bit about your project and goals" rows={8} className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--gradient-start)]" />
                <button onClick={() => setSubmitted(true)} className="w-full rounded-full bg-[var(--text)] px-6 py-3 text-sm font-body text-[var(--bg)]">Request this package</button>
              </div>
            </motion.div>
          )}

          {submitted && (
            <motion.div key="submitted" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface)]/70 p-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gradient-start)]">Request received</p>
              <h4 className="font-display text-3xl mt-3">We’ll be in touch shortly.</h4>
              <p className="text-sm text-[var(--text-muted)] mt-3">We’ve captured your selected package and your details. Expect a thoughtful follow-up from our team soon.</p>
              <button onClick={onClose} className="mt-6 rounded-full border border-[var(--border-color)] px-6 py-3 text-sm font-body">Close</button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap gap-3 justify-between items-center border-t border-[var(--border-color)] pt-6">
          <div>
            <p className="text-sm text-[var(--text-muted)] font-body">Selected: {selected.length} add-ons</p>
            <p className="text-sm font-body text-[var(--text)] mt-1">Estimated investment: <span className="font-semibold gradient-text">₹25,000 onwards</span></p>
          </div>
          <div className="flex gap-3">
            {step !== 'base' && step !== 'details' && !submitted && (
              <button onClick={() => setStep(step === 'elevate' ? 'base' : step === 'premium' ? 'elevate' : step === 'summary' ? 'premium' : 'summary')} className="px-5 py-3 rounded-full border border-[var(--border-color)] text-sm font-body">Back</button>
            )}
            {step === 'base' && (
              <button onClick={() => setStep('elevate')} className="px-5 py-3 rounded-full bg-[var(--text)] text-[var(--bg)] text-sm font-body">Continue</button>
            )}
            {step === 'elevate' && (
              <button onClick={() => setStep('premium')} className="px-5 py-3 rounded-full bg-[var(--text)] text-[var(--bg)] text-sm font-body">Continue</button>
            )}
            {step === 'premium' && (
              <button onClick={() => setStep('summary')} className="px-5 py-3 rounded-full bg-[var(--text)] text-[var(--bg)] text-sm font-body">Continue</button>
            )}
            {step === 'summary' && (
              <button onClick={() => setStep('industry')} className="px-5 py-3 rounded-full bg-[var(--text)] text-[var(--bg)] text-sm font-body">Continue to industry</button>
            )}
            {step === 'industry' && (
              <button onClick={() => setStep('details')} className="px-5 py-3 rounded-full bg-[var(--text)] text-[var(--bg)] text-sm font-body">Continue to details</button>
            )}
            {step === 'details' && !submitted && (
              <button onClick={() => setSubmitted(true)} className="px-5 py-3 rounded-full bg-[var(--text)] text-[var(--bg)] text-sm font-body">Request this package</button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Pricing: React.FC = () => {
  const [openPersonalise, setOpenPersonalise] = useState(false);
  const [openSimpleFlow, setOpenSimpleFlow] = useState<{ packageName: string; packagePrice: string } | null>(null);

  return (
    <section id="pricing" className="py-24 md:py-32 px-6 lg:px-8 border-t border-[var(--border-color)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute border border-[var(--gradient-start)]/20 rounded-2xl"
          style={{ width: 300, height: 200, top: '8%', left: '-5%' }}
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], rotateX: [0, 8, -4, 0], rotateY: [0, -6, 10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute border border-[var(--gradient-end)]/15 rounded-xl"
          style={{ width: 220, height: 160, bottom: '12%', right: '-3%' }}
          animate={{ x: [0, -30, 50, 0], y: [0, 40, -20, 0], rotateX: [0, -6, 5, 0], rotateY: [0, 12, -8, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionReveal className="mb-16 text-center">
          <Eyebrow className="block mb-4">07 — Pricing</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
            <span className="italic gradient-text">No hidden pages.</span>
          </h2>
          <p className="mt-4 font-body max-w-xl mx-auto text-[var(--text-muted)]">
            Choose from three clear directions — fast launch, full growth, or a fully tailored build.
          </p>
        </SectionReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((plan, i) => {
            const tiltRef = useTilt(3) as React.RefObject<HTMLDivElement>;
            return (
              <SectionReveal key={plan.name} delay={i * 0.12}>
                <div
                  ref={tiltRef}
                  className={`tilt-card relative rounded-2xl p-7 md:p-8 h-full flex flex-col ${plan.highlighted ? 'animated-gradient-border bg-[var(--card-bg)]' : 'border border-[var(--border-color)] bg-[var(--card-bg)]'}`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full text-[10px] font-body font-bold tracking-[0.16em] uppercase text-white" style={{ background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))' }}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <h3 className="font-display text-2xl font-medium mb-2">{plan.name}</h3>
                  <p className="text-sm text-[var(--text-muted)] font-body leading-relaxed mb-6">{plan.desc}</p>

                  <div className="mb-6">
                    <span className="font-display text-3xl md:text-4xl font-bold gradient-text">{plan.price}</span>
                    <span className="ml-2 text-sm text-[var(--text-muted)] font-body">{plan.suffix}</span>
                  </div>

                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm font-body text-[var(--text-muted)]">
                        <span className="gradient-text mt-0.5">—</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.type === 'personalise' ? (
                    <button onClick={() => setOpenPersonalise(true)} className="mt-auto w-full rounded-full border border-[var(--border-color)] px-5 py-3 text-sm font-body hover:border-[var(--gradient-start)] transition-colors duration-300">
                      Build Yours
                    </button>
                  ) : (
                    <button onClick={() => setOpenSimpleFlow({ packageName: plan.name, packagePrice: plan.price })} className="mt-auto w-full rounded-full bg-[var(--text)] px-5 py-3 text-sm font-body text-[var(--bg)] transition-colors duration-300">
                      Get Started
                    </button>
                  )}
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {openPersonalise && <PersonaliseFlow onClose={() => setOpenPersonalise(false)} />}
        {openSimpleFlow && <SimplePackageFlow packageName={openSimpleFlow.packageName} packagePrice={openSimpleFlow.packagePrice} onClose={() => setOpenSimpleFlow(null)} />}
      </AnimatePresence>
    </section>
  );
};
