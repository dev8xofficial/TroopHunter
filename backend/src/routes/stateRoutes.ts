import express from 'express';
import { getStates, getStateById, getStatesByQuery } from '../controllers/StateController/StateController.fetch';
import { createState } from '../controllers/StateController/StateController.create';
import { updateState } from '../controllers/StateController/StateController.update';
import { deleteState } from '../controllers/StateController/StateController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define state routes
router.get('/search', getStatesByQuery);
router.get('/', getStates);
router.get('/:id', getStateById);
router.post('/', createState);
router.put('/:id', updateState);
router.delete('/:id', deleteState);

export default router;
