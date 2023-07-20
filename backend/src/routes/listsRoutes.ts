import express from 'express';
import { getLists, getListById, createList, updateList, deleteList } from '../controllers/listsController';

const router = express.Router();

// Define list routes
router.get('/', getLists);
router.get('/:id', getListById);
router.post('/', createList);
router.put('/:id', updateList);
router.delete('/:id', deleteList);

export default router;
