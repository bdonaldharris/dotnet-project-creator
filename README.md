# .NET Project Creator

[![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)](https://github.com/bdonaldharris/dotnet-project-creator)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.74.0+-007ACC.svg)](https://code.visualstudio.com/)
[![.NET](https://img.shields.io/badge/.NET-6.0%20|%207.0%20|%208.0%20|%209.0-512BD4.svg)](https://dotnet.microsoft.com/)

> **A powerful Visual Studio Code extension that simplifies .NET project creation with an intuitive tree view interface and webview configuration panels.**

Create Console apps, Web APIs, Blazor applications, class libraries, and test projects with ease! No more command-line gymnastics—just point, click, and code.

---

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Configuration Options](#-configuration-options)
- [Git Integration](#-git-integration)
- [Supported Templates](#-supported-templates)
- [Requirements](#-requirements)
- [Extension Settings](#-extension-settings)
- [Commands](#-commands)
- [Troubleshooting](#-troubleshooting)
- [Privacy & Telemetry](#-privacy--telemetry)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Capabilities

- 🎯 **Visual Project Selection** - Browse .NET project templates in an organized tree view
- 🚀 **One-Click Creation** - Create projects with minimal clicks, maximum productivity
- ⚙️ **Interactive Configuration** - Configure project settings through a user-friendly webview
- 📊 **Real-time Progress Tracking** - Watch your project come to life with live updates
- 🔄 **Cross-Platform** - Works seamlessly on Windows, macOS, and Linux

### Advanced Features

- 📦 **Solution Support** - Automatically create and configure solution files with proper structure
- 🌿 **Hybrid Git Integration** - Four Git options to fit any workflow:
  - Local-only repositories
  - GitHub CLI integration (create & push)
  - Custom remote URLs
  - No Git (for those who prefer otherwise)
- 🎨 **12+ Templates** - Covering Console, Web, Blazor, Libraries, and Test projects
- 🎯 **Framework Flexibility** - Support for .NET 6.0, 7.0, 8.0, and 9.0
- 🔒 **Privacy-First Telemetry** - Anonymous usage analytics (respects VS Code settings)

---

## 📦 Installation

### From VS Code

1. Open Visual Studio Code
2. Press `Ctrl+P` (or `Cmd+P` on macOS) to open Quick Open
3. Type `ext install notablebit.dotnet-project-creator`
4. Press Enter

### From the Marketplace

Install directly from the [VS Code Marketplace](https://marketplace.visualstudio.com/vscode)

### From Source

```bash
git clone https://github.com/bdonaldharris/dotnet-project-creator.git
cd dotnet-project-creator
npm install
npm run compile
```

---

## 🚀 Quick Start

### Method 1: Tree View (Recommended)

1. Open the **Explorer** sidebar in VS Code
2. Locate the **.NET Project Creator** panel
3. Browse template categories (Console, Web, Libraries, Tests)
4. Click any template to open the configuration panel
5. Fill in your project details:
   - Project name
   - Target path
   - Framework version (.NET 6.0 - 9.0)
   - Git integration option
6. Click **Create Project** and watch the magic happen! ✨

### Method 2: Command Palette

1. Press `Ctrl+Shift+P` / `Cmd+Shift+P`
2. Type `.NET Project Creator: Create Project`
3. Select your template from the quick pick
4. Configure and create

---

## ⚙️ Configuration Options

When creating a project, customize these settings:

| Option | Description | Options |
|--------|-------------|----------|
| **Project Name** | Your project's identifier | Any valid .NET project name |
| **Project Path** | Where to create the project | Any writable directory |
| **Target Framework** | .NET version to target | 6.0, 7.0, 8.0, 9.0 |
| **Create Solution** | Generate a solution file | Yes / No |
| **Git Integration** | Repository initialization | Local, GitHub, Remote, None |
| **GitHub Visibility** | Public or private repo | Public / Private (if using GitHub) |
| **Remote URL** | Custom Git remote | Any valid Git URL (if using Remote) |

---

## 🌿 Git Integration

Choose the Git workflow that fits your needs:

### 🏠 Local Only
Initialize a Git repository with `.gitignore` and initial commit. No remote setup.

**Perfect for:** Personal projects, experiments, offline work

### 🐙 GitHub CLI
Create a GitHub repository and push automatically using the `gh` CLI.

**Perfect for:** Open source projects, team collaboration

**Requirements:**
- GitHub CLI installed (`brew install gh` / [Download](https://cli.github.com/))
- Authenticated (`gh auth login`)

### 🔗 Custom Remote
Initialize locally and push to your custom Git remote (GitLab, Bitbucket, self-hosted).

**Perfect for:** Enterprise, custom Git servers, non-GitHub workflows

### 🚫 No Git
Skip Git initialization entirely.

**Perfect for:** Quick prototypes, learning, environments without Git

> 📖 **More details:** See [GIT_INTEGRATION.md](GIT_INTEGRATION.md) for comprehensive documentation.

---

## 📚 Supported Templates

### Console Applications

| Template | Description | Use Case |
|----------|-------------|----------|
| **Console App** | Command-line application | CLI tools, scripts, utilities |
| **Worker Service** | Background service | Long-running services, processors |

### Web Applications

| Template | Description | Use Case |
|----------|-------------|----------|
| **Web API** | RESTful API | Backend services, microservices |
| **MVC Web App** | Model-View-Controller | Traditional web apps |
| **Web App (Razor Pages)** | Page-based web app | Content-driven sites |
| **Blazor Server** | Server-side Blazor | Interactive web apps |
| **Blazor WebAssembly** | Client-side Blazor | SPAs, PWAs |

### Libraries

| Template | Description | Use Case |
|----------|-------------|----------|
| **Class Library** | Reusable code library | Shared logic, utilities |
| **Razor Class Library** | Reusable Razor components | Blazor component libraries |

### Test Projects

| Template | Description | Framework |
|----------|-------------|----------|
| **xUnit Test Project** | Unit testing | xUnit |
| **NUnit Test Project** | Unit testing | NUnit |
| **MSTest Test Project** | Unit testing | MSTest |

---

## 💻 Requirements

### Essential

- **.NET SDK** - Version 6.0 or higher
  - 📥 [Download .NET SDK](https://dotnet.microsoft.com/download)
- **Visual Studio Code** - Version 1.74.0 or higher
  - 📥 [Download VS Code](https://code.visualstudio.com/)

### Optional

- **Git** - For repository initialization
  - 📥 [Download Git](https://git-scm.com/downloads)
- **GitHub CLI** - For GitHub integration
  - 📥 [Download GitHub CLI](https://cli.github.com/)

---

## ⚙️ Extension Settings

Customize the extension behavior via VS Code settings:

```json
{
  "dotnetCreator.defaultProjectPath": "",
  "dotnetCreator.gitAutoInit": true,
  "dotnetCreator.openAfterCreate": true
}
```

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `defaultProjectPath` | string | `""` | Default location for new projects |
| `gitAutoInit` | boolean | `true` | Auto-initialize Git repositories |
| `openAfterCreate` | boolean | `true` | Open project in new window after creation |

---

## 📝 Commands

Access these commands via the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`):

| Command | Description |
|---------|-------------|
| `.NET Project Creator: Create Project` | Create a new .NET project |
| `.NET Project Creator: Refresh Tree` | Refresh the templates tree view |
| `.NET Project Creator: Configure Project` | Open configuration for a template |

---

## 🔧 Troubleshooting

### .NET SDK Not Found

**Problem:** Extension shows ".NET SDK is not installed"

**Solution:**
1. Download and install the .NET SDK from [dotnet.microsoft.com](https://dotnet.microsoft.com/download)
2. Restart Visual Studio Code
3. Verify installation:
   ```bash
   dotnet --version
   ```
4. If still not working, check your PATH environment variable

### Project Creation Fails

**Problem:** Project creation fails with errors

**Common causes & solutions:**

| Issue | Solution |
|-------|----------|
| Permission denied | Check write permissions in target directory |
| Directory exists | Choose a different name or delete existing directory |
| Path too long | Use a shorter path (Windows limitation) |
| Invalid project name | Use only letters, numbers, underscores, hyphens |

**Still stuck?** Check the VS Code Output panel (View → Output → .NET Project Creator) for detailed error messages.

### Git Integration Issues

**GitHub CLI not authenticated:**
```bash
gh auth login
```

**Git push fails:**
- Check your Git credentials
- Verify remote URL is correct
- Ensure you have push permissions

**More details:** See [GIT_INTEGRATION.md](GIT_INTEGRATION.md)

### Getting Help

1. Check existing [GitHub Issues](https://github.com/bdonaldharris/dotnet-project-creator/issues)
2. Review the [CHANGELOG](CHANGELOG.md) for known issues
3. Create a new issue with:
   - VS Code version
   - .NET SDK version
   - Operating system
   - Error messages/logs

---

## 🔒 Privacy & Telemetry

This extension collects **anonymous usage telemetry** to improve user experience.

### What We Collect

✅ Template usage patterns (anonymized)  
✅ Success/failure rates  
✅ Error types (no personal data)  
✅ Feature usage statistics  

### What We DON'T Collect

❌ File paths or project names  
❌ Source code  
❌ Personal information  
❌ Credentials or tokens  

### Privacy Features

- 🔒 Respects VS Code's built-in telemetry settings
- 🔒 No external services (console logging only)
- 🔒 Custom templates anonymized
- 🔒 Fully transparent (see [TELEMETRY.md](TELEMETRY.md))

### Disable Telemetry

To disable:
1. Open VS Code Settings (`Cmd/Ctrl + ,`)
2. Search for "telemetry"
3. Set `telemetry.telemetryLevel` to `off`

**No additional configuration needed** - the extension automatically respects your choice.

📖 **Full documentation:** [TELEMETRY.md](TELEMETRY.md)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🔧 Submit pull requests

### Development Setup

```bash
# Clone the repository
git clone https://github.com/bdonaldharris/dotnet-project-creator.git
cd dotnet-project-creator

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch mode for development
npm run watch

# Run tests
npm test
```

### Pull Request Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This extension is licensed under the [MIT License](LICENSE).

---

## 📝 Release Notes

### v1.2.0 (Latest)
- ✨ Privacy-first telemetry with anonymous usage analytics
- 📊 Error tracking and categorization
- 📖 Comprehensive TELEMETRY.md documentation

### v1.1.0
- 🌿 Hybrid Git integration (local, GitHub, remote, none)
- 🔧 .NET 9.0 support
- 📚 GIT_INTEGRATION.md documentation

### v1.0.0
- 🎉 Initial release
- 🎯 12+ project templates
- 📦 Solution support
- 🌿 Basic Git integration

📖 **Full history:** [CHANGELOG.md](CHANGELOG.md)

---

## 💬 Feedback & Support

### Found a Bug?

🐛 [Report it on GitHub](https://github.com/bdonaldharris/dotnet-project-creator/issues/new)

### Have a Suggestion?

💡 [Share your ideas](https://github.com/bdonaldharris/dotnet-project-creator/issues/new)

### Need Help?

📖 Check the documentation:
- [Git Integration Guide](GIT_INTEGRATION.md)
- [Privacy & Telemetry](TELEMETRY.md)
- [Changelog](CHANGELOG.md)

### Connect

- 🌐 [GitHub Repository](https://github.com/bdonaldharris/dotnet-project-creator)
- 📦 [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=notablebit.dotnet-project-creator)

---

<div align="center">

**Made with ❤️ for .NET developers**

⭐ **Star us on [GitHub](https://github.com/bdonaldharris/dotnet-project-creator)** if this extension helps you!

**Happy coding! 🚀**

</div>
