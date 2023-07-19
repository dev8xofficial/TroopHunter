import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';
import { formatResponse, sanitizeResponse } from './middlewares/responseMiddleware';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import businessRoutes from './routes/businessRoutes';
import leadRoutes from './routes/leadRoutes';
import listsRoutes from './routes/listsRoutes';
import queueRoutes from './routes/queueRoutes';
import locationRoutes from './routes/locationRoutes';
import dotenv from 'dotenv';

const app: Application = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Response Handler
app.use(formatResponse); // Apply the formatResponse middleware
app.use(sanitizeResponse); // Apply the sanitizeResponse middleware

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/businesses', businessRoutes);
app.use('/leads', leadRoutes);
app.use('/lists', listsRoutes);
app.use('/queues', queueRoutes);
app.use('/locations', locationRoutes);

// Error handling middleware
app.use(errorHandler);

// Not found middleware
app.use(notFoundHandler);

export default app;
