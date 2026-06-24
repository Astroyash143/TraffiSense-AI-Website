import { Landing } from "@/components/site/Landing";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrafficSense AI — Intelligent Smart Traffic & Road Safety Platform" },
      { name: "description", content: "AI-powered smart city traffic management using RL, Quantum optimization concepts and SUMO simulation." },
      { property: "og:title", content: "TrafficSense AI" },
      { property: "og:description", content: "Smart city traffic intelligence platform." },
    ],
  }),
  component: Landing,
});
