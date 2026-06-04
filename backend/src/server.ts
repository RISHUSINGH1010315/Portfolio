import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { initDb } from './config/db';
import apiRouter from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security settings
app.use(helmet());
app.use(cors({
  origin: '*', // Adjust to specific domain for production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', limiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime(), timestamp: new Date() });
});

// Routing
app.use('/api', apiRouter);

// Database initialization & Server start
const startServer = async () => {
  await initDb();
  
  app.listen(PORT, () => {
    console.log(`[NEURAL_OS] Backend API active on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('Server failed to start:', err);
});
