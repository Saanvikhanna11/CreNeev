import React from 'react';
import { motion } from 'framer-motion';

export const GrowingTree: React.FC<{ opacity?: number; scale?: number }> = ({ 
  opacity = 0.4,
  scale = 1 
}) => {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-visible pointer-events-none">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{ duration: 2.5 }}
        className="w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center"
        style={{ transform: `scale(${scale})` }}
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full overflow-visible scale-125 lg:scale-150">
          <defs>
            <filter id="treeGlow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Main Trunk */}
          <motion.path
            d="M50 100 C 50 80, 50 60, 50 40"
            stroke="var(--gradient-start)"
            strokeWidth="1"
            filter="url(#treeGlow)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
          {/* Dynamic Branching Structure */}
          {[
            "M50 85 C 40 70, 20 65, 15 45",
            "M50 80 C 60 70, 80 65, 85 45",
            "M50 65 C 40 55, 30 50, 25 30",
            "M50 60 C 60 55, 70 50, 75 30",
            "M50 45 C 50 35, 45 25, 40 10",
            "M50 45 C 50 35, 55 25, 60 10"
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="var(--gradient-start)"
              strokeWidth="0.6"
              opacity="0.8"
              filter="url(#treeGlow)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 4, delay: 0.8 + i * 0.4, ease: "easeInOut" }}
            />
          ))}
          {/* Glowing Buds */}
          {[
            {cx:15, cy:45}, {cx:85, cy:45}, {cx:25, cy:30}, 
            {cx:75, cy:30}, {cx:40, cy:10}, {cx:60, cy:10}
          ].map((p, i) => (
            <motion.circle
              key={i}
              cx={p.cx}
              cy={p.cy}
              r="1.5"
              fill="var(--gradient-end)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 3.5 + i * 0.3, duration: 1.5 }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
};
