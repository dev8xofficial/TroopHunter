import express from 'express';
import { getBusinessesByQuery, getBusinesses, getBusinessById } from '../controllers/BusinessController/BusinessController.fetch';
import { createBusiness } from '../controllers/BusinessController/BusinessController.create';
import { updateBusiness } from '../controllers/BusinessController/BusinessController.update';
import { deleteBusiness } from '../controllers/BusinessController/BusinessController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define business routes
router.get('/search', getBusinessesByQuery);
router.get('/', getBusinesses);
router.get('/:id', getBusinessById);
router.post('/', createBusiness);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusiness);

export default router;
