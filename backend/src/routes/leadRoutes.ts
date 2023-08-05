import express from 'express';
import { getLeads, getLeadById } from '../controllers/LeadController/LeadController.fetch';
import { createLead } from '../controllers/LeadController/LeadController.create';
import { updateLead } from '../controllers/LeadController/LeadController.update';
import { deleteLead, deleteLeads } from '../controllers/LeadController/LeadController.delete';

const router = express.Router();

// Define leads routes
router.delete('/bulk', deleteLeads);
router.get('/', getLeads);
router.get('/:id', getLeadById);
router.post('/', createLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

export default router;
