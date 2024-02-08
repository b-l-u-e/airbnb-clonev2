/** @type {import('next').NextConfig} */
const nextConfig = {
  //  hostname "res.cloudinary.com" is not configured under images in your `next.config.js -> resolved`
  // hostname "githubusercontent.com and googleusercontent.com is resolved"
   reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
