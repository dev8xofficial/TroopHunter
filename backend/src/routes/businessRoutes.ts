import express from 'express';
import { getBusinesses, getBusiness, createBusinesses, updateBusiness, deleteBusiness } from '../controllers/businessController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define business routes
router.get('/', getBusinesses);
router.get('/:id', getBusiness);
router.post('/', createBusinesses);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusiness);

export default router;
