/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    // allow Cloudinary images served from this host
    domains: ["res.cloudinary.com"],
    // if you need more granular control, use `remotePatterns`
    // remotePatterns: [
    //   { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' }
    // ]
  },
};

export default nextConfig;
