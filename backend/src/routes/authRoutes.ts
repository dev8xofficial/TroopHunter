import express from 'express';
import { login } from '../controllers/AuthController/AuthController.fetch';
import { register } from '../controllers/AuthController/AuthController.create';
import { userCreateRequestValidationMiddleware } from 'common/validators/User';
import { authUserFetchRequestValidationMiddleware } from 'common/validators/Auth';

const router = express.Router();

router.post('/signin', authUserFetchRequestValidationMiddleware, login);
router.post('/signup', userCreateRequestValidationMiddleware, register);

export default router;
