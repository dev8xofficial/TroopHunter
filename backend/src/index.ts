import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import businessRoutes from './routes/businessRoutes';
import dotenv from 'dotenv';

const app: Application = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/businesses', businessRoutes);

// Error handling middleware
app.use(errorHandler);

// Not found middleware
app.use(notFoundHandler);

export default app;
