# Image Background Remover

基于 Next.js + Tailwind CSS 的图片背景移除工具

## 技术栈

- Next.js 15
- TypeScript
- Tailwind CSS
- Remove.bg API

## 本地开发

1. 安装依赖
```bash
npm install
```

2. 配置环境变量
创建 `.env.local` 文件：
```
REMOVEBG_API_KEY=your_api_key_here
```

3. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

## 部署

### Vercel (推荐)
1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 设置环境变量 `REMOVEBG_API_KEY`
4. 部署

### 其他平台
支持任何 Node.js 托管平台（Netlify, Railway 等）

## 获取 API Key

访问 https://www.remove.bg/api 注册并获取免费 API Key（50次/月）
