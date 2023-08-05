import { Request, Response } from 'express';
import User from '../models/User/User.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import { ApiResponse } from '../types/Response.interface';
import { IUserRequestAttributes, IUserResponseAttributes } from '../models/User/User.interface';
import { createApiResponse } from '../utils/response';
import Lead from '../models/Lead/Lead.model';
import { UserMessageKey, getUserMessage } from '../models/User/User.messages';
import { AuthSchema, createAuthErrorResponse } from '../models/User/Auth.schema';
import { UserSchema, createUserErrorResponse } from '../models/User/User.schema';
import { AuthMessageKey, getAuthMessage } from '../models/User/Auth.messages';
import { v4 as uuidv4 } from 'uuid';

export const login = async (req: Request, res: Response) => {
  try {
    const { error, value: validatedData } = AuthSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorResponse = createAuthErrorResponse(error);
      const response: ApiResponse<null> = createApiResponse({
        error: errorResponse.error,
        status: errorResponse.status,
      });
      return res.json(response);
    }

    const { email, password }: IUserRequestAttributes = validatedData;

    // Check if the user exists
    const user: User | null = await User.findOne({ where: { email }, include: [{ model: Lead }] });
    if (!user) {
      logger.error(`User with email ${email} does not exist.`);
      const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.INVALID_AUTH_EMAIL).message, status: getAuthMessage(AuthMessageKey.INVALID_AUTH_EMAIL).code });
      return res.json(response);
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      logger.error(`Invalid password provided for user with email ${email}.`);
      const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.INVALID_AUTH_PASSWORD).message, status: getAuthMessage(AuthMessageKey.INVALID_AUTH_PASSWORD).code });
      return res.json(response);
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? '');

    logger.info(`User with email ${email} logged in successfully.`);

    const response: ApiResponse<{ user: User | null; token: string }> = createApiResponse({ success: true, data: { user: user, token }, message: getUserMessage(UserMessageKey.LOGGED_IN).message, status: getUserMessage(UserMessageKey.LOGGED_IN).code });
    res.json(response);
  } catch (error) {
    logger.error('Login failed:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.LOGIN_FAILED).message, status: getUserMessage(UserMessageKey.LOGIN_FAILED).code });
    return res.json(response);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { error, value: validatedData } = UserSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorResponse = createUserErrorResponse(error);
      const response: ApiResponse<null> = createApiResponse({
        error: errorResponse.error,
        status: errorResponse.status,
      });
      return res.json(response);
    }

    const { firstName, lastName, email, password }: IUserRequestAttributes = validatedData;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.error(`User with email ${email} already exists.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.DUPLICATE_USER).message, status: getUserMessage(UserMessageKey.DUPLICATE_USER).code });
      return res.json(response);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const requestData: IUserResponseAttributes = { id: uuidv4(), firstName, lastName, email, password: hashedPassword };
    const user = await User.create(requestData);

    logger.info(`User with email ${email} registered successfully.`);

    const response: ApiResponse<{ user: User }> = createApiResponse({ success: true, data: { user: user }, message: getUserMessage(UserMessageKey.USER_CREATED).message, status: getUserMessage(UserMessageKey.USER_CREATED).code });
    res.json(response);
  } catch (error) {
    logger.error('Failed to create user:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_CREATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_CREATE_USER).code });
    return res.json(response);
  }
};
