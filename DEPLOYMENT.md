# BudgetBites - Deployment Guide

## Deploying to Vercel

### Prerequisites
- A [Vercel account](https://vercel.com/signup)
- Git repository (GitHub, GitLab, or Bitbucket)

### Quick Deploy

1. **Push your code to a Git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect the Vite configuration

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app
   - You'll get a production URL like `your-app.vercel.app`

### Configuration

The project includes:
- `vercel.json` - Handles SPA routing (all routes redirect to index.html)
- `vite.config.ts` - Build configuration
- `index.html` - Entry point for production builds

### Build Settings (Auto-configured)

- **Build Command**: `pnpm run build`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`

### Environment Variables (Optional)

If you add a backend later, configure environment variables in Vercel:
1. Go to Project Settings → Environment Variables
2. Add your variables (e.g., `VITE_API_URL`, `VITE_SUPABASE_URL`)

### Testing Locally

Before deploying, test the build locally:
```bash
# Install dependencies
pnpm install

# Build the app
pnpm run build

# Preview the build (optional - requires vite preview)
pnpm exec vite preview
```

### Troubleshooting

**White screen after deployment:**
- Check browser console for errors
- Verify all assets are loading correctly
- Ensure environment variables are set (if needed)

**Routes not working:**
- The `vercel.json` file should handle this
- Verify it's in the root directory

**Build fails:**
- Check Node.js version (Vercel uses Node 18+ by default)
- Verify all dependencies are installed
- Check build logs for specific errors

## Current Features

✅ Login state persists across refreshes  
✅ SPA routing configured for Vercel  
✅ User credentials stored in localStorage  
✅ Full React Router support

## Note on Backend

Currently, BudgetBites uses localStorage for user authentication. For a production app with real user data:
1. Connect to Supabase (or another backend)
2. Implement proper password hashing
3. Use server-side authentication
4. Store user data in a database

For Supabase integration, check the Make settings page.
