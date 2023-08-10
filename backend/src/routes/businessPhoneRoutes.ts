import express from 'express';
import { getBusinessPhonesByNumber, getBusinessPhones, getBusinessPhoneById } from '../controllers/BusinessPhoneController/BusinessPhoneController.fetch';
import { createBusinessPhone } from '../controllers/BusinessPhoneController/BusinessPhoneController.create';
import { updateBusinessPhone } from '../controllers/BusinessPhoneController/BusinessPhoneController.update';
import { deleteBusinessPhone } from '../controllers/BusinessPhoneController/BusinessPhoneController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';
import { businessPhoneFetchByIdRequestValidationMiddleware, businessPhoneFetchRequestValidationMiddleware, businessPhoneCreateRequestValidationMiddleware, businessPhoneUpdateRequestValidationMiddleware } from 'validator/validators/BusinessPhone';
import { paginationRequestValidationMiddleware } from 'validator/validators/Pagination';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define businessPhone routes
router.get('/search', businessPhoneFetchRequestValidationMiddleware, paginationRequestValidationMiddleware, getBusinessPhonesByNumber);
router.get('/', paginationRequestValidationMiddleware, getBusinessPhones);
router.get('/:id', businessPhoneFetchByIdRequestValidationMiddleware, getBusinessPhoneById);
router.post('/', businessPhoneCreateRequestValidationMiddleware, createBusinessPhone);
router.put('/:id', businessPhoneFetchByIdRequestValidationMiddleware, businessPhoneUpdateRequestValidationMiddleware, updateBusinessPhone);
router.delete('/:id', businessPhoneFetchByIdRequestValidationMiddleware, deleteBusinessPhone);

export default router;
