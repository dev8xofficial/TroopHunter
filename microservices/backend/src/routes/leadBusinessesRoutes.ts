import express from 'express';
import { getBusinessesByLeadId, getLeadBusinesses, updateLeadBusiness, deleteLeadBusiness } from '../controllers/LeadBusinessesController';
import { verifyToken } from '../middlewares/authMiddleware';
import { PaginationRequestValidationMiddleware } from '@repo/validator';
import { LeadBusinessFetchByIdRequestValidationMiddleware, LeadBusinessFetchRequestValidationMiddleware } from '@repo/validator';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(verifyToken);

// Define user routes
router.get('/search', LeadBusinessFetchRequestValidationMiddleware, PaginationRequestValidationMiddleware, getBusinessesByLeadId);
router.get('/', PaginationRequestValidationMiddleware, getLeadBusinesses);
router.put('/:leadId', updateLeadBusiness);
router.delete('/:leadId', LeadBusinessFetchByIdRequestValidationMiddleware, deleteLeadBusiness);

export default router;
