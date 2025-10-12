/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "files.stripe.com"
      }
    ],
    // Disable image optimization in development to avoid network timeouts
    unoptimized: process.env.NODE_ENV === 'development'
  }
};

module.exports = nextConfig;
