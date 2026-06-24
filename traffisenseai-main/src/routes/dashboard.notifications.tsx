import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { Bell, AlertTriangle, FileText, MapPin, Siren, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/notifications")({
  head: () => ({ meta: [{ title: "Notifications · TrafficSense AI" }] }),
  component: NotifPage,
});

const initial = [
  { i: AlertTriangle, t: "Accident reported on Andheri E-flyover", time: "2m", c: "destructive", read: false },
  { i: MapPin, t: "AI re-routed your trip to avoid jam at LBS Marg", time: "12m", c: "secondary", read: false },
  { i: Siren, t: "Emergency corridor active near LTM Hospital", time: "30m", c: "destructive", read: false },
  { i: FileText, t: "Your DL renewal reminder · 32 days left", time: "1h", c: "warning", read: true },
  { i: Bell, t: "Signal optimization saved you 8 mins this week", time: "3h", c: "success", read: true },
];

function NotifPage() {
  const [items, setItems] = useState(initial);
  return (
    <div>
      <PageHeader eyebrow="Inbox" title="Notifications" subtitle="Traffic, safety, license and emergency alerts."/>
      <div className="flex justify-end mb-3">
        <button onClick={() => setItems(items.map(i => ({...i, read: true})))} className="text-xs text-secondary hover:underline inline-flex items-center gap-1"><Check className="h-3 w-3"/>Mark all read</button>
      </div>
      <div className="glass-strong rounded-2xl divide-y divide-border">
        {items.map((n, idx) => (
          <div key={idx} className={`flex items-start gap-3 p-4 ${!n.read ? "bg-white/[0.03]" : ""}`}>
            <div className={`h-9 w-9 rounded-xl bg-${n.c}/15 grid place-items-center shrink-0`}>
              <n.i className={`h-4 w-4 text-${n.c}`}/>
            </div>
            <div className="flex-1">
              <div className="text-sm">{n.t}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{n.time} ago</div>
            </div>
            {!n.read && <span className="h-2 w-2 rounded-full bg-secondary mt-2"/>}
          </div>
        ))}
      </div>
    </div>
  );
}
