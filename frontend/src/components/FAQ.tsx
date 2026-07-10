import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal, Eyebrow } from './UI';

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: "Most projects wrap in 2–4 weeks depending on scope. We'll give you an exact timeline before we start, and we stick to it.",
  },
  {
    q: 'Do you work with businesses outside the US?',
    a: "Absolutely. We work with clients worldwide. Time zones are managed with async communication and scheduled calls.",
  },
  {
    q: "What if I don\u2019t like the design?",
    a: "We design in close collaboration with you at every stage. Each package includes multiple revision rounds so nothing is a surprise.",
  },
  {
    q: 'Will my site work on phones?',
    a: "Every site we build is mobile-first and tested across devices. Responsive isn't an add-on — it's how we work.",
  },
  {
    q: 'Do you offer ongoing maintenance?',
    a: "Yes. Our Premium plan includes ongoing maintenance, and we offer standalone maintenance plans for any package.",
  },
];

const FAQItem: React.FC<{
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ faq, index, isOpen, onToggle }) => {
  return (
    <SectionReveal delay={index * 0.05}>
      <div className="border-b border-[var(--border-color)]">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between py-5 md:py-6 text-left group cursor-pointer"
          aria-expanded={isOpen}
        >
          <span className="font-display text-lg md:text-xl font-medium pr-4 group-hover:text-[var(--gradient-start)] transition-colors duration-300">
            {faq.q}
          </span>
          <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] group-hover:border-[var(--gradient-start)] transition-colors duration-300">
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
              className="text-[var(--text-muted)] text-lg leading-none"
            >
              +
            </motion.span>
          </span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            >
              <p className="pb-5 md:pb-6 text-[var(--text-muted)] font-body text-sm md:text-base leading-relaxed max-w-2xl">
                {faq.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionReveal>
  );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 md:py-32 px-6 lg:px-8 border-t border-[var(--border-color)]">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <SectionReveal className="mb-12">
          <Eyebrow className="block mb-4">08 — FAQ</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
            Questions,{' '}
            <span className="italic gradient-text">answered clearly.</span>
          </h2>
        </SectionReveal>

        {/* FAQ Items */}
        <div>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
