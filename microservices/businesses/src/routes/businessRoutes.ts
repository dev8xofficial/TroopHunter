// import { verifyToken } from '@repo/middlewares';
import { BulkBusinessCreateRequestValidationMiddleware, BusinessCreateRequestValidationMiddleware, BusinessFetchByIdRequestValidationMiddleware, BusinessFetchRequestValidationMiddleware, BusinessUpdateRequestValidationMiddleware, PaginationRequestValidationMiddleware } from '@repo/validator';
import express from 'express';

import { getBusinessesByQuery, getBusinesses, getBusinessById, createBusiness, updateBusiness, deleteBusiness, createBusinesses } from '../controllers/BusinessController';

const router = express.Router();

// Apply the authMiddleware to secure the routes
// router.use(verifyToken);

// Define business routes
router.get('/search', BusinessFetchRequestValidationMiddleware, PaginationRequestValidationMiddleware, getBusinessesByQuery);
router.get('/', PaginationRequestValidationMiddleware, getBusinesses);
router.get('/:id', BusinessFetchByIdRequestValidationMiddleware, getBusinessById);
router.post('/', BusinessCreateRequestValidationMiddleware, createBusiness);
router.post('/bulk', BulkBusinessCreateRequestValidationMiddleware, createBusinesses);
router.put('/:id', BusinessFetchByIdRequestValidationMiddleware, BusinessUpdateRequestValidationMiddleware, updateBusiness);
router.delete('/:id', BusinessFetchByIdRequestValidationMiddleware, deleteBusiness);

export default router;
