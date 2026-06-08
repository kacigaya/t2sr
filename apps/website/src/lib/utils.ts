import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function publicApiUrl() {
  return import.meta.env.VITE_PUBLIC_API_URL ?? "https://api.t2sr.fr";
}
