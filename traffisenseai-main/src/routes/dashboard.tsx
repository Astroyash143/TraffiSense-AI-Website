import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/Shell";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getUser()) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  ),
});
