# i18n 翻译器

<p align='center'>
  <img src='https://user-images.githubusercontent.com/11247099/111864893-a457fd00-899e-11eb-9f05-f4b88987541d.png' alt='i18n 翻译器' width='600'/>
</p>

<h6 align='center'>
  <b>基于Chrome 138内置AI进行翻译，快速响应项目国际化需求</b>
</h6>

<p align='center'>
  <a href="README.md">English</a> | <b>简体中文</b>
</p>

## ✨ 功能特性

- 🌍 **多语言支持** - 支持中文、英文等多种语言
- 📁 **文件上传管理** - 上传并管理多个翻译文件
- 🔄 **实时翻译** - 专业质量的即时翻译服务
- 📊 **并排对比** - 原文和译文并行显示，便于对比
- 💾 **多格式支持** - 支持 JS、TS、JSON、YAML 文件
- 🎨 **现代界面** - 美观、响应式的界面设计，流畅动画
- 📱 **响应式设计** - 在桌面和移动设备上完美运行
- 🚀 **高性能** - 基于 Vue 3 和 Vite 构建，性能优异

## 🛠️ 技术栈

- **前端框架**: [Vue 3](https://github.com/vuejs/core) 组合式 API
- **构建工具**: [Vite](https://github.com/vitejs/vite) - 极速构建工具
- **样式框架**: [UnoCSS](https://github.com/antfu/unocss) - 原子化 CSS 框架
- **状态管理**: [Pinia](https://pinia.vuejs.org/) - Vue 状态管理
- **路由管理**: [Vue Router](https://router.vuejs.org/) 文件路由
- **国际化**: [Vue I18n](https://vue-i18n.intlify.dev/) - Vue 国际化
- **包管理器**: [pnpm](https://pnpm.io/) - 快速、节省空间的包管理器
- **开发语言**: [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm (推荐) 或 npm

### 安装步骤

1. **克隆仓库**

   ```bash
   git clone https://github.com/your-username/i18n-translator.git
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

### 1. 语言选择

- 选择源语言（原文内容）
- 选择目标语言（翻译目标）

### 2. 文件上传

- 上传支持的文件类型：`.js`、`.ts`、`.json`、`.yml`、`.yaml`
- 文件自动处理并准备翻译

### 3. 翻译过程

- 在左列查看原文内容
- 右列显示翻译后的内容
- 两列同步滚动，便于对比

### 4. 文件管理

- 在文件列表中查看已上传的文件
- 访问文件内容和翻译结果
- 下载各种格式的翻译文件

## 🎯 支持的文件类型

| 文件类型   | 扩展名          | 描述              |
| ---------- | --------------- | ----------------- |
| JavaScript | `.js`           | JavaScript 源文件 |
| TypeScript | `.ts`           | TypeScript 源文件 |
| JSON       | `.json`         | JSON 配置文件     |
| YAML       | `.yml`, `.yaml` | YAML 配置文件     |

## 📱 浏览器支持

- Chrome 138+

## 🤝 贡献指南

我们欢迎贡献！请随时提交 Pull Request。

### 开发环境设置

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m '添加一些很棒的功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

### 代码规范

- 遵循 Vue 3 组合式 API 最佳实践
- 使用 TypeScript 确保类型安全
- 遵循 ESLint 配置
- 编写有意义的提交信息

## 📄 许可证

本项目采用 **MIT 许可证（禁止商用限制）** - 查看 [LICENSE](LICENSE) 文件了解详情。

**⚠️ 重要提示**：严格禁止商业使用，除非获得明确许可。本许可证仅允许个人、教育和非营利目的免费使用。

## 🙏 致谢

- 基于 [Vitesse](https://github.com/antfu/vitesse) 模板构建
- 图标来自 [Iconify](https://iconify.design/)
- UI 组件使用 [UnoCSS](https://github.com/antfu/unocss) 样式

## 📞 支持与帮助

如果您有任何问题或需要帮助，请：

- 开启 [Issue](https://github.com/your-username/i18n-translator/issues)
- 查看 [文档](https://github.com/your-username/i18n-translator/wiki)
- 联系维护者
