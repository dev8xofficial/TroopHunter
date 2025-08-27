import { UserMessageKey, getUserMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type IUserFetchByIdRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { User } from '../../models';

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IUserFetchByIdRequestAttributes;

  try {
    const user = await User.findByPk(id);

    if (user == null) {
      logger.warn(`User with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_DELETE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_DELETE_USER).code });
      return res.json(response);
    }

    await user.destroy();
    logger.info(`Deleted user with ID ${id}.`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.USER_DELETED).message, status: getUserMessage(UserMessageKey.USER_DELETED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Failed to delete user with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_DELETE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_DELETE_USER).code });
    return res.json(response);
  }
};
