// import { verifyToken } from '@repo/middlewares';
import { UserFetchByIdRequestValidationMiddleware, UserUpdatePasswordRequestValidationMiddleware, UserUpdateNameRequestValidationMiddleware, RequestValidationMiddleware, PaginationRequestValidationMiddleware, UserFetchByEmailRequestValidationMiddleware, UserCreateRequestValidationMiddleware, UserUpdateVerifiedRequestValidationMiddleware } from '@repo/validator';
import express from 'express';

import { getUsers, getUserWithInclude, getUserById, updateUserName, deleteUser, updateUserPassword, getUserByEmail, createUser, updateUserVerified } from '../controllers/UserController';

const router = express.Router();

// Apply the authMiddleware to secure the routes
// router.use(verifyToken);

// Define user routes
router.post('/create', UserCreateRequestValidationMiddleware, createUser);
router.get('/:id/include', UserFetchByIdRequestValidationMiddleware, RequestValidationMiddleware, getUserWithInclude);
router.get('/email/:email', UserFetchByEmailRequestValidationMiddleware, getUserByEmail);
router.get('/:id', UserFetchByIdRequestValidationMiddleware, getUserById);
router.put('/:id/update/name', UserFetchByIdRequestValidationMiddleware, UserUpdateNameRequestValidationMiddleware, updateUserName);
router.put('/:id/update/password', UserFetchByIdRequestValidationMiddleware, UserUpdatePasswordRequestValidationMiddleware, updateUserPassword);
router.put('/:id/update/verified', UserFetchByIdRequestValidationMiddleware, UserUpdateVerifiedRequestValidationMiddleware, updateUserVerified);
router.delete('/:id', UserFetchByIdRequestValidationMiddleware, deleteUser);
router.get('/', PaginationRequestValidationMiddleware, getUsers);

export default router;
