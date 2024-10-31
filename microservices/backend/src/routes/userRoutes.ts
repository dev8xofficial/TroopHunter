import express from 'express';
import { getUsers, getUserWithInclude, getUserById, updateUserName, deleteUser, updateUserPassword } from '../controllers/UserController';
import { verifyToken } from '../middlewares/authMiddleware';
import { UserFetchRequestValidationMiddleware, UserFetchByIdRequestValidationMiddleware, UserUpdatePasswordRequestValidationMiddleware, UserUpdateNameRequestValidationMiddleware } from '@repo/validator';
import { RequestValidationMiddleware } from '@repo/validator';
import { PaginationRequestValidationMiddleware } from '@repo/validator';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(verifyToken);

// Define user routes
router.get('/:id/include', UserFetchRequestValidationMiddleware, RequestValidationMiddleware, getUserWithInclude);
router.get('/:id', UserFetchByIdRequestValidationMiddleware, getUserById);
router.put('/:id/update/name', UserFetchByIdRequestValidationMiddleware, UserUpdateNameRequestValidationMiddleware, updateUserName);
router.put('/:id/update/password', UserFetchByIdRequestValidationMiddleware, UserUpdatePasswordRequestValidationMiddleware, updateUserPassword);
router.delete('/:id', UserFetchByIdRequestValidationMiddleware, deleteUser);
router.get('/', PaginationRequestValidationMiddleware, getUsers);

export default router;
