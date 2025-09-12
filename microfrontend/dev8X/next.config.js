/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@repo/components']);
const isLocal = process.env.NODE_ENV === 'local';

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['a-us.storyblok.com', 'images.unsplash.com', 'www.cdn.dev8x.com', 'localhost']
  },
  headers: async () => [
    {
      source: '/:all*(.png|.jpg|.jpeg|.gif|.svg)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, must-revalidate'
        }
      ]
    }
  ],
  assetPrefix: isLocal ? undefined : process.env.NEXT_PUBLIC_ASSET_HOST,
  async rewrites() {
    return [
      // Fonts
      {
        source: '/fonts/:path*',
        destination: `${process.env.NEXT_PUBLIC_ASSET_HOST}/fonts/:path*`
      },
      // Webmanifest
      {
        source: '/webmanifest/:path*',
        destination: `${process.env.NEXT_PUBLIC_ASSET_HOST}/webmanifest/:path*`
      },
      // Robots.txt
      {
        source: '/robots.txt',
        destination: `${process.env.NEXT_PUBLIC_ASSET_HOST}/robots.txt`
      },
      // Sitemap.xml
      {
        source: '/sitemap.xml',
        destination: `${process.env.NEXT_PUBLIC_ASSET_HOST}/sitemap.xml`
      }
    ];
  }
});

module.exports = nextConfig;
