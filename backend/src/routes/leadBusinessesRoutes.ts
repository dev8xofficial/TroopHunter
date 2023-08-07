import express from 'express';
import { getBusinessesByLeadId, getLeadBusinesses, getLeadBusiness } from '../controllers/LeadBusinessesController/LeadBusinessesController.fetch';
import { createLeadBusiness, createLeadBusinesses } from '../controllers/LeadBusinessesController/LeadBusinessesController.create';
import { updateLeadBusiness } from '../controllers/LeadBusinessesController/LeadBusinessesController.update';
import { deleteLeadBusiness } from '../controllers/LeadBusinessesController/LeadBusinessesController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';
import { paginationRequestValidationMiddleware } from '../validators/Pagination.validator';
import { leadBusinessesRequestValidationMiddleware } from '../models/LeadBusiness/LeadBusiness.validator';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define user routes
router.get('/:leadId/businesses', leadBusinessesRequestValidationMiddleware, paginationRequestValidationMiddleware, getBusinessesByLeadId);
router.get('/:leadId/:businessId', leadBusinessesRequestValidationMiddleware, getLeadBusiness);
router.put('/:leadId/:businessId', updateLeadBusiness);
router.delete('/:leadId/:businessId', leadBusinessesRequestValidationMiddleware, deleteLeadBusiness);
router.post('/bulk', createLeadBusinesses);
router.get('/', getLeadBusinesses);
router.post('/', leadBusinessesRequestValidationMiddleware, createLeadBusiness);

export default router;
