import express from 'express';
import { getQueues, getQueueById } from '../controllers/QueueController/QueueController.fetch';
import { updateQueue } from '../controllers/QueueController/QueueController.update';
import { QueueFetchByIdRequestValidationMiddleware, QueueUpdateRequestValidationMiddleware } from 'validator/validators/Queue';
import { authenticateUser } from '../middlewares/authMiddleware';
import { PaginationRequestValidationMiddleware } from 'validator/validators/Pagination';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define business routes
router.get('/:id', QueueFetchByIdRequestValidationMiddleware, getQueueById);
router.get('/', PaginationRequestValidationMiddleware, getQueues);
router.put('/:id', QueueFetchByIdRequestValidationMiddleware, QueueUpdateRequestValidationMiddleware, updateQueue);

export default router;
