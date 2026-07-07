import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionReveal, Eyebrow, GradientButton } from './UI';
import { useReducedMotion } from '../lib/theme';
import { GrowingTree } from './GrowingTree';

export const Hero: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 600], [0, prefersReduced ? 0 : 80]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.14, delayChildren: 0.5 },
    },
  };

  const lineVariants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 60, filter: 'blur(10px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ONLY the Growing Tree — nothing else */}
      <GrowingTree opacity={0.8} scale={1.5} />

      {/* Soft vignette so text stays readable */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)] pointer-events-none opacity-60" />

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 pt-32 pb-16">
        {/* Ambient Glow */}
        <div className="hero-glow" style={{ width: 800, height: 800, top: '35%', left: '50%', transform: 'translate(-50%, -50%)' }} />

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 md:mb-8 relative z-10"
        >
          <Eyebrow>00 — Est. 2024 — Studio</Eyebrow>
        </motion.div>

        {/* Headline with parallax */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: headlineY }}
          className="text-center max-w-6xl mx-auto relative z-10"
        >
          <h1 className="font-display font-medium tracking-tight leading-[0.9]">
            <motion.span variants={lineVariants} className="block text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem]">
              Where
            </motion.span>
            <motion.span variants={lineVariants} className="block text-7xl sm:text-8xl md:text-9xl lg:text-[9rem] xl:text-[11rem] gradient-text italic" style={{ lineHeight: 0.95 }}>
              Brands
            </motion.span>
            <motion.span variants={lineVariants} className="block text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem]">
              Begin.
            </motion.span>
          </h1>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="w-16 h-px bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mt-8 mb-8 relative z-10 origin-left"
        />

        {/* Supporting Text */}
        <SectionReveal delay={1.0} className="max-w-md text-center relative z-10">
          <p className="text-base md:text-lg text-[var(--text-muted)] font-body leading-relaxed">
            We design brands and websites that make people stop scrolling — and start trusting.
          </p>
        </SectionReveal>

        {/* Buttons */}
        <SectionReveal delay={1.2} className="mt-8 flex flex-wrap items-center justify-center gap-4 relative z-10">
          <GradientButton variant="filled" href="#portfolio">See Our Work</GradientButton>
          <GradientButton variant="outline" href="#contact">Book a Free Call</GradientButton>
        </SectionReveal>
      </div>

      <div className="border-t border-[var(--border-color)]" />
    </section>
  );
};
