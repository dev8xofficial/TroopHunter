import { Request, Response } from 'express';
import User from '../../models/User';
import logger from '../../utils/logger';
import { ApiResponse } from 'validator/interfaces/Response';
import { createApiResponse } from 'validator/utils/response';
import { UserMessageKey, getUserMessage } from '../../messages/User';

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (user) {
      await user.destroy();
      logger.info(`Deleted user with ID ${id}.`);
      const response: ApiResponse<null> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.USER_DELETED).message, status: getUserMessage(UserMessageKey.USER_DELETED).code });
      res.json(response);
    } else {
      logger.warn(`User with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_DELETE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_DELETE_USER).code });
      res.json(response);
    }
  } catch (error) {
    logger.error(`Failed to delete user with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_DELETE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_DELETE_USER).code });
    res.json(response);
  }
};
