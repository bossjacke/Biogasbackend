# E-commerce Backend API

Node.js/Express backend for e-commerce application, optimized for Vercel serverless deployment.

## Features

- User authentication & authorization
- Product management
- Shopping cart functionality
- Order processing
- Payment integration with Stripe
- Password reset functionality
- Google OAuth integration
- Chat functionality with Gemini AI
- Email notifications
- PDF invoice generation

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Payment**: Stripe
- **Email**: Nodemailer
- **AI**: Google Gemini API
- **Deployment**: Vercel (Serverless)

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Authentication
JWT_SECRET=your_strong_jwt_secret_key

# Frontend URLs
FRONTEND_URL=https://your-frontend-domain.vercel.app
CLIENT_URL=https://your-frontend-domain.vercel.app

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_FROM="Your App Name <your-email@gmail.com>"
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Stripe Payment
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Server
PORT=3003
NODE_ENV=production
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the required environment variables

3. Start the development server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:3003`

## Vercel Deployment

### Prerequisites
- Vercel account
- MongoDB Atlas database
- Configured environment variables

### Deployment Steps

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy using Vercel CLI**:
   ```bash
   vercel
   ```

3. **Or deploy via Vercel Dashboard**:
   - Push your code to GitHub/GitLab/Bitbucket
   - Connect your repository to Vercel
   - Configure environment variables in Vercel dashboard
   - Deploy

### Environment Variables in Vercel

Add all environment variables from the `.env.example` file to your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its corresponding value

### Important Notes for Vercel Deployment

- **Database Connection**: The app automatically handles MongoDB connection for serverless environment
- **CORS**: Update `FRONTEND_URL` to match your deployed frontend URL
- **Stripe Webhooks**: Configure webhook endpoint in Stripe dashboard to: `https://your-backend-url.vercel.app/api/webhooks/stripe`
- **Function Timeout**: Maximum function duration is set to 30 seconds

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove from cart

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get single order

### Payment
- `POST /api/payment/create-intent` - Create payment intent
- `POST /api/webhooks/stripe` - Stripe webhook handler

### Health Check
- `GET /api/health` - API health status

## Project Structure

```
backend/
├── page/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── services/             # External services
│   ├── utils/                # Utility functions
│   ├── app.js                # Express app configuration
│   └── server.js             # Server entry point
├── vercel.json               # Vercel configuration
├── package.json              # Dependencies and scripts
└── .env.example              # Environment variables template
```

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Ensure `MONGO_URI` is correctly set in Vercel environment variables
   - Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Vercel)

2. **CORS Errors**
   - Update `FRONTEND_URL` environment variable to match your frontend domain
   - Ensure frontend URL is included in CORS origins

3. **Stripe Webhook Issues**
   - Verify webhook endpoint URL in Stripe dashboard
   - Check webhook secret is correctly configured

4. **Function Timeouts**
   - Large database queries may timeout (30s limit)
   - Optimize queries and consider pagination

### Monitoring

- Check Vercel Function Logs for debugging
- Use `/api/health` endpoint to verify API status
- Monitor MongoDB Atlas metrics for database performance

## Support

For deployment issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Ensure MongoDB Atlas is accessible
4. Review API response logs for errors
