import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal, Eyebrow } from './UI';

const testimonials = [
  {
    quote: "CreNeev didn\u2019t just build us a website \u2014 they gave us a brand people recognize. Our reservations doubled in the first month.",
    author: 'Sofia Ramirez',
    role: 'Solis Restaurant',
  },
  {
    quote: "I\u2019ve worked with agencies before. This felt different. Faster, more intentional, and the result actually sounds like us.",
    author: 'Marcus Chen',
    role: 'Heron Fitness',
  },
  {
    quote: "They made something I\u2019m genuinely proud to share. That\u2019s never happened before with a web project.",
    author: 'Priya Patel',
    role: 'Ash & Co. Bakery',
  },
];

export const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next, isPaused]);

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 border-t border-[var(--border-color)] bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto text-center">
        <SectionReveal className="mb-12">
          <Eyebrow className="block mb-4">06 — Testimonials</Eyebrow>
        </SectionReveal>

        {/* Decorative Quote Mark */}
        <div className="relative">
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 font-display text-[120px] md:text-[180px] leading-none gradient-text opacity-10 select-none pointer-events-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {/* Testimonial Content */}
          <div
            className="relative min-h-[200px] md:min-h-[260px] flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center"
              >
                <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl font-medium leading-snug tracking-tight max-w-3xl">
                  {testimonials[current].quote}
                </blockquote>
                <div className="mt-6 md:mt-8">
                  <span className="font-body font-semibold text-sm block text-[var(--text)]">
                    {testimonials[current].author}
                  </span>
                  <span className="font-body text-sm text-[var(--text-muted)]">
                    {testimonials[current].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dot Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] w-8'
                  : 'bg-[var(--border-color)] w-2 hover:bg-[var(--text-muted)]'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
