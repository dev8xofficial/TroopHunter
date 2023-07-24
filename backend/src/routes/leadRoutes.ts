import express from 'express';
import { getLeads, getLeadById, createLead, updateLead, deleteLead, deleteLeads } from '../controllers/leadController';

const router = express.Router();

// Define leads routes
router.delete('/bulk', deleteLeads);
router.get('/', getLeads);
router.get('/:id', getLeadById);
router.post('/', createLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

export default router;
