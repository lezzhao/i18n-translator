# i18n Translator

<h6 align='center'>
  <b>AI-powered translation tool based on Chrome 138, rapidly responding to project internationalization needs</b>
</h6>

<p align='center'>
  <b>English</b> | <a href="README.zh-CN.md">简体中文</a>
</p>

## ✨ Features

- 🌍 **Multi-language Support** - Support for Chinese and English interface switching
- 🌙 **Dark Mode** - Support for light/dark theme switching, automatically follows system
- 📁 **File Upload Management** - Support drag and drop upload, manage multiple translation files
- 🔄 **AI Intelligent Translation** - Professional translation powered by Chrome 138 built-in AI
- 📊 **Side-by-side Comparison** - Original and translated content displayed in parallel columns
- 💾 **Multi-format Support** - Support for JS, TS, JSON, YAML and other file formats
- 🎨 **Modern UI/UX** - Beautiful, responsive interface with smooth animations
- 📱 **Responsive Design** - Perfectly adapts to desktop and mobile devices
- 🚀 **High Performance** - Built with Vue 3 and Vite for optimal performance

## 🛠️ Tech Stack

- **Frontend Framework**: [Vue 3](https://github.com/vuejs/core) + Composition API
- **Build Tool**: [Vite](https://github.com/vitejs/vite) - Lightning fast build tool
- **Styling Framework**: [UnoCSS](https://github.com/antfu/unocss) - Atomic CSS framework
- **State Management**: [Pinia](https://pinia.vuejs.org/) - Vue state management
- **Routing**: [Vue Router](https://router.vuejs.org/) + file-based routing
- **Internationalization**: [Vue I18n](https://vue-i18n.intlify.dev/) - Vue internationalization solution
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- **Development Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

## 🚀 Quick Start

### Requirements

- Node.js 18+
- pnpm (recommended) or npm

### Installation Steps

1. **Clone Repository**

   ```bash
   git clone https://github.com/lezzhao/i18n-translator.git
   cd i18n-translator
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start Development Server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open Browser**
   Navigate to `http://localhost:3333`

### Production Build

```bash
pnpm build
pnpm preview
```

## 📖 Usage Guide

### 1. Interface Features

- **Language Switching**: Click the flag icon in the top right to switch between Chinese and English interfaces
- **Theme Switching**: Click the moon/sun icon to switch between light and dark themes
- **GitHub Link**: Click the GitHub icon to view project source code

### 2. Language Settings

- Select source language (original content)
- Select target language (translation target)
- Support for various language combinations

### 3. File Upload

- Supported file types: `.js`, `.ts`, `.json`, `.yml`, `.yaml`
- Support drag and drop upload, automatically filter unsupported file types
- Files are automatically processed and prepared for translation

### 4. Translation Process

- Left column displays original content
- Right column displays translated content
- Both columns scroll independently for easy comparison

### 5. File Management

- View uploaded files in the file list
- Access file content and translation results
- Download translated files
- Support file preview, deletion and other operations

## 🎯 Supported File Types

| File Type  | Extension       | Description              |
| ---------- | --------------- | ------------------------ |
| JavaScript | `.js`           | JavaScript source files  |
| TypeScript | `.ts`           | TypeScript source files  |
| JSON       | `.json`         | JSON configuration files |
| YAML       | `.yml`, `.yaml` | YAML configuration files |

## 🌙 Theme Features

- **Light Mode**: Fresh and bright interface style
- **Dark Mode**: Eye-friendly dark interface style
- **Auto Follow**: Automatically follows system theme settings
- **Smooth Transition**: Smooth transition animations when switching themes

## 🌍 Internationalization Support

- **Chinese Interface**: Default Chinese interface, suitable for Chinese users
- **English Interface**: Complete English interface, supports international users
- **One-click Switching**: Click icon to switch languages

## 📱 Browser Support

- Chrome 138+

## 🤝 Contributing

We welcome contributions! Please feel free to submit Pull Requests.

### Development Environment Setup

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow Vue 3 Composition API best practices
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
**⚠️ Important**: Commercial use is strictly prohibited without explicit permission. This license allows free use for personal, educational, and non-profit purposes only.

## 🙏 Acknowledgments

- Built with [Vitesse](https://github.com/antfu/vitesse) template
- Icons from [Iconify](https://iconify.design/)
- UI components styled with [UnoCSS](https://github.com/antfu/unocss)

## 📞 Support

If you have any questions or need help, please:

- Open an [Issue](https://github.com/lezzhao/i18n-translator/issues)
- Check the [Documentation](https://github.com/lezzhao/i18n-translator/wiki)
- Contact the maintainers
