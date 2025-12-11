# GitHub Spec‑Kit for this repository

This folder sets up a lightweight Spec‑Kit structure so you can start capturing living specs, plans, and tasks for AI-assisted work. You can optionally use the official CLI later to enhance automation.

Quick start
- Specs go in `.specify/templates/spec-template.md`
- Plans go in `.specify/templates/plan-template.md`
- Task lists go in `.specify/templates/tasks-template.md`
- The repository “constitution” lives at `.specify/memory/constitution.md`

Using the official CLI (optional)
- With uv installed: `uvx --from git+https://github.com/github/spec-kit.git specify init --here`
- Or install the tool: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`

Notes
- `.specify` is excluded from VSIX packaging via `.vscodeignore`.
- Keep the constitution specific and actionable; it should evolve as the project evolves.