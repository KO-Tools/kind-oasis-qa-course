# GitHub Repository Setup & Installation Guide

## Setting Up GitHub Repository

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New repository" 
3. Repository name: `kind-oasis-qa-course`
4. Description: `Interactive Manufacturing Quality Assurance training course for cannabis industry`
5. Choose Public or Private
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### Step 2: Connect Local Code to GitHub
Run these commands in your terminal:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Complete QA training course with interactive modules"

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/kind-oasis-qa-course.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Installation Methods for Users

### Method 1: Quick Install via Git Clone
```bash
# Clone and setup in one line
git clone https://github.com/YOUR_USERNAME/kind-oasis-qa-course.git && cd kind-oasis-qa-course && ./install.sh
```

### Method 2: Manual Installation
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/kind-oasis-qa-course.git
cd kind-oasis-qa-course

# Run installation script
./install.sh

# Or install manually
npm install
npm run dev
```

### Method 3: Direct Download
1. Download ZIP from GitHub
2. Extract files
3. Open terminal in project folder
4. Run: `./install.sh` or `npm install && npm run dev`

## NPM Package Distribution (Optional)

To make it installable via npm:

### Step 1: Prepare for NPM
Update your `package.json` with:
```json
{
  "name": "kind-oasis-qa-course",
  "version": "1.0.0",
  "description": "Interactive Manufacturing Quality Assurance training course",
  "bin": {
    "qa-course": "./start.js"
  }
}
```

### Step 2: Create Start Script
Create `start.js`:
```javascript
#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

console.log('🌿 Starting Kind Oasis QA Course...');
const child = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  stdio: 'inherit'
});
```

### Step 3: Publish to NPM
```bash
npm login
npm publish
```

Users can then install with:
```bash
npm install -g kind-oasis-qa-course
qa-course
```

## Deployment Options

### Replit Deployments
- Click "Deploy" in Replit interface
- Automatic HTTPS and domain
- One-click deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Railway
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Heroku
```bash
git push heroku main
```

## Environment Variables
For production deployment, set:
- `NODE_ENV=production`
- `PORT` (if different from 5000)

## Repository Configuration Files

The following files have been created for optimal repository setup:
- `README.md` - Comprehensive project documentation
- `.gitignore` - Git ignore patterns
- `install.sh` - Automated installation script
- `SETUP.md` - This setup guide

## Features Available After Setup

Once installed, users get access to:
- 14 interactive training modules
- Advanced tools: Risk Matrix, FMEA Calculator, Facility Designer
- Progress tracking and certification
- Mobile-responsive interface
- Local development server at `http://localhost:5000`

## Support

After setup, users can:
- Report issues on GitHub Issues tab
- Fork repository for customization
- Submit pull requests for improvements
- Access documentation in README.md