# Change Log

All notable changes to the ".NET Project Creator" extension will be documented in this file.

## [1.3.0] - 2025-10-08

### Added
- **Browse Button for Project Path**: Added a "Browse..." button next to the project path input
  - Opens native folder picker dialog
  - Makes it easier to select project location without typing
  - Better user experience for path selection

### Changed
- Publisher ID changed from `bdonaldharris` to `notablebit` for better branding
- Updated installation instructions and marketplace links

## [1.2.0] - 2025-10-08

### Added
- **Privacy-First Telemetry**: Anonymous usage analytics to improve the extension
  - Respects VS Code's telemetry settings (no separate opt-in needed)
  - Tracks template usage, project creation success/failures, and Git setup
  - Zero personal information collected (no paths, names, or sensitive data)
  - Custom templates are anonymized as "custom"
  - Currently logs to console only (no external services)
  - Full transparency via TELEMETRY.md documentation
- Error categorization for better failure tracking
- Extension activation tracking
- Template browsing analytics

### Documentation
- Added comprehensive TELEMETRY.md explaining privacy approach
- Updated README with telemetry and privacy section

## [1.1.0] - 2025-10-08

### Added
- **Hybrid Git Integration**: Four Git options to fit any workflow
  - No Git repository
  - Local only (git init + commit)
  - Create GitHub repository (via gh CLI)
  - Push to custom remote URL
- **GitHub CLI Integration**: Automatic GitHub repository creation and push
- **NET 9.0 Support**: Added .NET 9.0 as a framework option
- Comprehensive Git integration documentation (GIT_INTEGRATION.md)
- Git authentication validation for GitHub CLI
- Graceful error handling for Git operations

### Changed
- Replaced simple Git checkbox with flexible radio button options
- Enhanced UI with conditional fields for Git options
- Improved error messages for Git-related failures

### Fixed
- Publisher name issue that prevented extension loading
- VS Code debug configuration for F5 launch

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
