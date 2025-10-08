# Telemetry and Privacy

## Overview

The .NET Project Creator extension collects anonymous usage telemetry to help us understand how the extension is being used and to improve the user experience.

**We take your privacy seriously.** All telemetry collection is:

- ✅ **Opt-in by default** - Respects VS Code's built-in telemetry settings
- ✅ **Anonymous** - No personal information is collected
- ✅ **Transparent** - You can see exactly what data is collected below
- ✅ **Local-first** - Currently logs to console in development; no external services

## Telemetry Settings

The extension automatically respects your **VS Code telemetry settings**. 

To check or change your telemetry preferences:

1. Open VS Code Settings (`Cmd/Ctrl + ,`)
2. Search for "telemetry"
3. Find `telemetry.telemetryLevel`
4. Choose:
   - **all** - Telemetry enabled
   - **error** - Only error telemetry
   - **crash** - Only crash reports
   - **off** - No telemetry

**If you have telemetry disabled in VS Code, the extension will NOT collect any data.**

## What Data is Collected?

### Extension Activation
- Platform (Windows, macOS, Linux)
- VS Code version
- Extension activation timestamp

### Project Creation
- Template type (e.g., "console", "webapi", "mvc")
  - For custom templates: tracked as "custom" (no actual template name)
- Framework version (e.g., "net6.0", "net8.0")
- Git integration option selected
- Whether solution was created
- Success/failure status
- Error type (if failed) - e.g., "permission_error", "network_error"

### Git Setup
- Git option selected (local, github, remote, none)
- Success/failure status
- Error type (if failed)

### Template Browsing
- Template viewed (anonymized for custom templates)

### Feature Usage
- Features used within the extension
- Any additional context (non-identifying)

## What Data is NOT Collected?

We **never** collect:

- ❌ File paths or directory names
- ❌ Project names or source code
- ❌ Personal information (name, email, etc.)
- ❌ GitHub tokens or credentials
- ❌ IP addresses
- ❌ Machine identifiers
- ❌ Any sensitive data

## Data Anonymization

Standard .NET templates (console, webapi, mvc, etc.) are tracked by name to help us understand which templates are most popular.

**Custom templates are anonymized** - we only track them as "custom" without revealing the actual template name.

## Current Implementation

In the current version (1.3.0):

- Telemetry events are logged to the console in development mode
- No external telemetry services are integrated
- Data is not sent to any servers

This foundation allows us to potentially integrate with privacy-respecting telemetry services in the future (e.g., Application Insights, PostHog) while maintaining full transparency and user control.

## Future Plans

If we integrate with external telemetry services in the future:

1. We will update this document with full details
2. We will continue to respect VS Code's telemetry settings
3. We will maintain the same privacy-first approach
4. Users will be notified via the changelog

## Questions or Concerns?

If you have any questions about telemetry or privacy:

- Open an issue on [GitHub](https://github.com/bdonaldharris/dotnet-project-creator/issues)
- Review the source code: `src/utils/telemetry.ts`
- Contact the maintainer

## Disabling Telemetry

To disable telemetry for this extension:

1. Disable VS Code telemetry (see [Telemetry Settings](#telemetry-settings) above)
2. Or set your VS Code telemetry level to "off"

**No additional configuration is needed** - the extension automatically respects your choice.

---

**Last Updated:** October 2024  
**Version:** 1.3.0
