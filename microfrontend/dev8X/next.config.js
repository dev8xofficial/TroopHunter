/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@repo/components']);

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['a-us.storyblok.com'] // Add this line to allow images from the domain
  }
});

module.exports = nextConfig;
