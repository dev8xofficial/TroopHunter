import express from 'express';
import { sendVerificationToken, verifyUser } from '../controllers/AuthController';
import { SendVerificationTokenMiddleware, VerifyUserValidationMiddleware } from 'validator/validators';

const router = express.Router();

router.get('/verify/:id/:token', VerifyUserValidationMiddleware, verifyUser);
router.post('/verify', SendVerificationTokenMiddleware, sendVerificationToken);

export default router;
