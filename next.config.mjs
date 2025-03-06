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
      {
        protocol: 'https',
        hostname: 'four-favpic-team1-be.onrender.com',
        port: '',
        pathname: '/static/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
