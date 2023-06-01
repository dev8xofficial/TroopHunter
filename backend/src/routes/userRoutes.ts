import express from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

// Define user routes
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
