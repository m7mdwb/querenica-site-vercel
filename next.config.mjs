/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['8k9skxif1sms4ctv.public.blob.vercel-storage.com'],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    unoptimized: true,
  },
}

export default nextConfig
