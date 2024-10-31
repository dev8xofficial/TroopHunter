import { errorHandler, notFoundHandler, formatResponse } from '@repo/middlewares';
import dotenv from 'dotenv';
import express, { type Application } from 'express';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes';

const app: Application = express();

dotenv.config();

// Middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));

// Response Handler
app.use(formatResponse);

// Routes
// app.get('/auth', (req, res) => {
//   res.send(`${process.env.ENVIRONMENT ?? 'Dev'} - Welcome to the Auth API!`);
// });
app.use('/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Not found middleware
app.use(notFoundHandler);

export default app;
