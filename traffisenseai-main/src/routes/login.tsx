import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { Logo } from "@/components/site/Logo";
import { auth } from "@/firebase";
import { setUser } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login · TrafficSense AI" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
  e.preventDefault();

  setError("");

  if (!email || !password) {
    setError("Please fill all fields");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    setError("Invalid email");
    return;
  }

  try {
    const response = await fetch(
      "http://127.0.0.1:5000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
    setError(data.error || data.message);
    return;
    }
    const profileResponse = await fetch(
      `http://10.215.195.216:5000/profile/${email}`
    );

    const profileData = await profileResponse.json();

    setUser({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      mobile: profileData.mobile,
      rto: profileData.vehicles?.[0]?.rtoNumber || "",
      photo: "",
      vehicles: profileData.vehicles || [],
    });

navigate({ to: "/dashboard" });

  } catch (error) {
    console.error(error);
    setError("Cannot connect to backend server");
  }
};

  const loginWithGoogle = async () => {
    try {
      setError("");

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const displayName = result.user.displayName || "";
      const names = displayName.split(" ");

      setUser({
        firstName: names[0] || "",
        lastName: names.slice(1).join(" ") || "",
        email: result.user.email || "",
        mobile: "",
        rto: "",
        photo: result.user.photoURL || "",
        uid: result.user.uid,
      });

      navigate({ to: "/dashboard" });
    } catch (err: any) {
  console.error(err);

  setError(err.code || err.message || "Google sign-in failed");
}
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30" />
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative max-w-md text-center"
        >
          <Logo />

          <h2 className="mt-12 font-display text-4xl font-bold gradient-text neon-text">
            Welcome back, Commander
          </h2>

          <p className="mt-4 text-muted-foreground">
            Step into the AI command center and take control of the city's
            traffic intelligence grid.
          </p>

          <div className="mt-12 glass-strong neon-border rounded-2xl p-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span>● LIVE GRID</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { k: "96%", v: "AI" },
                { k: "4.2k", v: "Signals" },
                { k: "38%", v: "↓ Jam" },
              ].map((s) => (
                <div key={s.v} className="rounded-lg bg-white/5 p-3">
                  <div className="font-display text-lg gradient-text">
                    {s.k}
                  </div>

                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={submit}
          className="w-full max-w-md glass-strong neon-border rounded-2xl p-8"
        >
          <Link to="/" className="lg:hidden block mb-6">
            <Logo />
          </Link>

          <h1 className="font-display text-3xl font-bold">Login</h1>

          <p className="text-sm text-muted-foreground mt-1">
            Access your TrafficSense AI dashboard
          </p>

          {error && (
            <div className="mt-4 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/40 text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <Field
              icon={Mail}
              label="Email Address *"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@city.ai"
            />

            <Field
              icon={Lock}
              label="Password *"
              type={show ? "text" : "password"}
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              right={
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {show ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="accent-primary" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-secondary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium shadow-[0_0_30px_oklch(0.72_0.21_250/0.5)] hover:shadow-[0_0_50px_oklch(0.78_0.18_200/0.6)] transition-all"
            >
              Login <ArrowRight className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 my-2">
              <span className="h-px bg-border flex-1" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                or
              </span>
              <span className="h-px bg-border flex-1" />
            </div>

            <button
  type="button"
  onClick={loginWithGoogle}
  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass hover:bg-white/10 transition-all"
>
  <GoogleIcon /> Continue with Google
</button>

            <p className="text-center text-sm text-muted-foreground pt-2">
              Don't have an account?{" "}
              <Link to="/register" className="text-secondary hover:underline">
                Register
              </Link>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

export function Field({
  icon: Icon,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  right,
}: any) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>

      <div className="mt-1.5 flex items-center gap-2 px-3 rounded-xl bg-input/40 border border-border focus-within:neon-border-cyan transition-all">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 py-2.5 bg-transparent outline-none text-sm placeholder:text-muted-foreground/60"
        />

        {right}
      </div>
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 34.7 26.8 36 24 36c-5.2 0-9.6-3.4-11.2-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C41.3 35 44 30 44 24c0-1.3-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}