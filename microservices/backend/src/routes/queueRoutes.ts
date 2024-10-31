import express from 'express';
import { getQueues, getQueueById, updateQueue } from '../controllers/QueueController';
import { QueueFetchByIdRequestValidationMiddleware, QueueUpdateRequestValidationMiddleware } from '@repo/validator';
import { verifyToken } from '../middlewares/authMiddleware';
import { PaginationRequestValidationMiddleware } from '@repo/validator';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(verifyToken);

// Define business routes
router.get('/:id', QueueFetchByIdRequestValidationMiddleware, getQueueById);
router.get('/', PaginationRequestValidationMiddleware, getQueues);
router.put('/:id', QueueFetchByIdRequestValidationMiddleware, QueueUpdateRequestValidationMiddleware, updateQueue);

export default router;
