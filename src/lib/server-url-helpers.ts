import { headers } from "next/headers";
import { getConfiguredSiteUrl } from "./url-helpers";
import { stripTrailingSlash } from "./utils";

// Server-only functions that require next/headers

// Optional per-request base. Use only when you truly want to reflect the incoming host.
export async function getRequestBaseUrl() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (host) return `${proto}://${host}`;
  return getConfiguredSiteUrl();
}

export async function absoluteUrlFromRequest(path = "") {
  const base = stripTrailingSlash(await getRequestBaseUrl());
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
