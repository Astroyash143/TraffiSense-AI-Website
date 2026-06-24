import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, Hash, Upload, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { Field } from "@/routes/login";
import { setUser } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register · TrafficSense AI" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [photo, setPhoto] = useState<string | undefined>();
  const [f, setF] = useState({ firstName: "", lastName: "", mobile: "", email: "", rto: "", password: "", confirm: "" });
  const [err, setErr] = useState("");

  const update = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
  e.preventDefault();

  setErr("");

  for (const k of [
    "firstName",
    "lastName",
    "mobile",
    "email",
    "rto",
    "password",
    "confirm",
  ] as const) {
    if (!f[k]) {
      setErr("All starred fields are required");
      return;
    }
  }

  if (!/\S+@\S+\.\S+/.test(f.email)) {
    setErr("Invalid email");
    return;
  }

  if (f.password.length < 6) {
    setErr("Password must be at least 6 characters");
    return;
  }

  if (f.password !== f.confirm) {
    setErr("Passwords don't match");
    return;
  }

  try {
    const response = await fetch(
      "http://10.215.195.216:5000/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: f.firstName,
          lastName: f.lastName,
          mobile: f.mobile,
          email: f.email,
          rtoNumber: f.rto,
          password: f.password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setErr(data.message || data.error || "Registration failed");
      return;
    }

    setUser({
      firstName: f.firstName,
      lastName: f.lastName,
      email: f.email,
      mobile: f.mobile,
      rto: f.rto,
      photo,
    });

    setSuccess(true);

    setTimeout(() => {
      navigate({ to: "/login" });
    }, 1600);

  } catch (error) {
    console.error(error);
    setErr("Cannot connect to backend server");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/20 blur-[140px]" />

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submit}
        className="relative w-full max-w-2xl glass-strong neon-border rounded-2xl p-8"
      >
        <Link to="/" className="block mb-6"><Logo /></Link>
        <h1 className="font-display text-3xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground mt-1">Join the smart city traffic intelligence network</p>

        {err && <div className="mt-4 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/40 text-destructive text-sm">{err}</div>}

        <div className="mt-6 flex items-center gap-4">
          <div className="relative h-20 w-20 rounded-full glass neon-border-cyan grid place-items-center overflow-hidden">
            {photo ? <img src={photo} alt="" className="h-full w-full object-cover" /> : <User className="h-8 w-8 text-muted-foreground" />}
          </div>
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 text-sm">
            <Upload className="h-4 w-4" /> Upload Profile Photo
            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0]; if (!file) return;
              const r = new FileReader(); r.onload = () => setPhoto(r.result as string); r.readAsDataURL(file);
            }} />
          </label>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Field icon={User} label="First Name *" value={f.firstName} onChange={update("firstName")} placeholder="John" />
          <Field icon={User} label="Last Name *" value={f.lastName} onChange={update("lastName")} placeholder="Doe" />
          <Field icon={Phone} label="Mobile Number *" value={f.mobile} onChange={update("mobile")} placeholder="+91 9876543210" />
          <Field icon={Mail} label="Email Address *" type="email" value={f.email} onChange={update("email")} placeholder="you@city.ai" />
          <Field icon={Hash} label="RTO Number *" value={f.rto} onChange={update("rto")} placeholder="MH-12-AB-1234" />
          <Field icon={Lock} label="Password *" type={show ? "text" : "password"} value={f.password} onChange={update("password")} placeholder="••••••••"
            right={<button type="button" onClick={() => setShow(s => !s)} className="text-muted-foreground">{show ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}</button>}/>
          <div className="sm:col-span-2">
            <Field icon={Lock} label="Confirm Password *" type={show ? "text" : "password"} value={f.confirm} onChange={update("confirm")} placeholder="••••••••" />
          </div>
        </div>

        <button type="submit" className="w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium shadow-[0_0_30px_oklch(0.72_0.21_250/0.5)]">
          Register
        </button>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account? <Link to="/login" className="text-secondary hover:underline">Login</Link>
        </p>

        {success && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur">
            <div className="glass-strong neon-border rounded-2xl p-10 text-center">
              <CheckCircle2 className="h-14 w-14 mx-auto text-success" />
              <h3 className="font-display text-2xl mt-4">Registration successful</h3>
              <p className="text-sm text-muted-foreground mt-2">Redirecting you to login…</p>
            </div>
          </motion.div>
        )}
      </motion.form>
    </div>
  );
}
