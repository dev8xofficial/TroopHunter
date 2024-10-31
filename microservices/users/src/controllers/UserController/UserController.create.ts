import { UserMessageKey, getUserMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, type IUserAttributes, createApiResponse } from '@repo/validator';
import bcrypt from 'bcryptjs';
import { type Request, type Response } from 'express';

import { User } from '../../models';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { id, firstName, lastName, email, password, verified } = req.body as IUserAttributes;

  try {
    const requestData: IUserAttributes = { id, firstName, lastName, email, password, verified };

    const hashedPassword = await bcrypt.hash(password, 10);
    requestData.password = hashedPassword;

    const user = await User.create(requestData);

    logger.info(`Created user with Email ${email}.`);
    const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage(UserMessageKey.USER_CREATED).message, status: getUserMessage(UserMessageKey.USER_CREATED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Failed to create user with Email ${email}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_CREATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_CREATE_USER).code });
    return res.json(response);
  }
};
