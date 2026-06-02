import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  // If GitHub Pages uses a sub-path (e.g. username.github.io/homepage), uncomment:
  // basePath: '/homepage',
  // assetPrefix: '/homepage/',
  images: { unoptimized: true },
}

export default nextConfig
