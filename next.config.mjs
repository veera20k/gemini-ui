/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "**",
      },{
        protocol: "https",
        hostname: "robohash.org",
        pathname: "**",
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/chat/new',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
