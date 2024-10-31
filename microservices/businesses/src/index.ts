import { errorHandler, notFoundHandler, formatResponse } from '@repo/middlewares';
import dotenv from 'dotenv';
import express, { type Application } from 'express';
import morgan from 'morgan';

import businessPhoneRoutes from './routes/businessPhoneRoutes';
import businessRoutes from './routes/businessRoutes';
import businessSourceRoutes from './routes/businessSourceRoutes';
import leadRoutes from './routes/leadRoutes';

const app: Application = express();

dotenv.config();

// Middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));

// Response Handler
app.use(formatResponse);

// Routes
// app.get('/businesses', (req, res) => {
//   res.send(`${process.env.ENVIRONMENT} - Welcome to the Businesses API!`);
// });
app.use('/business-phones', businessPhoneRoutes);
app.use('/business-sources', businessSourceRoutes);
app.use('/businesses', businessRoutes);
app.use('/leads', leadRoutes);

// Error handling middleware
app.use(errorHandler);

// Not found middleware
app.use(notFoundHandler);

export default app;
