# Vercel Deployment Guide

## Quick Deploy

### Option 1: Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? Select your account
# - Link to existing project? N
# - Project name? budgetbites (or your choice)
# - Directory? ./ (press Enter)
# - Override settings? N
```

### Option 2: Via Vercel Dashboard

1. **Push to Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-git-repo-url>
git push -u origin main
```

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Import your Git repository
   - Vercel will auto-detect: Framework = Vite
   - Click **Deploy**

## Build Settings

Vercel should auto-detect these, but if needed:

- **Framework Preset**: Vite
- **Build Command**: `pnpm run build`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`
- **Node Version**: 18.x or higher

## Common Issues & Solutions

### Issue: "Module not found" errors

**Solution**: Make sure all dependencies are in `dependencies`, not `devDependencies`
```bash
# Check package.json - react, react-dom, react-router should be in dependencies
```

### Issue: "Failed to parse source map"

**Solution**: Disable source maps (already done in vite.config.ts)

### Issue: Build succeeds but app shows blank page

**Solution**: 
1. Check browser console for errors
2. Verify `/src/main.tsx` exists
3. Check that `index.html` has `<div id="root"></div>`

### Issue: Routes return 404 on refresh

**Solution**: The `vercel.json` rewrite rule should handle this (already configured)

### Issue: TypeScript errors during build

**Solution**: Run locally first to catch errors:
```bash
pnpm build
```

## Testing Build Locally

Before deploying, test the production build:

```bash
# Build
pnpm build

# Preview (install vite globally if needed)
pnpm preview

# Or use npx
npx vite preview
```

Visit `http://localhost:4173` to test the production build.

## Environment Variables

Currently not needed. If you add Supabase later:

1. Go to Vercel Project → Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## After Deployment

Your app will be available at:
- Production: `https://your-project.vercel.app`
- Preview branches: Automatic preview URLs for each commit

## Troubleshooting Checklist

- [ ] Node version 18+ 
- [ ] All files committed to git
- [ ] `pnpm install` works locally
- [ ] `pnpm build` succeeds locally
- [ ] No `figma:` imports in source code
- [ ] React & ReactDOM in dependencies (not peer)
- [ ] `index.html` in root directory
- [ ] `src/main.tsx` exists
- [ ] `vercel.json` has rewrite rules

## Need Help?

Share the full error log from:
- Vercel deployment logs
- Or output from `pnpm build`
