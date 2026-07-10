import React from 'react';
import { motion } from 'framer-motion';
import { SectionReveal, Eyebrow } from './UI';

const industries = [
  {
    name: 'Restaurants',
    col: 'md:col-span-1',
    row: 'md:row-span-2',
    height: 'h-[220px] md:h-full',
    image: 'https://images.pexels.com/photos/9556512/pexels-photo-9556512.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overlayColor: 'from-rose-950/60',
  },
  {
    name: 'Cafés',
    col: 'md:col-span-1',
    row: '',
    height: 'h-[200px]',
    image: 'https://images.pexels.com/photos/36484101/pexels-photo-36484101.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overlayColor: 'from-amber-950/60',
  },
  {
    name: 'Clinics',
    col: 'md:col-span-1',
    row: '',
    height: 'h-[200px]',
    image: 'https://images.pexels.com/photos/4173250/pexels-photo-4173250.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overlayColor: 'from-teal-950/60',
  },
  {
    name: 'Salons',
    col: 'md:col-span-1',
    row: 'md:row-span-2',
    height: 'h-[220px] md:h-full',
    image: 'https://images.pexels.com/photos/7195812/pexels-photo-7195812.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overlayColor: 'from-pink-950/60',
  },
  {
    name: 'Gyms',
    col: 'md:col-span-1',
    row: '',
    height: 'h-[200px]',
    image: 'https://images.pexels.com/photos/6739958/pexels-photo-6739958.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overlayColor: 'from-red-950/60',
  },
  {
    name: 'Real Estate',
    col: 'md:col-span-1',
    row: '',
    height: 'h-[200px]',
    image: 'https://images.pexels.com/photos/8134821/pexels-photo-8134821.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overlayColor: 'from-slate-950/60',
  },
  {
    name: 'Bakeries',
    col: 'md:col-span-1',
    row: '',
    height: 'h-[200px]',
    image: 'https://images.pexels.com/photos/17593891/pexels-photo-17593891.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overlayColor: 'from-orange-950/60',
  },
  {
    name: 'Local Services',
    col: 'md:col-span-1',
    row: '',
    height: 'h-[200px]',
    image: 'https://images.pexels.com/photos/16243258/pexels-photo-16243258.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overlayColor: 'from-blue-950/60',
  },
  {
    name: 'Boutiques',
    col: 'md:col-span-1',
    row: 'md:row-span-2',
    height: 'h-[220px] md:h-full',
    image: 'https://images.pexels.com/photos/8386643/pexels-photo-8386643.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overlayColor: 'from-violet-950/60',
  },
  {
    name: 'Your Business',
    col: 'md:col-span-1',
    row: '',
    height: 'h-[200px]',
    image: 'https://images.pexels.com/photos/16323586/pexels-photo-16323586.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    overlayColor: 'from-indigo-950/60',
  },
];

export const Industries: React.FC = () => {
  return (
    <section id="industries" className="py-24 md:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionReveal className="mb-16">
          <Eyebrow className="block mb-4">01 — Industries</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
            Built for the businesses{' '}
            <span className="italic gradient-text">people talk about.</span>
          </h2>
        </SectionReveal>

        {/* Equal tile grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.55,
                delay: i * 0.06,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative rounded-2xl overflow-hidden cursor-pointer group h-[190px] md:h-[220px]"
            >
              {/* Photo */}
              <img
                src={industry.image}
                alt={industry.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Permanent dark gradient so text always readable */}
              <div className={`absolute inset-0 bg-gradient-to-t ${industry.overlayColor} via-black/20 to-black/10`} />

              {/* Extra dark overlay that fades in on hover for contrast */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-6">
                <motion.span
                  className="font-display text-lg md:text-xl font-medium text-white drop-shadow-sm"
                  initial={false}
                >
                  {industry.name}
                </motion.span>
              </div>

              {/* Gradient border glow on hover */}
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-white/20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
