import { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import logger from '../../utils/logger';
import { ApiResponse, IUserAttributes } from 'validator/interfaces';
import { createApiResponse } from 'validator/utils';
import { UserMessageKey, getUserMessage } from '../../messages/User';
import { v4 as uuidv4 } from 'uuid';
import { checkToken, generateToken } from '../../utils/jwt';
import sendEmail from '../../utils/emailVerification';
import { verifyEmail } from '../../templates/verifyEmail';

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password }: IUserAttributes = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.error(`User with email ${email} already exists.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.DUPLICATE_USER).message, status: getUserMessage(UserMessageKey.DUPLICATE_USER).code });
      return res.json(response);
    }

    const requestData: Omit<IUserAttributes, 'Leads'> = { id: uuidv4(), firstName, lastName, email, password, verified: false };

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    requestData.password = hashedPassword;

    // Create the user
    const user = await User.create(requestData);

    logger.info(`User with email ${email} registered successfully.`);

    const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage(UserMessageKey.USER_CREATED).message, status: getUserMessage(UserMessageKey.USER_CREATED).code });
    res.json(response);
  } catch (error) {
    logger.error('Failed to create user:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_CREATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_CREATE_USER).code });
    return res.json(response);
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { id, token } = req.params;

    // Check if the gym already exists
    const user = await User.findByPk(id);
    // if is exist throw an error
    if (!user) {
      logger.error(`User not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.USER_NOT_FOUND).message, status: getUserMessage(UserMessageKey.USER_NOT_FOUND).code });
      return res.json(response);
    }

    const tokenChecked = await checkToken(token);

    if (!tokenChecked) {
      logger.error(`Invalid email verification token.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.INVALID_EMAIL_VERIFICATION_TOKEN).message, status: getUserMessage(UserMessageKey.INVALID_EMAIL_VERIFICATION_TOKEN).code });
      return res.json(response);
    }

    await user.update({ verified: true });

    logger.info(`User's ${id} email successfully verified!`);

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.EMAIL_VERIFIED).message, status: getUserMessage(UserMessageKey.EMAIL_VERIFIED).code });
    res.json(response);
  } catch (error) {
    logger.error('Failed to verify email:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.EMAIL_VERIFICATION_TOKEN_FAILED).message, status: getUserMessage(UserMessageKey.EMAIL_VERIFICATION_TOKEN_FAILED).code });
    return res.json(response);
  }
};
