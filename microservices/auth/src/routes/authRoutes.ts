import { RefreshTokenValidationMiddleware, LoginRequestValidationMiddleware, UserCreateRequestValidationMiddleware, UserFetchByIdRequestValidationMiddleware, ForgotPasswordValidationMiddleware, ResetPasswordSchemaValidationMiddleware, ResetPasswordVerificationSchemaValidationMiddleware, SendVerificationTokenValidationMiddleware, VerifyUserValidationMiddleware } from '@repo/validator';
import express from 'express';

import { login, refreshToken, register, signOut, forgotPassword, resetPassword, resetPasswordVerification, sendVerificationToken, verifyUser, verifyUserToken } from '../controllers/AuthController';

const router = express.Router();

router.post('/refresh-token', RefreshTokenValidationMiddleware, refreshToken);
router.post('/signin', LoginRequestValidationMiddleware, login);
router.post('/signup', UserCreateRequestValidationMiddleware, register);
router.post('/signout/:id', UserFetchByIdRequestValidationMiddleware, signOut);
router.post('/forgot-password', ForgotPasswordValidationMiddleware, forgotPassword);
router.post('/reset-password', ResetPasswordSchemaValidationMiddleware, resetPassword);
router.get('/reset-password/:id/:token', ResetPasswordVerificationSchemaValidationMiddleware, resetPasswordVerification);
router.post('/verify', SendVerificationTokenValidationMiddleware, sendVerificationToken);
router.get('/verify/:id/:token', VerifyUserValidationMiddleware, verifyUser);
router.get('/verify/token', verifyUserToken);

export default router;
