import { StateMessageKey, getStateMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type IPaginationAttributes, type IStateFetchByIdRequestAttributes, type IStateFetchRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';
import { type ParsedQs } from 'qs';
import { Op } from 'sequelize';

import { State } from '../../models';

// Get states by name and state
export const getStatesByQuery = async (req: Request, res: Response): Promise<Response> => {
  const { name, code, countryCode } = req.query as IStateFetchRequestAttributes;
  const { page, limit } = req.query as ParsedQs & IPaginationAttributes;

  // Pagination
  const pageNumber = parseInt(String(page)) ?? 1;
  const limitNumber = parseInt(String(limit)) ?? 10;

  const offset = (pageNumber - 1) * limitNumber;

  // Where clause
  const whereClause: Record<string, unknown> = {};

  if (name != null) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }

  if (code != null) {
    whereClause.code = { [Op.iLike]: `%${code}%` };
  }

  if (countryCode != null) {
    whereClause.countryCode = { [Op.iLike]: `%${countryCode}%` };
  }

  try {
    const { count, rows: states } = await State.findAndCountAll({
      where: whereClause,
      offset,
      limit: limitNumber,
    });

    if (states.length === 0) {
      logger.warn(`No states found for state: ${name ?? ''}`);
      const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.STATE_NOT_FOUND).message, status: getStateMessage(StateMessageKey.STATE_NOT_FOUND).code });
      return res.json(response);
    }

    const totalPages = Math.ceil(count / limitNumber);

    logger.info('Successfully retrieved states.');
    const response: ApiResponse<{ totalRecords: number; totalPages: number; states: State[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, states }, message: getStateMessage(StateMessageKey.STATES_RETRIEVED).message, status: getStateMessage(StateMessageKey.STATES_RETRIEVED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Error while retrieving states:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.FAILED_TO_RETRIEVE_STATES).message, status: getStateMessage(StateMessageKey.FAILED_TO_RETRIEVE_STATES).code });
    return res.json(response);
  }
};

// Get all states
export const getStates = async (req: Request, res: Response): Promise<Response> => {
  const { page, limit } = req.query as ParsedQs & IPaginationAttributes;

  const pageNumber = parseInt(String(page)) ?? 1;
  const limitNumber = parseInt(String(limit)) ?? 10;

  const offset = (pageNumber - 1) * limitNumber;

  try {
    const { count, rows: states } = await State.findAndCountAll({
      offset,
      limit: limitNumber,
    });

    const totalPages = Math.ceil(count / limitNumber);

    logger.info('Successfully retrieved states');
    const response: ApiResponse<{ totalRecords: number; totalPages: number; states: State[] }> = createApiResponse({ success: true, data: { totalRecords: count, totalPages, states }, message: getStateMessage(StateMessageKey.STATES_RETRIEVED).message, status: getStateMessage(StateMessageKey.STATES_RETRIEVED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Error while retrieving states:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.FAILED_TO_RETRIEVE_STATES).message, status: getStateMessage(StateMessageKey.FAILED_TO_RETRIEVE_STATES).code });
    return res.json(response);
  }
};

// Get a state by ID
export const getStateById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IStateFetchByIdRequestAttributes;
  try {
    const state = await State.findOne({ where: { id } });
    if (state == null) {
      logger.warn(`State with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.STATE_NOT_FOUND).message, status: getStateMessage(StateMessageKey.STATE_NOT_FOUND).code });
      return res.json(response);
    }
    logger.info(`Successfully retrieved state with ID ${id}`);
    const response: ApiResponse<State> = createApiResponse({ success: true, data: state, message: getStateMessage(StateMessageKey.STATE_RETRIEVED).message, status: getStateMessage(StateMessageKey.STATE_RETRIEVED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving state with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.FAILED_TO_RETRIEVE_STATE).message, status: getStateMessage(StateMessageKey.FAILED_TO_RETRIEVE_STATE).code });
    return res.json(response);
  }
};
