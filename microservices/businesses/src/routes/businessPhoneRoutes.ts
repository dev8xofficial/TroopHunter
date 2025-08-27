import { verifyToken } from '@repo/middlewares';
import { BusinessPhoneFetchByIdRequestValidationMiddleware, BusinessPhoneFetchRequestValidationMiddleware, BusinessPhoneCreateRequestValidationMiddleware, BusinessPhoneUpdateRequestValidationMiddleware, PaginationRequestValidationMiddleware } from '@repo/validator';
import express from 'express';

import { getBusinessPhonesByNumber, getBusinessPhones, getBusinessPhoneById, createBusinessPhone, updateBusinessPhone, deleteBusinessPhone } from '../controllers/BusinessPhoneController';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(verifyToken);

// Define businessPhone routes
router.get('/search', BusinessPhoneFetchRequestValidationMiddleware, PaginationRequestValidationMiddleware, getBusinessPhonesByNumber);
router.get('/', PaginationRequestValidationMiddleware, getBusinessPhones);
router.get('/:id', BusinessPhoneFetchByIdRequestValidationMiddleware, getBusinessPhoneById);
router.post('/', BusinessPhoneCreateRequestValidationMiddleware, createBusinessPhone);
router.put('/:id', BusinessPhoneFetchByIdRequestValidationMiddleware, BusinessPhoneUpdateRequestValidationMiddleware, updateBusinessPhone);
router.delete('/:id', BusinessPhoneFetchByIdRequestValidationMiddleware, deleteBusinessPhone);

export default router;
