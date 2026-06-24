import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import { useEffect, useState } from "react";
import { getUser, setUser, User as UserType } from "@/lib/auth";
import { User, Mail, Phone, Hash, Upload, Save } from "lucide-react";
import { Field } from "@/routes/login";

export const Route = createFileRoute("/dashboard/profile/edit")({
  head: () => ({ meta: [{ title: "Edit Profile · TrafficSense AI" }] }),
  component: EditPage,
});

function EditPage() {
  const navigate = useNavigate();

  const emptyUser: UserType = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    rto: "",
    photo: "",
  };

  const [u, setU] = useState<UserType>(getUser() || emptyUser);

  const [photo, setPhoto] = useState<string | undefined>(
    getUser()?.photo
  );

  useEffect(() => {
    const g = getUser();

    if (g) {
      setU(g);
      setPhoto(g.photo);
    }
  }, []);

  const updateField =
    (key: keyof UserType) =>
    (value: string) =>
      setU((prev) => ({
        ...prev,
        [key]: value,
      }));

  const save = (e: React.FormEvent) => {
    e.preventDefault();

    setUser({
      ...u,
      photo,
    });

    navigate({ to: "/dashboard/profile" });
  };

  return (
    <div>
      <PageHeader eyebrow="Profile" title="Edit Profile" />

      <form
        onSubmit={save}
        className="glass-strong neon-border rounded-2xl p-6 max-w-3xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="h-20 w-20 rounded-full glass neon-border-cyan grid place-items-center overflow-hidden">
            {photo ? (
              <img
                src={photo}
                className="h-full w-full object-cover"
                alt="Profile"
              />
            ) : (
              <User className="h-8 w-8 text-muted-foreground" />
            )}
          </div>

          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 text-sm">
            <Upload className="h-4 w-4" />
            Change Photo

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                const reader = new FileReader();

                reader.onload = () =>
                  setPhoto(reader.result as string);

                reader.readAsDataURL(file);
              }}
            />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            icon={User}
            label="First Name"
            value={u.firstName}
            onChange={updateField("firstName")}
          />

          <Field
            icon={User}
            label="Last Name"
            value={u.lastName}
            onChange={updateField("lastName")}
          />

          <Field
            icon={Mail}
            label="Email"
            type="email"
            value={u.email}
            onChange={updateField("email")}
          />

          <Field
            icon={Phone}
            label="Mobile"
            value={u.mobile}
            onChange={updateField("mobile")}
          />

          <div className="sm:col-span-2">
            <Field
              icon={Hash}
              label="RTO Number"
              value={u.rto}
              onChange={updateField("rto")}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </form>
    </div>
  );
}