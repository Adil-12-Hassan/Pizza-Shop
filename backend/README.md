# Pizza.com Backend API

A Next.js-based serverless backend API for the Pizza.com application, designed for deployment on Vercel.

## 🚀 Features

- **Serverless Architecture**: Built with Next.js API routes for seamless Vercel deployment
- **MongoDB Integration**: Mongoose ODM for data modeling and validation
- **RESTful API**: Clean and organized API endpoints
- **CORS Support**: Configured for cross-origin requests
- **Error Handling**: Centralized error handling middleware
- **Input Validation**: Comprehensive validation utilities
- **Health Check**: API health monitoring endpoint

## 📁 Project Structure

```
backend/
├── lib/
│   ├── db.js                          # MongoDB connection handler
│   ├── models/
│   │   ├── MenuItem.js                # Menu item schema
│   │   ├── Order.js                   # Order schema
│   │   └── Contact.js                 # Contact message schema
│   └── middleware/
│       ├── errorHandler.js            # Error handling utilities
│       ├── responseHandler.js         # Standardized responses
│       └── cors.js                    # CORS configuration
├── pages/
│   ├── index.js                       # Root page
│   └── api/
│       ├── health.js                  # Health check endpoint
│       ├── menu/
│       │   └── index.js              # Menu CRUD operations
│       ├── orders/
│       │   ├── index.js              # Orders listing & creation
│       │   └── [id].js               # Single order operations
│       └── contact/
│           └── index.js              # Contact form submissions
├── utils/
│   └── validation.js                  # Input validation helpers
├── .env.local                         # Environment variables (not in git)
├── .env.example                       # Environment template
├── vercel.json                        # Vercel configuration
├── next.config.js                     # Next.js configuration
├── package.json                       # Dependencies and scripts
└── populate-db.js                     # Database seeding script
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   cd backend
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
   
   Update `.env.local` with your values:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=http://localhost:3000
   BACKEND_URL=http://localhost:5000
   NODE_ENV=development
   ```

4. **Populate the database (optional)**
   ```bash
   node populate-db.js
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The API will be available at `http://localhost:5000`

## 🌐 API Endpoints

### Health Check
- `GET /api/health` - Check API and database status

### Menu Items
- `GET /api/menu` - Get all available menu items
- `POST /api/menu` - Create a new menu item (Admin)

### Orders
- `GET /api/orders` - Get all orders (last 50)
- `POST /api/orders` - Create a new order
- `GET /api/orders/[id]` - Get order by ID
- `PUT /api/orders/[id]` - Update order status
- `DELETE /api/orders/[id]` - Delete an order

### Contact
- `GET /api/contact` - Get all contact messages (Admin)
- `POST /api/contact` - Submit a contact message

## 📤 Deployment to Vercel

### Method 1: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   For production deployment:
   ```bash
   vercel --prod
   ```

### Method 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Select the `backend` directory as the root
5. Add environment variables:
   - `MONGODB_URI`
   - `FRONTEND_URL`
   - `NODE_ENV=production`
6. Click "Deploy"

### Environment Variables on Vercel

Add these environment variables in your Vercel project settings:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pizza-shop
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

## 🔒 Security Considerations

- Never commit `.env.local` to version control
- Use environment variables for all sensitive data
- Update CORS origins in production to match your frontend URL
- Implement authentication for admin endpoints
- Add rate limiting for public endpoints
- Validate and sanitize all user inputs

## 🛠️ Development Scripts

```bash
npm run dev      # Start development server on port 5000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📊 Database Models

### MenuItem
- name, description, price, category, image, available

### Order
- customerName, phoneNumber, address, items, totalAmount, status, orderDate, notes

### Contact
- name, email, phoneNumber, message, status, createdAt

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify your MONGODB_URI is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure database user has proper permissions

### CORS Errors
- Update `lib/middleware/cors.js` with your frontend URL
- Check `next.config.js` CORS headers configuration

### Deployment Errors
- Verify all environment variables are set in Vercel
- Check build logs for specific errors
- Ensure Node.js version compatibility

## 📝 License

This project is part of the Pizza.com application.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📞 Support

For issues or questions, please open an issue in the repository or contact the development team.
