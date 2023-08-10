import express from 'express';
import { getBusinessesByQuery, getBusinesses, getBusinessById } from '../controllers/BusinessController/BusinessController.fetch';
import { createBusiness } from '../controllers/BusinessController/BusinessController.create';
import { updateBusiness } from '../controllers/BusinessController/BusinessController.update';
import { deleteBusiness } from '../controllers/BusinessController/BusinessController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';
import { businessCreateRequestValidationMiddleware, businessFetchByIdRequestValidationMiddleware, businessFetchRequestValidationMiddleware, businessUpdateRequestValidationMiddleware } from 'validator/validators/Business';
import { paginationRequestValidationMiddleware } from 'validator/validators/Pagination';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define business routes
router.get('/search', businessFetchRequestValidationMiddleware, paginationRequestValidationMiddleware, getBusinessesByQuery);
router.get('/', paginationRequestValidationMiddleware, getBusinesses);
router.get('/:id', businessFetchByIdRequestValidationMiddleware, getBusinessById);
router.post('/', businessCreateRequestValidationMiddleware, createBusiness);
router.put('/:id', businessFetchByIdRequestValidationMiddleware, businessUpdateRequestValidationMiddleware, updateBusiness);
router.delete('/:id', businessFetchByIdRequestValidationMiddleware, deleteBusiness);

export default router;
