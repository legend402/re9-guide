/** @type {import('next').NextConfig} */
const nextConfig = {
  // 只在构建时启用静态导出，开发模式使用默认配置
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',
    distDir: 'dist',
    trailingSlash: true,
  } : {}),
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
