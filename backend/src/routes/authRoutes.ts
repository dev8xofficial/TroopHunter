import express from 'express';
import { login, register } from '../controllers/authController';

const router = express.Router();

// Define user routes
router.post('/login', login);
router.post('/register', register);

export default router;
