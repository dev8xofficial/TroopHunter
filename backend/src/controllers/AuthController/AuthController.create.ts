import { Request, Response } from 'express';
import User from '../../models/User/User.model';
import bcrypt from 'bcrypt';
import logger from '../../utils/logger';
import { ApiResponse } from '../../types/Response.interface';
import { IUserRequestAttributes, IUserResponseAttributes } from '../../models/User/User.interface';
import { createApiResponse } from '../../utils/response';
import { UserMessageKey, getUserMessage } from '../../models/User/User.messages';
import { UserSchema, createUserErrorResponse } from '../../models/User/User.schema';
import { v4 as uuidv4 } from 'uuid';

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
