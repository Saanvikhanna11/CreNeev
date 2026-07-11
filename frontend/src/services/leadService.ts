export type PackageType = 'START' | 'ELEVATE' | 'PERSONALISE';

export type CreateLeadData = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  package: PackageType;
  timeline?: string;
  projectDetails: string;
  selectedServices?: string[];
  estimatedBudget?: string;
};

type LeadResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
  };
};

export async function submitLead(
  leadData: CreateLeadData
): Promise<LeadResponse> {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    throw new Error('Backend API URL is not configured.');
  }

  const response = await fetch(`${apiUrl}/api/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(leadData),
  });

  const result = (await response.json()) as LeadResponse;

  if (!response.ok) {
    throw new Error(
      result.message || 'Unable to submit your enquiry right now.'
    );
  }

  return result;
}