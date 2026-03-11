import type { NextConfig } from 'next';

const isLocal = process.env.NODE_ENV === 'local';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/components'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  headers: async () => [
    {
      source: '/:all*(.png|.jpg|.jpeg|.gif|.svg)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, must-revalidate',
        },
      ],
    },
    {
      source: '/fonts/:path*',
      headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
    },
  ],
  assetPrefix: isLocal ? undefined : process.env.NEXT_PUBLIC_ASSET_HOST,
  async rewrites() {
    const assetHost = process.env.NEXT_PUBLIC_ASSET_HOST || '';
    return [
      { source: '/fonts/:path*', destination: `${assetHost}/fonts/:path*` },
      { source: '/favicon.svg', destination: `${assetHost}/favicon.svg` },
      { source: '/robots.txt', destination: `${assetHost}/robots.txt` },
      { source: '/sitemap.xml', destination: `${assetHost}/sitemap.xml` },
    ];
  },
};

export default nextConfig;
