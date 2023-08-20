import express from 'express';
import { login, refreshToken, register, signOut } from '../controllers/AuthController';
import { RefreshTokenMiddleware, UserCreateRequestValidationMiddleware, UserFetchByIdRequestValidationMiddleware } from 'validator/validators';
import { LoginRequestValidationMiddleware } from 'validator/validators';

const router = express.Router();

router.post('/refresh-token', RefreshTokenMiddleware, refreshToken);
router.post('/signin', LoginRequestValidationMiddleware, login);
router.post('/signup', UserCreateRequestValidationMiddleware, register);
router.post('/signout/:id', UserFetchByIdRequestValidationMiddleware, signOut);

export default router;
