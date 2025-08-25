import { UserMessageKey, getUserMessage, PaginationMessageKey, getPaginationMessage } from '@repo/messages';
import { logger, isValidJSON } from '@repo/utils';
import { type ApiResponse, createApiResponse, type IPaginationAttributes, type IRequestAttributes, type IUserFetchByEmailRequestAttributes, type IUserFetchByIdRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';
import { type ParsedQs } from 'qs';
import { type Includeable } from 'sequelize/types';

import { User } from '../../models';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const { page, limit } = req.query as ParsedQs & IPaginationAttributes;

  const pageNumber = parseInt(String(page)) ?? 1;
  const limitNumber = parseInt(String(limit)) ?? 10;

  const offset = (pageNumber - 1) * limitNumber;

  try {
    const { count, rows: users } = await User.findAndCountAll({
      offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(count / limitNumber);

    if (users.length === 0) {
      logger.warn(`Users not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USERS).message, status: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USERS).code });
      return res.json(response);
    }

    logger.info(`Retrieved all users.`);
    const response: ApiResponse<{ totalRecords: number; totalPages: number; users: User[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, users }, message: getUserMessage(UserMessageKey.USERS_RETRIEVED).message, status: getUserMessage(UserMessageKey.USERS_RETRIEVED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Failed to retrieve users:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USERS).message, status: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USERS).code });
    return res.json(response);
  }
};

export const getUserWithInclude = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IUserFetchByIdRequestAttributes;
  const { include } = req.query as IRequestAttributes;

  try {
    if (include.length > 0 || !isValidJSON(include.toString())) {
      const response: ApiResponse<null> = createApiResponse({ error: getPaginationMessage(PaginationMessageKey.INVALID_REQUEST_INCLUDE).message, status: getPaginationMessage(PaginationMessageKey.INVALID_REQUEST_INCLUDE).code });
      return res.json(response);
    }

    const parsedInclude: Includeable[] = JSON.parse(include.toString()) as Includeable[];
    const user = await User.findOne({ where: { id }, include: parsedInclude });

    if (user == null) {
      logger.warn(`User with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).code });
      return res.json(response);
    }

    logger.info(`Retrieved user with ID ${id} and included data.`);

    const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage(UserMessageKey.USER_RETRIEVED).message, status: getUserMessage(UserMessageKey.USER_RETRIEVED).code });
    return res.json(response);
  } catch (error) {
    // Log an error message
    logger.error(`Failed to retrieve user with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).code });
    return res.json(response);
  }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IUserFetchByIdRequestAttributes;

  try {
    const user = await User.findByPk(id);

    if (user == null) {
      logger.warn(`User with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).message, status: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).code });
      return res.json(response);
    }

    logger.info(`Retrieved user with ID ${id}.`, user);

    const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage(UserMessageKey.USER_RETRIEVED).message, status: getUserMessage(UserMessageKey.USER_RETRIEVED).code });
    return res.json(response);
  } catch (error) {
    // Log an error message
    logger.error(`Failed to retrieve user with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).code });
    return res.json(response);
  }
};

export const getUserByEmail = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.params as IUserFetchByEmailRequestAttributes;

  try {
    const user = await User.findOne({ where: { email } });

    if (user == null) {
      logger.warn(`User with email ${email} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.USER_NOT_FOUND).message, status: getUserMessage(UserMessageKey.USER_NOT_FOUND).code });
      return res.json(response);
    }

    logger.info(`Retrieved user with email ${email}.`, user);

    const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage(UserMessageKey.USER_RETRIEVED).message, status: getUserMessage(UserMessageKey.USER_RETRIEVED).code });
    return res.json(response);
  } catch (error) {
    // Log an error message
    logger.error(`Failed to retrieve user with email ${email}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_RETRIEVE_USER).code });
    return res.json(response);
  }
};
