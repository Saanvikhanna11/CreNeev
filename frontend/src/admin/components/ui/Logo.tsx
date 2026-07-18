import { cn } from '../../utils/cn';

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn('flex items-center gap-3 text-ghost', className)} aria-label="CreNeev Admin">
      <svg viewBox="0 0 42 42" className="h-9 w-9 shrink-0" fill="none" aria-hidden="true">
        <path d="M33.5 9.5v23L9 10.2v21.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29.5 6.5A16 16 0 1 0 32 32.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      {!compact && (
        <div className="min-w-0">
          <div className="font-display text-[25px] leading-none tracking-[-0.02em]">CreNeev</div>
          <div className="mt-1 text-[8px] font-medium uppercase tracking-[0.3em] text-muted-dark">Admin</div>
        </div>
      )}
    </div>
  );
}