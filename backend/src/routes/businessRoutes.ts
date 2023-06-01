import express from 'express';
import { getBusiness, createBusiness, updateBusiness, deleteBusiness } from '../controllers/businessController';

const router = express.Router();

// Define business routes
// router.get('', getBusinesses);
router.get('/:id', getBusiness);
router.post('/', createBusiness);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusiness);

export default router;
