import React from 'react';
import { SectionReveal, Eyebrow } from './UI';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 lg:px-8 border-t border-[var(--border-color)] overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <svg viewBox="0 0 1200 700" className="w-full h-full" fill="none">
          <rect x="720" y="120" width="260" height="170" rx="18" stroke="currentColor" strokeWidth="1" />
          <rect x="760" y="160" width="180" height="18" rx="9" stroke="currentColor" strokeWidth="1" />
          <rect x="760" y="200" width="90" height="12" rx="6" stroke="currentColor" strokeWidth="1" />
          <rect x="760" y="230" width="140" height="12" rx="6" stroke="currentColor" strokeWidth="1" />
          <path d="M250 520h300M300 520v-90h200v90M350 430v-70h100v70" stroke="currentColor" strokeWidth="1" />
          <path d="M500 245 C 580 245, 620 205, 720 205" stroke="currentColor" strokeWidth="1" strokeDasharray="8 10" />
          <circle cx="500" cy="245" r="8" fill="currentColor" />
          <circle cx="720" cy="205" r="8" fill="currentColor" />
          <path d="M655 450l42 42 68-92" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Side: Branding/Identity */}
        <div className="w-full lg:w-1/2">
          <SectionReveal>
            <Eyebrow className="mb-6 block">01 — The Brand</Eyebrow>
            <h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tight leading-[1.02] mb-8 pb-2 overflow-visible">
              From Possibility <br />
              to <span className="italic gradient-text">presence.</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="text-2xl md:text-3xl font-body text-[var(--text)] leading-tight max-w-xl">
              CreNeev combines <span className="font-semibold italic">Create</span> with <span className="font-semibold italic">Neev</span> — the foundation every lasting brand is built on.
            </p>
          </SectionReveal>
        </div>

        {/* Right Side: Philosophy Content */}
        <div className="w-full lg:w-1/2 lg:pl-16">
          <SectionReveal delay={0.4}>
            <div className="space-y-6">
              <p className="text-[var(--text-muted)] font-body leading-relaxed text-xl">
                We help businesses turn early ideas into a confident digital presence. Before we design a screen, we define the structure, purpose, and story your brand will stand on.
              </p>
              <p className="text-[var(--text-muted)] font-body leading-relaxed text-xl">
                Our work blends premium creativity with strategy-first thinking, so your website does more than look good. It becomes a foundation for trust, growth, and momentum.
              </p>
              
              <div className="pt-4">
                <div className="flex items-center gap-6">
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]" />
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-60">Architecture of Identity</span>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};
