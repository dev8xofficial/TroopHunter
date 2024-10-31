import express from 'express';
import { login, refreshToken, register, signOut } from '../controllers/AuthController';
import { RefreshTokenValidationMiddleware, UserCreateRequestValidationMiddleware, UserFetchByIdRequestValidationMiddleware } from '@repo/validator';
import { LoginRequestValidationMiddleware } from '@repo/validator';

const router = express.Router();

router.post('/refresh-token', RefreshTokenValidationMiddleware, refreshToken);
router.post('/signin', LoginRequestValidationMiddleware, login);
router.post('/signup', UserCreateRequestValidationMiddleware, register);
router.post('/signout/:id', UserFetchByIdRequestValidationMiddleware, signOut);

export default router;
