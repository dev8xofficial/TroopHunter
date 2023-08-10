import express from 'express';
import { login } from '../controllers/AuthController/AuthController.fetch';
import { register } from '../controllers/AuthController/AuthController.create';
import { userCreateRequestValidationMiddleware } from 'validator/validators/User';
import { authUserFetchRequestValidationMiddleware } from 'validator/validators/Auth';

const router = express.Router();

router.post('/signin', authUserFetchRequestValidationMiddleware, login);
router.post('/signup', userCreateRequestValidationMiddleware, register);

export default router;
