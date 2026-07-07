import React from 'react';
import { SectionReveal, Eyebrow } from './UI';
import { useTilt } from '../lib/theme';

const projects = [
  {
    name: 'Clinic',
    type: 'Medical & Healthcare',
    image: '/images/demo-clinic.jpg',
    color: '#0D9488',
  },
  {
    name: 'Crochet Studio',
    type: 'Artisanal & Handmade',
    image: '/images/demo-crochet.jpg',
    color: '#71717A',
  },
  {
    name: 'Bakery',
    type: 'Food & Artisan',
    image: '/images/demo-bakery.jpg',
    color: '#D97706',
  },
  {
    name: 'Gym',
    type: 'Fitness & Wellness',
    image: '/images/demo-gym.jpg',
    color: '#2563EB',
  },
  {
    name: 'Boutiques',
    type: 'Fashion & Retail',
    image: '/images/demo-boutique.jpg',
    color: '#7C3AED',
  },
  {
    name: 'Flower Shops',
    type: 'Floral & Events',
    image: '/images/demo-flowers.jpg',
    color: '#059669',
  },
];

const ProjectCard: React.FC<{
  project: typeof projects[0];
  index: number;
}> = ({ project, index }) => {
  const tiltRef = useTilt(4) as React.RefObject<HTMLDivElement>;

  return (
    <SectionReveal delay={index * 0.1}>
      <div ref={tiltRef} className="tilt-card group cursor-pointer">
        <div className="browser-mockup">
          {/* Browser Chrome */}
          <div className="browser-chrome">
            <div className="flex gap-1.5">
              <div className="browser-dot bg-red-400" />
              <div className="browser-dot bg-yellow-400" />
              <div className="browser-dot bg-green-400" />
            </div>
            <div className="flex-1 mx-4">
              <div className="h-6 bg-[var(--surface)] rounded-md flex items-center px-3">
                <span className="font-mono text-[10px] text-[var(--text-muted)] truncate">
                  {project.name.toLowerCase().replace(/\s/g, '')}.com
                </span>
              </div>
            </div>
            <div className="w-12" />
          </div>

          {/* Browser Content - Actual Website Screenshot */}
          <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface)]">
            <img
              src={project.image}
              alt={`${project.name} website demo`}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* View Project overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="px-5 py-2.5 rounded-full bg-white/90 text-sm font-body font-semibold text-[var(--charcoal)] backdrop-blur-sm">
                View Project
              </span>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="mt-5 flex items-center justify-between px-1">
          <div>
            <h3 className="font-display text-lg md:text-xl font-medium group-hover:text-[var(--gradient-start)] transition-colors duration-300">
              {project.name}
            </h3>
            <span className="text-sm text-[var(--text-muted)] font-body">{project.type}</span>
          </div>
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: project.color }}
          />
        </div>
      </div>
    </SectionReveal>
  );
};

export const FeaturedWork: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 lg:px-8 border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="mb-16">
          <Eyebrow className="block mb-4">04 — Featured Work</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
            Selected{' '}
            <span className="italic gradient-text">first impressions.</span>
          </h2>
        </SectionReveal>

        {/* 6 Project Cards in 2-column grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
