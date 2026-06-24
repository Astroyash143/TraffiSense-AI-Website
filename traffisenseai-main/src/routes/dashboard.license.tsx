import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { FileText, RefreshCw, MapPin, ExternalLink, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/dashboard/license")({
  head: () => ({ meta: [{ title: "License Services · TrafficSense AI" }] }),
  component: LicensePage,
});

function LicensePage() {
  return (
    <div>
      <PageHeader eyebrow="License" title="License services hub" subtitle="Apply, renew and track your driving license."/>
      <div className="grid lg:grid-cols-3 gap-4">
        {[
  {
    i: GraduationCap,
    t: "Learning License",
    d: "Apply for fresh learner's license",
    a: "Start Application",
    link: "https://sarathi.parivahan.gov.in"
  },
  {
    i: FileText,
    t: "Driving License",
    d: "Convert LL to permanent DL",
    a: "Begin Process",
    link: "https://sarathi.parivahan.gov.in"
  },
  {
    i: RefreshCw,
    t: "Renewal",
    d: "Renew before expiry to avoid penalty",
    a: "Renew Now",
    link: "https://sarathi.parivahan.gov.in"
  },
].map((s) => (
          <div key={s.t} className="glass-strong rounded-2xl p-6 hover:neon-border-cyan transition-all">
            <s.i className="h-7 w-7 text-secondary"/>
            <h3 className="font-display text-lg mt-3">{s.t}</h3>
            <p className="text-xs text-muted-foreground mt-1">{s.d}</p>
            <button
  onClick={() => window.open(s.link, "_blank")}
  className="mt-4 w-full px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium hover:scale-105 transition"
>
  {s.a}
</button>
          </div>
        ))}
      </div>
      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <div className="glass-strong rounded-2xl p-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">Required documents</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>● Aadhaar / PAN / Passport</li>
            <li>● Address proof (utility bill / passport)</li>
            <li>● Age proof (birth certificate / 10th marksheet)</li>
            <li>● Form 1 (self declaration)</li>
            <li>● Form 1A (medical certificate, age 40+)</li>
            <li>● 3 passport-sized photos</li>
          </ul>
        </div>
        <div className="glass-strong rounded-2xl p-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">Nearby RTOs</div>
          <div className="mt-3 space-y-2">
            {[{n:"RTO Andheri (MH-02)",d:"3.2 km"},{n:"RTO Wadala (MH-03)",d:"6.4 km"},{n:"RTO Tardeo (MH-01)",d:"7.1 km"}].map(r => (
              <div key={r.n} className="flex items-center justify-between glass rounded-xl p-3 text-sm">
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary"/>{r.n}</span>
                <span className="text-xs text-muted-foreground">{r.d}</span>
              </div>
            ))}
          </div>
          <a
  href="https://sarathi.parivahan.gov.in"
  target="_blank"
  rel="noreferrer"
  className="mt-4 inline-flex items-center gap-1 text-sm text-secondary hover:underline"
>
  Open Sarathi Portal
  <ExternalLink className="h-3 w-3"/>
</a>
        </div>
      </div>
    </div>
  );
}
