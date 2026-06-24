import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity, Fuel, ShieldAlert, Bot, MapPin, Route as RouteIcon, Siren, CloudRain, TrendingUp, TrendingDown,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/Shell";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line, BarChart, Bar, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Command Center · TrafficSense AI" }] }),
  component: DashboardHome,
});

const trafficData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  flow: 30 + Math.round(40 * Math.sin(i / 3) + (i > 7 && i < 11 ? 50 : 0) + (i > 17 && i < 20 ? 60 : 0) + Math.random() * 10),
  ai: 25 + Math.round(30 * Math.sin(i / 3) + (i > 7 && i < 11 ? 25 : 0) + (i > 17 && i < 20 ? 30 : 0) + Math.random() * 8),
}));

const fuelData = Array.from({ length: 7 }, (_, i) => ({ d: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i], saved: 8 + Math.round(Math.random()*16) }));

function DashboardHome() {
  return (
    <div>
      <PageHeader eyebrow="Command Center" title="Traffic Intelligence Overview" subtitle="Real-time signals, predictions and AI recommendations across the network." />

      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi title="Active Signals" value="4,238" delta="+2.4%" icon={Activity} trend="up" />
        <Kpi title="Live Vehicles" value="128.4K" delta="+8.1%" icon={RouteIcon} trend="up" />
        <Kpi title="Avg Congestion" value="34%" delta="-12%" icon={TrendingDown} trend="down" good />
        <Kpi title="AI Confidence" value="96.2%" delta="+0.4%" icon={Bot} trend="up" />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        {/* Traffic chart */}
        <Link to="/dashboard/analytics" className="lg:col-span-2 glass-strong neon-border rounded-2xl p-6 hover:bg-white/[0.04] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">Traffic Overview</div>
              <h3 className="font-display text-lg mt-1">24h flow vs AI optimized</h3>
            </div>
            <span className="text-xs text-muted-foreground">● live</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.18 200)" stopOpacity={0.6}/>
                    <stop offset="100%" stopColor="oklch(0.78 0.18 200)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.24 305)" stopOpacity={0.5}/>
                    <stop offset="100%" stopColor="oklch(0.65 0.24 305)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="hour" stroke="oklch(0.7 0.04 250)" tick={{ fontSize: 10 }} />
                <YAxis stroke="oklch(0.7 0.04 250)" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "oklch(0.16 0.05 262)", border: "1px solid oklch(0.4 0.08 255 / 0.4)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="flow" stroke="oklch(0.78 0.18 200)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="ai" stroke="oklch(0.65 0.24 305)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Link>

        {/* AI recs */}
        <div className="glass-strong rounded-2xl p-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-accent">AI Recommendations</div>
          <h3 className="font-display text-lg mt-1">Live decisions</h3>
          <div className="mt-4 space-y-3">
            {[
              { sig: "JN-204", action: "Extend green +12s · NB", conf: 94 },
              { sig: "JN-118", action: "Flush queue · Phase 3", conf: 88 },
              { sig: "JN-077", action: "Hold red +6s · Pedestrian", conf: 91 },
              { sig: "JN-301", action: "Adaptive cycle · 96s", conf: 97 },
            ].map(r => (
              <div key={r.sig} className="flex items-center justify-between glass rounded-xl p-3">
                <div>
                  <div className="text-xs text-muted-foreground">{r.sig}</div>
                  <div className="text-sm">{r.action}</div>
                </div>
                <div className="text-xs text-secondary font-display">{r.conf}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        {/* Heatmap (faux) */}
        <Link to="/dashboard/map" className="glass-strong rounded-2xl p-6 hover:neon-border transition-all">
          <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">Congestion Heatmap</div>
          <h3 className="font-display text-lg mt-1">City grid</h3>
          <div className="mt-4 grid grid-cols-12 gap-1">
            {Array.from({ length: 96 }).map((_, i) => {
              const v = Math.random();
              const c = v > 0.75 ? "bg-destructive/70" : v > 0.5 ? "bg-warning/70" : v > 0.25 ? "bg-secondary/60" : "bg-success/50";
              return <div key={i} className={`aspect-square rounded ${c}`} />;
            })}
          </div>
          <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
            <span>Smooth</span><span>Heavy</span>
          </div>
        </Link>

        <Link to="/dashboard/fuel" className="glass-strong rounded-2xl p-6 hover:neon-border-cyan transition-all">
          <div className="flex justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">Fuel Analytics</div>
              <h3 className="font-display text-lg mt-1">Weekly savings</h3>
            </div>
            <Fuel className="h-5 w-5 text-secondary" />
          </div>
          <div className="h-40 mt-3">
            <ResponsiveContainer>
              <BarChart data={fuelData}>
                <XAxis dataKey="d" stroke="oklch(0.7 0.04 250)" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "oklch(0.16 0.05 262)", border: "1px solid oklch(0.4 0.08 255 / 0.4)", borderRadius: 8 }}/>
                <Bar dataKey="saved" fill="oklch(0.74 0.2 150)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-2xl font-display gradient-text mt-2">184 L saved</div>
        </Link>

        <Link to="/dashboard/accident" className="glass-strong rounded-2xl p-6 hover:neon-border transition-all">
          <div className="flex justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-destructive">Accident Alerts</div>
              <h3 className="font-display text-lg mt-1">Active risk zones</h3>
            </div>
            <ShieldAlert className="h-5 w-5 text-destructive" />
          </div>
          <div className="mt-4 space-y-2">
            {[
              { z: "MG Road · Sector 4", risk: "High", c: "destructive" },
              { z: "Hwy NH-48 · KM 121", risk: "Medium", c: "warning" },
              { z: "Marine Drive Loop", risk: "Low", c: "success" },
            ].map(a => (
              <div key={a.z} className="flex justify-between glass rounded-lg p-2 text-xs">
                <span>{a.z}</span>
                <span className={`text-${a.c}`}>{a.risk}</span>
              </div>
            ))}
          </div>
        </Link>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">Weather</div>
              <h3 className="font-display text-lg mt-1">Mumbai · Live</h3>
            </div>
            <CloudRain className="h-5 w-5 text-secondary" />
          </div>
          <div className="mt-4 flex items-end gap-3">
            <div className="font-display text-5xl gradient-text">28°</div>
            <div className="text-xs text-muted-foreground mb-2">Light rain · Visibility 6km · Wind 12 km/h</div>
          </div>
          <div className="mt-3 text-xs text-warning">⚠ Slippery roads · drive with caution</div>
        </div>

        <Link to="/dashboard/map" className="glass-strong rounded-2xl p-6 hover:neon-border-cyan transition-all">
          <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">Smart Route Suggestion</div>
          <h3 className="font-display text-lg mt-1">Home → Office</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Recommended</span><span className="text-secondary">Via Coastal Rd · 22 min</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Avoid</span><span className="text-destructive">JJ Flyover · jam</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Fuel saved</span><span className="text-success">~0.8 L</span></div>
          </div>
        </Link>

        <Link to="/dashboard/emergency" className="glass-strong rounded-2xl p-6 hover:neon-border transition-all">
          <div className="text-[10px] uppercase tracking-[0.3em] text-destructive">Emergency Notifications</div>
          <h3 className="font-display text-lg mt-1">Active corridors</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 glass rounded-lg p-2"><Siren className="h-4 w-4 text-destructive"/> Ambulance · LTM Hospital · Priority</div>
            <div className="flex items-center gap-2 glass rounded-lg p-2"><MapPin className="h-4 w-4 text-warning"/> Accident · Andheri Subway</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function Kpi({ title, value, delta, icon: Icon, trend, good }: { title: string; value: string; delta: string; icon: any; trend: "up" | "down"; good?: boolean }) {
  const isGood = good ? trend === "down" : trend === "up";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-2xl p-5 hover:neon-border-cyan transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{title}</div>
          <div className="font-display text-3xl mt-2 gradient-text">{value}</div>
        </div>
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 grid place-items-center">
          <Icon className="h-5 w-5 text-secondary" />
        </div>
      </div>
      <div className={`mt-3 inline-flex items-center gap-1 text-xs ${isGood ? "text-success" : "text-destructive"}`}>
        {trend === "up" ? <TrendingUp className="h-3 w-3"/> : <TrendingDown className="h-3 w-3"/>} {delta}
      </div>
    </motion.div>
  );
}
