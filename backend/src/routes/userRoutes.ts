import express from 'express';
import { getUsers, getUserWithInclude, getUser, updateUser, deleteUser } from '../controllers/userController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define user routes
router.get('/:id/include', getUserWithInclude);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getUsers);

export default router;
