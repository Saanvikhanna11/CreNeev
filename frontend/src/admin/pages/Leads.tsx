import { RefreshCw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LeadDrawer } from '../components/leads/LeadDrawer';
import { LeadTable } from '../components/leads/LeadTable';
import { Button } from '../components/ui/Button';
import { ErrorState } from '../components/ui/EmptyState';
import { Select } from '../components/ui/FormControls';
import { TableSkeleton } from '../components/ui/LoadingSkeleton';
import { Modal } from '../components/ui/Modal';
import { SearchBar } from '../components/ui/SearchBar';
import { useLeads } from '../hooks/useLeads';
import { LEAD_STATUSES, PACKAGES } from '../types/lead';
import type { Lead, LeadStatus, PackageName } from '../types/lead';

const PAGE_SIZE = 6;

export function Leads() {
  const [searchParams] = useSearchParams();
  const { leads, isLoading, error, refresh, updateLead, deleteLead } = useLeads();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [packageFilter, setPackageFilter] = useState<PackageName | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [statusLead, setStatusLead] = useState<Lead | null>(null);
  const [nextStatus, setNextStatus] = useState<LeadStatus>('New');
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { setPage(1); }, [search, packageFilter, statusFilter]);

  const filtered = useMemo(() => leads.filter((lead) => {
    const term = search.toLowerCase().trim();
    const matchesSearch = !term || [lead.name, lead.email, lead.phone, lead.business, lead.industry].some((value) => value.toLowerCase().includes(term));
    return matchesSearch && (packageFilter === 'All' || lead.package === packageFilter) && (statusFilter === 'All' || lead.status === statusFilter);
  }), [leads, search, packageFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visibleLeads = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage((current) => Math.min(current, totalPages)); }, [totalPages]);

  const clearFilters = () => { setSearch(''); setPackageFilter('All'); setStatusFilter('All'); };
  const openStatus = (lead: Lead) => { setStatusLead(lead); setNextStatus(lead.status); };
  const saveStatus = async () => { if (!statusLead) return; setBusy(true); await updateLead({ ...statusLead, status: nextStatus }); setBusy(false); setStatusLead(null); };
  const confirmDelete = async () => { if (!deleteTarget) return; setBusy(true); await deleteLead(deleteTarget.id); setBusy(false); setDeleteTarget(null); };

  return (
    <div className="space-y-7 pb-4">
      <section><p className="text-[10px] font-medium uppercase tracking-[0.28em] text-blue-400">02 - Client enquiries</p><h2 className="mt-3 font-display text-3xl tracking-[-0.02em] sm:text-[38px]">Manage every <span className="brand-text italic">new possibility.</span></h2><p className="mt-2 text-sm text-muted-dark">Search, review, and update incoming project enquiries.</p></section>

      <section className="overflow-visible rounded-[24px] border border-white/[0.075] bg-surface-dark/75 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-md">
        <div className="flex flex-col gap-3 border-b border-white/[0.07] p-4 lg:flex-row lg:items-center">
          <SearchBar value={search} onChange={setSearch} placeholder="Search name, email, business..." className="w-full lg:max-w-sm" />
          <div className="grid flex-1 grid-cols-2 gap-3 sm:flex sm:justify-end">
            <Select aria-label="Filter by package" value={packageFilter} onChange={(event) => setPackageFilter(event.target.value as PackageName | 'All')} className="sm:w-40"><option value="All">All packages</option>{PACKAGES.map((name) => <option key={name}>{name}</option>)}</Select>
            <Select aria-label="Filter by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as LeadStatus | 'All')} className="sm:w-44"><option value="All">All statuses</option>{LEAD_STATUSES.map((status) => <option key={status}>{status}</option>)}</Select>
            <Button variant="secondary" size="icon" onClick={() => void refresh()} disabled={isLoading} aria-label="Refresh leads"><RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /></Button>
          </div>
        </div>

        {error ? <ErrorState onRetry={() => void refresh()} /> : isLoading ? <TableSkeleton rows={6} /> : <LeadTable leads={visibleLeads} page={page} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage} onView={setSelectedLead} onStatus={openStatus} onDelete={setDeleteTarget} onClearFilters={filtered.length === 0 && Boolean(search || packageFilter !== 'All' || statusFilter !== 'All') ? clearFilters : undefined} />}
      </section>

      <LeadDrawer lead={selectedLead} open={Boolean(selectedLead)} onClose={() => setSelectedLead(null)} onSave={updateLead} />

      <Modal open={Boolean(statusLead)} onClose={() => setStatusLead(null)} title="Change lead status" description={statusLead ? `Update the current stage for ${statusLead.name}.` : undefined}>
        <Select label="New status" value={nextStatus} onChange={(event) => setNextStatus(event.target.value as LeadStatus)}>{LEAD_STATUSES.map((status) => <option key={status}>{status}</option>)}</Select>
        <div className="mt-6 flex justify-end gap-3"><Button variant="ghost" onClick={() => setStatusLead(null)}>Cancel</Button><Button variant="primary" loading={busy} onClick={() => void saveStatus()}>Update status</Button></div>
      </Modal>

      <Modal open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Delete this lead?" description={deleteTarget ? `${deleteTarget.name}'s enquiry will be removed from this workspace. This action cannot be undone.` : undefined}>
        <div className="flex justify-end gap-3"><Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button><Button variant="danger" loading={busy} onClick={() => void confirmDelete()}>Delete lead</Button></div>
      </Modal>
    </div>
  );
}