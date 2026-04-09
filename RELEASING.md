# Release Flow

## Branch Strategy

- `main` is the protected production branch.
- `staging` is the integration branch for changes that are ready for shared validation.
- Feature branches should target `staging`.
- Promotion to production should happen through a pull request from `staging` into `main`.

## CI

The GitHub Actions workflow in `.github/workflows/ci.yml` runs on pushes and pull requests for `main` and `staging`.

Current CI gates:

- `npm ci`
- `npm run compile`
- `npm run lint`
- `npm run package`

The packaged `.vsix` file is uploaded as a workflow artifact on each run.

## Marketplace Publishing

The GitHub Actions workflow in `.github/workflows/publish-marketplace.yml` publishes to the VS Code Marketplace when a tag in the form `v*` is pushed.

Example:

```bash
git tag v1.4.1
git push origin v1.4.1
```

Before publishing, add a repository secret named `VSCE_PAT`.

The `VSCE_PAT` value must be a Visual Studio Marketplace / Azure DevOps personal access token with Marketplace management permissions.

The publish workflow validates that:

- the tag version matches `package.json`
- the project compiles
- lint completes
- the extension packages successfully

## Initial Setup Checklist

1. Create and push the `staging` branch.
2. Add the `VSCE_PAT` repository secret in GitHub.
3. Protect `main` to require pull requests before merge.
4. After the first CI run on GitHub, optionally require the CI check as a branch protection status check.
