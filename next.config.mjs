/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
      },
    ],
    experimental: {
      appDir: true, // ✅ must be true for App Router
    },
  },
};

export default nextConfig;
