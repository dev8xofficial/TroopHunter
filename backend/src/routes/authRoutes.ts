import express from 'express';
import { login } from '../controllers/AuthController/AuthController.fetch';
import { register } from '../controllers/AuthController/AuthController.create';
import { userCreateRequestValidationMiddleware } from '../models/User/User.validator';
import { authUserFetchRequestValidationMiddleware } from '../validators/Auth.validator';

const router = express.Router();

router.post('/signin', authUserFetchRequestValidationMiddleware, login);
router.post('/signup', userCreateRequestValidationMiddleware, register);

export default router;
