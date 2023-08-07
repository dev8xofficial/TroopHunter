import express from 'express';
import { getStates, getStateById, getStatesByQuery } from '../controllers/StateController/StateController.fetch';
import { createState } from '../controllers/StateController/StateController.create';
import { updateState } from '../controllers/StateController/StateController.update';
import { deleteState } from '../controllers/StateController/StateController.delete';
import { stateFetchByIdRequestValidationMiddleware, stateFetchRequestValidationMiddleware, stateCreateRequestValidationMiddleware, stateUpdateRequestValidationMiddleware } from '../models/State/State.validator';
import { authenticateUser } from '../middlewares/authMiddleware';
import { paginationRequestValidationMiddleware } from '../validators/Pagination.validator';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define state routes
router.get('/search', stateFetchRequestValidationMiddleware, paginationRequestValidationMiddleware, getStatesByQuery);
router.get('/', paginationRequestValidationMiddleware, getStates);
router.get('/:id', stateFetchByIdRequestValidationMiddleware, getStateById);
router.post('/', stateCreateRequestValidationMiddleware, createState);
router.put('/:id', stateFetchByIdRequestValidationMiddleware, stateUpdateRequestValidationMiddleware, updateState);
router.delete('/:id', stateFetchByIdRequestValidationMiddleware, deleteState);

export default router;
