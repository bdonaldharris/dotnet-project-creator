# Change Log

All notable changes to the ".NET Project Creator" extension will be documented in this file.

## [1.0.0] - 2025-10-08

### Added
- Initial release of .NET Project Creator
- Tree view sidebar for browsing .NET project templates
- Interactive webview panels for project configuration
- Support for multiple template categories:
  - Console Applications
  - Web Applications
  - Libraries
  - Test Projects
- Real-time progress tracking during project creation
- Cross-platform support (Windows, macOS, Linux)
- Solution file creation and management
- Git repository initialization with .gitignore
- Configurable extension settings
- Command palette integration
- Quick pick template selection
- Framework version selection (NET 6.0, 7.0, 8.0)
- Automatic package restoration
- Project validation before creation
- Option to open project in new window after creation

### Features
- 12+ project templates covering common .NET project types
- Blazor Server and WebAssembly support
- xUnit, NUnit, and MSTest test project templates
- Class library and Razor class library support
- Worker service template for background tasks
- MVC and Razor Pages web application templates
- RESTful Web API template

### Technical
- TypeScript implementation
- VS Code TreeDataProvider integration
- Webview API for interactive forms
- Cross-platform command execution
- File system operations with error handling
- Git integration utilities
- .NET CLI wrapper with comprehensive error handling

## [Unreleased]

### Planned Features
- Custom template support
- Template favorites system
- Recent projects tracking
- Multi-project solution creation
- NuGet package addition during creation
- Docker configuration generation
- CI/CD configuration templates
- Azure deployment configuration
- Custom project structure templates
- Template search and filtering
- Project preview before creation

---

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.
