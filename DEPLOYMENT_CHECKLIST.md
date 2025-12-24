# Vercel Deployment Checklist

## Pre-Deployment ✅

- [ ] All code committed to Git repository
- [ ] `.env.example` is up to date with all required variables
- [ ] `vercel.json` configuration is correct
- [ ] `package.json` has proper build scripts
- [ ] All dependencies are listed in package.json
- [ ] Code passes syntax checks (`node -c page/server.js` && `node -c page/app.js`)

## Environment Variables Configuration 📝

### Required Variables (Add to Vercel Dashboard)
- [ ] `MONGO_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Strong secret for JWT tokens
- [ ] `FRONTEND_URL` - Your deployed frontend URL
- [ ] `CLIENT_URL` - Same as FRONTEND_URL
- [ ] `NODE_ENV` - Set to `production`

### Email Configuration
- [ ] `EMAIL_SERVICE` - Usually `gmail`
- [ ] `EMAIL_FROM` - Your app's email address
- [ ] `EMAIL_USER` - Your Gmail address
- [ ] `EMAIL_PASS` - App-specific password

### Payment Configuration
- [ ] `STRIPE_SECRET_KEY` - Live Stripe secret key
- [ ] `STRIPE_PUBLISHABLE_KEY` - Live Stripe publishable key
- [ ] `STRIPE_WEBHOOK_SECRET` - Webhook secret from Stripe

### Third-party Services
- [ ] `GOOGLE_CLIENT_ID` - Google OAuth client ID
- [ ] `GEMINI_API_KEY` - Google Gemini AI API key

## Database Setup 🗄️

- [ ] MongoDB Atlas cluster created
- [ ] Database user configured with proper permissions
- [ ] IP whitelist includes `0.0.0.0/0` (for Vercel)
- [ ] Connection string tested and working

## Stripe Configuration 💳

- [ ] Stripe account configured for live mode
- [ ] Products and prices set up in Stripe
- [ ] Webhook endpoint configured: `https://your-domain.vercel.app/api/webhooks/stripe`
- [ ] Webhook events selected:
  - [ ] payment_intent.succeeded
  - [ ] payment_intent.payment_failed
  - [ ] checkout.session.completed

## Deployment Steps 🚀

1. **Push code to repository**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy via Vercel**
   - Use Vercel CLI: `vercel --prod`
   - Or connect repository to Vercel dashboard

3. **Configure Environment Variables**
   - Go to Vercel project → Settings → Environment Variables
   - Add all variables from the list above
   - Redeploy after adding variables

4. **Test Deployment**
   ```bash
   curl https://your-domain.vercel.app/api/health
   ```

## Post-Deployment Testing 🧪

- [ ] Health check endpoint returns 200 OK
- [ ] User registration/login works
- [ ] Product listing works
- [ ] Cart functionality works
- [ ] Order creation works
- [ ] Payment processing works
- [ ] Email notifications are sent
- [ ] Stripe webhooks are received

## Monitoring & Debugging 📊

- [ ] Check Vercel Function Logs for errors
- [ ] Monitor MongoDB Atlas metrics
- [ ] Set up error tracking (optional)
- [ ] Test webhook delivery in Stripe dashboard

## Troubleshooting 🔧

### Common Issues

**Database Connection Failed**
- Check MONGO_URI in Vercel environment variables
- Verify MongoDB Atlas IP whitelist
- Check database user permissions

**CORS Errors**
- Verify FRONTEND_URL environment variable
- Check that frontend URL is in allowed origins

**Stripe Webhook Issues**
- Verify webhook endpoint URL in Stripe dashboard
- Check webhook secret matches environment variable
- Test webhook delivery in Stripe

**Function Timeouts**
- Optimize slow database queries
- Check for infinite loops or long-running operations
- Consider breaking up large operations

### Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.mongodb.com/atlas)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Express.js Documentation](https://expressjs.com)

## Security Considerations 🔒

- [ ] All API keys are stored in environment variables
- [ ] No sensitive data in code or public files
- [ ] HTTPS enforced (automatic on Vercel)
- [ ] Rate limiting implemented if needed
- [ ] Input validation on all endpoints
- [ ] Proper CORS configuration
- [ ] Security headers configured (Helmet middleware)

---

## Quick Deploy Command

Once everything is configured:

```bash
./deploy.sh
```

This script will:
- Check for Vercel CLI
- Install dependencies
- Run syntax checks
- Deploy to Vercel
- Provide next steps
