import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./lib/theme";
import { CustomCursor, ScrollProgress, LoadingScreen } from "./components/UI";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { ServicesPage } from "./pages/Services";
import { IndustriesPage } from "./pages/Industries";
import { PortfolioPage } from "./pages/Portfolio";
import { ProcessPage } from "./pages/Process";
import { PricingPage } from "./pages/Pricing";
import { AboutPage } from "./pages/About";
import { ContactPage } from "./pages/Contact";
import { DemoPage } from "./pages/Demo";

import { Navigate } from "react-router-dom";

import { LeadProvider } from "./admin/hooks/useLeads";
import { AdminLayout } from "./admin/layouts/AdminLayout";

import { Login } from "./admin/pages/Login";
import { Dashboard } from "./admin/pages/Dashboard";
import { Leads } from "./admin/pages/Leads";
import { Settings } from "./admin/pages/Settings";

const AppContent: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="industries" element={<IndustriesPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="process" element={<ProcessPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="demo/:slug" element={<DemoPage />} />
          </Route>

          <Route path="/admin/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <LeadProvider>
                <AdminLayout />
              </LeadProvider>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
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
