import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/#features" },
  { label: "Technology", to: "/#technology" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Contact", to: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className={`mx-auto max-w-7xl px-4 ${scrolled ? "" : ""}`}>
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${
            scrolled ? "glass-strong neon-border" : "glass"
          }`}
        >
          <Logo />
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) =>
              l.to.startsWith("/#") ? (
                <a
                  key={l.label}
                  href={l.to.replace("/", "")}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.to}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
                  activeProps={{ className: "px-3 py-2 text-sm text-secondary rounded-lg bg-white/5" }}
                >
                  {l.label}
                </Link>
              )
            )}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium hover:opacity-90 transition-opacity shadow-[0_0_20px_oklch(0.72_0.21_250/0.4)]"
            >
              Register
            </Link>
          </div>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/5"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        {open && (
          <div className="md:hidden mt-2 glass-strong neon-border rounded-2xl p-4 flex flex-col gap-1">
            {links.map((l) =>
              l.to.startsWith("/#") ? (
                <a key={l.label} href={l.to.replace("/", "")} onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/5">
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/5">
                  {l.label}
                </Link>
              )
            )}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
              <Link to="/login" onClick={() => setOpen(false)} className="text-center px-4 py-2 rounded-lg bg-white/5">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="text-center px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground">Register</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
