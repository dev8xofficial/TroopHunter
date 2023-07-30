import { Request, Response } from 'express';
import State from '../models/State';
import logger from '../utils/logger';
import { ApiResponse } from '../types/response';
import { createApiResponse } from '../utils/response';
import { getMessage } from '../utils/message';

// Get states by name and state
export const getStatesByQuery = async (req: Request, res: Response) => {
  const { name } = req.query;

  try {
    if (!name) {
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('MISSING_STATE').message, status: getMessage('MISSING_STATE').code });
      return res.json(response);
    }

    const states = await State.findAll({
      where: {
        name: name as string,
      },
    });

    if (states.length === 0) {
      logger.warn(`No states found for state: ${name}`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('STATE_NOT_FOUND').message, status: getMessage('STATE_NOT_FOUND').code });
      return res.json(response);
    }

    logger.info(`Successfully retrieved states for state: ${name}`);
    const response: ApiResponse<State[]> = createApiResponse({ success: true, data: states, message: getMessage('STATES_RETRIEVED').message, status: getMessage('STATES_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving states:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_STATES').message, status: getMessage('FAILED_TO_RETRIEVE_STATES').code });
    res.json(response);
  }
};

// Get all states
export const getStates = async (req: Request, res: Response) => {
  try {
    const states = await State.findAll();
    logger.info('Successfully retrieved states');
    const response: ApiResponse<State[]> = createApiResponse({ success: true, data: states, message: getMessage('STATES_RETRIEVED').message, status: getMessage('STATES_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving states:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_STATES').message, status: getMessage('FAILED_TO_RETRIEVE_STATES').code });
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
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('STATE_NOT_FOUND').message, status: getMessage('STATE_NOT_FOUND').code });
      return res.json(response);
    }
    logger.info(`Successfully retrieved state with ID ${id}`);
    const response: ApiResponse<State> = createApiResponse({ success: true, data: state, message: getMessage('STATE_RETRIEVED').message, status: getMessage('STATE_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving state with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_RETRIEVE_STATE').message, status: getMessage('FAILED_TO_RETRIEVE_STATE').code });
    res.json(response);
  }
};

// Create a new state
export const createState = async (req: Request, res: Response) => {
  const { name, code, countryCode, longitude, latitude } = req.body;
  try {
    const newState = await State.create({ name, code, countryCode, longitude, latitude });
    logger.info(`State created successfully with ID ${newState.id}`);
    const response: ApiResponse<State> = createApiResponse({ success: true, data: newState, message: getMessage('STATE_CREATED').message, status: getMessage('STATE_CREATED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while creating state:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_CREATE_STATE').message, status: getMessage('FAILED_TO_CREATE_STATE').code });
    res.json(response);
  }
};

// Update a state by ID
export const updateState = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, code, countryCode, longitude, latitude } = req.body;
  try {
    const existingState = await State.findOne({ where: { id } });
    if (!existingState) {
      logger.warn(`State with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('STATE_NOT_FOUND').message, status: getMessage('STATE_NOT_FOUND').code });
      return res.json(response);
    }
    await existingState.update({ name, code, countryCode, longitude, latitude });
    logger.info(`State with ID ${id} updated successfully`);
    const response: ApiResponse<State> = createApiResponse({ success: true, data: existingState, message: getMessage('STATE_UPDATED').message, status: getMessage('STATE_UPDATED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while updating state with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_UPDATE_STATE').message, status: getMessage('FAILED_TO_UPDATE_STATE').code });
    res.json(response);
  }
};

// Delete a state by ID
export const deleteState = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const state = await State.findOne({ where: { id } });
    if (!state) {
      logger.warn(`State with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getMessage('STATE_NOT_FOUND').message, status: getMessage('STATE_NOT_FOUND').code });
      return res.json(response);
    }
    await state.destroy();
    logger.info(`State with ID ${id} deleted successfully`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getMessage('STATE_DELETED').message, status: getMessage('STATE_DELETED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while deleting state with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getMessage('FAILED_TO_DELETE_STATE').message, status: getMessage('FAILED_TO_DELETE_STATE').code });
    res.json(response);
  }
};
