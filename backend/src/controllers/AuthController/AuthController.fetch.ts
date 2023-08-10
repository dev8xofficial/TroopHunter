import { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../../utils/logger';
import { ApiResponse } from 'validator/interfaces/Response';
import { IUserRequestAttributes } from 'validator/interfaces/User';
import { createApiResponse } from 'validator/utils/response';
import Lead from '../../models/Lead';
import { UserMessageKey, getUserMessage } from '../../messages/User';
import { AuthMessageKey, getAuthMessage } from '../../messages/Auth';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUserRequestAttributes = req.body;

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
