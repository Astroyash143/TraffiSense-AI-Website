import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  Navigation,
  AlertTriangle,
  CloudRain,
  Route as RouteIcon,
} from "lucide-react";

import { PageHeader } from "@/components/dashboard/Shell";
import LiveMap from "@/components/dashboard/LiveMap";

export const Route = createFileRoute("/dashboard/map")({
  head: () => ({
    meta: [{ title: "Live Traffic Map · TrafficSense AI" }],
  }),
  component: MapPage,
});

type RouteData = {
  geometry: number[][];
  distance: number;
  duration: number;
};

function MapPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [loading, setLoading] = useState(false);

  const [routes, setRoutes] = useState<RouteData[]>([]);

  const [routeInfo, setRouteInfo] = useState({
    eta: "--",
    distance: "--",
    fuelSaved: "--",
    co2: "--",
  });

  const handleFindRoute = async () => {
    if (!from || !to) {
      alert("Please enter source and destination");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/find-route",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to,
          }),
        }
      );

      const data = await response.json();

      console.log("API Response:", data);

      if (!response.ok) {
        alert(data.error || "Unable to find route");
        return;
      }

      setRoutes(data.routes || []);

      if (data.routes?.length > 0) {
        const bestRoute = data.routes[0];

        setRouteInfo({
          eta: `${bestRoute.duration} min`,
          distance: `${bestRoute.distance} km`,
          fuelSaved: `${(bestRoute.distance * 0.08).toFixed(2)} L`,
          co2: `${(bestRoute.distance * 0.18).toFixed(2)} kg`,
        });
      } else {
        setRouteInfo({
          eta: "--",
          distance: "--",
          fuelSaved: "--",
          co2: "--",
        });

        alert("No routes found");
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Live Map"
        title="Real-time traffic intelligence"
        subtitle="Heatmaps, accident zones, weather overlays and AI re-routing."
      />

      <div className="grid lg:grid-cols-[1fr_360px] gap-4">
        <div className="relative h-[600px] rounded-2xl overflow-hidden glass-strong neon-border">
          <LiveMap routes={routes} />

          <div className="absolute top-4 left-4 z-[1000] flex items-center gap-2 px-3 py-1.5 rounded-full glass-strong text-xs">
            ● LIVE GRID · Mumbai
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-[1000] glass-strong rounded-xl p-3 flex flex-wrap gap-3 text-xs">
            <Legend color="bg-green-500" label="Smooth" />
            <Legend color="bg-yellow-500" label="Moderate" />
            <Legend color="bg-red-500" label="Heavy" />

            <span className="ml-auto text-muted-foreground">
              Updated just now
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-strong neon-border-cyan rounded-2xl p-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">
              Smart Route
            </div>

            <div className="mt-3 space-y-2">
              <input
                placeholder="Example: Swargate Pune"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-input/40 border border-border outline-none text-sm"
              />

              <input
                placeholder="Example: Katraj Pune"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-input/40 border border-border outline-none text-sm"
              />

              <button
                onClick={handleFindRoute}
                disabled={loading}
                className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium inline-flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Navigation className="h-4 w-4" />

                {loading ? "Finding..." : "Find smart route"}
              </button>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <Row k="ETA" v={routeInfo.eta} tone="success" />
              <Row k="Distance" v={routeInfo.distance} />
              <Row
                k="Fuel saved"
                v={routeInfo.fuelSaved}
                tone="success"
              />
              <Row k="CO₂" v={routeInfo.co2} tone="success" />
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-destructive">
              Live Alerts
            </div>

            <div className="mt-3 space-y-2 text-sm">
              {[
                {
                  icon: AlertTriangle,
                  text: "Accident · Andheri E",
                },
                {
                  icon: CloudRain,
                  text: "Heavy rain · Worli",
                },
                {
                  icon: MapPin,
                  text: "Block · LBS Marg",
                },
                {
                  icon: RouteIcon,
                  text: "AI re-routing 1.2k vehicles",
                },
              ].map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 glass rounded-lg p-2"
                >
                  <alert.icon className="h-4 w-4 text-primary" />
                  {alert.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  k,
  v,
  tone,
}: {
  k: string;
  v: string;
  tone?: string;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{k}</span>

      <span
        className={
          tone === "success"
            ? "text-green-400"
            : tone === "warning"
            ? "text-yellow-400"
            : tone === "destructive"
            ? "text-red-400"
            : ""
        }
      >
        {v}
      </span>
    </div>
  );
}

function Legend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}