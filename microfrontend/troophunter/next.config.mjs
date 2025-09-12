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
      },
      // Search engine verification file
      {
        source: '/433007b64fc144ebab1d16b269c7664f.txt',
        destination: `${process.env.NEXT_PUBLIC_ASSET_HOST}/433007b64fc144ebab1d16b269c7664f.txt`
      }
    ];
  }
};

export default nextConfig;
