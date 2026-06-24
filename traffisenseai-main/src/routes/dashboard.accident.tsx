import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Gauge,
  CloudRain,
  MapPin,
  Phone,
  Hospital,
  ShieldAlert,
  Siren,
} from "lucide-react";

import { PageHeader } from "@/components/dashboard/Shell";

export const Route = createFileRoute("/dashboard/accident")({
  head: () => ({
    meta: [{ title: "Accident Prevention · TrafficSense AI" }],
  }),
  component: AccidentPage,
});

function AccidentPage() {
  const [zones, setZones] = useState<any[]>([]);
  const [hospital, setHospital] = useState("");
  const [police, setPolice] = useState("");
  const [weather, setWeather] = useState("");
  const [overspeed, setOverspeed] = useState("");

  useEffect(() => {
    const city =
      localStorage.getItem("sourceCity") || "Pune";

    fetch("http://127.0.0.1:5000/accident-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setZones(data.zones || []);
        setHospital(data.hospital || "");
        setPolice(data.police || "");
        setWeather(data.weather || "");
        setOverspeed(data.overspeed || "");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Safety"
        title="Accident Prevention Command"
        subtitle="Risk zones, predictions, and one-tap emergency response."
      />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-strong neon-border rounded-2xl p-6">

          <div className="text-[10px] uppercase tracking-[0.3em] text-destructive">
            High-risk zones
          </div>

          <h3 className="font-display text-lg mt-1">
            AI-predicted accident hotspots
          </h3>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">

            {zones.map((r: any) => (

              <div
                key={r.name}
                className="glass rounded-xl p-4"
              >

                <div className="flex items-center justify-between">

                  <div className="font-medium text-sm">
                    {r.name}
                  </div>

                  <span
                    className={`text-xs ${
                      r.risk > 80
                        ? "text-destructive"
                        : r.risk > 70
                        ? "text-warning"
                        : "text-secondary"
                    }`}
                  >
                    {r.risk}% Risk
                  </span>

                </div>

                <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">

                  <div
                    className={`h-full ${
                      r.risk > 80
                        ? "bg-destructive"
                        : r.risk > 70
                        ? "bg-warning"
                        : "bg-secondary"
                    }`}
                    style={{
                      width: `${r.risk}%`,
                    }}
                  />

                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  {r.reason}
                </p>

              </div>

            ))}

          </div>

        </div>

        <div className="space-y-4">

          <Link
            to="/dashboard/emergency"
            className="block glass-strong neon-border rounded-2xl p-6 text-center hover:scale-[1.02] transition-transform"
          >

            <Siren className="h-10 w-10 mx-auto text-destructive animate-pulse" />

            <div className="font-display text-2xl mt-2">
              SOS
            </div>

            <div className="text-xs text-muted-foreground">
              Tap to broadcast emergency
            </div>

          </Link>

          <Alert
            icon={Gauge}
            title="Overspeed Alert"
            body={overspeed}
            tone="destructive"
          />

          <Alert
            icon={CloudRain}
            title="Weather Alert"
            body={weather}
            tone="warning"
          />

          <Alert
            icon={AlertTriangle}
            title="Dangerous Intersection"
            body="Drive carefully in nearby accident-prone zones."
            tone="warning"
          />

        </div>

      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <Tile
          icon={Hospital}
          title="Nearby Hospitals"
          value={hospital}
        />

        <Tile
          icon={ShieldAlert}
          title="Police Stations"
          value={police}
        />

        <Tile
          icon={MapPin}
          title="Live Tracking"
          value="Enabled"
        />

        <Tile
          icon={Phone}
          title="Emergency Helpline"
          value="100 • 102 • 108"
        />

      </div>

    </div>
  );
}

function Alert({
  icon: Icon,
  title,
  body,
  tone,
}: any) {
  return (
    <div className="glass-strong rounded-2xl p-4 flex gap-3">
      <Icon className={`h-5 w-5 text-${tone}`} />
      <div className="text-sm">
        <div className="font-medium">
          {title}
        </div>
        <div className="text-xs text-muted-foreground">
          {body}
        </div>
      </div>
    </div>
  );
}

function Tile({
  icon: Icon,
  title,
  value,
}: any) {
  return (
    <div className="glass-strong rounded-2xl p-5">
      <Icon className="h-5 w-5 text-secondary" />
      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-3">
        {title}
      </div>
      <div className="font-display text-xl mt-1">
        {value}
      </div>
    </div>
  );
}