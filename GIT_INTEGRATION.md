# Git Integration Guide

The .NET Project Creator extension offers flexible Git integration options to fit your workflow.

## Git Options

When creating a project, you can choose from four Git options:

### 1. No Git Repository
- Skips Git initialization entirely
- Best for: Quick prototypes or when you'll add Git later

### 2. Local Only (Recommended for Beginners)
- ✅ Initializes a Git repository (`git init`)
- ✅ Creates a `.gitignore` file with .NET-specific patterns
- ✅ Makes an initial commit
- ❌ Does NOT push to any remote

**Best for:** Local development, experimenting, or when you'll add a remote later

**What happens:**
```bash
git init
git add .
git commit -m "Initial commit"
```

### 3. Create GitHub Repository (Requires GitHub CLI)
- ✅ Everything from "Local Only"
- ✅ Creates a new GitHub repository automatically
- ✅ Pushes your code to GitHub
- ✅ Choose public or private visibility

**Requirements:**
- GitHub CLI (`gh`) must be installed
- You must be authenticated: `gh auth login`

**Best for:** Open source projects, sharing code, or personal projects on GitHub

**Installation:**
```bash
# macOS
brew install gh

# Windows (with winget)
winget install GitHub.cli

# Or download from: https://cli.github.com/
```

**Authentication:**
```bash
gh auth login
# Follow the prompts to authenticate
```

**What happens:**
```bash
git init
git branch -M main
git add .
git commit -m "Initial commit"
gh repo create <project-name> --public --source=. --push
```

### 4. Push to Remote URL
- ✅ Everything from "Local Only"
- ✅ Adds your specified remote URL
- ✅ Attempts to push to the remote
- ⚠️ You must create the remote repository first

**Requirements:**
- Remote repository must already exist
- You must have push access
- Git credentials configured (SSH keys or credential manager)

**Best for:** GitLab, Bitbucket, self-hosted Git servers, or when you've already created the repo

**What happens:**
```bash
git init
git branch -M main
git add .
git commit -m "Initial commit"
git remote add origin <your-url>
git push -u origin main
```

## Comparison Matrix

| Feature | None | Local Only | GitHub | Remote URL |
|---------|------|------------|--------|------------|
| Git Init | ❌ | ✅ | ✅ | ✅ |
| .gitignore | ❌ | ✅ | ✅ | ✅ |
| Initial Commit | ❌ | ✅ | ✅ | ✅ |
| Creates Remote Repo | ❌ | ❌ | ✅ | ❌ |
| Pushes Code | ❌ | ❌ | ✅ | ✅ |
| Requires External Tools | - | - | gh CLI | - |
| Requires Pre-existing Repo | - | - | ❌ | ✅ |

## Examples

### Example 1: Simple Local Project
```
Project Name: MyConsoleApp
Git Option: Local Only
```
Result: Local Git repo with initial commit, ready to add remote later

### Example 2: Public GitHub Project
```
Project Name: MyAwesomeAPI
Git Option: Create GitHub repository
Visibility: ✅ Public repository
```
Result: Project pushed to https://github.com/yourusername/MyAwesomeAPI

### Example 3: Company GitLab Server
```
Project Name: InternalTool
Git Option: Push to remote URL
Remote URL: https://gitlab.company.com/team/InternalTool.git
```
Result: Project pushed to your company's GitLab server

## Troubleshooting

### GitHub CLI Not Found
**Error:** "GitHub CLI (gh) is not installed"

**Solution:**
1. Install GitHub CLI: https://cli.github.com/
2. Add to PATH (if needed)
3. Reload VS Code
4. Try again

### GitHub CLI Not Authenticated
**Error:** "GitHub CLI is not authenticated"

**Solution:**
```bash
gh auth login
# Choose GitHub.com
# Choose HTTPS or SSH
# Follow the authentication flow
```

### Push to Remote Failed
**Error:** "Failed to push to remote"

**Possible causes:**
1. **Repository doesn't exist:** Create it first on GitHub/GitLab/etc.
2. **No push access:** Check your permissions
3. **Wrong URL:** Verify the repository URL
4. **Authentication failed:** Set up SSH keys or credential manager

**Fix for authentication:**
```bash
# For HTTPS (will prompt for credentials)
git config --global credential.helper store

# For SSH (generate key if needed)
ssh-keygen -t ed25519 -C "your_email@example.com"
# Add key to GitHub/GitLab
```

### Branch Name Mismatch
**Error:** "Failed to push - no matching branch"

**Solution:**
The extension uses `main` as the default branch. If your remote uses `master`:
```bash
cd <project-path>
git branch -m main master
git push -u origin master
```

## Best Practices

### For Learning/Experimentation
- Use **"Local Only"**
- Easy to experiment without worrying about remote repos
- Can always add GitHub later

### For Open Source Projects
- Use **"Create GitHub repository"** with **Public** visibility
- Automatic setup saves time
- Immediately shareable with others

### For Personal Projects
- Use **"Create GitHub repository"** with **Private** visibility
- Free private repos on GitHub
- Good for backups and access from multiple machines

### For Team/Company Projects
- Use **"Push to remote URL"**
- Works with any Git hosting service
- IT can manage repository creation

### For Quick Scripts/Tests
- Use **"No Git repository"**
- Fastest option
- Add Git later if the project grows

## Advanced: Manual Git Setup After Creation

If you chose "No Git repository" but want to add Git later:

```bash
cd <project-path>

# Initialize
git init
git branch -M main

# Create .gitignore (or use the one from the extension)
# Add files
git add .
git commit -m "Initial commit"

# Add remote (GitHub example)
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

## Security Notes

- 🔒 The extension **never stores** your credentials
- 🔒 All authentication is handled by Git or GitHub CLI
- 🔒 Private repositories remain private
- 🔒 You control all access permissions

## FAQ

**Q: Can I change the Git option after creating a project?**
A: Yes, but you'll need to configure Git manually using standard Git commands.

**Q: Does this work with GitLab, Bitbucket, etc.?**
A: Yes! Use the "Push to remote URL" option for any Git hosting service.

**Q: Can I use SSH instead of HTTPS?**
A: Yes! Just provide an SSH URL (e.g., `git@github.com:user/repo.git`)

**Q: What if I don't have Git installed?**
A: The extension will skip Git operations and show a warning. The project will still be created.

**Q: Can I push to multiple remotes?**
A: The extension sets up one remote (`origin`). You can add more remotes manually after creation.

---

**Need more help?** Check out:
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [Git Documentation](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book/en/v2)
