// import { verifyToken } from '@repo/middlewares';
import { QueueFetchByIdRequestValidationMiddleware, QueueUpdateRequestValidationMiddleware, PaginationRequestValidationMiddleware, CityQueueFetchRequestValidationMiddleware } from '@repo/validator';
import express from 'express';

import { getQueues, getQueueById, updateQueue } from '../controllers/QueueController';

const router = express.Router();

// Apply the authMiddleware to secure the routes
// router.use(verifyToken);

// Define business routes
router.get('/:id', QueueFetchByIdRequestValidationMiddleware, getQueueById);
router.get('/', CityQueueFetchRequestValidationMiddleware, PaginationRequestValidationMiddleware, getQueues);
router.put('/:id', QueueFetchByIdRequestValidationMiddleware, QueueUpdateRequestValidationMiddleware, updateQueue);

export default router;
