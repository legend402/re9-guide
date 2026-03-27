# 生化危机9:安魂曲 (Resident Evil 9: Requiem) Banner图片资源

本目录包含为RE9指南网站各页面准备的Banner图片资源。

## 📁 目录结构

```
public/images/
├── banners/                    # Banner图片目录
│   ├── banners-config.json    # 图片配置文件
│   └── download-banners.py    # 批量下载脚本
├── hero-bg.jpg                # 首页主视觉图 (已有)
├── grace.jpg                  # 格蕾丝图片 (已有)
├── leon.jpg                   # 里昂图片 (已有)
└── BANNERS-README.md          # 本说明文件
```

## 🎯 各页面推荐Banner

| 页面 | 路由 | 推荐Banner | 说明 |
|------|------|-----------|------|
| 角色介绍 | `/characters/` | `characters-banner.jpg` | 格蕾丝关键艺术图 |
| 章节攻略 | `/walkthrough/` | `walkthrough-banner.jpg` | 浣熊市主视觉图 (1440x810) |
| 武器图鉴 | `/weapons/` | `weapons-banner.jpg` | 武器概念艺术 |
| 敌人/Boss | `/enemies/` | `enemies-banner.jpg` | The Girl Boss战截图 |
| 收集品指南 | `/collectibles/` | `collectibles-banner.jpg` | 格蕾丝艺术图 |
| 数据对比 | `/compare/` | `compare-banner.jpg` | 游戏Logo |

## 📥 下载图片

### 方法1: 运行Python脚本

```bash
cd re9-guide-site
python public/images/banners/download-banners.py
```

### 方法2: 手动下载

参考 `banners-config.json` 中的URL列表，手动下载图片到 `public/images/banners/` 目录。

## 🔗 图片来源

| 来源 | 网址 | 类型 |
|------|------|------|
| **Creative Uncut** | https://www.creativeuncut.com/art_resident-evil-requiem_a.html | 概念艺术、角色图 |
| **Evil Resource** | https://www.evilresource.com/resident-evil-requiem/ | 渲染图 (PNG透明背景) |
| **GameWatcher** | https://www.gamewatcher.com/ | 游戏截图 |
| **VGTimes** | https://vgtimes.com/games/resident-evil-requiem/screenshots/ | 游戏截图 |

## ⚠️ 使用说明

1. **版权**: 这些图片来自官方游戏资源，仅限非商业用途（如攻略网站）
2. **下载延迟**: 批量下载时请设置适当延迟(0.3-1秒)，避免给服务器造成负担
3. **图片质量**: 
   - Creative Uncut: 高清JPG，适合Banner
   - Evil Resource: PNG透明背景，适合展示
   - GameWatcher: 1920x1080宽幅截图，适合Banner

## 📋 配置文件格式

`banners-config.json` 包含所有图片的URL和元数据，可用于：
- 批量下载脚本
- 图片管理系统
- 自动化部署

## 🔄 更新记录

- **2026-03-27**: 初始版本，包含6个页面的Banner图片配置
