import { Request, Response } from 'express';
import State from '../../models/State';
import logger from '../../utils/logger';
import { ApiResponse } from 'validator/interfaces/Response';
import { IStateAttributes } from 'validator/interfaces/State';
import { createApiResponse } from 'validator/utils/response';
import { StateMessageKey, getStateMessage } from '../../messages/State';
import { v4 as uuidv4 } from 'uuid';

// Create a new state
export const createState = async (req: Request, res: Response) => {
  const { name, code, countryCode, longitude, latitude }: IStateAttributes = req.body;
  try {
    const requestData: IStateAttributes = { id: uuidv4(), name, code, countryCode, longitude, latitude };
    const newState = await State.create(requestData);
    logger.info(`State created successfully with ID ${newState.id}`);
    const response: ApiResponse<State> = createApiResponse({ success: true, data: newState, message: getStateMessage(StateMessageKey.STATE_CREATED).message, status: getStateMessage(StateMessageKey.STATE_CREATED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error while creating state:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.FAILED_TO_CREATE_STATE).message, status: getStateMessage(StateMessageKey.FAILED_TO_CREATE_STATE).code });
    res.json(response);
  }
};
