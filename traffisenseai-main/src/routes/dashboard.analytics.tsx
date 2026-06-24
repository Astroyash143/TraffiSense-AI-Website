import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Traffic Analytics · TrafficSense AI" }] }),
  component: AnalyticsPage,
});

const week = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i) => ({ d, vol: 60+i*8+Math.random()*20, ai: 40+i*6+Math.random()*15 }));
const sig = Array.from({length: 12}, (_,i) => ({ s: `JN-${100+i}`, density: Math.round(30+Math.random()*70) }));
const conf = [{ name: "AI", value: 96, fill: "oklch(0.78 0.18 200)" }];

function AnalyticsPage() {
  return (
    <div>
      <PageHeader eyebrow="Analytics" title="Traffic intelligence analytics" subtitle="Network-wide performance, signal density and AI confidence." />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Weekly Volume" className="lg:col-span-2 h-72">
          <ResponsiveContainer><AreaChart data={week}>
            <defs>
              <linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.72 0.21 250)" stopOpacity={0.6}/><stop offset="100%" stopColor="oklch(0.72 0.21 250)" stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid stroke="oklch(1 0 0 / 0.05)"/><XAxis dataKey="d" stroke="oklch(0.7 0.04 250)" tick={{fontSize:10}}/><YAxis stroke="oklch(0.7 0.04 250)" tick={{fontSize:10}}/>
            <Tooltip contentStyle={{ background: "oklch(0.16 0.05 262)", border: "1px solid oklch(0.4 0.08 255 / 0.4)", borderRadius: 8 }}/>
            <Area dataKey="vol" stroke="oklch(0.72 0.21 250)" fill="url(#a)" strokeWidth={2}/>
            <Area dataKey="ai" stroke="oklch(0.65 0.24 305)" fill="oklch(0.65 0.24 305 / 0.2)" strokeWidth={2}/>
          </AreaChart></ResponsiveContainer>
        </Card>
        <Card title="AI Confidence" className="h-72">
          <ResponsiveContainer><RadialBarChart innerRadius="70%" outerRadius="100%" data={conf} startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0,100]} tick={false}/>
            <RadialBar background={{ fill: "oklch(1 0 0 / 0.05)" } as any} dataKey="value" cornerRadius={20}/>
          </RadialBarChart></ResponsiveContainer>
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="text-center"><div className="font-display text-4xl gradient-text">96%</div><div className="text-xs text-muted-foreground uppercase tracking-widest">RL Agent</div></div>
          </div>
        </Card>
        <Card title="Signal Density" className="lg:col-span-2 h-72">
          <ResponsiveContainer><BarChart data={sig}>
            <CartesianGrid stroke="oklch(1 0 0 / 0.05)"/><XAxis dataKey="s" stroke="oklch(0.7 0.04 250)" tick={{fontSize:10}}/><YAxis stroke="oklch(0.7 0.04 250)" tick={{fontSize:10}}/>
            <Tooltip contentStyle={{ background: "oklch(0.16 0.05 262)", border: "1px solid oklch(0.4 0.08 255 / 0.4)", borderRadius: 8 }}/>
            <Bar dataKey="density" fill="oklch(0.78 0.18 200)" radius={[6,6,0,0]}/>
          </BarChart></ResponsiveContainer>
        </Card>
        <Card title="Optimization gain" className="h-72">
          <ResponsiveContainer><LineChart data={week}>
            <CartesianGrid stroke="oklch(1 0 0 / 0.05)"/><XAxis dataKey="d" stroke="oklch(0.7 0.04 250)" tick={{fontSize:10}}/><YAxis stroke="oklch(0.7 0.04 250)" tick={{fontSize:10}}/>
            <Tooltip contentStyle={{ background: "oklch(0.16 0.05 262)", border: "1px solid oklch(0.4 0.08 255 / 0.4)", borderRadius: 8 }}/>
            <Line dataKey="vol" stroke="oklch(0.65 0.24 305)" strokeWidth={2} dot={false}/>
          </LineChart></ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, className = "", children }: any) {
  return (
    <div className={`relative glass-strong rounded-2xl p-5 ${className}`}>
      <div className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-3">{title}</div>
      <div className="absolute inset-x-5 bottom-5 top-12">{children}</div>
    </div>
  );
}
