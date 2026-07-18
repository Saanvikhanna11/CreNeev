import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export function Dropdown({ trigger, children, align = 'right', side = 'bottom', width = 'w-52' }: { trigger: ReactNode; children: ReactNode; align?: 'left' | 'right'; side?: 'top' | 'bottom'; width?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div onClick={() => setOpen((current) => !current)}>{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: side === 'bottom' ? -6 : 6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: side === 'bottom' ? -4 : 4, scale: 0.98 }} transition={{ duration: 0.15 }} onClick={() => setOpen(false)} className={cn('absolute z-50 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0d111a]/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl', side === 'bottom' ? 'top-[calc(100%+10px)]' : 'bottom-[calc(100%+10px)]', align === 'right' ? 'right-0' : 'left-0', width)}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DropdownItem({ icon: Icon, children, danger, onClick }: { icon?: React.ComponentType<{ className?: string }>; children: ReactNode; danger?: boolean; onClick?: () => void }) {
  return <button onClick={onClick} className={cn('flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition', danger ? 'text-red-300 hover:bg-red-500/10' : 'text-zinc-300 hover:bg-white/[0.055] hover:text-white')}>{Icon && <Icon className="h-4 w-4" />}{children}</button>;
}