import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  Settings,
  UsersRound,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../components/ui/Logo";
import { cn } from "../utils/cn";

const items = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Leads", to: "/admin/leads", icon: UsersRound },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

function SidebarBody({
  collapsed,
  onCollapse,
  onNavigate,
  mobile,
}: {
  collapsed: boolean;
  onCollapse?: () => void;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <div className="relative flex h-full flex-col border-r border-white/[0.07] bg-[#090c12]/95 backdrop-blur-xl">
      <div
        className={cn(
          "flex h-[88px] items-center border-b border-white/[0.055] px-6",
          collapsed && "justify-center px-3",
        )}
      >
        <Logo compact={collapsed} />
        {mobile && (
          <button
            onClick={onNavigate}
            className="ml-auto rounded-xl p-2 text-muted-dark hover:bg-white/[0.05] hover:text-ghost"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="px-3 py-7">
        {!collapsed && (
          <p className="mb-3 px-3 text-[9px] font-medium uppercase tracking-[0.28em] text-muted-dark/65">
            Workspace
          </p>
        )}
        <nav className="space-y-1.5">
          {items.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "group relative flex h-11 items-center gap-3 rounded-xl px-3 text-sm text-muted-dark transition-all duration-200 hover:bg-white/[0.04] hover:text-ghost",
                  isActive &&
                    "bg-white/[0.065] text-ghost shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]",
                  collapsed && "justify-center px-0",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      "absolute left-0 h-5 w-0.5 rounded-full bg-blue-500 opacity-0 shadow-[0_0_10px_rgba(37,99,235,0.9)] transition",
                      isActive && "opacity-100",
                    )}
                  />
                  <Icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0 transition",
                      isActive && "text-blue-400",
                    )}
                  />
                  {!collapsed && <span>{label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-white/[0.055] p-3">
        <button
          onClick={() => navigate("/admin/login")}
          className={cn(
            "flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm text-muted-dark transition hover:bg-red-500/[0.07] hover:text-red-300",
            collapsed && "justify-center px-0",
          )}
        >
          <LogOut className="h-[18px] w-[18px]" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {!mobile && (
        <button
          onClick={onCollapse}
          className="absolute -right-3.5 top-[118px] z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.1] bg-[#10141d] text-muted-dark shadow-xl transition hover:border-white/[0.18] hover:text-ghost"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={cn(
              "h-3.5 w-3.5 transition-transform",
              collapsed && "rotate-180",
            )}
          />
        </button>
      )}
    </div>
  );
}

export function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}) {
  return (
    <>
      <aside
        className={cn(
          "hidden fixed left-0 top-0 z-40 h-screen shrink-0 transition-[width] duration-300 md:block",
          collapsed ? "w-[82px]" : "w-[244px]",
        )}
      >
        <SidebarBody
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        />
      </aside>
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[90] md:hidden">
            <motion.button
              aria-label="Close navigation"
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="absolute inset-y-0 left-0 w-[280px]"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <SidebarBody
                collapsed={false}
                mobile
                onNavigate={() => setMobileOpen(false)}
              />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
