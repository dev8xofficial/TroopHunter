import express from 'express';
import { getBusinessPhonesByNumber, getBusinessPhones, getBusinessPhoneById, createBusinessPhone, updateBusinessPhone, deleteBusinessPhone } from '../controllers/BusinessPhoneController';
import { authenticateUser } from '../middlewares/authMiddleware';
import { BusinessPhoneFetchByIdRequestValidationMiddleware, BusinessPhoneFetchRequestValidationMiddleware, BusinessPhoneCreateRequestValidationMiddleware, BusinessPhoneUpdateRequestValidationMiddleware } from 'validator/validators/BusinessPhone';
import { PaginationRequestValidationMiddleware } from 'validator/validators/Pagination';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define businessPhone routes
router.get('/search', BusinessPhoneFetchRequestValidationMiddleware, PaginationRequestValidationMiddleware, getBusinessPhonesByNumber);
router.get('/', PaginationRequestValidationMiddleware, getBusinessPhones);
router.get('/:id', BusinessPhoneFetchByIdRequestValidationMiddleware, getBusinessPhoneById);
router.post('/', BusinessPhoneCreateRequestValidationMiddleware, createBusinessPhone);
router.put('/:id', BusinessPhoneFetchByIdRequestValidationMiddleware, BusinessPhoneUpdateRequestValidationMiddleware, updateBusinessPhone);
router.delete('/:id', BusinessPhoneFetchByIdRequestValidationMiddleware, deleteBusinessPhone);

export default router;
