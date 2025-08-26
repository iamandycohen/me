import { stripTrailingSlash } from "./utils";

// Source of truth for absolute URLs in both build and request time.
// Client-safe functions only (no next/headers dependency)

// 1) Build-time and runtime base. Configured in next.config.js
export function getConfiguredSiteUrl() {
  // URL is configured centrally in next.config.js
  // Uses NEXT_PUBLIC_SITE_URL if set, otherwise canonical domain
  const fromEnv = process.env.SITE_URL?.trim();
  if (fromEnv) return stripTrailingSlash(fromEnv);
  return "https://www.iamandycohen.com"; // ultimate fallback
}

// 2) Absolute URL helper (client-safe)
export function absoluteUrl(path = "") {
  const base = getConfiguredSiteUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

// 3) Client-side base URL getter
export function getClientBaseUrl(): string {
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return getConfiguredSiteUrl(); // Use configured site URL during SSR
}
