import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { Award, BookOpen, ShieldCheck, AlertOctagon } from "lucide-react";

export const Route = createFileRoute("/dashboard/rules")({
  head: () => ({ meta: [{ title: "Traffic Rules · TrafficSense AI" }] }),
  component: RulesPage,
});

const signs = [
  { c: "destructive", t: "STOP", d: "Come to a complete halt" },
  { c: "warning", t: "⚠", d: "General warning" },
  { c: "secondary", t: "→", d: "Mandatory direction" },
  { c: "destructive", t: "60", d: "Speed limit" },
  { c: "warning", t: "⛔", d: "No entry" },
  { c: "secondary", t: "P", d: "Parking allowed" },
];
const fines = [
  { v: "Without helmet", f: "₹1,000 + 3mo DL suspension" },
  { v: "Without seatbelt", f: "₹1,000" },
  { v: "Drunk driving", f: "₹10,000 + jail" },
  { v: "Overspeeding", f: "₹1,000 – ₹2,000" },
  { v: "Mobile while driving", f: "₹5,000" },
  { v: "Jumping signal", f: "₹1,000 – ₹5,000" },
];

function RulesPage() {
  return (
    <div>
      <PageHeader eyebrow="Awareness" title="Traffic rules & road safety" subtitle="Signs, fines, awareness programs and badges." />
      <div className="grid lg:grid-cols-3 gap-4">
        <Section title="Common Traffic Signs" icon={BookOpen}>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {signs.map(s => (
              <div key={s.t} className="glass rounded-xl p-3 text-center">
                <div className={`mx-auto h-12 w-12 rounded-full grid place-items-center font-display font-bold border-2 border-${s.c} text-${s.c}`}>{s.t}</div>
                <div className="text-[10px] text-muted-foreground mt-2">{s.d}</div>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Penalty Information" icon={AlertOctagon}>
          <div className="mt-3 space-y-2">
            {fines.map(f => (
              <div key={f.v} className="flex justify-between glass rounded-lg p-3 text-sm">
                <span>{f.v}</span><span className="text-destructive font-medium">{f.f}</span>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Safety Awareness" icon={ShieldCheck}>
          <ul className="mt-3 space-y-2 text-sm">
            <li>● Always wear ISI-marked helmet</li>
            <li>● Buckle up — front and back</li>
            <li>● No phones, no texting</li>
            <li>● Maintain 2-second gap</li>
            <li>● Reduce speed in fog/rain</li>
            <li>● Pedestrians always have priority</li>
          </ul>
        </Section>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <div className="glass-strong neon-border-cyan rounded-2xl p-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">Quick Quiz</div>
          <h3 className="font-display text-lg mt-1">Test your road IQ</h3>
          <p className="text-sm mt-3">A red triangular sign with an exclamation mark indicates:</p>
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            {["Mandatory action","General warning","Information","Stop"].map(o => (
              <button key={o} className="px-3 py-2 rounded-lg glass hover:bg-white/10 text-sm text-left">{o}</button>
            ))}
          </div>
        </div>
        <div className="glass-strong rounded-2xl p-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-accent">Awareness Badges</div>
          <h3 className="font-display text-lg mt-1">Your achievements</h3>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {["Helmet Hero","Eco Driver","Safety Star","Quiz Master","Smooth Rider","Zero Fines"].map(b => (
              <div key={b} className="glass rounded-xl p-3 text-center">
                <Award className="h-6 w-6 mx-auto text-secondary"/>
                <div className="text-[10px] mt-1">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children }: any) {
  return (
    <div className="glass-strong rounded-2xl p-6">
      <div className="flex items-center gap-2"><Icon className="h-4 w-4 text-secondary"/><div className="text-[10px] uppercase tracking-[0.3em] text-secondary">{title}</div></div>
      {children}
    </div>
  );
}
