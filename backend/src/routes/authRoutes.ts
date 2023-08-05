import express from 'express';
import { login } from '../controllers/AuthController/AuthController.fetch';
import { register } from '../controllers/AuthController/AuthController.create';

const router = express.Router();

router.post('/signin', login);
router.post('/signup', register);

export default router;
