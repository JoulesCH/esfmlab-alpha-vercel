/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true, esmExternals: 'loose'  },
}

module.exports = nextConfig
