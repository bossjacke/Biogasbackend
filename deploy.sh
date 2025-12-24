#!/bin/bash

# Vercel Deployment Script for E-commerce Backend
echo "🚀 Starting Vercel deployment preparation..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please update the .env file with your actual values before deployment!"
    echo "   Especially important: MONGO_URI, JWT_SECRET, STRIPE keys, and FRONTEND_URL"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run a quick syntax check
echo "🔍 Checking syntax..."
node -c page/server.js
node -c page/app.js

if [ $? -eq 0 ]; then
    echo "✅ Syntax check passed!"
else
    echo "❌ Syntax check failed. Please fix errors before deploying."
    exit 1
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
echo "📋 Make sure you have configured these environment variables in Vercel:"
echo "   - MONGO_URI"
echo "   - JWT_SECRET"
echo "   - FRONTEND_URL"
echo "   - STRIPE_SECRET_KEY"
echo "   - STRIPE_WEBHOOK_SECRET"
echo "   - EMAIL_USER and EMAIL_PASS"
echo "   - GEMINI_API_KEY"
echo "   - GOOGLE_CLIENT_ID"
echo ""

read -p "Press Enter to continue with deployment or Ctrl+C to cancel..."

vercel --prod

echo "✅ Deployment complete!"
echo "📝 Next steps:"
echo "   1. Configure environment variables in Vercel dashboard"
echo "   2. Update Stripe webhook endpoint to: https://your-domain.vercel.app/api/webhooks/stripe"
echo "   3. Test the API at: https://your-domain.vercel.app/api/health"
