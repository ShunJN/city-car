/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.media.stellantis.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.group.renault.com',
      },
      {
        protocol: 'https',
        hostname: 'www.volkswagen-newsroom.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.caradisiac.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hessautomobile.com',
      },
      {
        protocol: 'https',
        hostname: 'www.vivacar.fr',
      },
    ],
  },
}

export default nextConfig
