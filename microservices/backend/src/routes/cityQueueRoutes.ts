import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware';
import { createCityQueue } from '../controllers/CityQueueController';
import { CityQueueCreateRequestValidationMiddleware } from '@repo/validator';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(verifyToken);

// Define business routes
router.post('/', CityQueueCreateRequestValidationMiddleware, createCityQueue);

export default router;
