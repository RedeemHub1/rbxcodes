/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tr.rbxcdn.com" },
      { protocol: "https", hostname: "images.rbxcdn.com" },
      { protocol: "https", hostname: "placehold.co" }
    ]
  },
  poweredByHeader: false
};

export default nextConfig;
