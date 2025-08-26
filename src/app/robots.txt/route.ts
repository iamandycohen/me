import { NextResponse } from "next/server";
import { getConfiguredSiteUrl } from "@/lib/url-helpers";

export async function GET() {
  const siteUrl = getConfiguredSiteUrl();

  const robotsTxt = `User-agent: *
Allow: /

# AI/Agent specific access
User-agent: GPTBot
Allow: /api/mcp
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs

User-agent: Claude-Web  
Allow: /api/mcp
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs

User-agent: Meta-ExternalAgent
Allow: /api/mcp
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs

User-agent: PerplexityBot
Allow: /api/mcp
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs

User-agent: Anthropic-AI
Allow: /api/mcp
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs

User-agent: ChatGPT-User
Allow: /api/mcp
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs

# Standard search engines
User-agent: Googlebot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

User-agent: Bingbot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt

# Dynamic Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# Agent discovery hints
# MCP Tools: /api/mcp
# Agent Documentation: /llms.txt
# Complete Profile: /llms-full.txt
# OpenAPI Spec: /api/docs`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
