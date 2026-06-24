import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="relative mt-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            TrafficSense AI — an intelligent smart traffic & road safety platform powered by Reinforcement Learning, Quantum optimization concepts and SUMO simulation.
          </p>
          <div className="mt-6 flex gap-3">
            {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-lg glass hover:neon-border transition-all">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/dashboard" className="hover:text-secondary">Dashboard</Link></li>
            <li><Link to="/dashboard/map" className="hover:text-secondary">Live Map</Link></li>
            <li><Link to="/dashboard/analytics" className="hover:text-secondary">Analytics</Link></li>
            <li><Link to="/dashboard/chatbot" className="hover:text-secondary">AI Assistant</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/dashboard/license" className="hover:text-secondary">License</Link></li>
            <li><Link to="/dashboard/rules" className="hover:text-secondary">Traffic Rules</Link></li>
            <li><Link to="/dashboard/emergency" className="hover:text-secondary">Emergency</Link></li>
            <li><Link to="/dashboard/settings" className="hover:text-secondary">Settings</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TrafficSense AI · Smart City Traffic Intelligence Platform
      </div>
    </footer>
  );
}
