# Git Commands Cheat Sheet

## What is Git?

Git is a **version control system** - think of it as a super-powered "save" button for your code that:
- Tracks every change you make
- Lets you go back to previous versions
- Allows multiple people to work together
- Backs up your code to the cloud (GitHub)

## First Time Setup (Do Once)

```bash
# Set your name (will appear in commit history)
git config --global user.name "Your Name"

# Set your email (should match your GitHub email)
git config --global user.email "your.email@example.com"

# Check your settings
git config --list
```

## Starting a New Project

### Option 1: Start from scratch
```bash
# Navigate to your project folder
cd tennis-ladder-app

# Initialize Git
git init

# See what files exist
git status
```

### Option 2: Clone from GitHub
```bash
# Download a project from GitHub
git clone https://github.com/username/tennis-ladder-app.git

# Navigate into it
cd tennis-ladder-app
```

## Daily Workflow

### The Basic Git Cycle

```bash
# 1. Check what changed
git status

# 2. Add files you want to save
git add .                    # Add all changed files
# OR
git add src/App.tsx          # Add specific file

# 3. Save (commit) with a message
git commit -m "Added challenge feature"

# 4. Upload to GitHub
git push
```

### First Push to GitHub

```bash
# Connect your local project to GitHub
git remote add origin https://github.com/YOUR-USERNAME/tennis-ladder-app.git

# Set the main branch
git branch -M main

# Push for the first time (with tracking)
git push -u origin main

# After first push, just use:
git push
```

## Checking Status & History

```bash
# See what files changed
git status

# See recent commits
git log

# See recent commits (compact)
git log --oneline

# See what changed in files (before adding)
git diff

# See what changed in files (after adding)
git diff --staged
```

## Undoing Things

### Undo Changes Before Commit

```bash
# Discard changes in a specific file (⚠️ can't undo!)
git checkout -- src/App.tsx

# Discard all changes (⚠️ can't undo!)
git checkout -- .

# Unstage a file (keep the changes)
git reset src/App.tsx

# Unstage all files (keep the changes)
git reset
```

### Undo After Commit (But Before Push)

```bash
# Undo last commit, keep changes
git reset --soft HEAD~1

# Undo last commit, discard changes (⚠️ dangerous!)
git reset --hard HEAD~1

# Undo last 3 commits, keep changes
git reset --soft HEAD~3
```

### Undo After Push (⚠️ Use Carefully)

```bash
# Create a new commit that undoes the last commit
git revert HEAD

# Force push (⚠️ only if you're the only user!)
git push --force
```

## Branches (Advanced)

Branches let you work on features without affecting the main code.

```bash
# Create a new branch
git branch feature-name

# Switch to that branch
git checkout feature-name

# Create and switch in one command
git checkout -b feature-name

# See all branches
git branch

# Switch back to main
git checkout main

# Merge feature into main
git checkout main
git merge feature-name

# Delete branch after merging
git branch -d feature-name
```

## Working with GitHub

```bash
# Download latest changes from GitHub
git pull

# See connected GitHub repositories
git remote -v

# Change GitHub repository URL
git remote set-url origin https://github.com/NEW-USERNAME/tennis-ladder-app.git
```

## Common Scenarios

### Scenario 1: Made changes, want to save

```bash
git status              # See what changed
git add .               # Stage all changes
git commit -m "Fixed bug in challenge system"
git push                # Upload to GitHub
```

### Scenario 2: Messed up, want to start over

```bash
git status              # See what changed
git checkout -- .       # Discard all changes (⚠️ can't undo!)
```

### Scenario 3: Committed but made a typo in commit message

```bash
git commit --amend -m "New corrected message"
git push --force        # Only if you haven't shared this commit!
```

### Scenario 4: Want to see what changed in last commit

```bash
git show                # See last commit details
git show HEAD~1         # See second-to-last commit
```

### Scenario 5: Working from multiple computers

```bash
# On Computer A:
git add .
git commit -m "Made changes on computer A"
git push

# Later, on Computer B:
git pull                # Download changes from Computer A
# ... make your changes ...
git add .
git commit -m "Made changes on computer B"
git push
```

### Scenario 6: Accidentally committed large files

```bash
# Remove file from Git but keep it locally
git rm --cached large-file.zip

# Add to .gitignore so it doesn't get committed again
echo "large-file.zip" >> .gitignore

# Commit the removal
git add .gitignore
git commit -m "Removed large file"
git push
```

## .gitignore

Files/folders to ignore (don't track with Git):

```
# .gitignore file contents:

# Dependencies
node_modules/

# Build output
dist/
build/

# Environment variables
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/

# Logs
*.log
```

## Commit Message Best Practices

### Good commit messages:
```bash
git commit -m "Add challenge deadline reminder feature"
git commit -m "Fix ranking update bug when lower player wins"
git commit -m "Update README with setup instructions"
git commit -m "Remove unused dependencies"
```

### Bad commit messages:
```bash
git commit -m "fixed stuff"
git commit -m "asdf"
git commit -m "changes"
git commit -m "idk"
```

### Commit message format:
```
<type>: <description>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting, etc.)
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance tasks

Examples:
git commit -m "feat: Add player statistics dashboard"
git commit -m "fix: Correct challenge deadline calculation"
git commit -m "docs: Add Firebase setup guide"
```

## Troubleshooting

### Problem: "git: command not found"
**Solution:** Git isn't installed or not in PATH. Install Git and restart terminal.

### Problem: "Permission denied (publickey)"
**Solution:** Set up SSH keys or use HTTPS URL for GitHub.

### Problem: "refusing to merge unrelated histories"
**Solution:**
```bash
git pull origin main --allow-unrelated-histories
```

### Problem: "Your branch and 'origin/main' have diverged"
**Solution:**
```bash
git pull --rebase
# Resolve any conflicts
git push
```

### Problem: "Conflict" after git pull
**Solution:**
1. Open conflicting files in VS Code
2. Look for conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
3. Choose which version to keep
4. Remove conflict markers
5. Save files
6. Run:
```bash
git add .
git commit -m "Resolved merge conflict"
git push
```

### Problem: Accidentally pushed sensitive data (passwords, API keys)
**Solution:**
1. Change the password/key immediately
2. Remove from Git history (complex - Google "BFG Repo-Cleaner")
3. Add to .gitignore
4. Use environment variables for secrets

### Problem: Want to undo git push (already shared with team)
**Solution:** DON'T use `--force`. Instead:
```bash
git revert HEAD        # Creates new commit that undoes changes
git push               # Safe, keeps history
```

## GitHub Desktop (Alternative)

If command line feels overwhelming, use **GitHub Desktop**:
- Download: https://desktop.github.com
- Visual interface for Git commands
- Drag-and-drop commits
- Easy conflict resolution
- Same result as command line

## Quick Reference Card

```
Command                         What It Does
────────────────────────────────────────────────────────────────
git status                      Show changed files
git add .                       Stage all changes
git commit -m "message"         Save changes with message
git push                        Upload to GitHub
git pull                        Download from GitHub
git log                         Show commit history
git diff                        Show file changes
git checkout -- .               Discard all changes (⚠️)
git reset --soft HEAD~1         Undo last commit
git branch                      List branches
git checkout -b name            Create new branch
git merge name                  Merge branch
────────────────────────────────────────────────────────────────
```

## Your Tennis App Git Workflow

### Initial Setup (Once):
```bash
cd tennis-ladder-app
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/tennis-ladder-app.git
git branch -M main
git push -u origin main
```

### Daily Updates:
```bash
# Make changes in VS Code
# Test with: npm run dev

git status                              # See what changed
git add .                               # Stage changes
git commit -m "Add admin dashboard"     # Commit
git push                                # Push to GitHub (auto-deploys to Vercel!)
```

### Check Live Site:
- Vercel auto-deploys in ~60 seconds
- Check: https://your-app.vercel.app
- If broken, check Vercel build logs

## Pro Tips

1. **Commit often** - Small, frequent commits are better than large ones
2. **Pull before push** - Always `git pull` before starting work
3. **Write good messages** - Future you will thank you
4. **Use .gitignore** - Don't commit node_modules or .env files
5. **Branch for experiments** - Keep main branch stable
6. **Push daily** - Your code is backed up on GitHub

## Learning More

- **GitHub Guide**: https://guides.github.com
- **Git Docs**: https://git-scm.com/doc
- **Interactive Tutorial**: https://learngitbranching.js.org
- **Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf

## Remember

- Git is your friend (even when it feels confusing!)
- You can almost always undo mistakes
- Google error messages - you're not the first person to see them
- When in doubt, commit often and push to GitHub

---

**Need help? Come back and ask me about the specific Git command or error you're seeing!**
