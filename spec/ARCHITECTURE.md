# **.NET Scaffolder — Light SDD Architecture Document**

*(Spec‑Anchored, Not Spec‑As‑Source)*

## **1. Purpose**

The `.NET Scaffolder` is a **VS Code extension** that enables developers to create .NET projects through a visual, interactive workflow. It abstracts away CLI complexity and provides a consistent, guided project creation experience.

The system is a **tooling product**, not a domain‑driven application. Therefore, the architecture emphasizes **UI flows**, **template definitions**, and **integration boundaries**, not business logic.

---

## **2. High‑Level Architecture Overview**

### **Core Modules**

1. **Extension Host Layer**
   * Activates the extension
   * Registers commands
   * Manages tree view and webview lifecycle
2. **Template Engine Layer**
   * Loads template metadata
   * Maps user selections to CLI commands
   * Executes `dotnet new` operations
   * Applies post‑processing (solution creation, folder structure, etc.)
3. **Configuration Webview Layer**
   * Renders UI for project configuration
   * Validates user input
   * Sends configuration payloads back to the extension host
4. **Git Integration Layer**
   * Local Git init
   * GitHub CLI integration
   * Custom remote setup
   * No‑Git mode
5. **Telemetry Layer**
   * Anonymous usage analytics
   * Error categorization
   * Respects VS Code telemetry settings
6. **Resource Layer**
   * Icons
   * Template metadata
   * Static assets

⠀
---

## **3. Architectural Seams (Where Specs Help)**

### **3.1 Template Specification (Spec‑Anchored)**

Each template can be described with a structured spec:

```
Template:
  id: "webapi"
  displayName: "Web API"
  category: "Web"
  cliCommand: "dotnet new webapi"
  parameters:
    - name: "framework"
      type: "enum"
      values: ["net6.0", "net7.0", "net8.0", "net9.0", "net10.0"]
    - name: "solution"
      type: "boolean"
    - name: "gitMode"
      type: "enum"
      values: ["local", "github", "remote", "none"]
```

This spec is **not the source of truth**, but it anchors consistency across templates.

---

### **3.2 Git Integration Flow Specification**

A lightweight spec defines the four Git modes:

```
GitMode:
  local:
    steps:
      - git init
      - create .gitignore
      - initial commit
  github:
    requires: ["gh CLI", "authenticated"]
    steps:
      - git init
      - gh repo create {name} --{visibility}
      - git push -u origin main
  remote:
    steps:
      - git init
      - git remote add origin {url}
      - git push -u origin main
  none:
    steps: []
```

This ensures AI agents don’t hallucinate Git flows.

---

### **3.3 Webview Configuration Schema**

Defines the UI contract:

```
ConfigSchema:
  fields:
    projectName:
      type: string
      required: true
    projectPath:
      type: path
      required: true
    framework:
      type: enum
      values: ["6.0", "7.0", "8.0", "9.0", "10.0"]
    createSolution:
      type: boolean
    gitMode:
      type: enum
      values: ["local", "github", "remote", "none"]
    remoteUrl:
      type: string
      requiredIf: gitMode == "remote"
```

This helps AI generate or update UI panels safely.

---

## **4. Execution Flow**

### **4.1 User Flow**

1. User selects a template from the tree view
2. Webview opens with configuration form
3. User submits configuration
4. Extension validates input
5. Template engine executes scaffold
6. Git integration runs (if selected)
7. Telemetry logs anonymized event
8. Project opens in new window (optional)

⠀
---

## **5. Integration Boundaries**

### **External Dependencies**

* `.NET SDK` (CLI)
* `gh` CLI (optional)
* Git (optional)
* VS Code API
### **Internal Boundaries**

* Template metadata is static
* Git flows are deterministic
* Webview UI is isolated from extension logic
* Telemetry is strictly anonymous
---

## **6. Non‑Goals (Important for SDD Scope)**

* No domain model
* No business rules
* No multi‑agent workflows
* No long‑running processes
* No cross‑module orchestration
* No spec‑as‑source governance
This is why **full SDD is unnecessary**.

---

## **7. Where AI Can Safely Automate**

* Adding new templates
* Updating template metadata
* Generating new webview panels
* Refactoring extension host logic
* Updating Git integration flows
* Improving telemetry categorization
AI should **not** autonomously modify:

* VS Code activation lifecycle
* Webview security settings
* CLI execution logic without human review
---

## **8. Future‑Proofing**

If the extension grows into:

* A marketplace of templates
* A plugin system
* A multi‑language scaffolder
* A cloud‑backed template registry
…then SDD could expand into:

* Template DSL
* Plugin spec
* Cloud API spec
* Versioned template schemas
But today, the repo is too small for that.

---

# **If you want, I can also generate:**

* A **Template Spec DSL** you can use across all templates
* A **Git Integration Spec** in YAML or JSON
* A **Webview UI Spec** for AI‑assisted generation
* A **Repo‑aware AI workflow** for maintaining this extension
Which one do you want next, B?# 
#dotnetprojectcreator
