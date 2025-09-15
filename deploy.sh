#!/bin/bash

# Deployment script for User Management Dashboard
# Usage: ./deploy.sh [platform]
# Platforms: vercel, render, railway, heroku, netlify

set -e

PLATFORM=${1:-vercel}

echo "🚀 Starting deployment for platform: $PLATFORM"

# Install dependencies
echo "📦 Installing dependencies..."
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
cd api && npm install && cd ..

# Build frontend
echo "🏗️ Building frontend..."
cd frontend
npm run build
cd ..

case $PLATFORM in
  "vercel")
    echo "🔷 Deploying to Vercel..."
    npx vercel --prod
    ;;
  "render")
    echo "🟣 Preparing for Render deployment..."
    echo "Please push to your Git repository. Render will auto-deploy from render.yaml"
    ;;
  "railway")
    echo "🚂 Deploying to Railway..."
    railway deploy
    ;;
  "heroku")
    echo "🟪 Deploying to Heroku..."
    git add .
    git commit -m "Deploy to Heroku" || true
    git push heroku main
    ;;
  "netlify")
    echo "🟢 Deploying to Netlify..."
    npx netlify deploy --prod --dir=frontend/build
    ;;
  *)
    echo "❌ Unknown platform: $PLATFORM"
    echo "Supported platforms: vercel, render, railway, heroku, netlify"
    exit 1
    ;;
esac

echo "✅ Deployment completed for $PLATFORM!"