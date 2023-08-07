import express from 'express';
import { login } from '../controllers/AuthController/AuthController.fetch';
import { register } from '../controllers/AuthController/AuthController.create';
import { userCreationRequestValidationMiddleware } from '../models/User/User.validator';
import { authLoginRequestValidationMiddleware } from '../validators/Auth.validator';

const router = express.Router();

router.post('/signin', authLoginRequestValidationMiddleware, login);
router.post('/signup', userCreationRequestValidationMiddleware, register);

export default router;
