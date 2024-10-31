import { errorHandler, notFoundHandler, formatResponse } from '@repo/middlewares';
import dotenv from 'dotenv';
import express, { type Application } from 'express';
import morgan from 'morgan';

import cityQueueRoutes from './routes/cityQueueRoutes';
import queueRoutes from './routes/queueRoutes';

const app: Application = express();

dotenv.config();

// Middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));

// Response Handler
app.use(formatResponse);

// Routes
// app.get('/queues', (req, res) => {
//   res.send(`${process.env.ENVIRONMENT} - Welcome to the Queues API!`);
// });
app.use('/queues', queueRoutes);
app.use('/city-queues', cityQueueRoutes);

// Error handling middleware
app.use(errorHandler);

// Not found middleware
app.use(notFoundHandler);

export default app;
