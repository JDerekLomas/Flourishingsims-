# Deployment Guide

## Quick Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended - 2 minutes)

1. Visit [vercel.com](https://vercel.com/)
2. Sign up or log in
3. Click "Add New Project"
4. Import this repository: `JDerekLomas/Flourishingsims-`
5. Vercel will auto-detect settings from `vercel.json`
6. Click "Deploy"
7. Your game will be live at: `https://your-project-name.vercel.app`

### Method 2: Vercel CLI (From your local machine)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Clone the repository
git clone https://github.com/JDerekLomas/Flourishingsims-.git
cd Flourishingsims-

# Deploy to production
vercel --prod
```

### Method 3: Continuous Deployment

Once you connect your GitHub repository to Vercel:
- Every push to the main branch automatically deploys to production
- Pull requests get preview deployments
- Rollback to previous deployments with one click

## Project Configuration

Already configured in `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## After Deployment

Your Flourishing Sims game will be accessible at the Vercel URL. Share it with others to let them cultivate their 13 psychological needs!

## Troubleshooting

If build fails:
1. Check Node.js version (requires 18+)
2. Ensure all dependencies are in package.json
3. Run `npm run build` locally to test

For support: https://vercel.com/docs
