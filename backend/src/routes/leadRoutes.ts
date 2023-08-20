import express from 'express';
import { getLeads, getLeadById, createLead, updateLead, deleteLead, deleteLeads } from '../controllers/LeadController';
import { LeadFetchByIdRequestValidationMiddleware, LeadCreateRequestValidationMiddleware, LeadUpdateRequestValidationMiddleware, LeadBulkDeleteRequestValidationMiddleware } from 'validator/validators';
import { verifyToken } from '../middlewares/authMiddleware';
import { PaginationRequestValidationMiddleware } from 'validator/validators';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(verifyToken);

// Define leads routes
router.delete('/bulk', LeadBulkDeleteRequestValidationMiddleware, deleteLeads);
router.get('/', PaginationRequestValidationMiddleware, getLeads);
router.get('/:id', LeadFetchByIdRequestValidationMiddleware, getLeadById);
router.post('/', LeadCreateRequestValidationMiddleware, createLead);
router.put('/:id', LeadFetchByIdRequestValidationMiddleware, LeadUpdateRequestValidationMiddleware, updateLead);
router.delete('/:id', LeadFetchByIdRequestValidationMiddleware, deleteLead);

export default router;
