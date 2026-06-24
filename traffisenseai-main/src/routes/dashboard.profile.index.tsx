import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { getUser, User } from "@/lib/auth";
import { useEffect, useState } from "react";
import { Edit3, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/dashboard/profile/")({
  head: () => ({ meta: [{ title: "Profile · TrafficSense AI" }] }),
  component: ProfilePage,
});

const emptyUser: User = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  rto: "",
  photo: "",
};

function ProfilePage() {
  const [u, setU] = useState<User>(emptyUser);

  useEffect(() => {
    const user = getUser();

    if (user) {
      setU(user);
    }
  }, []);
  const vehicle = u.vehicles?.[0];

  return (
    <div>
      <PageHeader
        eyebrow="Profile"
        title="My Profile"
        subtitle="Personal, vehicle and license details."
      />

      <div className="grid lg:grid-cols-[300px_1fr] gap-4">
        <div className="glass-strong neon-border rounded-2xl p-6 text-center">
          <div className="mx-auto h-28 w-28 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px] animate-pulse-glow">
            <div className="h-full w-full rounded-full bg-background grid place-items-center overflow-hidden">
              {u.photo ? (
                <img
                  src={u.photo}
                  className="h-full w-full object-cover"
                  alt=""
                />
              ) : (
                <UserIcon className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
          </div>

          <h3 className="mt-4 font-display text-xl">
            {u.firstName} {u.lastName}
          </h3>

          <p className="text-xs text-muted-foreground">
            {u.email}
          </p>

          <Link
            to="/dashboard/profile/edit"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm"
          >
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Block
            title="Personal"
            rows={[
              ["Full Name", `${u.firstName} ${u.lastName}`],
              ["Email", u.email],
              ["Mobile", u.mobile],
              ["RTO", u.rto || "Not Added"],
              ["Member since", "Recently Joined"],
            ]}
          />

          <Block
            title="Vehicle"
            rows={[
            ["RTO Number", vehicle?.rtoNumber || "Not Added"],
            ["Vehicle No.", vehicle?.vehicleNumber || "Not Added"],
            ["Type", vehicle?.vehicleType || "Not Added"],
            ["Fuel", vehicle?.fuelType || "Not Added"],
            ["Insurance", vehicle?.insuranceStatus || "Not Added"],
            ["PUC", vehicle?.pucStatus || "Not Added"],
            ]}
          />

          <Block
            title="License"
            rows={[
              ["Number", "--"],
              ["Type", "--"],
              ["Expiry", "--"],
            ]}
          />

          <Block
            title="Analytics"
            rows={[
              ["Fuel saved", "--"],
              ["Routes", "--"],
              ["Alerts", "--"],
              ["Safety score", "--"],
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function Block({
  title,
  rows,
}: {
  title: string;
  rows: [string, string][];
}) {
  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">
        {title}
      </div>

      <div className="mt-3 space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}