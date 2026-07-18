import { format } from 'date-fns';
import { Ellipsis, Eye, RefreshCcw, Trash2 } from 'lucide-react';
import type { Lead } from '../../types/lead';
import { Avatar } from '../ui/Avatar';
import { PackageBadge, StatusBadge } from '../ui/Badges';
import { Button } from '../ui/Button';
import { Dropdown, DropdownItem } from '../ui/Dropdown';
import { EmptyState } from '../ui/EmptyState';
import { Pagination } from '../ui/Pagination';

interface LeadTableProps {
  leads: Lead[];
  compact?: boolean;
  page?: number;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onView: (lead: Lead) => void;
  onStatus?: (lead: Lead) => void;
  onDelete?: (lead: Lead) => void;
  onClearFilters?: () => void;
}

export function LeadTable({ leads, compact, page = 1, totalPages = 1, totalItems = leads.length, pageSize = 6, onPageChange, onView, onStatus, onDelete, onClearFilters }: LeadTableProps) {
  if (leads.length === 0) {
    return <EmptyState title={onClearFilters ? 'No search results' : 'No leads yet'} description={onClearFilters ? 'Try a different search term or clear the active filters.' : 'New client enquiries will appear here as soon as they arrive.'} actionLabel={onClearFilters ? 'Clear filters' : undefined} onAction={onClearFilters} />;
  }

  if (compact) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">
          <thead><tr className="border-b border-white/[0.07] text-[9px] font-medium uppercase tracking-[0.2em] text-muted-dark/75"><th className="px-5 py-3.5">Name</th><th className="px-4 py-3.5">Package</th><th className="px-4 py-3.5">Status</th><th className="px-4 py-3.5">Date</th><th className="px-5 py-3.5 text-right">Action</th></tr></thead>
          <tbody>{leads.map((lead) => <tr key={lead.id} className="group border-b border-white/[0.05] transition hover:bg-white/[0.018] last:border-0"><td className="px-5 py-4"><div className="flex items-center gap-3"><Avatar name={lead.name} size="sm" /><div><p className="text-sm font-medium text-zinc-200">{lead.name}</p><p className="mt-0.5 text-[11px] text-muted-dark">{lead.business}</p></div></div></td><td className="px-4 py-4"><PackageBadge name={lead.package} /></td><td className="px-4 py-4"><StatusBadge status={lead.status} /></td><td className="whitespace-nowrap px-4 py-4 text-xs text-muted-dark">{format(new Date(lead.createdAt), 'dd MMM yyyy')}</td><td className="px-5 py-4 text-right"><Button size="sm" variant="ghost" onClick={() => onView(lead)}>View</Button></td></tr>)}</tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-[448px] overflow-x-auto">
        <table className="w-full min-w-[1180px] text-left">
          <thead><tr className="border-b border-white/[0.07] text-[9px] font-medium uppercase tracking-[0.18em] text-muted-dark/75"><th className="px-5 py-4">Name</th><th className="px-4 py-4">Email</th><th className="px-4 py-4">Phone</th><th className="px-4 py-4">Business</th><th className="px-4 py-4">Industry</th><th className="px-4 py-4">Package</th><th className="px-4 py-4">Status</th><th className="px-4 py-4">Date</th><th className="px-5 py-4 text-right">Actions</th></tr></thead>
          <tbody>{leads.map((lead, index) => (
            <tr key={lead.id} className="group border-b border-white/[0.05] transition-colors hover:bg-white/[0.018] last:border-0">
              <td className="px-5 py-4"><div className="flex items-center gap-3"><Avatar name={lead.name} size="sm" /><div><p className="whitespace-nowrap text-sm font-medium text-zinc-200">{lead.name}</p><p className="mt-0.5 text-[10px] text-muted-dark/70">{lead.id}</p></div></div></td>
              <td className="px-4 py-4 text-xs text-muted-dark">{lead.email}</td>
              <td className="whitespace-nowrap px-4 py-4 text-xs text-muted-dark">{lead.phone}</td>
              <td className="px-4 py-4 text-xs text-zinc-300">{lead.business}</td>
              <td className="whitespace-nowrap px-4 py-4 text-xs text-muted-dark">{lead.industry}</td>
              <td className="px-4 py-4"><PackageBadge name={lead.package} /></td>
              <td className="px-4 py-4"><StatusBadge status={lead.status} /></td>
              <td className="whitespace-nowrap px-4 py-4 text-xs text-muted-dark">{format(new Date(lead.createdAt), 'dd MMM yyyy')}</td>
              <td className="px-5 py-4 text-right"><Dropdown side={index >= leads.length - 2 ? 'top' : 'bottom'} trigger={<button className="rounded-lg p-2 text-muted-dark transition hover:bg-white/[0.06] hover:text-ghost" aria-label={`Actions for ${lead.name}`}><Ellipsis className="h-[18px] w-[18px]" /></button>}><DropdownItem icon={Eye} onClick={() => onView(lead)}>View details</DropdownItem>{onStatus && <DropdownItem icon={RefreshCcw} onClick={() => onStatus(lead)}>Change status</DropdownItem>}{onDelete && <DropdownItem icon={Trash2} danger onClick={() => onDelete(lead)}>Delete lead</DropdownItem>}</Dropdown></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {onPageChange && <Pagination page={page} totalPages={totalPages} totalItems={totalItems} pageSize={pageSize} onPageChange={onPageChange} />}
    </>
  );
}