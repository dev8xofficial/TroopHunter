/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@repo/components']);
const isLocal = process.env.NODE_ENV === 'local';

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['a-us.storyblok.com', 'images.unsplash.com', 'www.cdn.helloabdul.com', 'localhost']
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
        source: '/apple-touch-icon.svg',
        destination: `${process.env.NEXT_PUBLIC_ASSET_HOST}/apple-touch-icon.svg`
      },
      // Webmanifest
      {
        source: '/favicon-16x16.svg',
        destination: `${process.env.NEXT_PUBLIC_ASSET_HOST}/favicon-16x16.svg`
      },
      // Webmanifest
      {
        source: '/favicon-32x32.svg',
        destination: `${process.env.NEXT_PUBLIC_ASSET_HOST}/favicon-32x32.svg`
      },
      // Webmanifest
      {
        source: '/favicon.svg',
        destination: `${process.env.NEXT_PUBLIC_ASSET_HOST}/favicon.svg`
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
      },
      // videos
      {
        source: '/videos/:path*',
        destination: `${process.env.NEXT_PUBLIC_ASSET_HOST}/videos/:path*`
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }]
      }
    ];
  }
});

module.exports = nextConfig;
