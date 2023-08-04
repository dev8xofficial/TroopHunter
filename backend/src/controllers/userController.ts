import { Request, Response } from 'express';
import User from '../models/User/User.model';
import logger from '../utils/logger';
import { isValidJSON } from '../utils/helper';
import { getMessage } from '../utils/message';
import { ApiResponse } from '../types/Response.interface';
import { createApiResponse } from '../utils/response';
import { getUserMessage } from '../models/User/User.messages';
import { UserAttributes } from '../models/User/User.interface';
import { UserSchema, createUserErrorResponse } from '../models/User/User.schema';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();

    if (users && users.length > 0) {
      // Log a success message
      logger.info(`Retrieved all users.`);
      const response: ApiResponse<User[]> = createApiResponse({ success: true, data: users, message: getUserMessage('USERS_RETRIEVED').message, status: getUserMessage('USERS_RETRIEVED').code });
      res.json(response);
    } else {
      // Log a warning message
      logger.warn(`Users not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('FAILED_TO_RETRIEVE_USERS').message, status: getUserMessage('FAILED_TO_RETRIEVE_USERS').code });
      res.json(response);
    }
  } catch (error) {
    // Log an error message
    logger.error('Failed to retrieve users:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('FAILED_TO_RETRIEVE_USERS').message, status: getUserMessage('FAILED_TO_RETRIEVE_USERS').code });
    res.json(response);
  }
};

export const getUserWithInclude = async (req: Request, res: Response) => {
  const { id } = req.params;
  const include = req.query.include as string;

  try {
    if (!include || !isValidJSON(include)) {
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('INVALID_INCLUDE_PARAMETER').message, status: getMessage('INVALID_INCLUDE_PARAMETER').code });
      return res.json(response);
    }

    const user = await User.findOne({ where: { id }, include: JSON.parse(include) });

    if (user) {
      // Log a success message
      logger.info(`Retrieved user with ID ${id} and included data.`);
      const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage('USER_RETRIEVED').message, status: getUserMessage('USER_RETRIEVED').code });
      res.json(response);
    } else {
      // Log a warning message
      logger.warn(`User with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('FAILED_TO_RETRIEVE_USER').message, status: getUserMessage('FAILED_TO_RETRIEVE_USER').code });
      res.json(response);
    }
  } catch (error) {
    // Log an error message
    logger.error(`Failed to retrieve user with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('FAILED_TO_RETRIEVE_USER').message, status: getUserMessage('FAILED_TO_RETRIEVE_USER').code });
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
      const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage('USER_RETRIEVED').message, status: getUserMessage('USER_RETRIEVED').code });
      res.json(response);
    } else {
      // Log a warning message
      logger.warn(`User with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('FAILED_TO_RETRIEVE_USER').message, status: getUserMessage('FAILED_TO_RETRIEVE_USER').code });
      res.json(response);
    }
  } catch (error) {
    // Log an error message
    logger.error(`Failed to retrieve user with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('FAILED_TO_RETRIEVE_USER').message, status: getUserMessage('FAILED_TO_RETRIEVE_USER').code });
    res.json(response);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { error, value: validatedData } = UserSchema.validate(req.body, { abortEarly: false });
  const { firstName, lastName, email, password, role } = validatedData as UserAttributes;

  try {
    if (error) {
      const errorResponse = createUserErrorResponse(error);
      const response: ApiResponse<null> = createApiResponse({
        error: errorResponse.error,
        status: errorResponse.status,
      });
      return res.json(response);
    }

    const user = await User.findByPk(userId);

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;
      user.role = role;
      await user.save();

      // Log a success message
      logger.info(`Updated user with ID ${userId}.`);
      const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage('USER_UPDATED').message, status: getUserMessage('USER_UPDATED').code });
      res.json(response);
    } else {
      // Log a warning message
      logger.warn(`User with ID ${userId} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('FAILED_TO_UPDATE_USER').message, status: getUserMessage('FAILED_TO_UPDATE_USER').code });
      res.json(response);
    }
  } catch (error) {
    // Log an error message
    logger.error(`Failed to update user with ID ${userId}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('FAILED_TO_UPDATE_USER').message, status: getUserMessage('FAILED_TO_UPDATE_USER').code });
    res.json(response);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      logger.warn(`User with ID ${userId} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('FAILED_TO_DELETE_USER').message, status: getUserMessage('FAILED_TO_DELETE_USER').code });
      res.json(response);
    }

    await user?.destroy();
    logger.info(`Deleted user with ID ${userId}.`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getUserMessage('USER_DELETED').message, status: getUserMessage('USER_DELETED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Failed to delete user with ID ${userId}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('FAILED_TO_DELETE_USER').message, status: getUserMessage('FAILED_TO_DELETE_USER').code });
    res.json(response);
  }
};
