import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { User, Lock, Bell, Palette, Languages, Shield } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings · TrafficSense AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div>
      <PageHeader eyebrow="Settings" title="Account & preferences" subtitle="Personalize your TrafficSense experience."/>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card icon={User} title="Edit profile" desc="Name, photo, contact details" to="/dashboard/profile/edit"/>
        <Card icon={Lock} title="Change password" desc="Update your account password"/>
        <Card icon={Bell} title="Notifications" desc="Configure alerts & frequency"/>
        <Card icon={Palette} title="Theme" desc="Dark · Light · System"/>
        <Card icon={Languages} title="Language" desc="English · Hindi · Marathi"/>
        <Card icon={Shield} title="Security" desc="2FA, sessions, devices"/>
      </div>

      <div className="mt-6 glass-strong rounded-2xl p-6">
        <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">Preferences</div>
        <div className="mt-3 space-y-3">
          {[
            ["Push alerts", true],
            ["Email summaries", true],
            ["AI route auto-switch", false],
            ["Voice assistant", true],
          ].map(([k,v]) => (
            <div key={k as string} className="flex items-center justify-between glass rounded-lg p-3 text-sm">
              <span>{k}</span>
              <span className={`relative h-5 w-9 rounded-full ${v ? "bg-secondary" : "bg-white/10"}`}>
                <span className={`absolute top-0.5 ${v ? "right-0.5" : "left-0.5"} h-4 w-4 rounded-full bg-white`}/>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function Card({ icon: Icon, title, desc, to }: any) {
  const C = to ? Link : "div";
  return (
    <C to={to ?? undefined} className="glass-strong rounded-2xl p-5 hover:neon-border-cyan transition-all block">
      <Icon className="h-5 w-5 text-secondary"/>
      <h3 className="font-display text-base mt-3">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1">{desc}</p>
    </C>
  );
}
