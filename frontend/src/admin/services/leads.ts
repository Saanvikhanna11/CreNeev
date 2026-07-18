import type { Lead } from '../types/lead';

const mockLeads: Lead[] = [
  {
    id: 'CRN-1028', name: 'Ananya Mehta', email: 'ananya@aureliaskin.in', phone: '+91 98765 21430',
    business: 'Aurelia Skin Studio', industry: 'Clinics', package: 'Elevate', status: 'New',
    timeline: '6-8 weeks', budget: 'INR 18,000 - 24,000',
    selectedServices: ['Website design', 'SEO optimisation', 'WhatsApp integration'],
    description: 'A refined website for a new dermatology studio with treatment pages, appointment enquiries, and a calm editorial feel.',
    adminNotes: 'Strong fit for Elevate. Ask about photography during the first call.', createdAt: '2026-05-19T11:25:00.000Z',
  },
  {
    id: 'CRN-1027', name: 'Rohan Kapoor', email: 'rohan@northstarcoffee.co', phone: '+91 99881 42018',
    business: 'Northstar Coffee', industry: 'Cafes', package: 'Start', status: 'Contacted',
    timeline: '3-4 weeks', budget: 'INR 6,000 - 10,000',
    selectedServices: ['Website design', 'Google Maps integration'],
    description: 'A concise brand website for a specialty coffee shop opening in Chandigarh.',
    adminNotes: 'Replied on WhatsApp. Call scheduled for Thursday.', createdAt: '2026-05-18T15:40:00.000Z',
  },
  {
    id: 'CRN-1026', name: 'Mira Shah', email: 'mira@ateliermira.com', phone: '+91 98900 63514',
    business: 'Atelier Mira', industry: 'Boutiques', package: 'Personalise', status: 'Accepted',
    timeline: '10-12 weeks', budget: 'INR 45,000+',
    selectedServices: ['Brand identity', 'Custom website', 'Content direction'],
    description: 'A custom editorial commerce experience for a made-to-order fashion label.',
    adminNotes: 'Proposal approved. Awaiting signed agreement.', createdAt: '2026-05-17T09:15:00.000Z',
  },
  {
    id: 'CRN-1025', name: 'Kabir Arora', email: 'kabir@formfitness.in', phone: '+91 98150 38220',
    business: 'Form Fitness', industry: 'Gyms', package: 'Elevate', status: 'Discovery Call',
    timeline: '6 weeks', budget: 'INR 15,000 - 20,000',
    selectedServices: ['Website design', 'SEO optimisation', 'Lead forms'],
    description: 'A conversion-led website for a premium strength and conditioning studio.',
    adminNotes: 'Wants membership enquiry flow discussed on the call.', createdAt: '2026-05-16T13:05:00.000Z',
  },
  {
    id: 'CRN-1024', name: 'Ishita Verma', email: 'ishita@noonbakery.in', phone: '+91 98720 74152',
    business: 'Noon Bakery', industry: 'Bakery', package: 'Start', status: 'Proposal Sent',
    timeline: '4 weeks', budget: 'INR 8,000 - 12,000',
    selectedServices: ['Website design', 'WhatsApp integration'],
    description: 'A warm, image-led brochure website for a small-batch bakery.',
    adminNotes: 'Proposal sent on 16 May. Follow up next Monday.', createdAt: '2026-05-15T17:30:00.000Z',
  },
  {
    id: 'CRN-1023', name: 'Dev Malhotra', email: 'dev@malhotraspaces.com', phone: '+91 99142 88310',
    business: 'Malhotra Spaces', industry: 'Real Estate', package: 'Personalise', status: 'In Progress',
    timeline: '12 weeks', budget: 'INR 60,000+',
    selectedServices: ['Brand strategy', 'Custom website', 'CMS architecture'],
    description: 'A portfolio-led platform for a boutique property development studio.',
    adminNotes: 'Homepage direction approved. Moving into inner pages.', createdAt: '2026-05-13T10:10:00.000Z',
  },
  {
    id: 'CRN-1022', name: 'Sara Gill', email: 'sara@thequietroom.in', phone: '+91 98155 90247',
    business: 'The Quiet Room', industry: 'Salons', package: 'Elevate', status: 'Accepted',
    timeline: '7 weeks', budget: 'INR 20,000 - 25,000',
    selectedServices: ['Website design', 'Local SEO', 'Copywriting'],
    description: 'A quiet luxury website for a private hair and beauty studio.',
    adminNotes: 'Deposit expected this week.', createdAt: '2026-05-11T14:45:00.000Z',
  },
  {
    id: 'CRN-1021', name: 'Arjun Sethi', email: 'arjun@sethiandsons.in', phone: '+91 98888 01337',
    business: 'Sethi & Sons', industry: 'Local Services', package: 'Start', status: 'Completed',
    timeline: '3 weeks', budget: 'INR 7,500',
    selectedServices: ['Static website', 'Google Maps integration'],
    description: 'A dependable local presence for a family-run electrical business.',
    adminNotes: 'Launched. One week support window active.', createdAt: '2026-05-09T12:20:00.000Z',
  },
  {
    id: 'CRN-1020', name: 'Naina Bose', email: 'naina@boselegal.in', phone: '+91 98310 77645',
    business: 'Bose Legal', industry: 'Professional Services', package: 'Elevate', status: 'Contacted',
    timeline: '8 weeks', budget: 'INR 25,000 - 30,000',
    selectedServices: ['Website design', 'Copywriting', 'SEO optimisation'],
    description: 'A credible, modern website for an independent commercial law practice.',
    adminNotes: 'Requested examples from professional services.', createdAt: '2026-05-07T08:55:00.000Z',
  },
  {
    id: 'CRN-1019', name: 'Vikram Rao', email: 'vikram@raiwellness.com', phone: '+91 98450 66281',
    business: 'Rai Wellness', industry: 'Clinics', package: 'Personalise', status: 'Rejected',
    timeline: '12 weeks', budget: 'INR 20,000',
    selectedServices: ['Custom website', 'Booking integration'],
    description: 'A wellness booking platform with multiple practitioner calendars.',
    adminNotes: 'Scope and available budget did not align.', createdAt: '2026-05-05T16:10:00.000Z',
  },
  {
    id: 'CRN-1018', name: 'Tara Menon', email: 'tara@junipertable.in', phone: '+91 98470 11529',
    business: 'Juniper Table', industry: 'Restaurants', package: 'Elevate', status: 'New',
    timeline: '6-7 weeks', budget: 'INR 18,000 - 22,000',
    selectedServices: ['Website design', 'Menu CMS', 'Local SEO'],
    description: 'A seasonal restaurant website with an easy-to-update menu and reservation links.',
    adminNotes: '', createdAt: '2026-05-03T11:35:00.000Z',
  },
  {
    id: 'CRN-1017', name: 'Harsh Bedi', email: 'harsh@bedidental.in', phone: '+91 98140 44317',
    business: 'Bedi Dental', industry: 'Clinics', package: 'Start', status: 'Completed',
    timeline: '4 weeks', budget: 'INR 9,000',
    selectedServices: ['Website design', 'WhatsApp integration', 'Google Maps integration'],
    description: 'A clear clinic website designed around treatments and quick appointment enquiries.',
    adminNotes: 'Project complete and handed over.', createdAt: '2026-04-29T09:40:00.000Z',
  },
];

const wait = (duration = 450) => new Promise((resolve) => window.setTimeout(resolve, duration));

export async function getLeads(): Promise<Lead[]> {
  await wait();
  return structuredClone(mockLeads);
}

export async function saveLead(lead: Lead): Promise<Lead> {
  await wait(240);
  return structuredClone(lead);
}

export async function removeLead(_id: string): Promise<void> {
  await wait(240);
}