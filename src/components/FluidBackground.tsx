import React from 'react';
import { motion } from 'framer-motion';

export const FluidBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
      {/* Moving Liquid Blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full filter blur-[100px] bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] opacity-30"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -150, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full filter blur-[120px] bg-gradient-to-r from-[var(--gradient-end)] to-[var(--gradient-start)] opacity-20"
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -100, 0],
          scale: [1, 1.1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{ bottom: '10%', right: '10%' }}
      />

      {/* Floating Creative Scribbles (Cartoonish but Premium) */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <filter id="scribbleGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        {/* Animated Paths */}
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${10 + i * 20} ${20 + (i % 2) * 50} Q ${25 + i * 20} ${10 + (i % 2) * 20}, ${40 + i * 20} ${30 + (i % 2) * 40} T ${70 + i * 10} ${20 + (i % 2) * 60}`}
            stroke="var(--gradient-start)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            filter="url(#scribbleGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3,
            }}
          />
        ))}
      </svg>
    </div>
  );
};
