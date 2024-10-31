import { Request, Response } from 'express';
import User from '../../models/User';
import logger from '../../utils/logger';
import bcrypt from 'bcryptjs';
import { ApiResponse } from '@repo/validator';
import { IUserAttributes } from '@repo/validator';
import { createApiResponse } from '@repo/validator';
import { UserMessageKey, getUserMessage } from '../../messages/User';

export const updateUserName = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName }: IUserAttributes = req.body;

  try {
    const user = await User.findByPk(id, { include: ['Leads'] });

    if (user) {
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      await user.save();

      // Log a success message
      logger.info(`Updated user with ID ${id}.`);
      const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage(UserMessageKey.USER_UPDATED).message, status: getUserMessage(UserMessageKey.USER_UPDATED).code });
      res.json(response);
    } else {
      // Log a warning message
      logger.warn(`User with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).code });
      res.json(response);
    }
  } catch (error) {
    // Log an error message
    logger.error(`Failed to update user with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).code });
    res.json(response);
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;

  try {
    const user = await User.findByPk(id, { include: ['Leads'] });

    if (user) {
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
      res.json(response);
    } else {
      // Log a warning message
      logger.warn(`User with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).code });
      res.json(response);
    }
  } catch (error) {
    // Log an error message
    logger.error(`Failed to update password for user with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_PASSWORD).message, status: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_PASSWORD).code });
    res.json(response);
  }
};
