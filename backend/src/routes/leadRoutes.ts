import express from 'express';
import { getLeads, getLeadById } from '../controllers/LeadController/LeadController.fetch';
import { createLead } from '../controllers/LeadController/LeadController.create';
import { updateLead } from '../controllers/LeadController/LeadController.update';
import { deleteLead, deleteLeads } from '../controllers/LeadController/LeadController.delete';
import { leadFetchByIdRequestValidationMiddleware, leadFetchRequestValidationMiddleware, leadCreateRequestValidationMiddleware, leadUpdateRequestValidationMiddleware, leadBulkDeleteRequestValidationMiddleware } from '../models/Lead/Lead.validator';
import { authenticateUser } from '../middlewares/authMiddleware';
import { paginationRequestValidationMiddleware } from '../validators/Pagination.validator';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define leads routes
router.delete('/bulk', leadBulkDeleteRequestValidationMiddleware, deleteLeads);
router.get('/', paginationRequestValidationMiddleware, getLeads);
router.get('/:id', leadFetchByIdRequestValidationMiddleware, getLeadById);
router.post('/', leadCreateRequestValidationMiddleware, createLead);
router.put('/:id', leadFetchByIdRequestValidationMiddleware, leadUpdateRequestValidationMiddleware, updateLead);
router.delete('/:id', leadFetchByIdRequestValidationMiddleware, deleteLead);

export default router;
