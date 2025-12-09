/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false, // hide bottom-right Next.js icon
  },

  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
