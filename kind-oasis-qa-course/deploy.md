# Deployment Guide

## Platform-Specific Deployment Instructions

### Replit Deployments (Recommended)
1. Click the "Deploy" button in your Replit workspace
2. Choose "Autoscale Deployment"
3. Your app will be available at `https://your-repl-name.your-username.repl.co`

### Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow prompts to deploy
4. Your app will be available at the provided Vercel URL

### Railway
1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Deploy: `railway up`

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Heroku
1. Create Heroku app: `heroku create your-app-name`
2. Set buildpack: `heroku buildpacks:set heroku/nodejs`
3. Deploy: `git push heroku main`

## Environment Configuration

### Required Environment Variables
- `NODE_ENV`: Set to "production" for production deployments
- `PORT`: Port number (usually set automatically by hosting platforms)

### Optional Environment Variables
- `DATABASE_URL`: If using persistent database instead of in-memory storage
- `SESSION_SECRET`: For secure session management in production

## Build Process

The application uses Vite for frontend building and esbuild for backend compilation:

```bash
# Frontend build (React app)
vite build

# Backend build (Express server)
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Combined build
npm run build
```

## Production Considerations

### Performance Optimization
- Frontend assets are automatically optimized by Vite
- Images are served via CDN (Unsplash URLs)
- CSS is minimized and optimized
- JavaScript bundles are split and compressed

### Security
- CORS configuration for production domains
- Session security with secure cookies
- Input validation on all forms
- XSS protection through React's built-in escaping

### Monitoring
- Express error handling middleware
- Structured logging for debugging
- Performance monitoring recommendations

## Database Migration

To switch from in-memory storage to persistent database:

1. Set up your database (PostgreSQL recommended)
2. Update environment variables
3. Modify `server/storage.ts` to use database instead of MemStorage
4. Run migrations if needed

## Custom Domain Setup

### Replit Deployments
1. Go to your deployment settings
2. Add custom domain
3. Configure DNS records as instructed

### Other Platforms
Follow platform-specific documentation for custom domain configuration.

## SSL/HTTPS

All recommended platforms provide automatic SSL certificates. No additional configuration needed.

## Scaling Considerations

The application is designed to scale horizontally:
- Stateless server design (except for in-memory storage)
- Frontend assets served via CDN
- API endpoints optimized for concurrent requests
- Database-ready architecture for multi-instance deployments