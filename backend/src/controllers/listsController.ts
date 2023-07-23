import { Request, Response } from 'express';
import Lists from '../models/List';
import User from '../models/User';
import logger from '../utils/logger';
import { getMessage } from '../utils/message';
import { ApiResponse } from '../types/response';
import { createApiResponse } from '../utils/response';

export const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await Lists.findAll();
    logger.info('Lists retrieved successfully.');

    const response: ApiResponse<any[]> = createApiResponse({ success: true, data: lists, message: getMessage('LISTS_RETRIEVED').message, status: getMessage('LISTS_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving lists:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_LISTS').message, status: getMessage('FAILED_TO_RETRIEVE_LISTS').code });
    res.json(response);
  }
};

export const getListById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const list = await Lists.findOne({ where: { id } });
    if (!list) {
      logger.warn(`List with ID ${id} not found.`);

      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LIST_NOT_FOUND').message, status: getMessage('LIST_NOT_FOUND').code });
      return res.json(response);
    }

    logger.info(`List with ID ${id} retrieved successfully.`);
    const response: ApiResponse<any> = createApiResponse({ success: true, data: list, message: getMessage('LIST_RETRIEVED').message, status: getMessage('LIST_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving list with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_LIST').message, status: getMessage('FAILED_TO_RETRIEVE_LIST').code });
    res.json(response);
  }
};

export const createList = async (req: Request, res: Response) => {
  const { userId, ...listData } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('USER_NOT_FOUND').message, status: getMessage('USER_NOT_FOUND').code });
      return res.json(response);
    }
    const list = await Lists.create({ ownerId: userId, ...listData });

    logger.info('List created successfully.');
    const response: ApiResponse<any> = createApiResponse({ success: true, data: list, message: getMessage('LIST_CREATED').message, status: getMessage('LIST_CREATED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while creating list:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_CREATE_LIST').message, status: getMessage('FAILED_TO_CREATE_LIST').code });
    res.json(response);
  }
};

export const updateList = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, ...listData } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('USER_NOT_FOUND').message, status: getMessage('USER_NOT_FOUND').code });
      return res.json(response);
    }

    const list = await Lists.findOne({ where: { id } });
    if (!list) {
      logger.warn(`List with ID ${id} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LIST_NOT_FOUND').message, status: getMessage('LIST_NOT_FOUND').code });
      return res.json(response);
    }
    await list.update(listData);

    logger.info(`List with ID ${id} updated successfully.`);
    const response: ApiResponse<any> = createApiResponse({ success: true, data: list, message: getMessage('LIST_UPDATED').message, status: getMessage('LIST_UPDATED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while updating list with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_UPDATE_LIST').message, status: getMessage('FAILED_TO_UPDATE_LIST').code });
    res.json(response);
  }
};

export const deleteList = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const list = await Lists.findOne({ where: { id } });
    if (!list) {
      logger.warn(`List with ID ${id} not found.`);

      const response: ApiResponse<null> = createApiResponse({ error: getMessage('LIST_NOT_FOUND').message, status: getMessage('LIST_NOT_FOUND').code });
      return res.json(response);
    }
    await list.destroy();

    logger.info(`List with ID ${id} deleted successfully.`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getMessage('LIST_DELETED').message, status: getMessage('LIST_DELETED').code });
    res.status(204).json(response);
  } catch (error) {
    logger.error(`Error while deleting list with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_DELETE_LIST').message, status: getMessage('FAILED_TO_DELETE_LIST').code });
    res.json(response);
  }
};
