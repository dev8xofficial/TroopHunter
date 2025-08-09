/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['a-us.storyblok.com', 'images.unsplash.com'] // 👈 Add this
  }
};

export default nextConfig;
