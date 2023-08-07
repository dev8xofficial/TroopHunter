import express from 'express';
import { getBusinessesByQuery, getBusinesses, getBusinessById } from '../controllers/BusinessController/BusinessController.fetch';
import { createBusiness } from '../controllers/BusinessController/BusinessController.create';
import { updateBusiness } from '../controllers/BusinessController/BusinessController.update';
import { deleteBusiness } from '../controllers/BusinessController/BusinessController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';
import { businessCreationRequestValidationMiddleware, businessFetchRequestValidationMiddleware, businessRequestValidationMiddleware } from '../models/Business/Business.validator';
import { paginationRequestValidationMiddleware } from '../validators/Pagination.validator';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define business routes
router.get('/search', businessFetchRequestValidationMiddleware, paginationRequestValidationMiddleware, getBusinessesByQuery);
router.get('/', businessFetchRequestValidationMiddleware, paginationRequestValidationMiddleware, getBusinesses);
router.get('/:id', businessFetchRequestValidationMiddleware, getBusinessById);
router.post('/', businessCreationRequestValidationMiddleware, createBusiness);
router.put('/:id', businessRequestValidationMiddleware, updateBusiness);
router.delete('/:id', businessFetchRequestValidationMiddleware, deleteBusiness);

export default router;
