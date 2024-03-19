/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/edu',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
