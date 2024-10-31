import { errorHandler, notFoundHandler, formatResponse } from '@repo/middlewares';
import dotenv from 'dotenv';
import express, { type Application } from 'express';
import morgan from 'morgan';

import cityRoutes from './routes/cityRoutes';
import countryRoutes from './routes/countryRoutes';
import stateRoutes from './routes/stateRoutes';

const app: Application = express();

dotenv.config();

// Middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));

// Response Handler
app.use(formatResponse);

// Routes
// app.get('/countries', (req, res) => {
//   res.send(`${process.env.ENVIRONMENT} - Welcome to the Countries API!`);
// });
app.use('/countries', countryRoutes);
app.use('/states', stateRoutes);
app.use('/cities', cityRoutes);

// Error handling middleware
app.use(errorHandler);

// Not found middleware
app.use(notFoundHandler);

export default app;
