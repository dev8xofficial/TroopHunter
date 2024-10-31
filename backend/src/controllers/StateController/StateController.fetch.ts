import { Request, Response } from 'express';
import State from '../../models/State';
import logger from '../../utils/logger';
import { ApiResponse } from 'validator/interfaces';
import { createApiResponse } from 'validator/utils';
import { Op } from 'sequelize';
import { StateMessageKey, getStateMessage } from '../../messages/State';

// Get states by name and state
export const getStatesByQuery = async (req: Request, res: Response) => {
  const { name, code, countryCode, page, limit } = req.query;

  // Pagination
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const offset = (pageNumber - 1) * limitNumber;

  // Where clause
  const whereClause: { [key: string]: any } = {};

  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }

  if (code) {
    whereClause.code = { [Op.iLike]: `%${code}%` };
  }

  if (countryCode) {
    whereClause.countryCode = { [Op.iLike]: `%${countryCode}%` };
  }

  try {
    const { count, rows: states } = await State.findAndCountAll({
      where: whereClause,
      offset,
      limit: limitNumber,
    });

    if (states.length === 0) {
      logger.warn(`No states found for state: ${name}`);
      const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.STATE_NOT_FOUND).message, status: getStateMessage(StateMessageKey.STATE_NOT_FOUND).code });
      return res.json(response);
    }

    const totalPages = Math.ceil(count / limitNumber);

    logger.info('Successfully retrieved states.');
    const response: ApiResponse<{ totalRecords: number; totalPages: number; states: State[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, states }, message: getStateMessage(StateMessageKey.STATES_RETRIEVED).message, status: getStateMessage(StateMessageKey.STATES_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving states:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.FAILED_TO_RETRIEVE_STATES).message, status: getStateMessage(StateMessageKey.FAILED_TO_RETRIEVE_STATES).code });
    res.json(response);
  }
};

// Get all states
export const getStates = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const offset = (pageNumber - 1) * limitNumber;

  try {
    const { count, rows: states } = await State.findAndCountAll({
      offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(count / limitNumber);

    logger.info('Successfully retrieved states');
    const response: ApiResponse<{ totalRecords: number; totalPages: number; states: State[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, states }, message: getStateMessage(StateMessageKey.STATES_RETRIEVED).message, status: getStateMessage(StateMessageKey.STATES_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving states:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.FAILED_TO_RETRIEVE_STATES).message, status: getStateMessage(StateMessageKey.FAILED_TO_RETRIEVE_STATES).code });
    res.json(response);
  }
};

// Get a state by ID
export const getStateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const state = await State.findOne({ where: { id } });
    if (!state) {
      logger.warn(`State with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.STATE_NOT_FOUND).message, status: getStateMessage(StateMessageKey.STATE_NOT_FOUND).code });
      return res.json(response);
    }
    logger.info(`Successfully retrieved state with ID ${id}`);
    const response: ApiResponse<State> = createApiResponse({ success: true, data: state, message: getStateMessage(StateMessageKey.STATE_RETRIEVED).message, status: getStateMessage(StateMessageKey.STATE_RETRIEVED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving state with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.FAILED_TO_RETRIEVE_STATE).message, status: getStateMessage(StateMessageKey.FAILED_TO_RETRIEVE_STATE).code });
    res.json(response);
  }
};
