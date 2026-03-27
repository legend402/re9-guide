import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '生化危机9：安魂曲 - 完整攻略站',
  description: '生化危机9：安魂曲(Resident Evil Requiem)完整攻略网站，包含流程攻略、武器数据、敌人信息、收集品位置等',
  keywords: '生化危机9, Resident Evil 9, RE9, 安魂曲, Requiem, 攻略, 武器, 敌人, 收集品',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
