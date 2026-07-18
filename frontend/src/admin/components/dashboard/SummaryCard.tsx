import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function SummaryCard({ label, value, icon: Icon, index }: { label: string; value: number; icon: LucideIcon; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.055, duration: 0.3 }} whileHover={{ y: -3 }} className="group relative overflow-hidden rounded-[22px] border border-white/[0.075] bg-surface-dark/75 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-md transition-colors hover:border-blue-400/20">
      <div className="absolute -right-7 -top-8 h-28 w-28 rounded-full bg-blue-600/[0.07] blur-2xl transition group-hover:bg-blue-600/[0.12]" />
      <div className="relative flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-blue-300"><Icon className="h-[18px] w-[18px]" /></span>
        <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-dark/70">Enquiries</span>
      </div>
      <div className="relative mt-7">
        <p className="font-display text-[34px] leading-none text-ghost">{value.toLocaleString()}</p>
        <p className="mt-2 text-sm text-muted-dark">{label}</p>
      </div>
    </motion.div>
  );
}