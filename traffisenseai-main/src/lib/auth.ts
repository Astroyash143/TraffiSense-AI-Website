// src/lib/auth.ts

export type Vehicle = {
  rtoNumber?: string;
  vehicleNumber?: string;
  vehicleType?: string;
  fuelType?: string;
  insuranceStatus?: string;
  pucStatus?: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  rto: string;
  photo?: string;
  uid?: string;
  vehicles?: Vehicle[];
};

const KEY = "trafficsense_user";

export function getUser(): User | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setUser(user: User | null) {
  if (typeof window === "undefined") return;

  if (user) {
    localStorage.setItem(KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEY);
  }

  window.dispatchEvent(new Event("auth-change"));
}

export function logout() {
  setUser(null);
}

export function defaultUser(): User {
  return {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    rto: "",
    photo: "",
    uid: "",
    vehicles: [],
  };
}