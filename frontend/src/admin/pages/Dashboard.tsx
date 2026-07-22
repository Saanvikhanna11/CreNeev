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
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-violet-300/80">
          01 - Overview
        </p>
        <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl tracking-[-0.02em] text-ghost sm:text-[38px]">
              Good afternoon, <span className="brand-text italic">Saanvi.</span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-dark">
              Here is the pulse of your pipeline — every enquiry that has landed on CreNeev.
            </p>
          </div>
          <p className="text-xs text-muted-dark">Updated just now</p>
        </div>
      </section>

      {error ? (
        <div className="admin-panel-glass rounded-[20px]">
          <ErrorState onRetry={() => void refresh()} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => <SummarySkeleton key={index} />)
            : summaries.map((item, index) => <SummaryCard key={item.label} {...item} index={index} />)}
        </div>
      )}

      <section className="admin-panel-glass overflow-hidden rounded-[20px]">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-5 sm:px-6">
          <div>
            <h3 className="font-display text-xl tracking-[-0.01em]">Recent leads</h3>
            <p className="mt-1 text-xs text-muted-dark">The latest enquiries submitted to CreNeev.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/leads')}>
            View all leads <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        {isLoading ? <TableSkeleton rows={5} /> : <LeadTable compact leads={leads.slice(0, 5)} onView={setSelectedLead} />}
      </section>

      <LeadDrawer lead={selectedLead} open={Boolean(selectedLead)} onClose={() => setSelectedLead(null)} onSave={updateLead} />
    </div>
  );
}
