# Complete Setup Guide - Tennis Ladder App

## Part 1: Initial Setup (Do This Once)

### Step 1: Install Required Software

1. **Install Node.js**
   - Go to: https://nodejs.org
   - Download the LTS version (v18 or later)
   - Run installer with default settings
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Install Git**
   - Go to: https://git-scm.com/downloads
   - Download and install
   - Verify installation:
     ```bash
     git --version
     ```

3. **Install VS Code** (recommended editor)
   - Go to: https://code.visualstudio.com
   - Download and install

### Step 2: Create GitHub Account

1. Go to https://github.com
2. Click "Sign up"
3. Create your account (free)
4. Verify your email

### Step 3: Configure Git on Your Computer

Open Terminal (Mac) or Command Prompt (Windows) and run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

(Use the same email as your GitHub account)

## Part 2: Setting Up Your Project

### Step 1: Download Your Project Files

Option A: If I give you a zip file, extract it to a folder like:
- `C:\Users\YourName\tennis-ladder-app` (Windows)
- `/Users/YourName/tennis-ladder-app` (Mac)

Option B: Clone from GitHub (after you push it):
```bash
git clone https://github.com/yourusername/tennis-ladder-app.git
cd tennis-ladder-app
```

### Step 2: Install Project Dependencies

1. Open Terminal/Command Prompt
2. Navigate to your project folder:
   ```bash
   cd path/to/tennis-ladder-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
   (This will take a few minutes the first time)

### Step 3: Test Locally

Run the development server:
```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

Open that URL in your browser to see your app!

## Part 3: Push to GitHub (Version Control)

### Step 1: Create a New Repository on GitHub

1. Go to https://github.com
2. Click the "+" in top right → "New repository"
3. Name it: `tennis-ladder-app`
4. Keep it **Private** (or Public if you want)
5. Do NOT initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Push Your Code to GitHub

In your project folder terminal, run these commands:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit - Tennis Ladder App"

# Connect to GitHub (replace YOUR-USERNAME with your GitHub username)
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/tennis-ladder-app.git

# Push to GitHub
git push -u origin main
```

You'll be prompted to login to GitHub - use your credentials.

Now refresh your GitHub repository page - you should see all your files!

## Part 4: Deploy to Vercel (Make it Live 24/7)

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### Step 2: Deploy Your Project

1. On Vercel dashboard, click "Add New..." → "Project"
2. Find your `tennis-ladder-app` repository
3. Click "Import"
4. Keep all default settings:
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click "Deploy"

Vercel will build and deploy your app (takes 1-2 minutes).

### Step 3: Get Your Live URL

Once deployed, you'll get a URL like:
```
https://tennis-ladder-app-xyz123.vercel.app
```

**This URL is live 24/7!** Share it with your tennis club members.

## Part 5: Making Updates

### When You Want to Make Changes:

1. Edit your code in VS Code
2. Test locally with `npm run dev`
3. When ready, push to GitHub:
   ```bash
   git add .
   git commit -m "Description of what you changed"
   git push
   ```
4. Vercel **automatically** redeploys your site within 1-2 minutes!

## Common Commands Reference

```bash
# Start development server (local testing)
npm run dev

# Build for production (Vercel does this automatically)
npm run build

# Check git status (see what files changed)
git status

# See your git history
git log --oneline

# Pull latest changes from GitHub
git pull
```

## Troubleshooting

### "npm: command not found"
- Node.js isn't installed or not in PATH
- Reinstall Node.js and restart terminal

### "git: command not found"
- Git isn't installed or not in PATH
- Reinstall Git and restart terminal

### Port 5173 already in use
- Another app is using that port
- Stop other dev servers or use: `npm run dev -- --port 3000`

### Can't push to GitHub - Authentication failed
- GitHub removed password authentication
- Use a Personal Access Token:
  1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token with 'repo' scope
  3. Use token as password when pushing

## Next Steps

Once your basic app is live, you'll want to:

1. **Add Firebase** for real database and authentication
2. **Set up admin features** for managing the ladder
3. **Add notifications** for challenges and deadlines
4. **Implement inactivity tracking** for the 2-week rule

Would you like me to create guides for any of these next steps?

## Support

If you get stuck:
1. Check the error message carefully
2. Google the error message
3. Ask me (Claude) for help with the specific error!

Good luck! 🎾
