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
- `npm run mcp:test` - Test MCP server endpoints
- `npm run redis:check` - Check Redis connection
- `npm run ratelimits:check` - Check rate limiting status

**Testing Infrastructure:**
- **Jest** with React Testing Library for component testing
- **API Route Testing** for backend functionality
- **MCP Protocol Testing** for AI agent integration
- **TypeScript Integration** for type-safe testing

**Environment Setup:**
```bash
# Required for AI chat functionality
OPENAI_API_KEY=your_openai_api_key

# Optional: Redis for production caching/rate limiting
REDIS_URL=redis://localhost:6379

# Optional: Production monitoring
VERCEL_ENV=development
```

## 📞 Connect

- **Email**: [iamandycohen@gmail.com](mailto:iamandycohen@gmail.com)
- **LinkedIn**: [linkedin.com/in/iamandycohen](https://linkedin.com/in/iamandycohen)
- **Location**: Golden Valley, MN
- **GitHub**: [github.com/iamandycohen/me](https://github.com/iamandycohen/me)

---

*This portfolio demonstrates the future of professional websites: beautiful for humans, conversationally accessible through AI chat experiences, discoverable by AI agents via multiple protocols, and built with modern web technologies. It serves as both a professional showcase and a comprehensive reference implementation of AI-native architecture with production-ready infrastructure.* 