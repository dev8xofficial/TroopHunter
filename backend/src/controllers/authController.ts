import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getMessage } from '../utils/message';
import logger from '../utils/logger';
import { ApiResponse } from '../types/response';
import { createApiResponse } from '../utils/response';
import Lead from '../models/Lead/Lead.model';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user: User | null = await User.findOne({ where: { email }, include: [{ model: Lead }] });
    if (!user) {
      logger.error(`User with email ${email} does not exist.`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('INVALID_EMAIL').message, status: getMessage('INVALID_EMAIL').code });
      return res.json(response);
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      logger.error(`Invalid password provided for user with email ${email}.`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('INVALID_PASSWORD').message, status: getMessage('INVALID_PASSWORD').code });
      return res.json(response);
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? '');

    logger.info(`User with email ${email} logged in successfully.`);

    const response: ApiResponse<{ user: User | null; token: string }> = createApiResponse({ success: true, data: { user: user, token }, message: getMessage('LOGGED_IN').message, status: getMessage('LOGGED_IN').code });
    res.json(response);
  } catch (error) {
    logger.error('Login failed:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('LOGIN_FAILED').message, status: getMessage('LOGIN_FAILED').code });
    return res.json(response);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.error(`User with email ${email} already exists.`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('DUPLICATE_USER').message, status: getMessage('DUPLICATE_USER').code });
      return res.json(response);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    logger.info(`User with email ${email} registered successfully.`);

    const response: ApiResponse<{ user: User }> = createApiResponse({ success: true, data: { user: user }, message: getMessage('USER_CREATED').message, status: getMessage('USER_CREATED').code });
    res.json(response);
  } catch (error) {
    logger.error('Failed to create user:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_CREATE_USER').message, status: getMessage('FAILED_TO_CREATE_USER').code });
    return res.json(response);
  }
};
