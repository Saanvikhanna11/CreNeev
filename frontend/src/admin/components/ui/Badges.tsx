import { cn } from '../../utils/cn';
import type { LeadStatus, PackageName } from '../../types/lead';

const statusStyles: Record<LeadStatus, string> = {
  New: 'border-blue-400/20 bg-blue-400/10 text-blue-300',
  Contacted: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
  'Discovery Call': 'border-violet-400/20 bg-violet-400/10 text-violet-300',
  'Proposal Sent': 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300',
  Accepted: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
  'In Progress': 'border-orange-400/20 bg-orange-400/10 text-orange-300',
  Completed: 'border-teal-400/20 bg-teal-400/10 text-teal-300',
  Rejected: 'border-red-400/20 bg-red-400/10 text-red-300',
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return <span className={cn('inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium', statusStyles[status])}>{status}</span>;
}

const packageStyles: Record<PackageName, string> = {
  Start: 'border-white/10 bg-white/[0.04] text-zinc-300',
  Elevate: 'border-blue-400/20 bg-blue-400/[0.08] text-blue-300',
  Personalise: 'border-violet-400/20 bg-violet-400/[0.09] text-violet-300',
};

export function PackageBadge({ name }: { name: PackageName }) {
  return <span className={cn('inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium', packageStyles[name])}>{name}</span>;
}