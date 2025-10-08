# .NET Project Creator

A powerful Visual Studio Code extension that simplifies .NET project creation with an intuitive tree view interface and webview configuration panels. Create Console apps, Web APIs, Blazor applications, class libraries, and test projects with ease!

## Features

- 🎯 **Visual Project Selection**: Browse .NET project templates in an organized tree view
- 🚀 **Quick Project Creation**: Create projects with just a few clicks
- ⚙️ **Interactive Configuration**: Configure project settings through a user-friendly webview interface
- 📊 **Real-time Progress**: Track project creation progress with live updates
- 🔄 **Cross-Platform**: Works seamlessly on Windows, macOS, and Linux
- 📦 **Solution Support**: Automatically create and configure solution files
- 🌿 **Git Integration**: Initialize Git repositories with proper .gitignore files
- 🎨 **Multiple Template Categories**:
  - Console Applications (Console App, Worker Service)
  - Web Applications (Web API, MVC, Razor Pages, Blazor Server, Blazor WebAssembly)
  - Libraries (Class Library, Razor Class Library)
  - Test Projects (xUnit, NUnit, MSTest)

## Requirements

- **.NET SDK**: Version 6.0 or higher must be installed
  - [Download .NET SDK](https://dotnet.microsoft.com/download)
- **Visual Studio Code**: Version 1.74.0 or higher
- **Git** (optional): For Git repository initialization

## Installation

1. Open Visual Studio Code
2. Press `Ctrl+P` (or `Cmd+P` on macOS) to open Quick Open
3. Type `ext install dotnet-project-creator`
4. Press Enter

Or install from the [VS Code Marketplace](https://marketplace.visualstudio.com/vscode)

## Usage

### From the Tree View

1. Open the Explorer sidebar in VS Code
2. Find the **.NET Project Creator** view
3. Browse through the template categories
4. Click on any template to configure and create a project
5. Fill in the project details in the webview panel
6. Click **Create Project** to generate your new .NET project

### From the Command Palette

1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
2. Type `.NET Project Creator: Create Project`
3. Select a template from the quick pick menu
4. Configure your project settings
5. Click **Create Project**

### Configuration Options

When creating a project, you can configure:

- **Project Name**: The name of your project
- **Project Path**: Where to create the project
- **Target Framework**: Choose from NET 9.0, 8.0, 7.0, or 6.0
- **Create Solution**: Whether to create a solution file
- **Git Repository**: Choose from local-only, GitHub, remote URL, or no Git
- **Open in New Window**: Open the project in a new VS Code window after creation

## Extension Settings

This extension contributes the following settings:

- `dotnetCreator.defaultProjectPath`: Default path for new projects
- `dotnetCreator.gitAutoInit`: Automatically initialize Git repository (default: `true`)
- `dotnetCreator.openAfterCreate`: Open project in new VS Code window after creation (default: `true`)

## Privacy and Telemetry

This extension collects **anonymous usage telemetry** to help improve the user experience. 

**Your privacy is important:**
- ✅ Respects VS Code's telemetry settings
- ✅ No personal information collected
- ✅ All data is anonymous
- ✅ Currently logs to console only (no external services)

For full details, see [TELEMETRY.md](TELEMETRY.md).

To disable telemetry, turn off telemetry in VS Code settings.

## Commands

- `dotnetCreator.createProject`: Create a new .NET project
- `dotnetCreator.refreshTree`: Refresh the project templates tree
- `dotnetCreator.openTemplate`: Configure and create a project from a template

## Supported Templates

### Console Applications
- **Console App**: Command-line application
- **Worker Service**: Background service application

### Web Applications
- **Web API**: RESTful web API
- **MVC Web App**: Model-View-Controller web application
- **Web App (Razor Pages)**: Web application using Razor Pages
- **Blazor Server App**: Server-side Blazor application
- **Blazor WebAssembly App**: Client-side Blazor application

### Libraries
- **Class Library**: Reusable class library
- **Razor Class Library**: Reusable Razor components library

### Test Projects
- **xUnit Test Project**: Unit testing with xUnit framework
- **NUnit Test Project**: Unit testing with NUnit framework
- **MSTest Test Project**: Unit testing with MSTest framework

## Troubleshooting

### .NET SDK Not Found

If you see an error about .NET SDK not being installed:

1. Download and install the .NET SDK from [dotnet.microsoft.com](https://dotnet.microsoft.com/download)
2. Restart Visual Studio Code
3. Verify installation by running `dotnet --version` in a terminal

### Project Creation Fails

If project creation fails:

1. Ensure you have write permissions in the target directory
2. Check that the directory doesn't already contain a project with the same name
3. Verify your .NET SDK is up to date
4. Check the Output panel in VS Code for detailed error messages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This extension is licensed under the [MIT License](LICENSE).

## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for release notes and version history.

## Feedback

If you encounter any issues or have suggestions for improvements, please file an issue on our [GitHub repository](https://github.com/yourusername/dotnet-project-creator).

---

**Enjoy creating .NET projects with ease!** 🚀
