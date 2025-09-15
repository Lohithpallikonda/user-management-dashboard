# 🚀 Deployment Guide - User Management Dashboard

This guide covers multiple deployment options for the User Management Dashboard full-stack application.

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git repository
- Account on chosen deployment platform

## 🛠️ Pre-deployment Setup

1. **Clone and Install Dependencies**
   ```bash
   git clone <your-repo-url>
   cd user-management-dashboard
   npm install
   cd backend && npm install && cd ..
   cd frontend && npm install && cd ..
   cd api && npm install && cd ..
   ```

2. **Test Local Build**
   ```bash
   # Test frontend build
   cd frontend && npm run build && cd ..
   
   # Test backend
   cd backend && npm start
   ```

## 🔷 Option 1: Vercel (Recommended for Serverless)

**Best for:** Frontend + Serverless API functions

### Quick Deploy
```bash
npm install -g vercel
vercel --prod
```

### Manual Setup
1. Connect your GitHub repository to Vercel
2. Set build command: `cd frontend && npm install && npm run build`
3. Set output directory: `frontend/build`
4. The API functions in `/api` folder will auto-deploy as serverless functions

### Environment Variables
- No additional env vars needed for basic setup
- Database: Uses SQLite in `/tmp` (resets on each function call)

---

## 🟣 Option 2: Render (Recommended for Full-Stack)

**Best for:** Traditional server deployment with persistent database

### Setup
1. Connect your GitHub repository to Render
2. Render will auto-detect the `render.yaml` configuration
3. Both frontend and backend will deploy as separate services

### Services Created
- **Frontend**: Static site at `user-management-frontend.onrender.com`
- **Backend**: Web service at `user-management-api.onrender.com`

### Database Setup
- Upgrade to PostgreSQL for production:
  ```bash
  npm install pg
  ```
- Update `DATABASE_URL` environment variable

---

## 🚂 Option 3: Railway

**Best for:** Simple deployment with automatic CI/CD

### Setup
```bash
npm install -g @railway/cli
railway login
railway init
railway deploy
```

### Configuration
- Uses `railway.toml` configuration
- Automatically detects Node.js projects
- Built-in PostgreSQL database available

---

## 🟪 Option 4: Heroku

**Best for:** Established platform with add-ons

### Setup
1. Install Heroku CLI
2. Create Heroku app:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

### Add-ons
```bash
# Add PostgreSQL database
heroku addons:create heroku-postgresql:hobby-dev

# Add Redis for caching (optional)
heroku addons:create heroku-redis:hobby-dev
```

---

## 🟢 Option 5: Netlify (Frontend Only)

**Best for:** Static frontend deployment

### Setup
```bash
npm install -g netlify-cli
cd frontend && npm run build
netlify deploy --prod --dir=build
```

### Backend Deployment
Deploy backend separately to Heroku, Railway, or Render

---

## 🐳 Option 6: Docker Deployment

**Best for:** Custom servers, DigitalOcean, AWS EC2

### Build and Run
```bash
# Build image
docker build -t user-management-dashboard .

# Run container
docker run -p 8080:8080 user-management-dashboard
```

### Docker Compose
```bash
docker-compose up -d
```

---

## 🌐 Domain Configuration

### Custom Domain Setup
1. **Vercel**: Add domain in project settings
2. **Render**: Add domain in service settings  
3. **Railway**: Add domain in project settings
4. **Heroku**: `heroku domains:add yourdomain.com`

### DNS Configuration
Point your domain to:
- **Vercel**: `cname.vercel-dns.com`
- **Render**: Provided CNAME
- **Railway**: Provided CNAME  
- **Heroku**: Provided DNS target

---

## 🔧 Environment Variables

### Frontend (.env.production)
```bash
REACT_APP_API_URL=https://your-api-domain.com
GENERATE_SOURCEMAP=false
```

### Backend (.env.production)
```bash
NODE_ENV=production
PORT=8080
CORS_ORIGIN=https://your-frontend-domain.com
DATABASE_URL=your_database_connection_string
```

---

## 📊 Database Migration (Production)

### SQLite to PostgreSQL
1. **Install PostgreSQL adapter**
   ```bash
   npm install pg
   ```

2. **Update database.js**
   ```javascript
   const { Pool } = require('pg');
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
   });
   ```

3. **Run migrations**
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     phone VARCHAR(50),
     company VARCHAR(255),
     street VARCHAR(255),
     city VARCHAR(100),
     zipcode VARCHAR(20),
     lat VARCHAR(50),
     lng VARCHAR(50)
   );
   ```

---

## 🔒 Security Considerations

### Production Checklist
- [ ] Set up HTTPS (automatic on most platforms)
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable request rate limiting
- [ ] Set up database backups
- [ ] Monitor application logs

### CORS Configuration
```javascript
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
```

---

## 📈 Performance Optimization

### Frontend
- [x] Code splitting with React Router
- [x] Production build optimization
- [ ] Image optimization
- [ ] CDN setup (automatic on Vercel/Netlify)

### Backend
- [ ] Database connection pooling
- [ ] Redis caching
- [ ] API rate limiting
- [ ] Database indexing

---

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for ESLint errors

2. **API Connection Issues**
   - Verify CORS configuration
   - Check environment variables
   - Ensure API URL is correct

3. **Database Issues**
   - Check database connection string
   - Verify database permissions
   - Run database migrations

### Debug Commands
```bash
# Check build locally
npm run build

# Test API endpoints
curl https://your-api-url.com/api/users

# Check logs
# Vercel: vercel logs
# Heroku: heroku logs --tail
# Railway: railway logs
```

---

## 📞 Support

- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check README.md for development setup
- **Platform Support**: Check respective platform documentation

---

## 🎉 Quick Start with Script

Use the deployment script for quick deployment:

```bash
# Make script executable
chmod +x deploy.sh

# Deploy to different platforms
./deploy.sh vercel
./deploy.sh render  
./deploy.sh railway
./deploy.sh heroku
./deploy.sh netlify
```

---

*Choose the deployment option that best fits your needs and infrastructure requirements!*