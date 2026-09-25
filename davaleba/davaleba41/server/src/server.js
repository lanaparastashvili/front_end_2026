require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS კონფიგურაცია Vercel-ისა და ლოკალური დეველოპმენტისთვის
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // ნებას ვრთავთ მოთხოვნებს origin-ის გარეშე (მაგ. Postman/Curl)
    // და ნებისმიერ vercel.app ქვედომენს ან დამატებულ CLIENT_URL-ს
    if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // ან callback(new Error('Not allowed by CORS')) - დეფლოის სიმარტივისთვის ნებას ვრთავთ
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health Check ენდფოინთი Render-ის მონიტორინგისთვის
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'fullstack-auth-api'
  });
});

// API Routes
app.use('/api/auth', authRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: 'Full-Stack Auth API მუშაობს გამართულად',
    documentation: {
      health: 'GET /health',
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      me: 'GET /api/auth/me (Protected - Requires Bearer Token)'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'ენდფოინთი არ არსებობს' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'სისტემური შეცდომა',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 სერვერი გაეშვა პორტზე: ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/health`);
});
