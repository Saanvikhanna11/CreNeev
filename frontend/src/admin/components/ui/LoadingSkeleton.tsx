import { cn } from '../../utils/cn';

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('relative overflow-hidden rounded-lg bg-white/[0.055] after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.5s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/[0.055] after:to-transparent', className)} />;
}

export function SummarySkeleton() {
  return <div className="rounded-[22px] border border-white/[0.07] bg-surface-dark/70 p-5"><div className="flex justify-between"><Skeleton className="h-10 w-10 rounded-xl" /><Skeleton className="h-3 w-14" /></div><Skeleton className="mt-8 h-8 w-16" /><Skeleton className="mt-2 h-3 w-24" /></div>;
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return <div className="space-y-1 p-3">{Array.from({ length: rows }).map((_, index) => <div key={index} className="grid grid-cols-[1.5fr_1fr_1fr_90px] gap-5 rounded-xl px-4 py-4"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-2/3" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-4 w-full" /></div>)}</div>;
}