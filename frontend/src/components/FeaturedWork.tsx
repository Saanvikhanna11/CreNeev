import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTilt } from '../lib/theme';

type Project = {
  id: string;
  name: string;
  industry: string;
  services: string[];
  timeline: string;
  goal: string;
  description: string;
  outcome: string;
  challenge: string;
  solution: string;
  process: string[];
  tech: string[];
  image: string;
  size: string;
  entrance: 'left' | 'right';
};

const projects: Project[] = [
  {
    id: 'smilecraft',
    name: 'SmileCraft',
    industry: 'Healthcare · Dental',
    services: ['Brand Identity', 'Web Design', 'Local SEO'],
    timeline: '3 weeks',
    goal: "Position a new luxury dental studio as Mumbai's premier smile destination.",
    description: 'A calm, clinical-yet-warm digital home that mirrors the in-chair experience.',
    outcome: '+210% appointment bookings within 90 days of launch.',
    challenge: 'A brand-new studio entering a crowded dental market with zero recognition.',
    solution: 'A serene blue palette, doctor-first storytelling, and a frictionless booking flow that makes trust feel instant.',
    process: ['Discovery & competitor audit', 'Brand system & photography direction', 'Conversion-focused build', 'Local SEO launch'],
    tech: ['React', 'Tailwind', 'Framer Motion', 'Schema.org'],
    image: 'https://images.pexels.com/photos/5355920/pexels-photo-5355920.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
    size: 'lg:col-span-7 h-[460px] md:h-[540px]',
    entrance: 'left',
  },
  {
    id: 'looploom',
    name: 'Loop & Loom',
    industry: 'Artisanal · E-commerce',
    services: ['Brand Identity', 'Web Design', 'E-commerce'],
    timeline: '4 weeks',
    goal: 'Turn a hobby crochet studio into a loved online brand.',
    description: 'A pastel, playful storefront that feels handmade in every pixel.',
    outcome: '3× average order value in the first quarter post-launch.',
    challenge: 'A talented maker with no e-commerce experience or brand identity.',
    solution: 'A soft pastel identity, storytelling product pages, and a joyful one-tap checkout.',
    process: ['Brand workshop', 'Playful UI system', 'Custom storefront', 'Launch & email flows'],
    tech: ['React', 'Shopify API', 'GSAP', 'Custom CMS'],
    image: 'https://images.pexels.com/photos/32655858/pexels-photo-32655858.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400',
    size: 'lg:col-span-5 h-[460px] md:h-[540px]',
    entrance: 'right',
  },
  {
    id: 'crustcrumb',
    name: 'Crust & Crumb',
    industry: 'Food & Beverage',
    services: ['Web Design', 'Photography', 'Local SEO'],
    timeline: '2 weeks',
    goal: 'Become the first result for "best bakery near me".',
    description: 'Warm, mouth-watering visuals with lightning-fast local discovery.',
    outcome: '#1 local pack ranking within 6 weeks.',
    challenge: 'A beloved neighbourhood bakery that was invisible online.',
    solution: 'A story-rich homepage, a menu micro-site, and a fully optimised Google Business profile.',
    process: ['Local SEO audit', 'Editorial photography shoot', 'Mobile-first build', 'Review generation system'],
    tech: ['Astro', 'Tailwind', 'Schema.org', 'Cloudflare'],
    image: '/images/demo-bakery.jpg',
    size: 'lg:col-span-5 h-[440px] md:h-[500px]',
    entrance: 'left',
  },
  {
    id: 'ironform',
    name: 'Ironform',
    industry: 'Fitness & Wellness',
    services: ['Brand Identity', 'Web Design', 'Membership System'],
    timeline: '3 weeks',
    goal: 'Convert website visitors into paying gym members.',
    description: 'A high-energy dark UI with a membership funnel that actually converts.',
    outcome: '+68% trial-to-paid member conversion.',
    challenge: 'Plenty of traffic, almost no sign-ups.',
    solution: 'A bold identity, trainer-led storytelling, and a streamlined free-trial signup flow.',
    process: ['Funnel audit', 'Bold rebrand', 'Membership flow build', 'Retargeting setup'],
    tech: ['React', 'Stripe', 'Memberstack', 'Analytics'],
    image: '/images/demo-gym.jpg',
    size: 'lg:col-span-7 h-[440px] md:h-[500px]',
    entrance: 'right',
  },
  {
    id: 'ateliernoir',
    name: 'Atelier Noir',
    industry: 'Fashion · Retail',
    services: ['Brand Identity', 'E-commerce', 'Art Direction'],
    timeline: '5 weeks',
    goal: 'Launch a fashion label with a flagship digital boutique.',
    description: 'An editorial black-and-white storefront with runway-grade photography.',
    outcome: 'Sold out the debut collection in 72 hours.',
    challenge: 'An unknown label entering a saturated fashion market.',
    solution: 'An editorial identity, lookbook-driven product pages, and a VIP early-access drop flow.',
    process: ['Art direction', 'Editorial identity system', 'Headless commerce build', 'Drop-launch campaign'],
    tech: ['Next.js', 'Sanity', 'Shopify', 'Framer Motion'],
    image: '/images/demo-boutique.jpg',
    size: 'lg:col-span-6 h-[440px] md:h-[480px]',
    entrance: 'left',
  },
  {
    id: 'petalstem',
    name: 'Petal & Stem',
    industry: 'Floral · Events',
    services: ['Web Design', 'E-commerce', 'SEO'],
    timeline: '3 weeks',
    goal: 'Make same-day flower delivery effortless to order online.',
    description: 'A soft, romantic UX with a delivery-first checkout.',
    outcome: '2.4× online orders within the first month.',
    challenge: 'A florist still taking most orders over the phone.',
    solution: 'Occasion-led browsing, an address-first checkout, and a smart delivery calendar.',
    process: ['UX research', 'Occasion taxonomy', 'Delivery-aware build', 'Local SEO'],
    tech: ['React', 'Stripe', 'Google Maps API', 'Custom CMS'],
    image: '/images/demo-flowers.jpg',
    size: 'lg:col-span-6 h-[440px] md:h-[480px]',
    entrance: 'right',
  },
];

/* ────────────────────────────────────────────────────────────
   Project Card
   ──────────────────────────────────────────────────────────── */
const ProjectCard: React.FC<{ project: Project; index: number; onOpen: () => void }> = ({ project, index, onOpen }) => {
  const tiltRef = useTilt(4) as React.RefObject<HTMLDivElement>;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, x: project.entrance === 'left' ? -40 : 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative rounded-[1.75rem] overflow-hidden text-left cursor-pointer ${project.size} md:col-span-6 col-span-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gradient-start)]`}
      style={{ perspective: 1200 }}
    >
      <div ref={tiltRef} className="tilt-card absolute inset-0 rounded-[1.75rem] overflow-hidden border border-[var(--border-color)] bg-[var(--card-bg)]" style={{ transformStyle: 'preserve-3d' }}>
        {/* Image */}
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />

        {/* Permanent gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        {/* Glass overlay on hover with details */}
        <div className="absolute inset-0 bg-[var(--bg)]/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--gradient-start)]/10 via-transparent to-[var(--gradient-end)]/10" />
          <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-[var(--text)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[var(--text-muted)] mb-2">{project.industry}</p>
                <h3 className="font-display text-2xl md:text-3xl font-medium">{project.name}</h3>
              </div>
              <span className="shrink-0 w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)]/70 backdrop-blur flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text)]">
                  <path d="M3 11l8-8M5 3h6v6" />
                </svg>
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md">{project.description}</p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-1.5">Services</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.services.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)]/60 text-[var(--text)] text-[10px] md:text-[11px]">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-1.5">Timeline</p>
                  <p className="text-[var(--text)] text-sm font-medium">{project.timeline}</p>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]/60 px-3.5 py-2.5">
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[var(--gradient-start)] mb-1">Business Outcome</p>
                <p className="text-sm text-[var(--text)] font-medium leading-snug">{project.outcome}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Default (non-hover) content */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
          <p className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/70 mb-2">{project.industry}</p>
          <h3 className="font-display text-2xl md:text-3xl font-medium text-white mb-2">{project.name}</h3>
          <p className="text-sm text-white/80 max-w-md">{project.description}</p>
        </div>

        {/* Animated border on hover */}
        <span className="absolute inset-0 rounded-[1.75rem] p-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'conic-gradient(from 0deg, var(--gradient-start), var(--gradient-end), transparent 50%, var(--gradient-start))', animation: 'slow-spin 8s linear infinite', WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />

        {/* Ambient glow on hover */}
        <div className="absolute inset-0 rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: '0 40px 80px -20px color-mix(in srgb, var(--gradient-start) 35%, transparent), inset 0 1px 0 rgba(255,255,255,0.1)' }} />
      </div>
    </motion.button>
  );
};

/* ────────────────────────────────────────────────────────────
   Case study modal
   ──────────────────────────────────────────────────────────── */
const CaseStudyModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[60] flex items-start md:items-center justify-center p-0 md:p-6 overflow-y-auto"
      style={{ background: 'color-mix(in srgb, var(--bg) 80%, transparent)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl my-0 md:my-8 rounded-none md:rounded-[2rem] border border-[var(--border-color)] bg-[var(--card-bg)] overflow-hidden shadow-[0_50px_120px_-30px_rgba(0,0,0,0.5)]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close case study"
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)]/70 backdrop-blur flex items-center justify-center text-[var(--text)] hover:bg-[var(--surface)] transition-colors duration-300"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        {/* Hero image */}
        <div className="relative h-56 md:h-96 overflow-hidden">
          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-[var(--card-bg)]/40 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-6 md:p-10">
            <p className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[var(--gradient-start)] mb-2">{project.industry}</p>
            <h2 className="font-display text-4xl md:text-6xl font-medium text-[var(--text)] tracking-tight">{project.name}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-10 space-y-10">
          {/* Meta row */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]/50 backdrop-blur p-4">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-2">Timeline</p>
              <p className="font-display text-lg text-[var(--text)]">{project.timeline}</p>
            </div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]/50 backdrop-blur p-4">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-2">Services</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.services.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[11px] text-[var(--text)]">{s}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]/50 backdrop-blur p-4">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--gradient-start)] mb-2">Outcome</p>
              <p className="font-display text-lg text-[var(--text)] leading-snug">{project.outcome}</p>
            </div>
          </div>

          {/* Goal */}
          <GlassBlock title="Business Goal" body={project.goal} />

          {/* Challenge + Solution */}
          <div className="grid md:grid-cols-2 gap-4">
            <GlassBlock title="The Challenge" body={project.challenge} accent="warm" />
            <GlassBlock title="The Solution" body={project.solution} accent="cool" />
          </div>

          {/* Process */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]/40 backdrop-blur p-6 md:p-8">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-5">Design Process</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.process.map((step, i) => (
                <div key={step} className="relative pl-6">
                  <span className="absolute left-0 top-1 font-mono text-xs text-[var(--gradient-start)]">0{i + 1}</span>
                  <p className="text-sm text-[var(--text)] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech */}
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] mr-2">Technology</p>
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-xs text-[var(--text)]">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const GlassBlock: React.FC<{ title: string; body: string; accent?: 'warm' | 'cool' }> = ({ title, body, accent }) => (
  <div className="relative rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]/40 backdrop-blur p-6 md:p-8 overflow-hidden">
    {accent === 'warm' && <div className="absolute -top-16 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gradient-start) 18%, transparent), transparent 70%)' }} />}
    {accent === 'cool' && <div className="absolute -bottom-16 -left-10 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gradient-end) 18%, transparent), transparent 70%)' }} />}
    <p className="relative font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-3">{title}</p>
    <p className="relative text-base md:text-lg text-[var(--text)] font-body leading-relaxed">{body}</p>
  </div>
);

/* ────────────────────────────────────────────────────────────
   SECTION
   ──────────────────────────────────────────────────────────── */
export const FeaturedWork: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = projects.find((p) => p.id === activeId) || null;

  return (
    <section id="portfolio" className="relative py-24 md:py-32 px-6 lg:px-8 overflow-hidden">
      {/* Top blend */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/70 to-transparent pointer-events-none" />

      {/* Ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gradient-start) 10%, transparent), transparent 70%)' }} />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gradient-end) 10%, transparent), transparent 70%)' }} />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px] pointer-events-none"
        animate={{ x: ['-10%', '10%', '-10%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--gradient-end) 6%, transparent), transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] mb-6"
            >
              04 — Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]"
            >
              Projects that speak
              <br />
              <span className="italic gradient-text">louder than words.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-sm text-base text-[var(--text-muted)] font-body leading-relaxed"
          >
            Real businesses, real transformations. Explore the stories behind the work — from first conversation to measurable outcome.
          </motion.p>
        </div>

        {/* Editorial asymmetric grid */}
        <div className="grid grid-cols-12 gap-5 md:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setActiveId(p.id)} />
          ))}
        </div>
      </div>

      {/* Bottom blend */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[var(--bg)] pointer-events-none" />

      {/* Case study modal */}
      <AnimatePresence>
        {activeProject && <CaseStudyModal project={activeProject} onClose={() => setActiveId(null)} />}
      </AnimatePresence>
    </section>
  );
};
