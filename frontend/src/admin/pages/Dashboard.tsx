import { ArrowRight, CheckCircle2, PhoneCall, UserRoundPlus, UsersRound } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { LeadDrawer } from '../components/leads/LeadDrawer';
import { LeadTable } from '../components/leads/LeadTable';
import { Button } from '../components/ui/Button';
import { ErrorState } from '../components/ui/EmptyState';
import { SummarySkeleton, TableSkeleton } from '../components/ui/LoadingSkeleton';
import { useLeads } from '../hooks/useLeads';
import type { Lead } from '../types/lead';

export function Dashboard() {
  const navigate = useNavigate();
  const { leads, isLoading, error, refresh, updateLead } = useLeads();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const summaries = [
    { label: 'Total Leads', value: leads.length, icon: UsersRound },
    { label: 'New Leads', value: leads.filter((lead) => lead.status === 'New').length, icon: UserRoundPlus },
    { label: 'Contacted', value: leads.filter((lead) => lead.status === 'Contacted').length, icon: PhoneCall },
    { label: 'Accepted', value: leads.filter((lead) => lead.status === 'Accepted').length, icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-8 pb-4">
      <section>
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-blue-400">01 - Overview</p>
        <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div><h2 className="font-display text-3xl tracking-[-0.02em] text-ghost sm:text-[38px]">Your enquiries, <span className="brand-text italic">at a glance.</span></h2><p className="mt-2 text-sm text-muted-dark">A focused view of your latest client activity.</p></div>
          <p className="text-xs text-muted-dark">Updated just now</p>
        </div>
      </section>

      {error ? <div className="rounded-[24px] border border-white/[0.07] bg-surface-dark/70"><ErrorState onRetry={() => void refresh()} /></div> : <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{isLoading ? Array.from({ length: 4 }).map((_, index) => <SummarySkeleton key={index} />) : summaries.map((item, index) => <SummaryCard key={item.label} {...item} index={index} />)}</div>}

      <section className="overflow-hidden rounded-[24px] border border-white/[0.075] bg-surface-dark/75 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-5 sm:px-6">
          <div><h3 className="font-display text-xl">Recent leads</h3><p className="mt-1 text-xs text-muted-dark">The latest enquiries submitted to CreNeev.</p></div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/leads')}>View all leads <ArrowRight className="h-4 w-4" /></Button>
        </div>
        {isLoading ? <TableSkeleton rows={5} /> : <LeadTable compact leads={leads.slice(0, 5)} onView={setSelectedLead} />}
      </section>

      <LeadDrawer lead={selectedLead} open={Boolean(selectedLead)} onClose={() => setSelectedLead(null)} onSave={updateLead} />
    </div>
  );
}