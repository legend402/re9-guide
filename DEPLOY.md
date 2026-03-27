# 🚀 部署指南

## GitHub Pages 部署

### 1. 准备工作

在 GitHub 上创建一个新的仓库，名称建议为 `re9-guide`。

### 2. 推送代码

```bash
# 初始化 git（如果尚未初始化）
git init

# 添加远程仓库
git remote add origin https://github.com/legend402/re9-guide.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 生化危机9攻略站"

# 推送到 main 分支
git push -u origin main
```

### 3. 配置 GitHub Pages

1. 访问 GitHub 仓库页面
2. 点击 **Settings** → **Pages**
3. 在 "Build and deployment" 部分：
   - **Source**: 选择 "GitHub Actions"

### 4. 自动部署

配置完成后，每次推送到 `main` 分支时，GitHub Actions 会自动：
1. 安装依赖
2. 构建项目
3. 部署到 GitHub Pages

部署完成后，网站将可通过以下地址访问：
```
https://legend402.github.io/re9-guide/
```

### 5. 部署状态

可以在 GitHub 仓库的 **Actions** 标签页查看部署状态。

---

## 本地预览

在部署前，可以先本地构建并预览：

```bash
# 构建项目
npm run build

# 本地预览（使用 npx serve 或其他静态服务器）
npx serve dist
```

---

## 自定义域名（可选）

如需使用自定义域名：

1. 在 `public/` 目录下创建 `CNAME` 文件
2. 文件内容为你的域名，例如：
   ```
   re9-guide.yourdomain.com
   ```
3. 在域名 DNS 设置中添加 CNAME 记录指向 `legend402.github.io`
4. 在 GitHub Pages 设置中配置自定义域名

---

## 故障排除

### 构建失败

检查 GitHub Actions 日志，常见问题：
- 依赖安装失败 → 检查 `package-lock.json` 是否提交
- 构建脚本错误 → 本地运行 `npm run build` 测试

### 页面 404

- 确保 `next.config.js` 中的 `basePath` 和 `assetPrefix` 设置正确
- 检查 GitHub Pages 设置中的路径配置

### 资源加载失败

- 检查浏览器开发者工具中的网络请求
- 确保所有资源路径使用相对路径或正确的 basePath
