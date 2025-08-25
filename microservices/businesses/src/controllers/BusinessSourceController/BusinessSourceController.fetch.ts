import { BusinessSourceMessageKey, getBusinessSourceMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type IBusinessSourceFetchBySourceNameRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { BusinessSource } from '../../models';

export const getBusinessSourceBySourceName = async (req: Request, res: Response): Promise<Response> => {
  const { sourceName } = req.params as IBusinessSourceFetchBySourceNameRequestAttributes;

  try {
    const businessSource = await BusinessSource.findOne({ where: { sourceName } });

    if (businessSource == null) {
      logger.warn(`BusinessSource with sourceName ${sourceName} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessSourceMessage(BusinessSourceMessageKey.BUSINESS_SOURCE_NOT_FOUND).message, status: getBusinessSourceMessage(BusinessSourceMessageKey.BUSINESS_SOURCE_NOT_FOUND).code });
      return res.json(response);
    }

    const response: ApiResponse<BusinessSource> = createApiResponse({ success: true, data: businessSource, message: getBusinessSourceMessage(BusinessSourceMessageKey.BUSINESS_SOURCE_RETRIEVED).message, status: getBusinessSourceMessage(BusinessSourceMessageKey.BUSINESS_SOURCE_RETRIEVED).code });
    logger.info(getBusinessSourceMessage(BusinessSourceMessageKey.BUSINESS_SOURCE_RETRIEVED).message);
    return res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving BusinessSource with sourceName ${sourceName}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessSourceMessage(BusinessSourceMessageKey.FAILED_TO_RETRIEVE_BUSINESS_SOURCE).message, status: getBusinessSourceMessage(BusinessSourceMessageKey.FAILED_TO_RETRIEVE_BUSINESS_SOURCE).code });
    return res.json(response);
  }
};
