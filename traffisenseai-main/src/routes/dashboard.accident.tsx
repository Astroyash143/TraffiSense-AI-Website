import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Gauge, CloudRain, MapPin, Phone, Hospital, ShieldAlert, Siren } from "lucide-react";
import { PageHeader } from "@/components/dashboard/Shell";

export const Route = createFileRoute("/dashboard/accident")({
  head: () => ({ meta: [{ title: "Accident Prevention · TrafficSense AI" }] }),
  component: AccidentPage,
});

function AccidentPage() {
  return (
    <div>
      <PageHeader eyebrow="Safety" title="Accident prevention command" subtitle="Risk zones, predictions, and one-tap emergency response." />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-strong neon-border rounded-2xl p-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-destructive">High-risk zones</div>
          <h3 className="font-display text-lg mt-1">AI-predicted accident hotspots</h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {[
              { z: "MG Road · Sector 4", risk: 92, why: "Sharp curve · low visibility" },
              { z: "NH-48 · KM 121", risk: 81, why: "Frequent overspeeding" },
              { z: "Andheri Subway", risk: 74, why: "Waterlogging risk" },
              { z: "Bandra-Worli Sea Link", risk: 63, why: "High wind events" },
            ].map((r) => (
              <div key={r.z} className="glass rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{r.z}</div>
                  <span className={`text-xs ${r.risk>80?"text-destructive":r.risk>70?"text-warning":"text-secondary"}`}>{r.risk}% risk</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className={`h-full ${r.risk>80?"bg-destructive":r.risk>70?"bg-warning":"bg-secondary"}`} style={{ width: `${r.risk}%` }}/>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{r.why}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Link to="/dashboard/emergency" className="block glass-strong neon-border rounded-2xl p-6 text-center hover:scale-[1.02] transition-transform">
            <Siren className="h-10 w-10 mx-auto text-destructive animate-pulse"/>
            <div className="font-display text-2xl mt-2">SOS</div>
            <div className="text-xs text-muted-foreground">Tap to broadcast emergency</div>
          </Link>
          <Alert icon={Gauge} title="Overspeed Alert" body="You exceeded 80 km/h in a 60 zone." tone="destructive"/>
          <Alert icon={CloudRain} title="Weather Alert" body="Heavy rain near Worli — reduce speed." tone="warning"/>
          <Alert icon={AlertTriangle} title="Dangerous intersection" body="JN-204 ahead in 1.2 km." tone="warning"/>
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Tile icon={Hospital} title="Nearby Hospitals" value="6 within 3 km"/>
        <Tile icon={ShieldAlert} title="Police Stations" value="4 within 5 km"/>
        <Tile icon={MapPin} title="Live tracking" value="Sharing with 3"/>
        <Tile icon={Phone} title="Helplines" value="100 · 102 · 108"/>
      </div>
    </div>
  );
}
function Alert({ icon: Icon, title, body, tone }: any) {
  return (
    <div className="glass-strong rounded-2xl p-4 flex gap-3">
      <Icon className={`h-5 w-5 text-${tone}`}/>
      <div className="text-sm"><div className="font-medium">{title}</div><div className="text-xs text-muted-foreground">{body}</div></div>
    </div>
  );
}
function Tile({ icon: Icon, title, value }: any) {
  return (
    <div className="glass-strong rounded-2xl p-5">
      <Icon className="h-5 w-5 text-secondary"/>
      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-3">{title}</div>
      <div className="font-display text-xl mt-1">{value}</div>
    </div>
  );
}
