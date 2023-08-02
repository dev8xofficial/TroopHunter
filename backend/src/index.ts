import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';
import { formatResponse, sanitizeResponse } from './middlewares/responseMiddleware';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import businessPhoneRoutes from './routes/businessPhoneRoutes';
import businessRoutes from './routes/businessRoutes';
import leadRoutes from './routes/leadRoutes';
import queueRoutes from './routes/queueRoutes';
import countryRoutes from './routes/countryRoutes';
import stateRoutes from './routes/stateRoutes';
import cityRoutes from './routes/cityRoutes';
import leadBusinessesRoutes from './routes/leadBusinessesRoutes';
// ... Other route imports
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

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

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Mount Swagger UI on /api-docs endpoint

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/business-phones', businessPhoneRoutes);
app.use('/businesses', businessRoutes);
app.use('/leads', leadRoutes);
app.use('/queues', queueRoutes);
app.use('/countries', countryRoutes);
app.use('/states', stateRoutes);
app.use('/cities', cityRoutes);
app.use('/lead-businesses', leadBusinessesRoutes);

// Error handling middleware
app.use(errorHandler);

// Not found middleware
app.use(notFoundHandler);

export default app;
