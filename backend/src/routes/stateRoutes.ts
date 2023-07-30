import express from 'express';
import { getStates, getStateById, createState, updateState, deleteState, getStatesByQuery } from '../controllers/stateController';
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
