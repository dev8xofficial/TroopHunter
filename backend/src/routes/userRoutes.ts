import express from 'express';
import { getUsers, getUserWithInclude, getUserById } from '../controllers/UserController/UserController.fetch';
import { updateUser } from '../controllers/UserController/UserController.update';
import { deleteUser } from '../controllers/UserController/UserController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';
import { UserFetchRequestValidationMiddleware, UserFetchByIdRequestValidationMiddleware, UserUpdateRequestValidationMiddleware } from 'validator/validators/User';
import { RequestValidationMiddleware } from 'validator/validators/Request';
import { PaginationRequestValidationMiddleware } from 'validator/validators/Pagination';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define user routes
router.get('/:id/include', UserFetchRequestValidationMiddleware, RequestValidationMiddleware, getUserWithInclude);
router.get('/:id', UserFetchByIdRequestValidationMiddleware, getUserById);
router.put('/:id', UserFetchByIdRequestValidationMiddleware, UserUpdateRequestValidationMiddleware, updateUser);
router.delete('/:id', UserFetchByIdRequestValidationMiddleware, deleteUser);
router.get('/', PaginationRequestValidationMiddleware, getUsers);

export default router;
