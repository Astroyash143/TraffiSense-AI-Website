import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/Shell";
import {
  Siren,
  Phone,
  MapPin,
  Hospital,
  Shield,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/dashboard/emergency")({
  head: () => ({
    meta: [{ title: "Emergency · TrafficSense AI" }],
  }),
  component: EmergencyPage,
});

function EmergencyPage() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [controlRoom, setControlRoom] = useState(
    "Nearest Traffic Control Room"
  );

  const [locationLink, setLocationLink] = useState("");

  const emergencyContacts = 3;

  const handleSOS = async () => {
    if (loading) return;

    setLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;

          setLocationLink(mapsLink);

          const response = await fetch(
            "http://10.215.195.216:5000/send-sos",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: 1, // Replace with logged-in user ID later
                latitude,
                longitude,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            alert(data.error || "Failed to send SOS.");
            return;
          }

          setControlRoom(
            data.control_room ||
              "Nearest Traffic Control Room"
          );

          setActive(true);
        } catch (error) {
          console.error(error);
          alert("Cannot connect to backend server.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Please allow location access.");
            break;

          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;

          case error.TIMEOUT:
            alert("Location request timed out.");
            break;

          default:
            alert("Unable to get your location.");
        }

        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const shareLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const url = `https://maps.google.com/?q=${latitude},${longitude}`;

        try {
          if (navigator.share) {
            await navigator.share({
              title: "My Live Location",
              text: "Track my live location",
              url,
            });
          } else {
            await navigator.clipboard.writeText(url);
            alert("Location link copied to clipboard.");
          }
        } catch (error) {
          console.error(error);
        }
      },
      () => {
        alert("Unable to fetch your location.");
      }
    );
  };

  return (
    <div>
      <PageHeader
        eyebrow="Emergency"
        title="Help is one tap away"
        subtitle="SOS, helplines, hospitals & live location sharing."
      />

      <div className="grid lg:grid-cols-[360px_1fr] gap-4">
        <div className="glass-strong neon-border rounded-2xl p-8 text-center">
          <button
            onClick={handleSOS}
            disabled={loading}
            className="relative mx-auto h-40 w-40 rounded-full bg-gradient-to-br from-destructive to-warning grid place-items-center hover:scale-105 transition-transform shadow-[0_0_60px_oklch(0.65_0.25_25/0.6)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {!loading && (
              <span className="absolute inset-0 rounded-full bg-destructive/40 animate-ping" />
            )}

            <Siren
              className={`h-16 w-16 relative ${
                loading ? "animate-pulse" : ""
              }`}
            />
          </button>

          <div className="font-display text-2xl mt-6">
            {loading ? "Sending SOS..." : "SOS Emergency"}
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            Broadcasts your live location to emergency contacts and nearest
            control room.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Help icon={Phone} title="Police" num="100" />

          <Help
            icon={Hospital}
            title="Ambulance"
            num="102 / 108"
          />

          <Help
            icon={Shield}
            title="Women Helpline"
            num="1091"
          />

          <Help icon={Phone} title="Fire" num="101" />

          <div className="sm:col-span-2 glass-strong rounded-2xl p-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">
              Nearby
            </div>

            <div className="mt-3 grid sm:grid-cols-2 gap-2 text-sm">
              {[
                ["LTM Hospital", "1.2 km"],
                ["Bombay Hospital", "2.8 km"],
                ["Andheri Police Stn", "0.9 km"],
                ["MIDC Police Stn", "2.4 km"],
              ].map(([name, distance]) => (
                <div
                  key={name}
                  className="flex items-center justify-between glass rounded-lg p-3"
                >
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-secondary" />
                    {name}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {distance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2 glass-strong rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">
                Share live location
              </div>

              <div className="text-xs text-muted-foreground">
                With {emergencyContacts} emergency contacts
              </div>
            </div>

            <button
              onClick={shareLocation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur grid place-items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="glass-strong neon-border rounded-2xl p-8 max-w-md text-center"
            >
              <div className="h-16 w-16 mx-auto rounded-full bg-destructive/20 grid place-items-center">
                <Siren className="h-8 w-8 text-destructive animate-pulse" />
              </div>

              <h3 className="font-display text-xl mt-4">
                SOS Broadcasted
              </h3>

              <p className="text-sm text-muted-foreground mt-2">
                Your live location has been shared with{" "}
                {emergencyContacts} emergency contacts.
              </p>

              <div className="mt-4">
                <div className="text-sm text-muted-foreground">
                  Assigned Control Room
                </div>

                <div className="text-secondary font-semibold mt-1">
                  {controlRoom}
                </div>
              </div>

              {locationLink && (
                <a
                  href={locationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-4 text-primary underline text-sm"
                >
                  View Shared Location
                </a>
              )}

              <button
                onClick={() => setActive(false)}
                className="mt-6 w-full px-4 py-2 rounded-xl glass hover:bg-white/10 text-sm"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Help({
  icon: Icon,
  title,
  num,
}: {
  icon: any;
  title: string;
  num: string;
}) {
  return (
    <a
      href={`tel:${num.replace(/\D/g, "")}`}
      className="glass-strong rounded-2xl p-5 hover:neon-border-cyan transition-all block"
    >
      <Icon className="h-5 w-5 text-destructive" />

      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-3">
        {title}
      </div>

      <div className="font-display text-2xl mt-1 gradient-text">
        {num}
      </div>
    </a>
  );
}