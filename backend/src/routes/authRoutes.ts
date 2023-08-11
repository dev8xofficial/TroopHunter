import express from 'express';
import { login, register } from '../controllers/AuthController';
import { UserCreateRequestValidationMiddleware } from 'validator/validators';
import { LoginRequestValidationMiddleware } from 'validator/validators';

const router = express.Router();

router.post('/signin', LoginRequestValidationMiddleware, login);
router.post('/signup', UserCreateRequestValidationMiddleware, register);

export default router;
