import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Mail, ArrowRight, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { Field } from "@/routes/login";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password · TrafficSense AI" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const sendOtp = () => {
    if (!/\S+@\S+\.\S+/.test(email)) { setErr("Invalid email"); return; }
    setErr(""); setStep(2); setTimer(45);
  };

  const verifyOtp = () => {
    if (otp.some((d) => !d)) { setErr("Enter all 6 digits"); return; }
    setErr(""); setStep(3);
  };

  const reset = () => {
    if (pwd.length < 6) { setErr("Min 6 characters"); return; }
    if (pwd !== confirm) { setErr("Passwords don't match"); return; }
    navigate({ to: "/login" });
  };

  const strength = (() => {
    let s = 0;
    if (pwd.length >= 6) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  })();

  return (
    <div className="min-h-screen grid place-items-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-accent/20 blur-[140px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md glass-strong neon-border rounded-2xl p-8">
        <Link to="/" className="block mb-6"><Logo /></Link>

        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1 flex-1 rounded-full ${step >= s ? "bg-gradient-to-r from-primary to-secondary" : "bg-white/10"}`} />
          ))}
        </div>

        {err && <div className="mb-4 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/40 text-destructive text-sm">{err}</div>}

        {step === 1 && (
          <>
            <h1 className="font-display text-2xl font-bold">Forgot password?</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter your registered email to receive an OTP.</p>
            <div className="mt-6 space-y-4">
              <Field icon={Mail} label="Registered Email" type="email" value={email} onChange={setEmail} placeholder="you@city.ai" />
              <button onClick={sendOtp} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium">
                Send OTP <ArrowRight className="h-4 w-4" />
              </button>
              <Link to="/login" className="block text-center text-sm text-muted-foreground hover:text-foreground">Back to login</Link>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="font-display text-2xl font-bold">Verify OTP</h1>
            <p className="text-sm text-muted-foreground mt-1">We sent a 6-digit code to <span className="text-foreground">{email}</span></p>
            <div className="mt-6 flex gap-2 justify-between">
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  value={d}
                  onChange={(e) => {
                    const v = e.target.value.slice(-1).replace(/\D/g, "");
                    setOtp((p) => { const n = [...p]; n[i] = v; return n; });
                    if (v && i < 5) inputs.current[i + 1]?.focus();
                  }}
                  onKeyDown={(e) => { if (e.key === "Backspace" && !otp[i] && i > 0) inputs.current[i - 1]?.focus(); }}
                  className="h-12 w-10 sm:w-12 text-center font-display text-xl rounded-lg bg-input/40 border border-border focus:neon-border-cyan outline-none"
                  maxLength={1}
                />
              ))}
            </div>
            <div className="mt-4 text-center text-xs text-muted-foreground">
              {timer > 0 ? `Resend OTP in ${timer}s` : <button onClick={() => setTimer(45)} className="text-secondary hover:underline">Resend OTP</button>}
            </div>
            <button onClick={verifyOtp} className="w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium">Verify OTP</button>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="font-display text-2xl font-bold">Reset password</h1>
            <p className="text-sm text-muted-foreground mt-1">Choose a strong new password.</p>
            <div className="mt-6 space-y-4">
              <Field icon={Lock} label="New Password" type={show ? "text" : "password"} value={pwd} onChange={setPwd} placeholder="••••••••"
                right={<button type="button" onClick={() => setShow(s => !s)}>{show ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}</button>}/>
              <div className="flex gap-1">
                {[0,1,2,3].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i < strength ? ["bg-destructive","bg-warning","bg-secondary","bg-success"][strength-1] : "bg-white/10"}`} />)}
              </div>
              <Field icon={ShieldCheck} label="Confirm Password" type={show ? "text" : "password"} value={confirm} onChange={setConfirm} placeholder="••••••••" />
              <button onClick={reset} className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium">Update password</button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
