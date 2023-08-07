import express from 'express';
import { getUsers, getUserWithInclude, getUserById } from '../controllers/UserController/UserController.fetch';
import { updateUser } from '../controllers/UserController/UserController.update';
import { deleteUser } from '../controllers/UserController/UserController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';
import { userFetchRequestValidationMiddleware, userFetchByIdRequestValidationMiddleware, userUpdateRequestValidationMiddleware } from '../models/User/User.validator';
import { requestValidationMiddleware } from '../validators/Request.validator';
import { paginationRequestValidationMiddleware } from '../validators/Pagination.validator';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define user routes
router.get('/:id/include', userFetchRequestValidationMiddleware, requestValidationMiddleware, getUserWithInclude);
router.get('/:id', userFetchByIdRequestValidationMiddleware, getUserById);
router.put('/:id', userFetchByIdRequestValidationMiddleware, userUpdateRequestValidationMiddleware, updateUser);
router.delete('/:id', userFetchByIdRequestValidationMiddleware, deleteUser);
router.get('/', paginationRequestValidationMiddleware, getUsers);

export default router;
