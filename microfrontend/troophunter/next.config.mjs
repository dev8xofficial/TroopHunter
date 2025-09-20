/** @type {import('next').NextConfig} */
const isLocal = process.env.NODE_ENV === 'local';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['a-us.storyblok.com', 'images.unsplash.com', 'www.cdn.troophunter.com', 'localhost']
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
    const assetHost = process.env.NEXT_PUBLIC_ASSET_HOST;
    if (!assetHost) {
      return [];
    }
    return [
      // Fonts
      {
        source: '/fonts/:path*',
        destination: `${assetHost}/fonts/:path*`
      },
      // Webmanifest
      {
        source: '/webmanifest/:path*',
        destination: `${assetHost}/webmanifest/:path*`
      },
      // Robots.txt
      {
        source: '/robots.txt',
        destination: `${assetHost}/robots.txt`
      },
      // Sitemap.xml
      {
        source: '/sitemap.xml',
        destination: `${assetHost}/sitemap.xml`
      },
      // Search engine verification file
      {
        source: '/433007b64fc144ebab1d16b269c7664f.txt',
        destination: `${assetHost}/433007b64fc144ebab1d16b269c7664f.txt`
      }
    ];
  }
};

export default nextConfig;
