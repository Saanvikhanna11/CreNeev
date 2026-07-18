export const PACKAGES = ['Start', 'Elevate', 'Personalise'] as const;
export const LEAD_STATUSES = [
  'New',
  'Contacted',
  'Discovery Call',
  'Proposal Sent',
  'Accepted',
  'In Progress',
  'Completed',
  'Rejected',
] as const;

export type PackageName = (typeof PACKAGES)[number];
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  industry: string;
  package: PackageName;
  status: LeadStatus;
  timeline: string;
  budget: string;
  selectedServices: string[];
  description: string;
  adminNotes: string;
  createdAt: string;
}

export interface LeadFilters {
  search: string;
  package: PackageName | 'All';
  status: LeadStatus | 'All';
}