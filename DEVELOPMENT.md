# Development Guide

## Prerequisites

- **Node.js** (v16.x or higher)
- **npm** (comes with Node.js)
- **Visual Studio Code** (v1.74.0 or higher)
- **.NET SDK** (v6.0 or higher) - for testing the extension functionality

## Initial Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bdonaldharris/dotnet-project-creator.git
   cd dotnet-project-creator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Compile TypeScript:**
   ```bash
   npm run compile
   ```

## Development Workflow

### Running the Extension in Debug Mode

1. **Open the project in VS Code:**
   ```bash
   code .
   ```

2. **Start debugging:**
   - Press `F5` (or select "Run > Start Debugging" from the menu)
   - This will:
     - Compile the TypeScript code
     - Launch a new VS Code window (Extension Development Host)
     - Load your extension in the new window

3. **Test the extension:**
   - In the Extension Development Host window, look for the ".NET Project Creator" view in the Explorer sidebar
   - Try creating a project by clicking on a template
   - Check the Debug Console in the original VS Code window for any errors

### Watch Mode for Development

For faster development, run TypeScript in watch mode:

```bash
npm run watch
```

This will automatically recompile TypeScript files when you save changes. You'll still need to reload the Extension Development Host window (`Cmd+R` on macOS or `Ctrl+R` on Windows/Linux) to see changes.

### Debugging Tips

- **Set Breakpoints:** Click in the left gutter of any `.ts` file to set breakpoints
- **View Console Output:** Check the Debug Console in the original VS Code window
- **Reload Extension:** In the Extension Development Host, press `Cmd+R` (macOS) or `Ctrl+R` (Windows/Linux)
- **Stop Debugging:** Press `Shift+F5` or click the stop button in the debug toolbar

## Project Structure

```
dotnet-project-creator/
├── .vscode/               # VS Code configuration
│   ├── launch.json        # Debug configuration
│   ├── tasks.json         # Build tasks
│   └── extensions.json    # Recommended extensions
├── src/                   # TypeScript source code
│   ├── extension.ts       # Main entry point
│   ├── commands/          # Command handlers
│   ├── models/            # Type definitions
│   ├── providers/         # Tree view and template providers
│   ├── utils/             # Utility functions
│   └── webview/           # Webview manager
├── out/                   # Compiled JavaScript (generated)
├── resources/             # Static resources
│   └── templates/         # Project template definitions
├── scripts/               # Cross-platform scripts
└── package.json           # Extension manifest
```

## Common Tasks

### Build

Compile TypeScript to JavaScript:
```bash
npm run compile
```

### Watch

Compile TypeScript in watch mode:
```bash
npm run watch
```

### Lint

Check code for style issues:
```bash
npm run lint
```

### Test

Run tests (once test suite is implemented):
```bash
npm test
```

### Package

Create a `.vsix` file for distribution:
```bash
npm run package
```

This creates a `dotnet-project-creator-1.0.0.vsix` file that can be installed in VS Code.

### Publish

Publish to VS Code Marketplace (requires publisher account):
```bash
npm run publish
```

## Troubleshooting

### F5 Doesn't Launch Extension Development Host

1. **Check if TypeScript compiled successfully:**
   ```bash
   npm run compile
   ```
   Look for any compilation errors.

2. **Verify `out/` directory exists:**
   ```bash
   ls out/
   ```
   Should contain `extension.js` and other compiled files.

3. **Check launch.json:**
   Ensure `.vscode/launch.json` exists and is properly configured.

4. **Restart VS Code:**
   Close and reopen VS Code, then try F5 again.

### Extension Not Appearing in Development Host

1. **Check package.json:**
   - Verify `main` points to `"./out/extension.js"`
   - Check that `activationEvents` is set correctly

2. **Check for compilation errors:**
   Look at the Terminal output when F5 is pressed.

3. **Check the Debug Console:**
   Look for error messages in the original VS Code window.

### Changes Not Reflected After F5

1. **Reload the Extension Development Host:**
   - Press `Cmd+R` (macOS) or `Ctrl+R` (Windows/Linux)

2. **Or restart debugging:**
   - Stop debugging (`Shift+F5`)
   - Start again (`F5`)

### TypeScript Errors

1. **Clean and rebuild:**
   ```bash
   rm -rf out/
   npm run compile
   ```

2. **Check for missing dependencies:**
   ```bash
   npm install
   ```

## Making Changes

### Adding a New Template

1. Edit `resources/templates/project-templates.json`
2. Add your template to the appropriate category
3. Reload the extension to see changes

### Adding a New Command

1. Create handler in `src/commands/`
2. Register command in `src/extension.ts`
3. Add command to `package.json` under `contributes.commands`

### Modifying the Webview

1. Edit HTML in `src/webview/webviewManager.ts`
2. Update corresponding TypeScript methods
3. Reload extension to test

## Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Extension Samples](https://github.com/microsoft/vscode-extension-samples)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [.NET CLI Documentation](https://learn.microsoft.com/en-us/dotnet/core/tools/)

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Push and create a pull request

## Support

For issues or questions:
- Open an issue on [GitHub](https://github.com/bdonaldharris/dotnet-project-creator/issues)
- Check existing issues for solutions
