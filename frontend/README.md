# Pizza.com Frontend

A React-based frontend application for the Pizza.com food delivery platform, designed for deployment on Vercel.

## 🚀 Features

- **Modern React UI**: Built with React 18 and functional components
- **Responsive Design**: Mobile-first design that works on all devices
- **Cart Management**: Global state management with Context API
- **Dynamic Menu**: Fetches menu items from backend API
- **Order System**: Complete ordering workflow with validation
- **Contact Form**: Customer support and inquiries
- **Real-time Updates**: Axios for API communication

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html              # Main HTML template
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt              # SEO robots file
│   └── images/                 # Static images
├── src/
│   ├── index.js                # Application entry point
│   ├── App.jsx                 # Main App component
│   ├── index.css               # Global styles
│   ├── App.css                 # App component styles
│   ├── components/
│   │   ├── Hero/               # Hero section component
│   │   ├── Menu/               # Menu display components
│   │   ├── Cart/               # Shopping cart component
│   │   ├── Order/              # Order form component
│   │   ├── Contact/            # Contact form component
│   │   └── Deals/              # Deals section component
│   ├── context/
│   │   └── CartContext.jsx     # Shopping cart state management
│   ├── services/
│   │   └── api.js              # API service layer
│   └── utils/
│       └── helpers.js          # Utility functions
├── .env.local                  # Environment variables (not in git)
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
├── .vercelignore               # Vercel ignore rules
├── vercel.json                 # Vercel configuration
└── package.json                # Dependencies and scripts
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (locally or deployed)

### Local Development

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local`:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ESLINT_NO_DEV_ERRORS=true
   DISABLE_ESLINT_PLUGIN=true
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   
   The app will open at `http://localhost:3000`

## 🌐 Available Scripts

```bash
npm start       # Start development server (port 3000)
npm run build   # Build for production
npm test        # Run tests
npm run eject   # Eject from Create React App (one-way operation)
```

## 📤 Deployment to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Select the `frontend` directory as the root
5. Vercel will auto-detect Create React App settings
6. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend.vercel.app/api
   ```
7. Click "Deploy"

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from frontend directory**
   ```bash
   cd frontend
   vercel
   ```

4. **For production deployment**
   ```bash
   vercel --prod
   ```

### Environment Variables on Vercel

Add this environment variable in your Vercel project settings:

```
REACT_APP_API_URL=https://your-backend.vercel.app/api
```

⚠️ **Important**: React requires environment variables to start with `REACT_APP_`

## 🔗 Connecting to Backend

The frontend communicates with the backend through the API service layer (`src/services/api.js`).

**Local Development:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Production:**
```env
REACT_APP_API_URL=https://your-backend.vercel.app/api
```

The API service automatically uses the `REACT_APP_API_URL` environment variable.

## 📦 Dependencies

### Production Dependencies
- **react**: ^18.2.0 - Core React library
- **react-dom**: ^18.2.0 - React DOM rendering
- **axios**: ^1.6.0 - HTTP client for API calls
- **react-icons**: ^4.12.0 - Icon library
- **react-scripts**: Latest - Create React App scripts

## 🎨 Component Overview

### Hero Component
Landing section with call-to-action and promotional content.

### Menu Component
Displays menu items fetched from backend API with filtering by category.

### Cart Component
Shopping cart with add/remove items functionality using Context API.

### Order Component
Order form with customer details and validation.

### Contact Component
Contact form for customer inquiries and support.

### Deals Component
Special offers and promotional deals section.

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_URL` | Backend API base URL | Yes |
| `ESLINT_NO_DEV_ERRORS` | Disable ESLint errors in dev | No |
| `DISABLE_ESLINT_PLUGIN` | Disable ESLint plugin | No |

## 🐛 Troubleshooting

### Issue: API Connection Failed

**Solution:**
- Verify `REACT_APP_API_URL` is set correctly
- Ensure backend is running and accessible
- Check browser console for CORS errors
- Verify backend URL doesn't have trailing slash

### Issue: Build Fails

**Solution:**
- Run `npm install` to ensure all dependencies are installed
- Check for syntax errors in components
- Verify all imports are correct
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### Issue: Environment Variables Not Working

**Solution:**
- Ensure variable name starts with `REACT_APP_`
- Restart development server after changing `.env.local`
- In production, verify variables are set in Vercel dashboard
- Rebuild the app: `npm run build`

### Issue: Routing Not Working After Deployment

**Solution:**
- Vercel automatically handles SPA routing
- Verify `vercel.json` has the catch-all route configuration
- All routes should redirect to `index.html`

## 🚀 Performance Optimization

1. **Code Splitting**: Implement lazy loading for routes
2. **Image Optimization**: Use optimized image formats (WebP)
3. **Caching**: Vercel automatically caches static assets
4. **CDN**: All assets served via Vercel's global CDN
5. **Compression**: Automatic Gzip/Brotli compression

## 📱 Progressive Web App (PWA)

The app includes basic PWA support:
- `manifest.json` for app metadata
- Service worker ready (can be enhanced)
- Mobile-friendly and installable

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to your repository:

1. **Production Branch** (main/master):
   - Automatic deployment to production
   - URL: `https://your-project.vercel.app`

2. **Preview Branches** (feature branches):
   - Automatic preview deployments
   - URL: `https://your-project-branch-name.vercel.app`

## ✅ Pre-Deployment Checklist

- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Backend API URL set correctly
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors in browser
- [ ] All features tested locally
- [ ] Responsive design verified
- [ ] API connections working
- [ ] Images loading correctly

## 🎉 Success Checklist

- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] Backend API connected
- [ ] All pages loading correctly
- [ ] Cart functionality working
- [ ] Order submission working
- [ ] Contact form working
- [ ] Mobile responsive

## 📞 Support

For issues or questions:
- Check browser console for errors
- Verify backend API is accessible
- Check Vercel deployment logs
- Review environment variables

---

**Last Updated:** November 28, 2025  
**Version:** 1.0.0
