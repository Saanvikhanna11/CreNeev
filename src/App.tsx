import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './lib/theme';
import { CustomCursor, ScrollProgress, LoadingScreen } from './components/UI';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Industries } from './components/Industries';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { FeaturedWork } from './components/FeaturedWork';
import { WhyCreNeev } from './components/WhyCreNeev';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { FinalCTA, Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LoadingScreen>
      <CustomCursor />
      <ScrollProgress />
      <div className="grain-overlay" />
      <Header />
      <main>
        <Hero />
        <About />
        <Industries />
        <Services />
        <Process />
        <FeaturedWork />
        <WhyCreNeev />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </LoadingScreen>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
