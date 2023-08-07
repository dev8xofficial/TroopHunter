import { Request, Response } from 'express';
import User from '../../models/User/User.model';
import logger from '../../utils/logger';
import { ApiResponse } from '../../types/Response.interface';
import { IUserRequestAttributes } from '../../models/User/User.interface';
import { createApiResponse } from '../../utils/response';
import { UserMessageKey, getUserMessage } from '../../models/User/User.messages';

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, role }: IUserRequestAttributes = req.body;

  try {
    const user = await User.findByPk(id);

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;
      user.role = role;
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
