import express from 'express';
import { getQueues, getQueueById, updateQueue } from '../controllers/queueController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define business routes
router.get('/:id', getQueueById);
router.get('/', getQueues);
router.put('/:id', updateQueue);

export default router;
