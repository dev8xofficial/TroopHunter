import express from 'express';
import { getQueues, getQueueById } from '../controllers/QueueController/QueueController.fetch';
import { updateQueue } from '../controllers/QueueController/QueueController.update';
import { queueFetchByIdRequestValidationMiddleware, queueUpdateRequestValidationMiddleware } from 'common/validators/Queue';
import { authenticateUser } from '../middlewares/authMiddleware';
import { paginationRequestValidationMiddleware } from 'common/validators/Pagination';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define business routes
router.get('/:id', queueFetchByIdRequestValidationMiddleware, getQueueById);
router.get('/', paginationRequestValidationMiddleware, getQueues);
router.put('/:id', queueFetchByIdRequestValidationMiddleware, queueUpdateRequestValidationMiddleware, updateQueue);

export default router;
