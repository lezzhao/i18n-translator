# i18n 翻译工具

<h6 align='center'>
  <b>基于 Chrome 138 内置 AI 的翻译工具，快速响应项目国际化需求</b>
</h6>

<p align='center'>
  <a href="README.md">English</a> | <b>简体中文</b>
</p>

## ✨ 功能特性

- 🌍 **多语言支持** - 支持中文、英文界面切换
- 🌙 **暗色模式** - 支持亮色/暗色主题切换，自动跟随系统
- 📁 **文件上传管理** - 支持拖拽上传，管理多个翻译文件
- 🔄 **AI 智能翻译** - 基于 Chrome 138 内置 AI 的专业级翻译
- 📊 **并排对比** - 原文和译文并排显示，便于对照
- 💾 **多格式支持** - 支持 JS、TS、JSON、YAML 等文件格式
- 🎨 **现代 UI/UX** - 美观、响应式界面，支持平滑动画
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🚀 **高性能** - 基于 Vue 3 和 Vite 构建，性能优异

## 🛠️ 技术栈

- **前端框架**: [Vue 3](https://github.com/vuejs/core) + Composition API
- **构建工具**: [Vite](https://github.com/vitejs/vite) - 极速构建工具
- **样式框架**: [UnoCSS](https://github.com/antfu/unocss) - 原子化 CSS 框架
- **状态管理**: [Pinia](https://pinia.vuejs.org/) - Vue 状态管理
- **路由**: [Vue Router](https://router.vuejs.org/) + 文件路由
- **国际化**: [Vue I18n](https://vue-i18n.intlify.dev/) - Vue 国际化解决方案
- **包管理**: [pnpm](https://pnpm.io/) - 快速、节省磁盘空间的包管理器
- **开发语言**: [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm (推荐) 或 npm

### 安装步骤

1. **克隆仓库**

   ```bash
   git clone https://github.com/lezzhao/i18n-translator.git
   cd i18n-translator
   ```

2. **安装依赖**

   ```bash
   pnpm install
   # 或
   npm install
   ```

3. **启动开发服务器**

   ```bash
   pnpm dev
   # 或
   npm run dev
   ```

4. **打开浏览器**
   访问 `http://localhost:3333`

### 生产构建

```bash
pnpm build
pnpm preview
```

## 📖 使用说明

### 1. 界面功能

- **语言切换**: 点击右上角国旗图标切换中英文界面
- **主题切换**: 点击月亮/太阳图标切换亮色/暗色主题
- **GitHub 链接**: 点击 GitHub 图标查看项目源码

### 2. 语言设置

- 选择源语言（原文内容）
- 选择目标语言（翻译目标）
- 支持多种语言组合

### 3. 文件上传

- 支持的文件类型: `.js`, `.ts`, `.json`, `.yml`, `.yaml`
- 支持拖拽上传，自动过滤不支持的文件类型
- 文件自动处理并准备翻译

### 4. 翻译过程

- 左侧列显示原文内容
- 右侧列显示译文内容
- 两列独立滚动，便于对照查看

### 5. 文件管理

- 查看已上传的文件列表
- 访问文件内容和翻译结果
- 下载翻译后的文件
- 支持文件预览、删除等操作

## 🎯 支持的文件类型

| 文件类型   | 扩展名          | 说明              |
| ---------- | --------------- | ----------------- |
| JavaScript | `.js`           | JavaScript 源文件 |
| TypeScript | `.ts`           | TypeScript 源文件 |
| JSON       | `.json`         | JSON 配置文件     |
| YAML       | `.yml`, `.yaml` | YAML 配置文件     |

## 🌙 主题特性

- **亮色模式**: 清新明亮的界面风格
- **暗色模式**: 护眼的深色界面风格
- **自动跟随**: 自动跟随系统主题设置
- **平滑切换**: 主题切换时平滑的过渡动画

## 🌍 国际化支持

- **中文界面**: 默认中文界面，适合中文用户
- **英文界面**: 完整英文界面，支持国际用户
- **一键切换**: 点击图标即可切换语言

## 📱 浏览器支持

- Chrome 138+

## 🤝 贡献指南

我们欢迎贡献！请随时提交 Pull Request。

### 开发环境设置

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

### 代码规范

- 遵循 Vue 3 Composition API 最佳实践
- 使用 TypeScript 确保类型安全
- 遵循 ESLint 配置
- 编写有意义的提交信息

## 📄 许可证

本项目采用 **MIT 许可证** - 详见 [LICENSE](LICENSE) 文件。
**⚠️ 重要提示**：严格禁止商业使用，除非获得明确许可。本许可证仅允许个人、教育和非营利目的免费使用。

## 🙏 致谢

- 基于 [Vitesse](https://github.com/antfu/vitesse) 模板构建
- 图标来自 [Iconify](https://iconify.design/)
- UI 组件使用 [UnoCSS](https://github.com/antfu/unocss) 样式

## 📞 支持

如果您有任何问题或需要帮助，请：

- 开启 [Issue](https://github.com/lezzhao/i18n-translator/issues)
- 查看 [文档](https://github.com/lezzhao/i18n-translator/wiki)
- 联系维护者
