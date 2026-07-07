import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal, Eyebrow } from './UI';
import { useReducedMotion } from '../lib/theme';

const chapters = [
  {
    num: '01',
    title: 'Discover',
    desc: 'We learn your business, audience, and goals inside out before a single decision is made.',
    icon: '⊙',
    image: 'https://images.pexels.com/photos/6793889/pexels-photo-6793889.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600',
    fallbackBg: 'from-rose-500/20 to-orange-500/20'
  },
  {
    num: '02',
    title: 'Plan',
    desc: 'Strategy and structure are locked in so the design phase has total clarity.',
    icon: '◈',
    image: 'https://images.pexels.com/photos/16243258/pexels-photo-16243258.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600',
    fallbackBg: 'from-amber-500/20 to-yellow-500/20'
  },
  {
    num: '03',
    title: 'Design',
    desc: 'Visual concepts refined until they feel inevitable — not just good.',
    icon: '✦',
    image: 'https://images.pexels.com/photos/8386643/pexels-photo-8386643.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600',
    fallbackBg: 'from-pink-500/20 to-purple-500/20'
  },
  {
    num: '04',
    title: 'Develop',
    desc: 'Clean, fast, accessible code. Built to last, not just to launch.',
    icon: '⟐',
    image: 'https://images.pexels.com/photos/13394134/pexels-photo-13394134.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600',
    fallbackBg: 'from-blue-500/20 to-teal-500/20'
  },
  {
    num: '05',
    title: 'Launch',
    desc: 'A seamless go-live, with everything tested, polished, and ready for real traffic.',
    icon: '↑',
    image: 'https://images.pexels.com/photos/8134821/pexels-photo-8134821.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600',
    fallbackBg: 'from-green-500/20 to-emerald-500/20'
  },
  {
    num: '06',
    title: 'Grow',
    desc: 'Post-launch support, SEO and optimisation to turn your site into a business engine.',
    icon: '↗',
    image: 'https://images.pexels.com/photos/9064790/pexels-photo-9064790.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600',
    fallbackBg: 'from-violet-500/20 to-indigo-500/20'
  },
];

export const Process: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(2); // Start centered on Chapter 3
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="process" className="py-24 md:py-32 border-t border-[var(--border-color)] relative overflow-hidden bg-gradient-to-b from-transparent to-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionReveal className="mb-16">
          <Eyebrow className="block mb-4">03 — Process</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
            Six chapters,{' '}
            <span className="italic gradient-text">one story.</span>
          </h2>
        </SectionReveal>

        {/* ── Apple Music style Album Cover Flow Carousel ── */}
        <div ref={containerRef} className="relative w-full h-[520px] flex items-center justify-center pt-8">
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            {chapters.map((chapter, i) => {
              const offset = i - activeIndex;
              const absOffset = Math.abs(offset);

              // Skip rendering extreme cards off-screen
              if (absOffset > 2) return null;

              // 3D positioning properties for card-flow
              const xPos = offset * 220; // horizontal separation
              const rotateY = offset * -35; // perspective tilt
              const scale = 1 - absOffset * 0.12; // decrease scale further out
              const zIndex = 10 - absOffset; // active card always on top
              const opacity = 1 - absOffset * 0.35; // fade outer cards

              return (
                <motion.div
                  key={chapter.num}
                  onClick={() => setActiveIndex(i)}
                  className="absolute cursor-pointer w-[280px] md:w-[320px] rounded-3xl overflow-hidden shadow-2xl origin-center group flex flex-col justify-end"
                  style={{
                    height: '420px',
                    background: 'var(--card-bg)',
                    border: activeIndex === i ? '1.5px solid var(--gradient-start)' : '1px solid var(--border-color)',
                  }}
                  animate={prefersReduced ? {
                    x: offset * 180,
                    scale: activeIndex === i ? 1 : 0.85,
                    opacity: activeIndex === i ? 1 : 0.4,
                    zIndex,
                  } : {
                    x: xPos,
                    scale,
                    rotateY,
                    opacity,
                    zIndex,
                    transformPerspective: 1200,
                  }}
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Aspect Ratio Cover Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={chapter.image}
                      alt={chapter.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Color filter overlay matching the fallbacks */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${chapter.fallbackBg} to-transparent mix-blend-multiply opacity-60`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  </div>

                  {/* Album Info Text Overlay at bottom */}
                  <div className="relative z-10 p-6 text-white text-center">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--gradient-start)] block mb-1">
                      Chapter {chapter.num}
                    </span>
                    <h3 className="font-display text-2xl font-semibold mb-2 group-hover:text-[var(--gradient-end)] transition-colors duration-300">
                      {chapter.title}
                    </h3>
                    
                    {/* Expanded details expand smoothly on current card */}
                    <AnimatePresence>
                      {activeIndex === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 0.85, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-xs md:text-sm font-body leading-relaxed max-w-xs mx-auto"
                        >
                          {chapter.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Decorative geometric details */}
                  <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <span className="text-white text-xs font-mono">{chapter.icon}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {chapters.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] w-8 animate-pulse'
                  : 'bg-[var(--border-color)] w-2 hover:bg-[var(--text-muted)]'
              }`}
              aria-label={`Jump to chapter ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
