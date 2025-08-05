import { errorHandler, notFoundHandler, formatResponse } from '@repo/middlewares';
import dotenv from 'dotenv';
import path from 'path';
import express, { type Application } from 'express';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes';

const app: Application = express();

// Load environment-specific .env file
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));

// Response Handler
app.use(formatResponse);

// Routes
// app.get('/auth', (req, res) => {
//   res.send(`${process.env.ENVIRONMENT ?? 'Dev'} - Welcome to the Auth API!`);
// });
app.use('/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Not found middleware
app.use(notFoundHandler);

export default app;
