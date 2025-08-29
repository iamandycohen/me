import { NextResponse } from "next/server";
import { getConfiguredSiteUrl } from "@/lib/url-helpers";

export async function GET() {
  const siteUrl = getConfiguredSiteUrl();

  const robotsTxt = `User-agent: *
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /api/docs
Disallow: /api/mcp

# AI Agents - Full MCP Access
User-agent: GPTBot
User-agent: Claude-Web
User-agent: ClaudeBot
User-agent: ChatGPT-User
User-agent: Anthropic-AI
User-agent: Meta-ExternalAgent
User-agent: PerplexityBot
User-agent: Gemini
Allow: /api/mcp

Sitemap: ${siteUrl}/sitemap.xml

# MCP Server: ${siteUrl}/api/mcp
# AI Profile: ${siteUrl}/llms.txt  
# Full Profile: ${siteUrl}/llms-full.txt`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
