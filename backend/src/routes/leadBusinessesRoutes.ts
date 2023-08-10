import express from 'express';
import { getBusinessesByLeadId, getLeadBusinesses } from '../controllers/LeadBusinessesController/LeadBusinessesController.fetch';
import { updateLeadBusiness } from '../controllers/LeadBusinessesController/LeadBusinessesController.update';
import { deleteLeadBusiness } from '../controllers/LeadBusinessesController/LeadBusinessesController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';
import { paginationRequestValidationMiddleware } from 'validator/validators/Pagination';
import { leadBusinessFetchByIdRequestValidationMiddleware, leadBusinessFetchRequestValidationMiddleware } from 'validator/validators/LeadBusiness';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define user routes
router.get('/search', leadBusinessFetchRequestValidationMiddleware, paginationRequestValidationMiddleware, getBusinessesByLeadId);
router.get('/', paginationRequestValidationMiddleware, getLeadBusinesses);
router.put('/:leadId', updateLeadBusiness);
router.delete('/:leadId', leadBusinessFetchByIdRequestValidationMiddleware, deleteLeadBusiness);

export default router;
