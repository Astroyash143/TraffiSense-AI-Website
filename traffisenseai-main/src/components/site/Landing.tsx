import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity, MapPin, Fuel, ShieldAlert, Bot, Route, Siren,
  FileText, BookOpen, Phone, Cpu, Atom, GitBranch, BarChart3,
  ArrowRight, Sparkles, Zap, ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const features = [
  { icon: Activity, title: "Live Traffic Monitoring", desc: "Real-time city-wide congestion heatmaps.", to: "/dashboard/map" },
  { icon: Zap, title: "AI Signal Optimization", desc: "RL agents adapt signal timing dynamically.", to: "/dashboard" },
  { icon: Fuel, title: "Fuel Consumption Prediction", desc: "Predict fuel use, cost & emissions.", to: "/dashboard/fuel" },
  { icon: ShieldAlert, title: "Accident Prevention", desc: "Risk zones, overspeed and weather alerts.", to: "/dashboard/accident" },
  { icon: Route, title: "Smart Route Recommendation", desc: "Optimal routes with live ETA.", to: "/dashboard/map" },
  { icon: Bot, title: "AI Chatbot Assistant", desc: "Voice + multilingual traffic AI.", to: "/dashboard/chatbot" },
  { icon: Siren, title: "Emergency Vehicle Priority", desc: "Green corridors for ambulances.", to: "/dashboard/emergency" },
  { icon: FileText, title: "License Services", desc: "Apply, renew & locate RTOs.", to: "/dashboard/license" },
  { icon: BookOpen, title: "Traffic Rules & Awareness", desc: "Signs, fines & safety quizzes.", to: "/dashboard/rules" },
  { icon: Phone, title: "Emergency SOS", desc: "One-tap SOS with live location.", to: "/dashboard/emergency" },
];

const tech = [
  { icon: Cpu, title: "Reinforcement Learning Agent", points: ["Adaptive signal optimization", "Learns from traffic density", "Dynamic management"] },
  { icon: Atom, title: "Quantum Computing", points: ["Traffic optimization concepts", "High-speed route calculation", "Future-ready processing"] },
  { icon: GitBranch, title: "SUMO Simulation", points: ["Real-world traffic modeling", "Vehicle movement testing", "Hardware-loop validation"] },
  { icon: BarChart3, title: "AI Analytics Engine", points: ["Congestion forecasting", "Fuel optimization", "Accident risk analysis"] },
];

const flow = [
  "Traffic Data Collection",
  "SUMO Simulation",
  "RL Agent Processing",
  "Quantum Optimization",
  "AI Prediction Engine",
  "Signal Optimization",
  "User Dashboard & Smart Analytics",
];

const stats = [
  { value: 38, suffix: "%", label: "Traffic Reduced" },
  { value: 24, suffix: "%", label: "Fuel Saved" },
  { value: 47, suffix: "%", label: "Accident Risk Reduced" },
  { value: 96, suffix: "%", label: "AI Accuracy" },
  { value: 31, suffix: "%", label: "Route Efficiency" },
];

export function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-40 pb-32 px-4">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[1200px] rounded-full bg-primary/20 blur-[180px] pointer-events-none" />
        <div className="absolute top-40 right-10 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[120px] pointer-events-none animate-float" />

        <div className="relative mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border-cyan text-xs uppercase tracking-[0.3em] text-secondary mb-8"
          >
            <Sparkles className="h-3 w-3" />
            Next-gen Smart City Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-black leading-[1.05] tracking-tight"
          >
            <span className="gradient-text neon-text">TrafficSense AI</span>
            <br />
            <span className="text-foreground">Intelligent Smart Traffic</span>
            <br />
            <span className="text-muted-foreground text-3xl md:text-5xl">& Road Safety Platform</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground"
          >
            An AI-powered smart city traffic management platform using Reinforcement Learning,
            Quantum Computing concepts, and SUMO simulation for intelligent traffic optimization
            and road safety.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/dashboard" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium shadow-[0_0_40px_oklch(0.72_0.21_250/0.5)] hover:shadow-[0_0_60px_oklch(0.78_0.18_200/0.6)] transition-all">
              Explore Dashboard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/dashboard/chatbot" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-strong neon-border hover:bg-white/10 transition-all">
              <Bot className="h-4 w-4" /> Try AI Assistant
            </Link>
            <a href="#technology" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors">
              Learn More <ChevronRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Animated city visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 mx-auto max-w-5xl rounded-2xl overflow-hidden glass-strong neon-border p-2"
          >
            <CitySVG />
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative py-24 px-4">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">About the project</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Solving urban traffic with intelligent systems</h2>
            <p className="text-muted-foreground mb-4">
              Cities worldwide struggle with congestion, fuel wastage, rising accidents and poorly coordinated signals.
              TrafficSense AI brings together adaptive RL agents, quantum-inspired optimization and SUMO simulation
              to make every intersection smarter.
            </p>
            <ul className="space-y-3 mt-6">
              {["Adaptive RL traffic signal control", "Quantum-inspired route optimization", "SUMO-validated decisions", "Predictive AI for safety & fuel"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_oklch(0.78_0.18_200)]" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-3xl" />
            <div className="relative glass-strong neon-border rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { k: "1.2M+", v: "Vehicles tracked" },
                  { k: "4,200", v: "Intersections" },
                  { k: "120ms", v: "AI latency" },
                  { k: "24/7", v: "Live monitoring" },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl glass p-4">
                    <div className="font-display text-2xl gradient-text">{s.k}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section id="technology" className="relative py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="Technology" title="Built on next-gen intelligence" />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tech.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group glass-strong rounded-2xl p-6 hover:neon-border transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 grid place-items-center group-hover:scale-110 transition-transform">
                  <t.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mt-5 font-display font-bold">{t.title}</h3>
                <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                  {t.points.map((p) => <li key={p} className="flex gap-2"><span className="text-secondary">▸</span>{p}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="Features" title="Everything a smart city needs" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link to={f.to} className="block group glass rounded-2xl p-5 hover:neon-border-cyan hover:-translate-y-1 transition-all h-full">
                  <f.icon className="h-6 w-6 text-secondary group-hover:scale-110 transition-transform" />
                  <h4 className="mt-4 font-semibold text-sm">{f.title}</h4>
                  <p className="mt-2 text-xs text-muted-foreground">{f.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                    Open <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <SectionHeader eyebrow="Workflow" title="How TrafficSense AI works" />
          <div className="mt-12 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary to-transparent" />
            {flow.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex ${i % 2 === 0 ? "justify-start" : "justify-end"} mb-6`}
              >
                <div className="w-1/2 px-6">
                  <div className="glass-strong neon-border rounded-xl p-4 flex items-center gap-3">
                    <span className="font-display text-xs text-secondary">0{i + 1}</span>
                    <span className="text-sm font-medium">{step}</span>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-secondary shadow-[0_0_16px_oklch(0.78_0.18_200)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-24 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="glass-strong neon-border rounded-3xl p-10 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {stats.map((s) => (
              <Counter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4">
        <div className="mx-auto max-w-4xl text-center glass-strong rounded-3xl p-12 neon-border">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Ready to enter the AI command center?</h2>
          <p className="mt-3 text-muted-foreground">Login or create an account to access the live dashboard.</p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <Link to="/login" className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium">Login</Link>
            <Link to="/register" className="px-6 py-3 rounded-xl glass neon-border">Create account</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <div className="text-xs uppercase tracking-[0.3em] text-secondary">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">{title}</h2>
    </div>
  );
}

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div className="font-display text-4xl md:text-5xl font-bold gradient-text">
        {value}{suffix}
      </div>
      <div className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

function CitySVG() {
  return (
    <div className="relative aspect-[16/8] rounded-xl overflow-hidden bg-gradient-to-b from-background via-background to-primary/10">
      <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="road" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.72 0.21 250)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.78 0.18 200)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="oklch(0.65 0.24 305)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.21 250)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.13 0.04 260)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* horizon glow */}
        <rect x="0" y="240" width="800" height="2" fill="oklch(0.78 0.18 200)" opacity="0.6" />
        {/* buildings */}
        {Array.from({ length: 24 }).map((_, i) => {
          const x = i * 34;
          const h = 40 + (i * 31) % 110;
          return <rect key={i} x={x} y={240 - h} width={28} height={h} fill="url(#bld)" stroke="oklch(0.78 0.18 200 / 0.4)" />;
        })}
        {/* roads */}
        {[280, 320, 360].map((y, i) => (
          <g key={y}>
            <line x1="0" y1={y} x2="800" y2={y} stroke="oklch(0.4 0.08 255 / 0.4)" strokeWidth="2" />
            <line x1="0" y1={y} x2="800" y2={y} stroke="url(#road)" strokeWidth="2">
              <animate attributeName="stroke-dashoffset" from="0" to="-200" dur={`${3 + i}s`} repeatCount="indefinite" />
            </line>
          </g>
        ))}
        {/* moving cars */}
        {[280, 320, 360].map((y, i) => (
          <circle key={i} r="3" fill="oklch(0.78 0.18 200)" filter="drop-shadow(0 0 6px oklch(0.78 0.18 200))">
            <animate attributeName="cx" from="0" to="800" dur={`${4 + i}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${y};${y}`} dur={`${4 + i}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {/* signals */}
        {[200, 400, 600].map((x) => (
          <g key={x}>
            <circle cx={x} cy="240" r="6" fill="oklch(0.74 0.2 150)" filter="drop-shadow(0 0 8px oklch(0.74 0.2 150))">
              <animate attributeName="fill" values="oklch(0.74 0.2 150);oklch(0.78 0.19 75);oklch(0.65 0.25 25);oklch(0.74 0.2 150)" dur="6s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-secondary">● LIVE · TrafficSense Grid</div>
    </div>
  );
}
