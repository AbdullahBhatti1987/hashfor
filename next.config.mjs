/** @type {import('next').NextConfig} */
const nextConfig = {
  // appDir: true, // ✅ Top-level

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
      },
    ],
  },
};

export default nextConfig;
