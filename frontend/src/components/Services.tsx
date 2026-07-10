import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal, Eyebrow } from './UI';

const services = [
  {
    num: '01',
    title: 'Website Design',
    desc: 'Custom-designed sites built around your brand, not a template. We focus on aesthetics, usability, and conversion.',
  },
  {
    num: '02',
    title: 'UI/UX Design',
    desc: 'Interfaces people intuitively understand and genuinely enjoy. We map user journeys to ensure every click feels natural.',
  },
  {
    num: '03',
    title: 'Landing Pages',
    desc: 'Single-page conversion machines designed to turn clicks into clients. High-impact, low-friction, and optimized for speed.',
  },
  {
    num: '04',
    title: 'Business Websites',
    desc: 'Full-featured sites that scale with your growing business. From CMS integration to complex backend connections.',
  },
  {
    num: '05',
    title: 'Brand Identity',
    desc: 'Logos, color systems, and guidelines that make you unmistakable. We build the visual language your customers will remember.',
  },
  {
    num: '06',
    title: 'SEO Optimization',
    desc: 'Get found by the people already searching for what you offer. Technical and on-page SEO to rank you higher.',
  },
];

const ServiceItem: React.FC<{ service: typeof services[0]; index: number }> = ({ service, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-[var(--border-color)] last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 md:py-10 flex items-center justify-between group text-left focus:outline-none"
      >
        <div className="flex items-center gap-6 md:gap-12 flex-1">
          <span className="font-mono text-sm text-[var(--gradient-start)]">{service.num}</span>
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-[var(--text)] group-hover:text-[var(--gradient-start)] transition-colors duration-300">
            {service.title}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[var(--text-muted)] group-hover:text-[var(--text)]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-8 md:pb-10 pl-[calc(2rem+3rem)] md:pl-[calc(3rem+4rem)]">
              <p className="text-base md:text-lg text-[var(--text-muted)] font-body leading-relaxed max-w-2xl">
                {service.desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 px-6 lg:px-8 border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="mb-16">
          <Eyebrow className="block mb-4">02 — What We Do</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
            Services built for{' '}
            <span className="italic gradient-text">growth.</span>
          </h2>
        </SectionReveal>

        <div className="flex flex-col">
          {services.map((service, i) => (
            <ServiceItem key={service.num} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
