import express from 'express';
import { getBusinessesByQuery, getBusinesses, getBusinessById } from '../controllers/BusinessController/BusinessController.fetch';
import { createBusiness } from '../controllers/BusinessController/BusinessController.create';
import { updateBusiness } from '../controllers/BusinessController/BusinessController.update';
import { deleteBusiness } from '../controllers/BusinessController/BusinessController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';
import { BusinessCreateRequestValidationMiddleware, BusinessFetchByIdRequestValidationMiddleware, BusinessFetchRequestValidationMiddleware, BusinessUpdateRequestValidationMiddleware } from 'validator/validators/Business';
import { PaginationRequestValidationMiddleware } from 'validator/validators/Pagination';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define business routes
router.get('/search', BusinessFetchRequestValidationMiddleware, PaginationRequestValidationMiddleware, getBusinessesByQuery);
router.get('/', PaginationRequestValidationMiddleware, getBusinesses);
router.get('/:id', BusinessFetchByIdRequestValidationMiddleware, getBusinessById);
router.post('/', BusinessCreateRequestValidationMiddleware, createBusiness);
router.put('/:id', BusinessFetchByIdRequestValidationMiddleware, BusinessUpdateRequestValidationMiddleware, updateBusiness);
router.delete('/:id', BusinessFetchByIdRequestValidationMiddleware, deleteBusiness);

export default router;
