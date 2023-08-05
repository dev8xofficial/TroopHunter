import { Request, Response } from 'express';
import State from '../../models/State/State.model';
import logger from '../../utils/logger';
import { ApiResponse } from '../../types/Response.interface';
import { createApiResponse } from '../../utils/response';
import { StateMessageKey, getStateMessage } from '../../models/State/State.messages';

// Update a state by ID
export const updateState = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, code, countryCode, longitude, latitude } = req.body;
  try {
    const existingState = await State.findOne({ where: { id } });
    if (!existingState) {
      logger.warn(`State with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.STATE_NOT_FOUND).message, status: getStateMessage(StateMessageKey.STATE_NOT_FOUND).code });
      return res.json(response);
    }
    await existingState.update({ name, code, countryCode, longitude, latitude });
    logger.info(`State with ID ${id} updated successfully`);
    const response: ApiResponse<State> = createApiResponse({ success: true, data: existingState, message: getStateMessage(StateMessageKey.STATE_UPDATED).message, status: getStateMessage(StateMessageKey.STATE_UPDATED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while updating state with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.FAILED_TO_UPDATE_STATE).message, status: getStateMessage(StateMessageKey.FAILED_TO_UPDATE_STATE).code });
    res.json(response);
  }
};
