import { NextRequest, NextResponse } from "next/server";
import { getConfiguredSiteUrl } from "@/lib/url-helpers";

interface SitemapEntry {
  path: string;
  priority: number;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
}

export async function GET(_request: NextRequest) {
  const baseUrl = getConfiguredSiteUrl();
  const lastmod = new Date().toISOString().split("T")[0];

  // Define all URLs with their priorities and change frequencies
  const urls: SitemapEntry[] = [
    { path: "/", priority: 1.0, changefreq: "daily" },
    { path: "/resume", priority: 0.8, changefreq: "daily" },
    { path: "/projects", priority: 0.8, changefreq: "daily" },
    { path: "/contact", priority: 0.8, changefreq: "daily" },
    { path: "/community", priority: 0.8, changefreq: "daily" },
    { path: "/ai-chat", priority: 0.8, changefreq: "daily" },
    { path: "/ai-tools", priority: 0.7, changefreq: "daily" },
  ];

  // Generate sitemap URLs
  const urlEntries = urls
    .map(
      ({ path, priority, changefreq }) =>
        `  <url><loc>${baseUrl}${path}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
    )
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
