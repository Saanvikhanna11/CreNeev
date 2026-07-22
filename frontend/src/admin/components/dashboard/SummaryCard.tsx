import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function SummaryCard({ label, value, icon: Icon, index }: { label: string; value: number; icon: LucideIcon; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.055, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      className="admin-summary-card group relative overflow-hidden p-5"
    >
      <div className="admin-summary-glow absolute -right-7 -top-8 h-28 w-28 rounded-full blur-2xl" />
      <div className="relative flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/[0.08] text-violet-300">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-muted-dark/70">
          Enquiries
        </span>
      </div>
      <div className="relative mt-7">
        <p className="font-display text-[34px] leading-none text-ghost">{value.toLocaleString()}</p>
        <p className="mt-2 text-sm text-muted-dark">{label}</p>
      </div>
    </motion.div>
  );
}
