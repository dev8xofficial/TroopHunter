import express from 'express';
import { getUsers, getUserWithInclude, getUser } from '../controllers/UserController/UserController.fetch';
import { updateUser } from '../controllers/UserController/UserController.update';
import { deleteUser } from '../controllers/UserController/UserController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';
import { userCreationRequestValidationMiddleware, userFetchRequestValidationMiddleware } from '../models/User/User.validator';
import { requestValidationMiddleware } from '../validators/Request.validator';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define user routes
router.get('/:id/include', userFetchRequestValidationMiddleware, requestValidationMiddleware, getUserWithInclude);
router.get('/:id', userFetchRequestValidationMiddleware, getUser);
router.put('/:id', userCreationRequestValidationMiddleware, updateUser);
router.delete('/:id', userFetchRequestValidationMiddleware, deleteUser);
router.get('/', getUsers);

export default router;
