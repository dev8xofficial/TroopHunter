import express from 'express';
import { getBusinessPhonesByNumber, getBusinessPhones, getBusinessPhoneById, createBusinessPhone, updateBusinessPhone, deleteBusinessPhone } from '../controllers/BusinessPhoneController';
import { verifyToken } from '../middlewares/authMiddleware';
import { BusinessPhoneFetchByIdRequestValidationMiddleware, BusinessPhoneFetchRequestValidationMiddleware, BusinessPhoneCreateRequestValidationMiddleware, BusinessPhoneUpdateRequestValidationMiddleware } from '@repo/validator';
import { PaginationRequestValidationMiddleware } from '@repo/validator';

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
