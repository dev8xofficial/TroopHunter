import { StateMessageKey, getStateMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type IStateFetchByIdRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { State } from '../../models';

// Delete a state by ID
export const deleteState = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as IStateFetchByIdRequestAttributes;
  try {
    const state = await State.findOne({ where: { id } });
    if (state == null) {
      logger.warn(`State with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.STATE_NOT_FOUND).message, status: getStateMessage(StateMessageKey.STATE_NOT_FOUND).code });
      return res.json(response);
    }
    await state.destroy();
    logger.info(`State with ID ${id} deleted successfully`);
    const response: ApiResponse<null> = createApiResponse({ success: true, message: getStateMessage(StateMessageKey.STATE_DELETED).message, status: getStateMessage(StateMessageKey.STATE_DELETED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Error while deleting state with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getStateMessage(StateMessageKey.FAILED_TO_DELETE_STATE).message, status: getStateMessage(StateMessageKey.FAILED_TO_DELETE_STATE).code });
    return res.json(response);
  }
};
