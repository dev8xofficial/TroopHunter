import { Request, Response } from 'express';
import User from '../models/User/User.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import { ApiResponse } from '../types/Response.interface';
import { createApiResponse } from '../utils/response';
import Lead from '../models/Lead/Lead.model';
import { getUserMessage } from '../models/User/User.messages';
import { UserAttributes } from '../models/User/User.interface';
import { AuthSchema, createAuthErrorResponse } from '../models/User/Auth.schema';
import { UserSchema, createUserErrorResponse } from '../models/User/User.schema';

export const login = async (req: Request, res: Response) => {
  try {
    const { error, value: validatedData } = AuthSchema.validate(req.body, { abortEarly: false });
    const { email, password } = validatedData as UserAttributes;

    if (error) {
      console.log('Error: ', error);
      const errorResponse = createAuthErrorResponse(error);
      const response: ApiResponse<null> = createApiResponse({
        error: errorResponse.error,
        status: errorResponse.status,
      });
      return res.json(response);
    }

    // Check if the user exists
    const user: User | null = await User.findOne({ where: { email }, include: [{ model: Lead }] });
    if (!user) {
      logger.error(`User with email ${email} does not exist.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('INVALID_EMAIL').message, status: getUserMessage('INVALID_EMAIL').code });
      return res.json(response);
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      logger.error(`Invalid password provided for user with email ${email}.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('INVALID_PASSWORD').message, status: getUserMessage('INVALID_PASSWORD').code });
      return res.json(response);
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? '');

    logger.info(`User with email ${email} logged in successfully.`);

    const response: ApiResponse<{ user: User | null; token: string }> = createApiResponse({ success: true, data: { user: user, token }, message: getUserMessage('LOGGED_IN').message, status: getUserMessage('LOGGED_IN').code });
    res.json(response);
  } catch (error) {
    logger.error('Login failed:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('LOGIN_FAILED').message, status: getUserMessage('LOGIN_FAILED').code });
    return res.json(response);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { error, value: validatedData } = UserSchema.validate(req.body, { abortEarly: false });
    const { firstName, lastName, email, password } = validatedData as UserAttributes;

    if (error) {
      console.log('Error: ', error);
      const errorResponse = createUserErrorResponse(error);
      const response: ApiResponse<null> = createApiResponse({
        error: errorResponse.error,
        status: errorResponse.status,
      });
      return res.json(response);
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.error(`User with email ${email} already exists.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('DUPLICATE_USER').message, status: getUserMessage('DUPLICATE_USER').code });
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

    const response: ApiResponse<{ user: User }> = createApiResponse({ success: true, data: { user: user }, message: getUserMessage('USER_CREATED').message, status: getUserMessage('USER_CREATED').code });
    res.json(response);
  } catch (error) {
    logger.error('Failed to create user:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('FAILED_TO_CREATE_USER').message, status: getUserMessage('FAILED_TO_CREATE_USER').code });
    return res.json(response);
  }
};
