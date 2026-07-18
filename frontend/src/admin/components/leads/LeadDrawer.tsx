import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Building2, CalendarDays, CircleDollarSign, Clock3, Mail, Phone, UserRound } from 'lucide-react';
import type { Lead, LeadStatus } from '../../types/lead';
import { LEAD_STATUSES } from '../../types/lead';
import { Button } from '../ui/Button';
import { Drawer } from '../ui/Drawer';
import { Select, Textarea } from '../ui/FormControls';
import { Skeleton } from '../ui/LoadingSkeleton';
import { PackageBadge } from '../ui/Badges';

function Detail({ icon: Icon, label, value, href }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string }) {
  const content = href ? <a href={href} className="text-sm text-zinc-200 transition hover:text-blue-300">{value}</a> : <p className="text-sm text-zinc-200">{value}</p>;
  return <div className="flex gap-3"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-muted-dark"><Icon className="h-3.5 w-3.5" /></span><div className="min-w-0"><p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-muted-dark/70">{label}</p><div className="break-words">{content}</div></div></div>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="border-b border-white/[0.065] pb-7 last:border-0"><h3 className="mb-5 text-[10px] font-medium uppercase tracking-[0.23em] text-blue-400">{title}</h3>{children}</section>;
}

export function LeadDrawer({ lead, open, loading = false, onClose, onSave }: { lead: Lead | null; open: boolean; loading?: boolean; onClose: () => void; onSave: (lead: Lead) => Promise<void> }) {
  const [status, setStatus] = useState<LeadStatus>('New');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (lead) { setStatus(lead.status); setNotes(lead.adminNotes); }
  }, [lead]);

  const save = async () => {
    if (!lead) return;
    setSaving(true);
    await onSave({ ...lead, status, adminNotes: notes });
    setSaving(false);
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose} eyebrow={lead?.id ?? 'Client enquiry'} title={loading ? 'Loading enquiry' : lead?.name ?? 'Lead details'} footer={!loading && lead ? <><Button variant="ghost" onClick={onClose}>Cancel</Button><Button variant="primary" loading={saving} onClick={() => void save()}>Save changes</Button></> : undefined}>
      {loading || !lead ? <div className="space-y-8"><Skeleton className="h-20 w-full" /><Skeleton className="h-36 w-full" /><Skeleton className="h-52 w-full" /></div> : <div className="space-y-7">
        <Section title="Client information"><div className="grid gap-5 sm:grid-cols-2"><Detail icon={UserRound} label="Name" value={lead.name} /><Detail icon={Mail} label="Email" value={lead.email} href={`mailto:${lead.email}`} /><Detail icon={Phone} label="Phone" value={lead.phone} href={`tel:${lead.phone}`} /><Detail icon={Building2} label="Business" value={lead.business} /><Detail icon={Building2} label="Industry" value={lead.industry} /></div></Section>
        <Section title="Project information"><div className="grid gap-5 sm:grid-cols-2"><div><p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-muted-dark/70">Selected package</p><PackageBadge name={lead.package} /></div><Detail icon={Clock3} label="Timeline" value={lead.timeline} /><Detail icon={CircleDollarSign} label="Estimated budget" value={lead.budget} /></div><div className="mt-6"><p className="mb-2.5 text-[10px] uppercase tracking-[0.14em] text-muted-dark/70">Selected services</p><div className="flex flex-wrap gap-2">{lead.selectedServices.map((service) => <span key={service} className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-xs text-zinc-300">{service}</span>)}</div></div><div className="mt-6"><p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-muted-dark/70">Project description</p><p className="text-sm leading-6 text-zinc-400">{lead.description}</p></div></Section>
        <Section title="Admin section"><div className="space-y-5"><Select label="Current status" value={status} onChange={(event) => setStatus(event.target.value as LeadStatus)}>{LEAD_STATUSES.map((item) => <option key={item}>{item}</option>)}</Select><Textarea label="Admin notes" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Add private notes for your team..." /><Detail icon={CalendarDays} label="Created date" value={format(new Date(lead.createdAt), 'dd MMMM yyyy, h:mm a')} /></div></Section>
      </div>}
    </Drawer>
  );
}