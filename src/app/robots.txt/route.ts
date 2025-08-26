import { NextResponse } from "next/server";
import { getConfiguredSiteUrl } from "@/lib/url-helpers";

export async function GET() {
  const siteUrl = getConfiguredSiteUrl();

  const robotsTxt = `User-agent: *
Allow: /

# AI/Agent specific access - full site plus AI endpoints
User-agent: GPTBot
Allow: /
Allow: /api/mcp
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs

User-agent: Claude-Web  
Allow: /
Allow: /api/mcp
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs

User-agent: Meta-ExternalAgent
Allow: /
Allow: /api/mcp
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs

User-agent: PerplexityBot
Allow: /
Allow: /api/mcp
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs

User-agent: Anthropic-AI
Allow: /
Allow: /api/mcp
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs

User-agent: ChatGPT-User
Allow: /
Allow: /api/mcp
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs

# Additional AI agents that might want access
User-agent: Gemini
Allow: /
Allow: /api/mcp
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs

User-agent: ClaudeBot
Allow: /
Allow: /api/mcp
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs

# Standard search engines
User-agent: Googlebot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs
Allow: /api/mcp

User-agent: Bingbot
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs
Allow: /api/mcp

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
