import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export function Modal({ open, onClose, title, description, children }: { open: boolean; onClose: () => void; title: string; description?: string; children: ReactNode }) {
  return (
    <AnimatePresence>
      {open && <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <motion.button aria-label="Close modal" className="absolute inset-0 bg-black/75 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
        <motion.div role="dialog" aria-modal="true" initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 8 }} transition={{ duration: 0.2 }} className="glass-panel relative z-10 w-full max-w-md rounded-[24px] p-6">
          <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-2 text-muted-dark transition hover:bg-white/[0.05] hover:text-ghost"><X className="h-4 w-4" /></button>
          <h2 className="font-display text-2xl">{title}</h2>
          {description && <p className="mt-2 pr-7 text-sm leading-6 text-muted-dark">{description}</p>}
          <div className="mt-6">{children}</div>
        </motion.div>
      </div>}
    </AnimatePresence>
  );
}