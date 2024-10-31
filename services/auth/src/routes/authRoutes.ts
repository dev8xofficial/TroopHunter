import express from 'express';
import { forgotPassword, resetPassword, resetPasswordVerification, sendVerificationToken, verifyUser } from '../controllers/AuthController';
import { ForgotPasswordValidationMiddleware, ResetPasswordSchemaValidationMiddleware, ResetPasswordVerificationSchemaValidationMiddleware, SendVerificationTokenValidationMiddleware, VerifyUserValidationMiddleware } from 'validator/validators';

const router = express.Router();

router.get('/reset-password/:id/:token', ResetPasswordVerificationSchemaValidationMiddleware, resetPasswordVerification);
router.get('/verify/:id/:token', VerifyUserValidationMiddleware, verifyUser);
router.post('/verify', SendVerificationTokenValidationMiddleware, sendVerificationToken);
router.post('/forgot-password', ForgotPasswordValidationMiddleware, forgotPassword);
router.post('/reset-password', ResetPasswordSchemaValidationMiddleware, resetPassword);

export default router;
