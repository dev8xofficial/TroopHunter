import express from 'express';
import { getBusinessPhonesByNumber, getBusinessPhones, getBusinessPhoneById, createBusinessPhone, updateBusinessPhone, deleteBusinessPhone } from '../controllers/businessPhoneController';
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
