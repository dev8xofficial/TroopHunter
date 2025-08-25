import { StateMessageKey, getStateMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, type IStateAttributes, createApiResponse } from '@repo/validator';
import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { State } from '../../models';

// Create a new state
export const createState = async (req: Request, res: Response): Promise<Response> => {
  const { name, code, countryCode, longitude, latitude } = req.body as IStateAttributes;
  try {
    const requestData: IStateAttributes = { id: uuidv4(), name, code, countryCode, longitude, latitude };
    const newState = await State.create(requestData);
    logger.info(`State created successfully with ID ${newState.id}`);
    const response: ApiResponse<State> = createApiResponse({ success: true, data: newState, message: getStateMessage(StateMessageKey.STATE_CREATED).message, status: getStateMessage(StateMessageKey.STATE_CREATED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Error while creating state:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.FAILED_TO_CREATE_STATE).message, status: getStateMessage(StateMessageKey.FAILED_TO_CREATE_STATE).code });
    return res.json(response);
  }
};
