import { Request, Response } from 'express';
import User from '../../models/User/User.model';
import logger from '../../utils/logger';
import { ApiResponse } from '../../types/Response.interface';
import { createApiResponse } from '../../utils/response';
import { UserMessageKey, getUserMessage } from '../../models/User/User.messages';

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id as string;

  try {
    const user = await User.findByPk(userId);

    if (user) {
      await user.destroy();
      logger.info(`Deleted user with ID ${userId}.`);
      const response: ApiResponse<null> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.USER_DELETED).message, status: getUserMessage(UserMessageKey.USER_DELETED).code });
      res.json(response);
    } else {
      logger.warn(`User with ID ${userId} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_DELETE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_DELETE_USER).code });
      res.json(response);
    }
  } catch (error) {
    logger.error(`Failed to delete user with ID ${userId}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_DELETE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_DELETE_USER).code });
    res.json(response);
  }
};
