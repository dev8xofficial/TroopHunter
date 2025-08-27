import { UserMessageKey, getUserMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, type IUserAttributes, type IUserFetchByIdRequestAttributes, type IUserUpdatePasswordRequestAttributes, type IUserUpdateVerifiedRequestAttributes, createApiResponse } from '@repo/validator';
import bcrypt from 'bcryptjs';
import { type Request, type Response } from 'express';

import { User } from '../../models';

export const updateUserName = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IUserFetchByIdRequestAttributes;
  const { firstName, lastName } = req.body as IUserAttributes;

  try {
    const user = await User.findByPk(id, { include: ['Leads'] });

    if (user == null) {
      logger.warn(`User with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).code });
      return res.json(response);
    }

    if (firstName != null) user.firstName = firstName;
    if (lastName != null) user.lastName = lastName;
    await user.save();

    logger.info(`Updated user with ID ${id}.`);
    const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage(UserMessageKey.USER_UPDATED).message, status: getUserMessage(UserMessageKey.USER_UPDATED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Failed to update user with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).code });
    return res.json(response);
  }
};

export const updateUserPassword = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IUserFetchByIdRequestAttributes;
  const { password, newPassword } = req.body as IUserUpdatePasswordRequestAttributes;

  try {
    // const user = await User.findByPk(id, { include: ['Leads'] });
    const user = await User.findByPk(id);

    if (user == null) {
      logger.warn(`User with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).code });
      return res.json(response);
    }

    // Check if provided password matches the current password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Log a warning message
      logger.warn(`Provided password does not match the current password for user with ID ${id}.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.PASSWORD_MISMATCH).message, status: getUserMessage(UserMessageKey.PASSWORD_MISMATCH).code });
      return res.json(response);
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    // Log a success message
    logger.info(`Updated password for user with ID ${id}.`);

    const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage(UserMessageKey.PASSWORD_UPDATED).message, status: getUserMessage(UserMessageKey.PASSWORD_UPDATED).code });
    return res.json(response);
  } catch (error) {
    // Log an error message
    logger.error(`Failed to update password for user with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_PASSWORD).message, status: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_PASSWORD).code });
    return res.json(response);
  }
};

export const updateUserVerified = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IUserFetchByIdRequestAttributes;
  const { verified } = req.body as IUserUpdateVerifiedRequestAttributes;

  try {
    // const user = await User.findByPk(id, { include: ['Leads'] });
    const user = await User.findByPk(id);

    if (user == null) {
      logger.warn(`User with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).code });
      return res.json(response);
    }

    if (verified != null) user.verified = verified;
    await user.save();

    logger.info(`Updated user with ID ${id}.`);
    const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage(UserMessageKey.USER_UPDATED).message, status: getUserMessage(UserMessageKey.USER_UPDATED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Failed to update user with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).code });
    return res.json(response);
  }
};
