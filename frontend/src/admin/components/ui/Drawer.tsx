import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export function Drawer({ open, onClose, title, eyebrow, children, footer }: { open: boolean; onClose: () => void; title: string; eyebrow?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <AnimatePresence>
      {open && <div className="fixed inset-0 z-[70]">
        <motion.button aria-label="Close drawer" className="absolute inset-0 bg-black/70 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
        <motion.aside role="dialog" aria-modal="true" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="absolute inset-y-0 right-0 flex w-full max-w-[540px] flex-col border-l border-white/[0.08] bg-[#0b0f17]/98 shadow-[-30px_0_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
          <header className="flex items-start justify-between border-b border-white/[0.07] px-5 py-5 sm:px-7">
            <div>{eyebrow && <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-blue-400">{eyebrow}</p>}<h2 className="font-display text-2xl text-ghost">{title}</h2></div>
            <button onClick={onClose} className="rounded-xl border border-transparent p-2 text-muted-dark transition hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-ghost"><X className="h-5 w-5" /></button>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7">{children}</div>
          {footer && <footer className="flex flex-col-reverse gap-3 border-t border-white/[0.07] bg-[#0b0f17]/90 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">{footer}</footer>}
        </motion.aside>
      </div>}
    </AnimatePresence>
  );
}