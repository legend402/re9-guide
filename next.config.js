/** @type {import('next').NextConfig} */
const nextConfig = {
  // 只在构建时启用静态导出，开发模式使用默认配置
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',
    // 静态导出时，指定输出目录为 dist
    distDir: 'dist',
    trailingSlash: true,
  } : {}),
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
