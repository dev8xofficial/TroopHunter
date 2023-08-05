import { Request, Response } from 'express';
import User from '../../models/User/User.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../../utils/logger';
import { ApiResponse } from '../../types/Response.interface';
import { IUserRequestAttributes } from '../../models/User/User.interface';
import { createApiResponse } from '../../utils/response';
import Lead from '../../models/Lead/Lead.model';
import { UserMessageKey, getUserMessage } from '../../models/User/User.messages';
import { AuthSchema, createAuthErrorResponse } from '../../models/User/Auth.schema';
import { AuthMessageKey, getAuthMessage } from '../../models/User/Auth.messages';

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
