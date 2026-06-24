import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, MapPin, BarChart3, Fuel, ShieldAlert, Bot,
  BookOpen, FileText, Siren, Bell, Settings, LogOut,
  Search, Sun, Moon, ChevronLeft, Menu, X, User as UserIcon,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { getUser, setUser, defaultUser, type User } from "@/lib/auth";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const nav: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/map", label: "Live Traffic Map", icon: MapPin },
  { to: "/dashboard/analytics", label: "Traffic Analytics", icon: BarChart3 },
  { to: "/dashboard/fuel", label: "Fuel Prediction", icon: Fuel },
  { to: "/dashboard/accident", label: "Accident Prevention", icon: ShieldAlert },
  { to: "/dashboard/chatbot", label: "AI Chatbot", icon: Bot },
  { to: "/dashboard/rules", label: "Traffic Rules", icon: BookOpen },
  { to: "/dashboard/license", label: "License Services", icon: FileText },
  { to: "/dashboard/emergency", label: "Emergency Help", icon: Siren },
  { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];


export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [user, setU] = useState<User | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const sync = () => setU(getUser());
    sync();
    window.addEventListener("auth-change", sync);
    return () => window.removeEventListener("auth-change", sync);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 z-40 h-screen ${collapsed ? "w-20" : "w-64"} transition-all duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} bg-sidebar/80 backdrop-blur-xl border-r border-sidebar-border flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!collapsed && <Logo />}
          <button className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/5" onClick={() => setCollapsed(c => !c)}>
            <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
          <button className="lg:hidden p-1.5 rounded-lg hover:bg-white/5" onClick={() => setMobileOpen(false)}>
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all relative ${
                  active
                    ? "bg-gradient-to-r from-primary/20 to-secondary/10 text-foreground neon-border-cyan"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {active && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-secondary shadow-[0_0_12px_oklch(0.78_0.18_200)]" />}
                <item.icon className={`h-4 w-4 ${active ? "text-secondary" : ""}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => { setUser(null); window.location.href = "/login"; }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 glass-strong border-b border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <button className="lg:hidden p-2 rounded-lg hover:bg-white/5" onClick={() => setMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md px-3 py-2 rounded-xl bg-input/30 border border-border focus-within:neon-border-cyan">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input placeholder="Search routes, signals, alerts…" className="flex-1 bg-transparent outline-none text-sm" />
              <kbd className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-white/5">⌘K</kbd>
            </div>
            <div className="flex-1 md:hidden" />
            <button className="p-2 rounded-lg hover:bg-white/5 relative" onClick={() => (window.location.href = "/dashboard/notifications")}>
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive animate-pulse" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/5" onClick={() => setDark(d => !d)}>
              {dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button onClick={() => setProfileOpen(true)} className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full glass hover:neon-border-cyan transition-all">
              <span className="hidden sm:block text-xs text-muted-foreground">{user?.firstName}</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary grid place-items-center text-xs font-bold text-primary-foreground overflow-hidden">
                {user?.photo ? <img src={user.photo} className="h-full w-full object-cover" alt=""/> : (user?.firstName?.[0] ?? "U")}
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Floating chatbot */}
      {pathname !== "/dashboard/chatbot" && (
        <Link to="/dashboard/chatbot" className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-to-br from-primary to-secondary grid place-items-center shadow-[0_0_30px_oklch(0.78_0.18_200/0.6)] hover:scale-110 transition-transform animate-pulse-glow">
          <Bot className="h-6 w-6 text-primary-foreground" />
        </Link>
      )}

      {/* Profile slide-over */}
      <AnimatePresence>
        {profileOpen && user && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm" onClick={() => setProfileOpen(false)} />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-sidebar/95 backdrop-blur-2xl border-l border-sidebar-border overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-lg">My Profile</h3>
                  <button onClick={() => setProfileOpen(false)} className="p-1.5 rounded-lg hover:bg-white/5"><X className="h-4 w-4" /></button>
                </div>
                <div className="text-center">
                  <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px] animate-pulse-glow">
                    <div className="h-full w-full rounded-full bg-background grid place-items-center overflow-hidden">
                      {user.photo ? <img src={user.photo} className="h-full w-full object-cover" alt=""/> : <UserIcon className="h-10 w-10 text-muted-foreground"/>}
                    </div>
                  </div>
                  <h4 className="mt-4 font-display text-xl">{user.firstName} {user.lastName}</h4>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/10 text-[10px] uppercase tracking-widest text-secondary border border-secondary/30">● Commander · Active</div>
                </div>

                <Section title="Personal Information" items={[
                  ["Full Name", `${user.firstName} ${user.lastName}`],
                  ["Email", user.email],
                  ["Mobile", user.mobile],
                  ["RTO Number", user.rto],
                  ["Member Since", "Jan 2025"],
                ]} />

                <Section title="Vehicle Information" items={[
                  ["Vehicle No.", "MH-12-XY-9876"],
                  ["Type", "Sedan"],
                  ["Fuel", "Petrol"],
                  ["Insurance", "Active · 2026"],
                  ["PUC", "Valid · 2025"],
                ]} />

                <Section title="License Information" items={[
                  ["License No.", "MH0420190001234"],
                  ["Type", "LMV · MCWG"],
                  ["Expiry", "12 Aug 2032"],
                ]} />

                <Section title="User Analytics" items={[
                  ["Fuel Saved", "184 L"],
                  ["Routes Searched", "327"],
                  ["Alerts Received", "42"],
                  ["Safety Score", "94 / 100"],
                ]} />

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <Link to="/dashboard/profile" onClick={() => setProfileOpen(false)} className="px-3 py-2 rounded-xl glass text-sm text-center hover:bg-white/10">View Profile</Link>
                  <Link to="/dashboard/profile/edit" onClick={() => setProfileOpen(false)} className="px-3 py-2 rounded-xl glass text-sm text-center hover:bg-white/10">Edit Profile</Link>
                  <Link to="/dashboard/settings" onClick={() => setProfileOpen(false)} className="px-3 py-2 rounded-xl glass text-sm text-center hover:bg-white/10">Settings</Link>
                  <button onClick={() => { setUser(null); window.location.href = "/login"; }} className="px-3 py-2 rounded-xl bg-destructive/10 border border-destructive/40 text-destructive text-sm hover:bg-destructive/20">Logout</button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div className="mt-6">
      <div className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-2">{title}</div>
      <div className="glass rounded-xl p-3 space-y-2">
        {items.map(([k, v]) => (
          <div key={k} className="flex justify-between text-xs">
            <span className="text-muted-foreground">{k}</span>
            <span className="text-foreground text-right">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <div className="mb-6">
      {eyebrow && <div className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-2">{eyebrow}</div>}
      <h1 className="font-display text-2xl md:text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}
