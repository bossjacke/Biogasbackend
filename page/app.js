import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint - no database required
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    message: 'Server is running',
    mongoUriSet: !!process.env.MONGO_URI
  });
});

// Enable CORS
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [process.env.FRONTEND_URL || "*"]
  : ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5177", "http://localhost:5178", "http://localhost:5179"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// Database connection middleware
app.use(async (req, res, next) => {
  try {
    if (process.env.MONGO_URI && mongoose.connection.readyState !== 1) {
      const connectDB = (await import("./config/db.js")).default;
      await connectDB();
    }
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test endpoint working', timestamp: new Date() });
});

// Load routes if environment variables are set
async function loadRoutes() {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI not found, running in limited mode');
    return;
  }

  try {
    const authRoutes = (await import("./routes/auth.routes.js")).default;
    const userRoutes = (await import("./routes/user.routes.js")).default;
    const productRoutes = (await import("./routes/product.routes.js")).default;
    const passwordRoutes = (await import("./routes/password.routes.js")).default;
    const orderRoutes = (await import("./routes/order.routes.js")).default;
    const cartRoutes = (await import("./routes/cart.routes.js")).default;
    const chatRoutes = (await import("./routes/chat.routes.js")).default;
    const paymentRoutes = (await import("./routes/payment.routes.js")).default;
    const { handleStripeWebhook } = (await import("./middleware/stripe.webhook.js"));

    // Stripe Webhook (must be before express.json middleware for raw body)
    app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), handleStripeWebhook);

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/password", passwordRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/orders", orderRoutes);
    app.use("/api/cart", cartRoutes);
    app.use("/api/chat", chatRoutes);
    app.use("/api/payment", paymentRoutes);

    console.log('All routes loaded successfully');
  } catch (error) {
    console.error('Error loading routes:', error);
  }
}

// Load routes asynchronously
loadRoutes();

// Handle 404
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

export default app;
