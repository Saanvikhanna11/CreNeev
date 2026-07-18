import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getLeads, removeLead, saveLead } from '../services/leads';
import type { Lead } from '../../types/lead';

interface LeadContextValue {
  leads: Lead[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  updateLead: (lead: Lead) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
}

const LeadContext = createContext<LeadContextValue | null>(null);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setLeads(await getLeads());
    } catch {
      setError('We could not load your enquiries. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const updateLead = useCallback(async (lead: Lead) => {
    const updated = await saveLead(lead);
    setLeads((current) => current.map((item) => item.id === updated.id ? updated : item));
  }, []);

  const deleteLead = useCallback(async (id: string) => {
    await removeLead(id);
    setLeads((current) => current.filter((lead) => lead.id !== id));
  }, []);

  const value = useMemo(() => ({ leads, isLoading, error, refresh, updateLead, deleteLead }), [leads, isLoading, error, refresh, updateLead, deleteLead]);

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) throw new Error('useLeads must be used inside LeadProvider');
  return context;
}