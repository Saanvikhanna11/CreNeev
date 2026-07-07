import React from 'react';
import { SectionReveal, Eyebrow } from './UI';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 lg:px-8 border-t border-[var(--border-color)] overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Side: Branding/Identity */}
        <div className="w-full lg:w-1/2">
          <SectionReveal>
            <Eyebrow className="mb-6 block">01 — The Brand</Eyebrow>
            <h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-medium tracking-tight leading-[0.95] mb-8">
              CreNeev <br />
              <span className="italic gradient-text">Studio.</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="text-2xl md:text-3xl font-body text-[var(--text)] leading-tight max-w-xl">
              Derived from <span className="font-semibold italic">Create</span> and <span className="font-semibold italic">Neev</span> — we create your brand from the foundation up.
            </p>
          </SectionReveal>
        </div>

        {/* Right Side: Philosophy Content */}
        <div className="w-full lg:w-1/2 lg:pl-16">
          <SectionReveal delay={0.4}>
            <div className="space-y-6">
              <p className="text-[var(--text-muted)] font-body leading-relaxed text-xl">
                We believe that every remarkable project starts with a solid base. Our name reflects our mission: blending high-level creativity with foundational engineering.
              </p>
              <p className="text-[var(--text-muted)] font-body leading-relaxed text-xl">
                At CreNeev, we architect digital experiences that aren't just beautiful, but <span className="text-[var(--text)] font-medium">strategically unshakeable.</span>
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
