import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';
import { formatResponse, sanitizeResponse } from './middlewares/responseMiddleware';
import authRoutes from './routes/authRoutes';

import dotenv from 'dotenv';

const app: Application = express();

dotenv.config();

// Middleware
let corsOptions = {
  origin: process.env.origins ? process.env.origins.split(',') : undefined,
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));

// Response Handler
app.use(formatResponse); // Apply the formatResponse middleware
app.use(sanitizeResponse); // Apply the sanitizeResponse middleware

// Routes
app.get('/', (req, res) => {
  res.send(`${process.env.ENVIRONMENT} - Welcome to the API!`);
});
app.use('/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Not found middleware
app.use(notFoundHandler);

export default app;
