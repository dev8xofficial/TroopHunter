// import { verifyToken } from '@repo/middlewares';
import { StateFetchByIdRequestValidationMiddleware, StateFetchRequestValidationMiddleware, StateCreateRequestValidationMiddleware, StateUpdateRequestValidationMiddleware, PaginationRequestValidationMiddleware } from '@repo/validator';
import express from 'express';

import { getStates, getStateById, getStatesByQuery, createState, updateState, deleteState } from '../controllers/StateController';

const router = express.Router();

// Apply the authMiddleware to secure the routes
// router.use(verifyToken);

// Define state routes
router.get('/search', StateFetchRequestValidationMiddleware, PaginationRequestValidationMiddleware, getStatesByQuery);
router.get('/', PaginationRequestValidationMiddleware, getStates);
router.get('/:id', StateFetchByIdRequestValidationMiddleware, getStateById);
router.post('/', StateCreateRequestValidationMiddleware, createState);
router.put('/:id', StateFetchByIdRequestValidationMiddleware, StateUpdateRequestValidationMiddleware, updateState);
router.delete('/:id', StateFetchByIdRequestValidationMiddleware, deleteState);

export default router;
