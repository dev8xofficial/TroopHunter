import express from 'express';
import { createLeadBusiness, getBusinessesByLeadId, getLeadBusinesses, getLeadBusiness, updateLeadBusiness, deleteLeadBusiness } from '../controllers/leadBusinessesController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define user routes
router.get('/:leadId/businesses', getBusinessesByLeadId);
router.get('/:leadId/:businessId', getLeadBusiness);
router.put('/:leadId/:businessId', updateLeadBusiness);
router.delete('/:leadId/:businessId', deleteLeadBusiness);
router.get('/', getLeadBusinesses);
router.post('/', createLeadBusiness);

export default router;
