/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/api/mcp/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
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
};

module.exports = nextConfig; 