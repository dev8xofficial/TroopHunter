import express from 'express';
import { getLeads, getLeadById } from '../controllers/LeadController/LeadController.fetch';
import { createLead } from '../controllers/LeadController/LeadController.create';
import { updateLead } from '../controllers/LeadController/LeadController.update';
import { deleteLead, deleteLeads } from '../controllers/LeadController/LeadController.delete';
import { LeadFetchByIdRequestValidationMiddleware, LeadCreateRequestValidationMiddleware, LeadUpdateRequestValidationMiddleware, LeadBulkDeleteRequestValidationMiddleware } from 'validator/validators/Lead';
import { authenticateUser } from '../middlewares/authMiddleware';
import { PaginationRequestValidationMiddleware } from 'validator/validators/Pagination';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define leads routes
router.delete('/bulk', LeadBulkDeleteRequestValidationMiddleware, deleteLeads);
router.get('/', PaginationRequestValidationMiddleware, getLeads);
router.get('/:id', LeadFetchByIdRequestValidationMiddleware, getLeadById);
router.post('/', LeadCreateRequestValidationMiddleware, createLead);
router.put('/:id', LeadFetchByIdRequestValidationMiddleware, LeadUpdateRequestValidationMiddleware, updateLead);
router.delete('/:id', LeadFetchByIdRequestValidationMiddleware, deleteLead);

export default router;
