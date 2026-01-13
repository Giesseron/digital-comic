# Deploy Interactive Comic to GitHub Pages

Your project is now ready to deploy! Follow these steps:

## ✅ Step 1: Git Repository Ready (COMPLETED)
- ✓ Git initialized
- ✓ All files committed
- ✓ Branch renamed to `main`

---

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Fill in repository details:
   - **Repository name**: `interactive-comic` (or your preferred name)
   - **Description**: "Interactive Digital Comic with branching narrative"
   - **Visibility**: Public (required for free GitHub Pages)
   - **DO NOT** check "Initialize with README" (we already have files)
3. Click **"Create repository"**

---

## Step 3: Connect and Push Your Code

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
cd /home/tailorgap/digital_comic

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/interactive-comic.git

# Push your code
git push -u origin main
```

**Note:** You may be asked for GitHub credentials. If you have 2FA enabled, you'll need a Personal Access Token instead of your password.

### Creating a Personal Access Token (if needed):
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Select scopes: `repo` (full control of private repositories)
4. Click "Generate token"
5. Copy the token and use it as your password when pushing

---

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/interactive-comic`
2. Click **"Settings"** tab
3. Click **"Pages"** in the left sidebar
4. Under "Source":
   - Branch: Select **"main"**
   - Folder: Select **"/ (root)"**
5. Click **"Save"**

---

## Step 5: Access Your Live Comic! 🎉

After 1-2 minutes, your comic will be live at:

```
https://YOUR_USERNAME.github.io/interactive-comic/
```

You can find the exact URL in Settings → Pages (it will show "Your site is live at...")

---

## Updating Your Comic Later

Whenever you make changes:

```bash
cd /home/tailorgap/digital_comic

# Stage your changes
git add .

# Commit with a message
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

GitHub Pages will automatically update your site within 1-2 minutes.

---

## Quick Commands Reference

```bash
# Check status of files
git status

# See commit history
git log --oneline

# Check remote URL
git remote -v

# Create a new branch for testing
git checkout -b feature-branch-name

# Switch back to main
git checkout main
```

---

## Troubleshooting

### Problem: Images not loading
- Make sure all image files are in the `images/` folder
- Check that image filenames match the JSON (case-sensitive)
- Clear browser cache and refresh

### Problem: Push rejected
- Run: `git pull origin main --rebase`
- Then: `git push origin main`

### Problem: GitHub Pages not working
- Wait 2-3 minutes after enabling Pages
- Check that "main" branch is selected in Pages settings
- Make sure repository is Public

### Problem: 404 error on GitHub Pages
- URL format is: `https://USERNAME.github.io/REPO-NAME/`
- Not: `https://github.com/USERNAME/REPO-NAME/`

---

## Current Repository Status

```bash
Branch: main
Files committed: 32 files
Total additions: 1498 lines
Ready to push: Yes ✓
```

You're all set! Just follow Steps 2-5 above to get your comic online.
