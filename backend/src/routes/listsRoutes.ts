import express from 'express';
import { getLists, getListById, createList, updateList, deleteList } from '../controllers/listsControllers';

const router = express.Router();

// Define list routes
router.get('/', getLists);
router.get('/lists/:id', getListById);
router.post('/lists', createList);
router.put('/lists/:id', updateList);
router.delete('/lists/:id', deleteList);

export default router;
