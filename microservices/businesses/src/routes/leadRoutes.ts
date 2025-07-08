// import { verifyToken } from '@repo/middlewares';
import { LeadFetchByIdRequestValidationMiddleware, LeadCreateRequestValidationMiddleware, LeadUpdateRequestValidationMiddleware, LeadBulkDeleteRequestValidationMiddleware, LeadsFetchByUserIdRequestValidationMiddleware, PaginationRequestValidationMiddleware } from '@repo/validator';
import express from 'express';

import { getLeads, getLeadById, createLead, updateLead, deleteLead, deleteLeads, getLeadsByUserId } from '../controllers/LeadController';

const router = express.Router();

// Apply the authMiddleware to secure the routes
// router.use(verifyToken);

// Define leads routes
router.delete('/bulk', LeadBulkDeleteRequestValidationMiddleware, deleteLeads);
router.get('/', PaginationRequestValidationMiddleware, getLeads);
router.get('/:id', LeadFetchByIdRequestValidationMiddleware, getLeadById);
router.get('/:userId', LeadsFetchByUserIdRequestValidationMiddleware, getLeadsByUserId);
router.post('/', LeadCreateRequestValidationMiddleware, createLead);
router.put('/:id', LeadFetchByIdRequestValidationMiddleware, LeadUpdateRequestValidationMiddleware, updateLead);
router.delete('/:id', LeadFetchByIdRequestValidationMiddleware, deleteLead);

export default router;
