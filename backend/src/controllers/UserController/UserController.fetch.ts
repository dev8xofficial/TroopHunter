import { Request, Response } from 'express';
import User from '../../models/User/User.model';
import logger from '../../utils/logger';
import { isValidJSON } from '../../utils/helper';
import { ApiResponse } from '../../types/Response.interface';
import { createApiResponse } from '../../utils/response';
import { UserMessageKey, getUserMessage } from '../../models/User/User.messages';
import { PaginationMessageKey, getPaginationMessage } from '../../messages/Pagination.messages';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();

    if (users && users.length > 0) {
      // Log a success message
      logger.info(`Retrieved all users.`);
      const response: ApiResponse<User[]> = createApiResponse({ success: true, data: users, message: getUserMessage(UserMessageKey.USERS_RETRIEVED).message, status: getUserMessage(UserMessageKey.USERS_RETRIEVED).code });
      res.json(response);
    } else {
      // Log a warning message
      logger.warn(`Users not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USERS).message, status: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USERS).code });
      res.json(response);
    }
  } catch (error) {
    // Log an error message
    logger.error('Failed to retrieve users:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USERS).message, status: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USERS).code });
    res.json(response);
  }
};

export const getUserWithInclude = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { include } = req.query;

  try {
    if (!include || !isValidJSON(include.toString())) {
      const response: ApiResponse<null> = createApiResponse({ error: getPaginationMessage(PaginationMessageKey.INVALID_REQUEST_INCLUDE).message, status: getPaginationMessage(PaginationMessageKey.INVALID_REQUEST_INCLUDE).code });
      return res.json(response);
    }

    const user = await User.findOne({ where: { id }, include: JSON.parse(include.toString()) });

    if (user) {
      // Log a success message
      logger.info(`Retrieved user with ID ${id} and included data.`);
      const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage(UserMessageKey.USER_RETRIEVED).message, status: getUserMessage(UserMessageKey.USER_RETRIEVED).code });
      res.json(response);
    } else {
      // Log a warning message
      logger.warn(`User with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).code });
      res.json(response);
    }
  } catch (error) {
    // Log an error message
    logger.error(`Failed to retrieve user with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).code });
    res.json(response);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (user) {
      // Log a success message
      logger.info(`Retrieved user with ID ${id}.`, user);
      const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage(UserMessageKey.USER_RETRIEVED).message, status: getUserMessage(UserMessageKey.USER_RETRIEVED).code });
      res.json(response);
    } else {
      // Log a warning message
      logger.warn(`User with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).code });
      res.json(response);
    }
  } catch (error) {
    // Log an error message
    logger.error(`Failed to retrieve user with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).code });
    res.json(response);
  }
};
