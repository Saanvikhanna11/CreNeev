import React from 'react';
import { motion } from 'framer-motion';
import { SectionReveal, Eyebrow } from './UI';

const chapters = [
  { num: '01', title: 'Discover', desc: 'We understand your business, audience, and goals.' },
  { num: '02', title: 'Plan', desc: 'We map the structure, content, and conversion path.' },
  { num: '03', title: 'Design', desc: 'We shape the visual direction and interface system.' },
  { num: '04', title: 'Develop', desc: 'We build a fast, responsive, production-ready site.' },
  { num: '05', title: 'Launch', desc: 'We test, polish, connect, and publish the experience.' },
  { num: '06', title: 'Grow', desc: 'We support, refine, and optimise after launch.' },
];

const ChapterRow: React.FC<{ chapter: typeof chapters[0]; index: number }> = ({ chapter, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative border-b border-[var(--border-color)] last:border-b-0 py-8 md:py-10 group"
    >
      <div className="grid md:grid-cols-[80px_1fr_1.2fr_40px] gap-5 md:gap-8 items-center">
        <span className="font-mono text-xs tracking-[0.18em] text-[var(--gradient-start)]">{chapter.num}</span>

        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-[var(--text)]">
          {chapter.title}
        </h3>

        <p className="text-sm md:text-base text-[var(--text-muted)] font-body leading-relaxed max-w-xl">
          {chapter.desc}
        </p>

        <div className="relative w-8 h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center overflow-hidden">
          <motion.span
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] opacity-0 group-hover:opacity-100"
            initial={false}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="relative z-10 w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] group-hover:bg-white"
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.2 }}
          />
        </div>
      </div>

      <motion.div
        className="absolute left-0 bottom-[-1px] h-px bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: index * 0.08 }}
      />
    </motion.div>
  );
};

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 md:py-32 px-6 lg:px-8 border-t border-[var(--border-color)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="mb-16">
          <Eyebrow className="block mb-4">03 — Process</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
            Six chapters,{' '}
            <span className="italic gradient-text">one story.</span>
          </h2>
        </SectionReveal>

        <div className="flex flex-col">
          {chapters.map((chapter, i) => (
            <ChapterRow key={chapter.num} chapter={chapter} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};