import express from 'express';
import { getStates, getStateById, getStatesByQuery } from '../controllers/StateController/StateController.fetch';
import { createState } from '../controllers/StateController/StateController.create';
import { updateState } from '../controllers/StateController/StateController.update';
import { deleteState } from '../controllers/StateController/StateController.delete';
import { StateFetchByIdRequestValidationMiddleware, StateFetchRequestValidationMiddleware, StateCreateRequestValidationMiddleware, StateUpdateRequestValidationMiddleware } from 'validator/validators/State';
import { authenticateUser } from '../middlewares/authMiddleware';
import { PaginationRequestValidationMiddleware } from 'validator/validators/Pagination';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define state routes
router.get('/search', StateFetchRequestValidationMiddleware, PaginationRequestValidationMiddleware, getStatesByQuery);
router.get('/', PaginationRequestValidationMiddleware, getStates);
router.get('/:id', StateFetchByIdRequestValidationMiddleware, getStateById);
router.post('/', StateCreateRequestValidationMiddleware, createState);
router.put('/:id', StateFetchByIdRequestValidationMiddleware, StateUpdateRequestValidationMiddleware, updateState);
router.delete('/:id', StateFetchByIdRequestValidationMiddleware, deleteState);

export default router;
