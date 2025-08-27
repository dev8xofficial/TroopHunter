import { StateMessageKey, getStateMessage } from '@repo/messages';
import { type ApiResponse, createApiResponse, type IStateAttributes, type IStateFetchByIdRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { State } from '../../models';
import { logger } from '@repo/utils';

// Update a state by ID
export const updateState = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IStateFetchByIdRequestAttributes;
  const { name, code, countryCode, longitude, latitude } = req.body as IStateAttributes;
  try {
    const existingState = await State.findOne({ where: { id } });
    if (existingState == null) {
      logger.warn(`State with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.STATE_NOT_FOUND).message, status: getStateMessage(StateMessageKey.STATE_NOT_FOUND).code });
      return res.json(response);
    }
    await existingState.update({ name, code, countryCode, longitude, latitude });
    logger.info(`State with ID ${id} updated successfully`);
    const response: ApiResponse<State> = createApiResponse({ success: true, data: existingState, message: getStateMessage(StateMessageKey.STATE_UPDATED).message, status: getStateMessage(StateMessageKey.STATE_UPDATED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Error while updating state with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.FAILED_TO_UPDATE_STATE).message, status: getStateMessage(StateMessageKey.FAILED_TO_UPDATE_STATE).code });
    return res.json(response);
  }
};
