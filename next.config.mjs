/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This just tells Next.js: don't block the build because of type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
