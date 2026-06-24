import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Fuel, Leaf, IndianRupee, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/dashboard/Shell";

export const Route = createFileRoute("/dashboard/fuel")({
  head: () => ({ meta: [{ title: "Fuel Prediction · TrafficSense AI" }] }),
  component: FuelPage,
});

function FuelPage() {
  const [vehicle, setVehicle] = useState("Sedan");
  const [distance, setDistance] = useState(20);
  const [traffic, setTraffic] = useState("Moderate");
  const [fuel, setFuel] = useState("Petrol");

  const baseEff: Record<string, number> = { Bike: 45, Sedan: 16, SUV: 12, Truck: 6, EV: 8 };
  const tFactor: Record<string, number> = { Smooth: 1.0, Moderate: 0.8, Heavy: 0.55 };
  const eff = baseEff[vehicle] * tFactor[traffic];
  const litres = +(distance / eff).toFixed(2);
  const cost = Math.round(litres * (fuel === "Diesel" ? 92 : fuel === "EV" ? 9 : 105));
  const co2 = +(litres * 2.3).toFixed(2);
  const eco = Math.max(0, Math.min(100, Math.round(100 - litres * 30)));

  return (
    <div>
      <PageHeader eyebrow="Prediction" title="Fuel & emissions estimator" subtitle="AI-powered fuel prediction with traffic and vehicle context." />
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-strong neon-border rounded-2xl p-6 space-y-4">
          <Field label="Vehicle Type">
            <Select value={vehicle} onChange={setVehicle} options={["Bike","Sedan","SUV","Truck","EV"]} />
          </Field>
          <Field label="Distance (km)">
            <input type="range" min={1} max={200} value={distance} onChange={(e) => setDistance(+e.target.value)} className="w-full accent-secondary"/>
            <div className="text-right text-sm font-display gradient-text">{distance} km</div>
          </Field>
          <Field label="Traffic Condition">
            <div className="grid grid-cols-3 gap-2">
              {["Smooth","Moderate","Heavy"].map(o => (
                <button key={o} onClick={() => setTraffic(o)} className={`px-3 py-2 rounded-lg text-sm transition ${traffic===o ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground" : "glass hover:bg-white/10"}`}>{o}</button>
              ))}
            </div>
          </Field>
          <Field label="Fuel Type">
            <Select value={fuel} onChange={setFuel} options={["Petrol","Diesel","CNG","EV"]}/>
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Stat icon={Fuel} label="Fuel Usage" value={`${litres} L`} tone="secondary"/>
          <Stat icon={IndianRupee} label="Estimated Cost" value={`₹ ${cost}`}/>
          <Stat icon={Leaf} label="CO₂ Emission" value={`${co2} kg`} tone="success"/>
          <Stat icon={Sparkles} label="Eco Score" value={`${eco} / 100`} tone="success"/>
          <div className="sm:col-span-2 glass-strong rounded-2xl p-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-2">AI Suggestions</div>
            <ul className="space-y-2 text-sm">
              <li>● Maintain steady speed of 45–55 km/h for max efficiency.</li>
              <li>● Avoid peak congestion on MG Road between 18:00–20:00.</li>
              <li>● Consider EV/CNG for daily commutes &gt; 25 km.</li>
              <li>● Ride-share enabled — projected extra 12% saving.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: any) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">{label}</div>
      {children}
    </label>
  );
}
function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-input/60 border border-border outline-none focus:neon-border-cyan text-sm">
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
function Stat({ icon: Icon, label, value, tone = "primary" }: any) {
  return (
    <div className="glass-strong rounded-2xl p-5">
      <Icon className={`h-5 w-5 text-${tone}`}/>
      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-3">{label}</div>
      <div className="font-display text-2xl gradient-text mt-1">{value}</div>
    </div>
  );
}
