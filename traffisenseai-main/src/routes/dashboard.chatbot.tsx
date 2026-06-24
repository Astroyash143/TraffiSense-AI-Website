import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Send, Mic, Bot, Sparkles, Languages } from "lucide-react";
import { PageHeader } from "@/components/dashboard/Shell";
import { motion } from "framer-motion";

export const Route = createFileRoute("/dashboard/chatbot")({
  head: () => ({ meta: [{ title: "AI Chatbot · TrafficSense AI" }] }),
  component: ChatbotPage,
});

type Msg = { role: "user" | "ai"; text: string };

function ChatbotPage() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hi, I'm TrafficSense AI. Ask me about traffic rules, license, fines, route safety or emergency procedures." }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [lang, setLang] = useState("EN");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const send = async (text?: string) => {
  const t = (text ?? input).trim();

  if (!t) return;

  setMsgs((m) => [
    ...m,
    { role: "user", text: t },
  ]);

  setInput("");
  setTyping(true);

  try {
    const response = await fetch(
      "http://localhost:5000/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: t,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Server error");
    }

    setMsgs((m) => [
      ...m,
      {
        role: "ai",
        text: data.reply,
      },
    ]);
  } catch (error) {
    console.error(error);

    setMsgs((m) => [
      ...m,
      {
        role: "ai",
        text:
          "Unable to connect to TrafficSense AI.",
      },
    ]);
  } finally {
    setTyping(false);
  }
};
  const suggestions = ["How to renew license?", "Helmet rules in India", "What is the fine for jumping a signal?", "Best route to airport now"];

  return (
    <div>
      <PageHeader eyebrow="AI Assistant" title="TrafficSense AI Chatbot" subtitle="Voice + multilingual road safety, rules and routing assistant." />
      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        <div className="glass-strong neon-border rounded-2xl flex flex-col h-[70vh]">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div className="flex items-center gap-2"><Bot className="h-4 w-4 text-secondary"/><span className="text-sm font-medium">TrafficSense Assistant</span><span className="text-[10px] text-success">● online</span></div>
            <div className="flex items-center gap-1">
              <Languages className="h-4 w-4 text-muted-foreground"/>
              {["EN","HI","MR"].map(l => <button key={l} onClick={() => setLang(l)} className={`px-2 py-0.5 rounded text-[10px] ${lang===l?"bg-secondary/20 text-secondary":"text-muted-foreground"}`}>{l}</button>)}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {msgs.map((m, i) => (
              <motion.div key={i} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} className={`flex ${m.role==="user" ? "justify-end":"justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${m.role==="user" ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground" : "glass"}`}>{m.text}</div>
              </motion.div>
            ))}
            {typing && (
              <div className="flex gap-1 ml-2">
                {[0,1,2].map(i => <motion.span key={i} className="h-2 w-2 rounded-full bg-secondary" animate={{ y:[0,-4,0] }} transition={{ repeat: Infinity, delay: i*0.15, duration: 0.6 }}/>)}
              </div>
            )}
            <div ref={endRef}/>
          </div>
          <div className="p-3 border-t border-border flex items-center gap-2">
            <button className="p-2.5 rounded-xl glass hover:neon-border-cyan"><Mic className="h-4 w-4"/></button>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key==="Enter" && send()} placeholder="Ask anything about traffic, safety, license…" className="flex-1 px-3 py-2.5 rounded-xl bg-input/40 border border-border outline-none focus:neon-border-cyan text-sm"/>
            <button onClick={() => send()} className="p-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground"><Send className="h-4 w-4"/></button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-strong rounded-2xl p-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-3">Quick prompts</div>
            <div className="space-y-2">
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)} className="w-full text-left text-sm glass rounded-xl px-3 py-2 hover:bg-white/10 inline-flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-secondary"/>{s}
                </button>
              ))}
            </div>
          </div>
          <div className="glass-strong rounded-2xl p-5 text-xs text-muted-foreground">
            Powered by RL traffic agent + multilingual NLU. Voice and offline modes available.
          </div>
        </div>
      </div>
    </div>
  );
}

