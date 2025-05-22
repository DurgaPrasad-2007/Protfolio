/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "udemy-certificate.s3.amazonaws.com",
      "media.licdn.com",
      "freeimghost.net",
      "bing.com"
    ],
    unoptimized: true,
  },
  output: 'standalone',
  env: {
    PORT: process.env.PORT || '10000',
  },
}

export default nextConfig
