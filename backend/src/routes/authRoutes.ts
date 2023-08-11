import express from 'express';
import { login, register } from '../controllers/AuthController';
import { UserCreateRequestValidationMiddleware } from 'validator/validators/User';
import { LoginRequestValidationMiddleware } from 'validator/validators/Auth';

const router = express.Router();

router.post('/signin', LoginRequestValidationMiddleware, login);
router.post('/signup', UserCreateRequestValidationMiddleware, register);

export default router;
