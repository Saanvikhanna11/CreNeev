import React from 'react';
import { SectionReveal, Eyebrow } from './UI';

const services = [
  { num: '01', title: 'Website Design', desc: 'Custom-designed sites built around your brand, not a template.' },
  { num: '02', title: 'UI/UX Design', desc: 'Interfaces people intuitively understand and genuinely enjoy.' },
  { num: '03', title: 'Landing Pages', desc: 'Single-page conversion machines designed to turn clicks into clients.' },
  { num: '04', title: 'Business Websites', desc: 'Full-featured sites that scale with your growing business.' },
  { num: '05', title: 'Brand Identity', desc: 'Logos, color systems, and guidelines that make you unmistakable.' },
  { num: '06', title: 'SEO Optimization', desc: 'Get found by the people already searching for what you offer.' },
  { num: '07', title: 'Website Maintenance', desc: "We keep your site fast, secure, and current \u2014 so you don't have to." },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 px-6 lg:px-8 border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="mb-16">
          <Eyebrow className="block mb-4">02 — Services</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
            A small menu,{' '}
            <span className="italic gradient-text">obsessively refined.</span>
          </h2>
        </SectionReveal>

        <div className="divide-y divide-[var(--border-color)]">
          {services.map((service, i) => (
            <SectionReveal key={service.num} delay={i * 0.06}>
              <div className="group py-6 md:py-8 hover:bg-[var(--surface)] transition-colors duration-300 px-4 md:px-6 -mx-4 md:-mx-6 rounded-xl cursor-pointer">
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="font-mono text-xs md:text-sm text-[var(--gradient-start)] shrink-0 w-8 md:w-10">
                    {service.num}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-medium shrink-0 md:w-64">
                    {service.title}
                  </h3>
                  <p className="hidden md:block text-sm text-[var(--text-muted)] font-body flex-1 leading-relaxed">
                    {service.desc}
                  </p>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-[var(--text-muted)] group-hover:text-[var(--gradient-start)] transition-all duration-300 group-hover:translate-x-1 -translate-x-1 shrink-0 hidden md:block"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 10h12M12 6l4 4-4 4" />
                  </svg>
                </div>
                <p className="md:hidden text-xs text-[var(--text-muted)] font-body leading-relaxed mt-2 pl-12">
                  {service.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
