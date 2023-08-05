import express from 'express';
import { getBusinessPhonesByNumber, getBusinessPhones, getBusinessPhoneById } from '../controllers/BusinessPhoneController/BusinessController.fetch';
import { createBusinessPhone } from '../controllers/BusinessPhoneController/BusinessController.create';
import { updateBusinessPhone } from '../controllers/BusinessPhoneController/BusinessController.update';
import { deleteBusinessPhone } from '../controllers/BusinessPhoneController/BusinessController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define businessPhone routes
router.get('/search', getBusinessPhonesByNumber);
router.get('/', getBusinessPhones);
router.get('/:id', getBusinessPhoneById);
router.post('/', createBusinessPhone);
router.put('/:id', updateBusinessPhone);
router.delete('/:id', deleteBusinessPhone);

export default router;
