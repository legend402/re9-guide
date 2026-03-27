# 生化危机9：安魂曲 - 攻略站

![GitHub Pages](https://github.com/yourusername/re9-guide/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)

《生化危机9：安魂曲》完整攻略网站，基于游戏数据开发的静态网站。

## 🎮 网站功能

- **首页** - 游戏概览、发售信息、特色介绍
- **角色介绍** - 双主角格蕾丝与里昂的详细对比
- **章节攻略** - 8个章节的完整流程攻略
- **武器图鉴** - 25种武器的详细数据和升级路线
- **敌人/Boss** - 普通敌人弱点和Boss打法攻略
- **收集品指南** - 浣熊先生、文件、保险箱位置
- **数据对比** - 武器属性对比工具和装备推荐

## 🎨 设计特色

- 暗黑恐怖风格，符合生化危机氛围
- CRT扫描线效果，复古未来主义
- 霓虹发光文字效果
- 完全响应式设计
- 流畅的交互动画

## 🛠 技术栈

- **框架**: Next.js 14 + React 18
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **图表**: Recharts
- **部署**: GitHub Pages

## 📦 本地开发

```bash
# 进入项目目录
cd re9-guide-site

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```

## 🚀 部署

项目配置为自动部署到 GitHub Pages。当推送代码到 `main` 分支时，GitHub Actions 会自动构建并部署网站。

## 📁 项目结构

```
re9-guide-site/
├── src/
│   ├── app/              # 页面组件
│   │   ├── page.tsx      # 首页
│   │   ├── characters/   # 角色介绍
│   │   ├── walkthrough/  # 章节攻略
│   │   ├── weapons/      # 武器图鉴
│   │   ├── enemies/      # 敌人/Boss
│   │   ├── collectibles/ # 收集品
│   │   └── compare/      # 数据对比
│   ├── components/       # 共享组件
│   ├── data/            # JSON数据文件
│   ├── lib/             # 工具函数
│   └── types/           # TypeScript类型
├── public/              # 静态资源
└── package.json
```

## 📄 数据来源

所有游戏数据来自官方攻略和社区wiki，仅供学习参考。

## ⚠️ 免责声明

本站所有数据仅供学习参考，游戏版权归 CAPCOM 所有。本站与 CAPCOM 官方无任何关联。

## 📜 许可证

MIT License
