import express from 'express';
import { getBusinessesByLeadId, getLeadBusinesses, getLeadBusiness } from '../controllers/LeadBusinessesController/LeadBusinessesController.fetch';
import { createLeadBusiness, createLeadBusinesses } from '../controllers/LeadBusinessesController/LeadBusinessesController.create';
import { updateLeadBusiness } from '../controllers/LeadBusinessesController/LeadBusinessesController.update';
import { deleteLeadBusiness } from '../controllers/LeadBusinessesController/LeadBusinessesController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define user routes
router.get('/:leadId/businesses', getBusinessesByLeadId);
router.get('/:leadId/:businessId', getLeadBusiness);
router.put('/:leadId/:businessId', updateLeadBusiness);
router.delete('/:leadId/:businessId', deleteLeadBusiness);
router.post('/bulk', createLeadBusinesses);
router.get('/', getLeadBusinesses);
router.post('/', createLeadBusiness);

export default router;
