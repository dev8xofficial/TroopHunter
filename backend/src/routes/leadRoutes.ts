import express from 'express';
import { getLeads, getLeadById, createLead, updateLead, deleteLead } from '../controllers/leadController';

const router = express.Router();

// Define leads routes
router.get('/', getLeads);
router.get('/:id', getLeadById);
router.post('/', createLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

export default router;
