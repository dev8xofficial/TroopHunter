import { verifyToken } from '@repo/middlewares';
import { CityQueueCreateRequestValidationMiddleware } from '@repo/validator';
import express from 'express';

import { createCityQueue } from '../controllers/CityQueueController';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(verifyToken);

// Define business routes
router.post('/', CityQueueCreateRequestValidationMiddleware, createCityQueue);

export default router;
