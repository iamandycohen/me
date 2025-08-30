# Andy Cohen - Professional Portfolio

> **Open Source AI-Native Portfolio** | [🔗 View on GitHub](https://github.com/iamandycohen/me)

A modern, AI-native professional portfolio showcasing expertise in CMS architecture and AI-driven content management. This site demonstrates cutting-edge web development practices by implementing a comprehensive AI-first architecture: a beautiful human-friendly website, interactive AI chat experiences, and a production-ready machine-readable API using the **Model Context Protocol (MCP)**.

## ✨ What Makes This Special

### 🌐 **Human Interface**
- **Clean Design**: Minimalist, professional presentation focused on showcasing expertise
- **Responsive**: Optimized viewing experience across all devices  
- **Performance**: Fast loading with modern web technologies and Core Web Vitals monitoring
- **Interactive AI**: Floating chat widget available on every page for immediate assistance

### 🤖 **AI-First Architecture** 
- **Dual Chat Experiences**: Full-screen AI chat (`/ai-chat`) + floating widget on every page
- **Production MCP Server**: Full JSON-RPC 2.0 implementation with official SDK v1.17.4+
- **6 Professional Tools**: Contact, biography, resume, projects, community contributions, and complete profile access
- **Real-time Testing**: Interactive MCP testing suite at `/ai-tools` with live demonstrations
- **Agent Discovery**: Multiple pathways for AI agents to discover and interact with professional data
- **Comprehensive API**: RESTful endpoints plus structured chat completions

### ⚡ **Developer Experience**
- **Complete Testing**: Jest with React Testing Library for full coverage
- **Type Safety**: End-to-end TypeScript with runtime validation
- **Production Ready**: Redis caching, rate limiting, error handling, and monitoring
- **Open Source**: Full implementation available for learning and contribution

## 🚀 AI-Native Architecture

This portfolio showcases modern AI-native development by providing **multiple interaction pathways** to the same professional data:

### **Human Experiences:**
- **Traditional Web Interface**: Beautiful, responsive pages for human browsing
- **Interactive AI Chat**: Full-screen conversational experience at `/ai-chat`  
- **Floating AI Assistant**: Persistent chat widget available on every page
- **Live Demonstrations**: Interactive MCP testing at `/ai-tools`

### **Agent & API Interfaces:**
- **MCP Server**: Production JSON-RPC 2.0 server with 6 professional tools
- **Chat API**: OpenAI-powered conversational access with full context
- **REST Endpoints**: Traditional API access for structured data
- **Agent Discovery**: Multiple discovery mechanisms (llms.txt, OpenAPI, structured data)

### **Shared Architecture Benefits:**
- **Single Source of Truth**: All interfaces access the same data layer
- **Type Safety**: End-to-end TypeScript ensures consistency
- **Real-time Updates**: Changes propagate across all interaction methods
- **Performance Optimized**: Redis caching and edge computing for speed
- **Production Ready**: Comprehensive error handling, rate limiting, and monitoring

This architecture demonstrates how modern websites can seamlessly serve humans, AI agents, and traditional APIs from a unified codebase.

## 🛠 Built With

**Core Framework:**
- **Next.js 15** - Modern React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom components

**AI Integration:**
- **Model Context Protocol (MCP)** - Official SDK v1.17.4+ for AI agent communication
- **OpenAI API** - Chat completions and AI-powered interactions
- **MCP Handler** - Custom server implementation for Vercel Edge Runtime

**Development & Testing:**
- **Jest** - Comprehensive testing framework with React Testing Library
- **ESLint** - Code linting with TypeScript integration
- **CORS** - Cross-origin resource sharing handling

**Performance & Monitoring:**
- **Vercel Analytics** - User behavior tracking
- **Vercel Speed Insights** - Core Web Vitals monitoring
- **Redis** - Optional caching and rate limiting (production)

**Additional Libraries:**
- **React Markdown** - Dynamic markdown rendering
- **Heroicons** - Professional icon library
- **Zod** - Runtime type validation
- **Lucide React** - Additional UI icons

## 🎯 Features for Visitors

**Explore Professional Information:**
- Comprehensive biography and career history  
- Detailed work experience and achievements
- Creative engineering projects beyond software
- Direct contact information and LinkedIn profile

**🤖 AI-Powered Interactions:**
- **AI Chat Interface** (`/ai-chat`) - Full-screen conversational AI with access to Andy's complete professional data
- **Floating Chat Widget** - AI assistant available on every page via floating icon
- **Interactive MCP Testing** (`/ai-tools`) - Live demonstration of Model Context Protocol capabilities
- **Real-time Responses** - Chat with AI that has live access to structured professional data

**For Developers & AI Enthusiasts:**
- **Production MCP Server** - Full JSON-RPC 2.0 implementation with 6 professional tools
- **Interactive Testing Suite** - Browser-based MCP testing interface with live examples
- **Complete API Documentation** at `/api/docs`
- **AI Agent Instructions** at `/llms.txt` 
- **Open Source Implementation** - Full codebase for learning and reference
- **Comprehensive Test Coverage** - Jest-based testing infrastructure

## 🌟 Professional Highlights

- **Founding Architect** of [Sitecore XM Cloud](https://www.sitecore.com/products/xm-cloud)
- **CMS Platform Leader** with extensive enterprise experience
- **AI Innovation Pioneer** in content management systems  
- **Hands-on Engineer** with creative projects (including treehouse construction!)

## 🔗 Open Source

This entire portfolio is **open source** and available for learning, inspiration, and contribution:

**[📂 github.com/iamandycohen/me](https://github.com/iamandycohen/me)**

Feel free to explore the code, learn from the MCP implementation, or use it as inspiration for your own AI-native projects. Issues and pull requests welcome!

## 🌐 Site Structure & Pages

**Main Navigation:**
- **Home** (`/`) - Professional overview with key highlights and floating AI assistant
- **Resume** (`/resume`) - Comprehensive career history and experience
- **Projects** (`/projects`) - Creative engineering projects and builds
- **Community** (`/community`) - MVP awards, speaking, and thought leadership
- **Contact** (`/contact`) - Direct contact information and social links

**AI-Native Features:**
- **AI Chat** (`/ai-chat`) - Full-screen conversational interface with MCP-powered responses
- **AI Tools Demo** (`/ai-tools`) - Interactive MCP testing with live server demonstrations
- **Floating Chat Widget** - Available on every page for immediate AI assistance

**Developer Resources:**
- **API Documentation** (`/api/docs`) - Complete OpenAPI specification
- **Agent Instructions** (`/llms.txt`) - AI interaction guidelines  
- **MCP Endpoint** (`/api/mcp`) - Production Model Context Protocol server
- **Chat API** (`/api/chat`) - OpenAI-powered chat completions

## 📡 Agent Discovery

AI agents can discover and interact with this portfolio through multiple mechanisms:
- **MCP Server**: `/api/mcp` - JSON-RPC 2.0 protocol implementation with 6 professional tools
- **Agent Instructions**: `/llms.txt` - Comprehensive guide for AI interaction
- **API Documentation**: `/api/docs` - OpenAPI specification with live examples
- **Structured Data**: JSON-LD markup for search engines and AI crawlers
- **Chat API**: `/api/chat` - Direct conversational access with context

## 👨‍💻 Development

**Getting Started:**
```bash
# Clone the repository
git clone https://github.com/iamandycohen/me.git
cd me

# Install dependencies  
npm install

# Set up environment variables
npm run setup:env
# Then edit .env.local with your API keys

# Start development server
npm run dev

# Run tests
npm test

# Run in watch mode for development
npm run test:watch
```

**Available Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues automatically
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run Jest test suite
- `npm run setup:env` - Set up environment variables from template
- `npm run env:check` - Check environment variable configuration
- `npm run mcp:test` - Test MCP server endpoints
- `npm run redis:check` - Check Redis connection
- `npm run ratelimits:check` - Check rate limiting status

**Testing Infrastructure:**
- **Jest** with React Testing Library for component testing
- **API Route Testing** for backend functionality
- **MCP Protocol Testing** for AI agent integration
- **TypeScript Integration** for type-safe testing

## 🔧 Environment Setup

### Quick Start (Recommended)
```bash
# 1. Copy the template to get started quickly
npm run setup:env

# 2. Edit .env.local and add your API keys
# 3. Start development
npm run dev
```

### Manual Setup
```bash
# Copy template file
cp .env.local.template .env.local

# Edit .env.local with your values
```

### Environment Variables

#### Required Variables
| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `OPENAI_API_KEY` | OpenAI API key for chat functionality | [OpenAI Platform](https://platform.openai.com/api-keys) |

#### Optional Variables (with defaults)
| Variable | Default | Description |
|----------|---------|-------------|
| `REDIS_URL` | _(none)_ | Redis URL for enhanced rate limiting and caching |
| `SITE_URL` | `https://www.iamandycohen.com` | Site URL for absolute URLs |
| `LLM_MODEL` | `gpt-4o-mini` | OpenAI model to use |
| `LLM_TEMPERATURE` | `0.2` | AI response creativity (0.0-2.0) |
| `LLM_MAX_TOOL_LOOPS` | `6` | Maximum tool execution loops |
| `LLM_FORCE_NON_STREAMING` | `false` | Disable streaming responses |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Rate limit window (milliseconds) |
| `RATE_LIMIT_CHAT` | `10` | Chat API requests per window |
| `RATE_LIMIT_MCP` | `50` | MCP API requests per window |
| `RATE_LIMIT_API` | `100` | Other API requests per window |
| `NEXT_PUBLIC_GA_ID` | _(none)_ | Google Analytics ID |

### Configuration Files
- **`.env.local.template`** - Minimal setup template (copy to `.env.local`)
- **`.env.example`** - Complete reference with all variables and documentation
- **`.env.local`** - Your actual configuration (gitignored)

### Redis Setup (Optional)
Redis enhances rate limiting and provides caching. The app works without it but with reduced functionality.

**Local Development:**
```bash
# Install Redis locally or use Docker
docker run -d -p 6379:6379 redis:alpine

# Set in .env.local
REDIS_URL=redis://localhost:6379
```

**Production:**
Use a Redis provider like [Upstash](https://upstash.com/) or [Redis Cloud](https://redis.com/redis-enterprise-cloud/).

### Verification
```bash
# Check environment variable configuration
npm run env:check

# Check Redis connection
npm run redis:check

# Check rate limiting configuration  
npm run ratelimits:check

# Environment warnings will automatically appear when starting the dev server
npm run dev
```

### Automatic Environment Validation
The app automatically checks your environment configuration when starting:
- **Startup warnings** appear in the console for missing required/optional variables
- **Non-blocking** - app starts even with missing optional variables
- **Development only** - warnings don't appear in production
- **One-time check** - runs once at server startup via `next.config.js`

## 📞 Connect

- **Email**: [iamandycohen@gmail.com](mailto:iamandycohen@gmail.com)
- **LinkedIn**: [linkedin.com/in/iamandycohen](https://linkedin.com/in/iamandycohen)
- **Location**: Golden Valley, MN
- **GitHub**: [github.com/iamandycohen/me](https://github.com/iamandycohen/me)

---

*This portfolio demonstrates the future of professional websites: beautiful for humans, conversationally accessible through AI chat experiences, discoverable by AI agents via multiple protocols, and built with modern web technologies. It serves as both a professional showcase and a comprehensive reference implementation of AI-native architecture with production-ready infrastructure.* 