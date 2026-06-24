import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import { useEffect } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

// Fix missing marker icons in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type RouteData = {
  geometry: number[][];
  distance: number;
  duration: number;
};

type LiveMapProps = {
  routes: RouteData[];
};

type Vehicle = {
  id: string;
  lat: number;
  lng: number;
  speed: number;
};

const vehicles: Vehicle[] = [
  {
    id: "vehicle_1",
    lat: 19.076,
    lng: 72.8777,
    speed: 42,
  },
  {
    id: "vehicle_2",
    lat: 19.082,
    lng: 72.885,
    speed: 28,
  },
  {
    id: "vehicle_3",
    lat: 19.071,
    lng: 72.869,
    speed: 55,
  },
];

function FitBounds({
  path,
}: {
  path: [number, number][];
}) {
  const map = useMap();

  useEffect(() => {
    if (path.length > 0) {
      map.fitBounds(path, {
        padding: [50, 50],
      });
    }
  }, [path, map]);

  return null;
}

export default function LiveMap({
  routes = [],
}: LiveMapProps) {
  const colors = ["blue", "green", "orange"];

  return (
    <MapContainer
      center={[19.076, 72.8777]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {routes.map((route, index) => {
        const path = route.geometry.map(
          ([lng, lat]) => [lat, lng]
        );

        return (
          <Polyline
            key={index}
            positions={path as [number, number][]}
            color={colors[index % colors.length]}
            weight={5}
          />
        );
      })}

      {routes.length > 0 && (
        <>
          <FitBounds
            path={routes[0].geometry.map(
              ([lng, lat]) =>
                [lat, lng] as [number, number]
            )}
          />

          <Marker
            position={[
              routes[0].geometry[0][1],
              routes[0].geometry[0][0],
            ]}
          >
            <Popup>Source</Popup>
          </Marker>

          <Marker
            position={[
              routes[0].geometry[
                routes[0].geometry.length - 1
              ][1],
              routes[0].geometry[
                routes[0].geometry.length - 1
              ][0],
            ]}
          >
            <Popup>Destination</Popup>
          </Marker>
        </>
      )}

      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle.id}
          position={[vehicle.lat, vehicle.lng]}
        >
          <Popup>
            <div className="space-y-1">
              <div className="font-semibold">
                {vehicle.id}
              </div>

              <div>
                Speed: {vehicle.speed} km/h
              </div>

              <div>
                Location: {vehicle.lat.toFixed(4)},
                {" "}
                {vehicle.lng.toFixed(4)}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}