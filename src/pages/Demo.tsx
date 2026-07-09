import React from 'react';
import { useParams, Link } from 'react-router-dom';

const demos: Record<string, { name: string; subtitle: string; image: string; accent: string }> = {
  smilecraft: {
    name: 'SmileCraft',
    subtitle: 'Crafting Beautiful Smiles With Modern Dentistry',
    image: 'https://images.pexels.com/photos/5355920/pexels-photo-5355920.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
    accent: '#3B82F6',
  },
  'loop-loom': {
    name: 'Loop & Loom',
    subtitle: 'Cute Never Goes Out of Style.',
    image: 'https://images.pexels.com/photos/32655858/pexels-photo-32655858.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600',
    accent: '#EC4899',
  },
  bakery: { name: 'Bakery', subtitle: 'Fresh Baked Daily', image: '/images/demo-bakery.jpg', accent: '#D97706' },
  gym: { name: 'Gym', subtitle: 'Transform Your Body', image: '/images/demo-gym.jpg', accent: '#2563EB' },
  boutiques: { name: 'Boutiques', subtitle: 'Curated Style', image: '/images/demo-boutique.jpg', accent: '#7C3AED' },
  'flower-shops': { name: 'Flower Shops', subtitle: 'Blooms for Every Moment', image: '/images/demo-flowers.jpg', accent: '#059669' },
};

export const DemoPage: React.FC = () => {
  const { slug } = useParams();
  const demo = demos[slug || ''] || demos.smilecraft;

  return (
    <section className="min-h-screen pt-28 px-6 lg:px-8 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden border border-[var(--border-color)] bg-[var(--card-bg)] shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-color)] bg-[var(--surface)]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl" style={{ backgroundColor: demo.accent }} />
            <div>
              <h1 className="font-display text-2xl font-medium">{demo.name}</h1>
              <p className="text-xs text-[var(--text-muted)] font-body">Live demo preview</p>
            </div>
          </div>
          <Link to="/portfolio" className="rounded-full border border-[var(--border-color)] px-4 py-2 text-sm font-body hover:border-[var(--gradient-start)] transition-colors">Back to Portfolio</Link>
        </div>
        <div className="relative min-h-[70vh] flex items-center px-8 md:px-16 py-16 overflow-hidden">
          <img src={demo.image} alt={demo.name} className="absolute inset-0 w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          <div className="relative z-10 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70 mb-5">{demo.name}</p>
            <h2 className="font-display text-5xl md:text-7xl font-medium text-white leading-[0.95]">{demo.subtitle}</h2>
            <button className="mt-8 rounded-full px-6 py-3 text-sm font-body font-semibold text-white" style={{ backgroundColor: demo.accent }}>Primary CTA</button>
          </div>
        </div>
      </div>
    </section>
  );
};