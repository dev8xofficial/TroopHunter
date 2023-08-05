import express from 'express';
import { getUsers, getUserWithInclude, getUser } from '../controllers/UserController/UserController.fetch';
import { updateUser } from '../controllers/UserController/UserController.update';
import { deleteUser } from '../controllers/UserController/UserController.delete';
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
