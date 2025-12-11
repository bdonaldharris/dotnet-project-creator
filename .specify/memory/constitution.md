# .NET Scaffolder Constitution

## Project Identity

**Name**: .NET Scaffolder by NotableBit  
**Type**: Visual Studio Code Extension  
**Purpose**: Quickly scaffold .NET solutions, projects, and items with optional Git integration and privacy‑first telemetry.

## Core Principles

### I. User Outcomes First
Fast, predictable project creation is the primary goal. Every feature must reduce friction in the .NET project setup workflow.

### II. Sharp Edges Removed
Sensible defaults, guardrails, and clear error messages. Users should never be confused about what went wrong or what to do next.

### III. Respect User Environments
Cross‑platform support (Windows, macOS, Linux). Minimal assumptions about file paths, tools, or configurations. Detect and adapt.

### IV. Privacy by Design
Telemetry is anonymous and respects VS Code's global telemetry settings. No source code, file paths, or credentials ever collected.

## Scope

**In Scope**:
- Tree view for discovering templates
- Configuration via webview interface
- Project, solution, and item scaffolding using `dotnet new`
- Optional Git workflows (local init, GitHub CLI, custom remote)
- Dynamic template discovery from installed .NET SDK
- Context‑aware UI (e.g., add to existing solution when present)

**Non‑Goals** (for now):
- Acting as a full IDE project system
- Template authoring or custom template packaging
- Language Server Protocol integration

## Architecture Snapshot

**Technology**: TypeScript, VS Code Extension API  
**Key Modules**:
- `commands/` — User actions: create, open, refresh
- `providers/` — Template discovery and tree view population
- `utils/` — Pure functions for dotnet CLI, filesystem, Git, telemetry
- `webview/` — Interactive configuration UI
- `models/` — TypeScript interfaces and types

**Template Strategy**: Curated JSON baseline + dynamic discovery from `dotnet new list --columns-all`

## Coding Standards

- **TypeScript strict mode** enforced via `tsconfig.json`
- **ESLint rules** defined in `.eslintrc.json`
- Prefer **pure, testable functions** in `utils/`
- Avoid blocking the extension host; use **async I/O**
- Log errors to Debug Console; surface **actionable messages** to users
- **No inline secrets**: use environment variables or credential helpers

## UX Guidelines

- **Minimize clicks**: Pre‑fill defaults where safe (e.g., workspace folder)
- **Context‑aware UI**: Show/hide options based on workspace state
- **Clear progress**: Step‑by‑step feedback during project creation
- **Completion state**: Success or error with next steps
- **Graceful degradation**: If .NET SDK missing, guide to installation

## Security & Privacy

- **Never exfiltrate** source code, file paths, or secrets
- Respect **VS Code telemetry settings** (see `TELEMETRY.md`)
- GitHub integration uses **user's `gh` CLI session** — no token storage
- Sanitize paths and template names in telemetry

## Testing & Validation

- **Unit tests** for utils (filesystem, dotnet CLI wrappers) where feasible
- **Manual validation matrix** per release:
  - Platforms: macOS, Windows, Linux
  - .NET versions: 6.0, 7.0, 8.0, 9.0
  - Key templates: Console, Web API, Blazor, xUnit, Class Library
- Test **Git workflows** (local, GitHub CLI, custom remote, none)

## Release & Versioning

- **SemVer** on `package.json` version field
- **CHANGELOG.md** documents all user‑visible changes
- Exclude internals from VSIX via `.vscodeignore` (src, tests, .git, .github, .specify)
- Use `npm run package` to generate `.vsix` for distribution

## Contribution Workflow

- **Small, focused PRs** with clear descriptions
- Follow existing **folder structure and patterns**
- Include **screenshots or GIFs** for UX changes
- Update relevant docs (README, CHANGELOG, DEVELOPMENT)
- Run **lint and compile** before submitting: `npm run lint && npm run compile`

## Decision Records

- Use `.specify/templates/spec-template.md` for **non‑trivial changes**
- Keep **rationale and trade‑offs** concise
- Link specs from PRs for context

## Maintenance

- **Periodically sync** with latest `dotnet new` short names and tags
- **Re‑evaluate filters** (C# only, non‑Microsoft authors, deprecated) each .NET release
- Monitor **VS Code API changes** and extension marketplace feedback

## Governance

This constitution documents the project's design philosophy and technical constraints. All contributions should align with these principles. Amendments require:
1. Discussion in an issue or spec
2. Approval from maintainer(s)
3. Update to this document with rationale

**Version**: 1.0.0 | **Ratified**: 2025-12-08 | **Last Amended**: 2025-12-08
