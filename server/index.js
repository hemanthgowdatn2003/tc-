import express from 'express';
import session from 'express-session';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import packageRoutes from './routes/packageRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config(); // Also check CWD .env if present

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const isProduction = process.env.NODE_ENV === 'production';

// Ensure uploads folder exists
const uploadsDir = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Security: Trust first proxy if behind reverse proxy
if (isProduction) {
  app.set('trust proxy', 1);
}

// CORS setup
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl) or matching client URL
      if (!origin || origin === CLIENT_URL || origin.includes('localhost')) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
      }
    },
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Session setup
app.use(
  session({
    name: 'tc_session',
    secret: process.env.SESSION_SECRET || 'tc_studio_fallback_secret_key_847120',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

// Rate limiter for admin login (10 attempts per 15 minutes)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    error: 'Too many login attempts. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for contact inquiries (15 submissions per hour per IP)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 15,
  message: {
    success: false,
    error: 'Too many inquiries submitted. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Static uploads serving
app.use('/uploads', express.static(uploadsDir));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TC Web & Studio API',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/admin/login', loginLimiter);
app.use('/api/packages', packageRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', uploadRoutes);
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/settings', settingsRoutes);

// 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Requested API endpoint not found.',
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: 'An internal server error occurred.',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`[TC Web & Studio API] Server running on http://localhost:${PORT}`);
  console.log(`[TC Web & Studio API] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[TC Web & Studio API] Uploads directory: ${uploadsDir}`);
});
