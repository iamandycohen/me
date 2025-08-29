/** @type {import('next').NextConfig} */
const nextConfig = {
  // Advanced image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', 'clsx', 'tailwind-merge'],
  },
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enhanced webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Let Next.js handle source maps - don't override devtool
    // Next.js 15 automatically handles source maps for debugging
    
    // Optimize for production builds
    if (!dev && !isServer) {
      // Enhanced bundle splitting for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Framework chunks (React, Next.js core)
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-sync-external-store)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Large libraries that change less frequently
          lib: {
            test(module) {
              return module.size() > 160000 &&
                /node_modules[/\\]/.test(module.identifier());
            },
            name(module) {
              // Simple hash for chunk naming
              const identifier = module.identifier();
              const hash = identifier.split('').reduce((a, b) => {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a;
              }, 0);
              return 'lib-' + Math.abs(hash).toString(36).substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          // Common vendor chunks
          vendor: {
            name: 'vendors',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          // Common shared code
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      };

      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    return config;
  },
  async headers() {
    return [
      // CORS for MCP endpoints is now handled in middleware.ts
      // Performance and security headers
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Preload critical resources
          {
            key: 'Link',
            value: '</headshot.png>; rel=preload; as=image; type=image/png'
          }
        ],
      },
      // Static assets caching with better cache control
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  env: {
    SITE_NAME: 'Andy Cohen',
    // Centralized URL resolution with dev/prod awareness
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 
             (process.env.NODE_ENV === 'development' 
               ? 'http://localhost:3000' 
               : 'https://www.iamandycohen.com'),
  },
  async redirects() {
    return [
      {
        source: '/speaking',
        destination: '/community',
        permanent: true,
      },
      {
        source: '/api/sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      // Route rebranding redirects
      {
        source: '/chat',
        destination: '/ai-chat',
        permanent: true,
      },
      {
        source: '/mcp-test',
        destination: '/ai-tools',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig; 