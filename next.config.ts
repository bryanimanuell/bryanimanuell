import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: {
    agentUpgrade: 'security',
  },
  async headers() {
    return [{ source: '/frames/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }] }];
  },
};
export default config;
