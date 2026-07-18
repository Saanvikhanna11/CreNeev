import { useState } from 'react';
import { motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

 return (
  <div className="bg-abyss text-ghost">
    <Sidebar
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
    />

    <div
      className={`${
        collapsed ? "md:ml-[82px]" : "md:ml-[244px]"
      } flex min-h-screen flex-col transition-all duration-300`}
    >
      <Header onMenu={() => setMobileOpen(true)} />

      <main className="relative flex-1 overflow-y-auto">
        <div className="architectural-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute -top-52 left-1/2 h-[440px] w-[700px] -translate-x-1/2 rounded-full bg-blue-700/[0.08] blur-[120px]" />

        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[1500px] p-4 sm:p-6 lg:p-8 xl:p-10"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  </div>
);
}