import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-8 w-8">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-secondary animate-pulse-glow" />
        <div className="absolute inset-[3px] rounded-md bg-background grid place-items-center">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-secondary" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M3 12h3l2-7h8l2 7h3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
          </svg>
        </div>
      </div>
      <div className="font-display font-bold tracking-wider text-sm leading-none">
        <div className="gradient-text text-base">TrafficSense</div>
        <div className="text-[10px] text-muted-foreground tracking-[0.3em]">AI · SMART CITY</div>
      </div>
    </Link>
  );
}
