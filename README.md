# Andy Cohen - AI-Native Professional Portfolio

A minimalist professional portfolio demonstrating AI expertise through implementation. Features comprehensive agent discovery mechanisms, MCP tools, and clean architecture that works seamlessly for both humans and AI agents.

## AI Expertise Showcase

This site demonstrates practical AI/agent integration expertise through:

- **MCP Protocol Implementation** - Industry-standard agent tool discovery
- **Multi-Modal Access Patterns** - Same data, multiple consumption methods
- **Comprehensive Agent Discovery** - 5+ discovery mechanisms for maximum compatibility
- **Clean Architecture** - Single JSON source feeding all interfaces
- **Production-Ready** - Full OpenAPI docs, structured data, proper CORS

## Agent Discovery Mechanisms

### 1. **llms.txt** - LLM Agent Instructions
`/llms.txt` - Comprehensive agent documentation with:
- Full professional biography and contact information
- Detailed MCP tool usage instructions and examples
- Technical architecture explanation
- Direct content access for agents that prefer text over APIs

### 2. **MCP (Model Context Protocol) Tools**
`/api/mcp/tools` - Industry-standard agent tool discovery:
- **Discovery**: `GET /api/mcp/tools` returns all available tools with schemas
- **Execution**: `POST /api/mcp/tools/{toolname}` executes tools with parameters
- **Tools Available**: `contact`, `bio`, `resume`

**Example Usage:**
```bash
# Discover tools
curl http://localhost:3000/api/mcp/tools

# Get contact info
curl -X POST http://localhost:3000/api/mcp/tools/contact \
  -H "Content-Type: application/json" \
  -d '{"parameters": {}}'

# Get short bio
curl -X POST http://localhost:3000/api/mcp/tools/bio \
  -H "Content-Type: application/json" \
  -d '{"parameters": {"format": "short"}}'
```

### 3. **OpenAPI Documentation**
`/api/docs` - Complete OpenAPI 3.0 specification:
- Full API documentation with examples
- Schema definitions for all endpoints
- Interactive testing capabilities
- Agent-friendly structured API descriptions

### 4. **Enhanced robots.txt**
Agent-specific access rules for:
- GPTBot, Claude-Web, PerplexityBot, Anthropic-AI, ChatGPT-User
- Specific permissions for MCP endpoints and agent documentation
- Discovery hints in comments

### 5. **Meta Tags & Structured Data**
- **Custom AI Meta Tags**: `ai:tools`, `ai:agent-friendly`, `mcp:endpoint`
- **JSON-LD Schema.org**: Person markup with professional details
- **OpenGraph**: Social sharing with agent context
- **Link Relations**: Alternate formats for different agent types

### 6. **Dynamic Sitemap Integration**
`/api/sitemap.xml` - Dynamic sitemap that adapts to any deployment domain, includes both human and agent-facing endpoints for comprehensive crawling

## Technical Architecture

**Stack**: Next.js 15, TypeScript, Tailwind CSS  
**Data Source**: Single JSON file (`content/data.json`)  
**Hosting**: Vercel-ready  
**Agent Support**: 5+ discovery mechanisms, MCP protocol, OpenAPI docs

**Philosophy**: Single source of truth - one JSON file feeds the website, MCP tools, llms.txt, and structured data. No duplication, no sync issues.

## Content Structure

The site presents Andy Cohen's professional information:

### Bio
Professional biography highlighting:
- Founding architect of Sitecore XM Cloud (concept to global launch)
- Cost optimization expertise (90% reduction in operating costs)
- Current focus on AI-driven developer productivity
- Leadership at the intersection of Product and Engineering

### Resume
Current: **VP & Chief Architect at Altudo** (2023-Present)
- Building agentic AI workflows for CMS implementations
- Creating development accelerators
- Resolving high-profile platform incidents
- Improving customer adoption patterns

### Contact
- **Email**: iamandycohen@gmail.com
- **LinkedIn**: linkedin.com/in/iamandycohen
- **Location**: Golden Valley, MN

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Test all agent discovery mechanisms
# (See PowerShell test in terminal output above)
```

## Agent Integration Testing

All discovery mechanisms verified working:
- ✅ MCP Tools Discovery (3 tools available)
- ✅ llms.txt accessible (comprehensive instructions)
- ✅ OpenAPI documentation (v1.0.0)
- ✅ MCP tool execution (contact, bio, resume)

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Auto-deployment on push to main
3. All agent endpoints automatically available at your domain

### Manual
```bash
npm run build
npm start
```

## API Endpoints Summary

| Endpoint | Method | Purpose | Agent Type |
|----------|--------|---------|------------|
| `/llms.txt` | GET | Agent instructions & content | LLM agents |
| `/api/mcp/tools` | GET | Tool discovery | MCP-compatible agents |
| `/api/mcp/tools/{tool}` | POST | Tool execution | MCP-compatible agents |
| `/api/docs` | GET | OpenAPI specification | API agents |
| `/robots.txt` | GET | Agent access rules | Web crawlers |
| `/api/sitemap.xml` | GET | Dynamic sitemap with agent endpoints | Search engines |

## Why This Architecture?

This portfolio serves as a **live demonstration** of AI-native architecture principles:

1. **Agent-First Design** - Built with agent consumption as a first-class concern
2. **Multiple Discovery Patterns** - Accommodates different agent capabilities and preferences  
3. **Standards Compliance** - Uses established protocols (MCP, OpenAPI, Schema.org)
4. **Single Source of Truth** - No data duplication between human and agent interfaces
5. **Production Quality** - Full documentation, testing, and deployment ready

The site itself **is** the portfolio piece - demonstrating practical understanding of how agents discover, evaluate, and consume information in production systems.

## License

MIT License

## Contact

**Andy Cohen**
- Email: iamandycohen@gmail.com
- LinkedIn: [linkedin.com/in/iamandycohen](https://linkedin.com/in/iamandycohen)
- Location: Golden Valley, MN

*Building systems that scale, teams that thrive, and developer experiences that delight.* 