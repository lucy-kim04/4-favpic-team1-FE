/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5050',
        pathname: '/static/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
