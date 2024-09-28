import { Request, Response } from 'express';
import logger from '../../utils/logger';
import { ApiResponse } from 'validator/interfaces';
import { createApiResponse } from 'validator/utils';
import { BusinessSourceMessageKey, getBusinessSourceMessage } from '../../messages/BusinessSource';
import BusinessSource from '../../models/BusinessSource';

export const getBusinessSourceBySourceName = async (req: Request, res: Response) => {
  const { sourceName } = req.params;

  try {
    const businessSource = await BusinessSource.findOne({ where: { sourceName } });

    if (!businessSource) {
      logger.warn(`BusinessSource with sourceName ${sourceName} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getBusinessSourceMessage(BusinessSourceMessageKey.BUSINESS_SOURCE_NOT_FOUND).message, status: getBusinessSourceMessage(BusinessSourceMessageKey.BUSINESS_SOURCE_NOT_FOUND).code });
      return res.json(response);
    }

    const response: ApiResponse<BusinessSource> = createApiResponse({ success: true, data: businessSource, message: getBusinessSourceMessage(BusinessSourceMessageKey.BUSINESS_SOURCE_RETRIEVED).message, status: getBusinessSourceMessage(BusinessSourceMessageKey.BUSINESS_SOURCE_RETRIEVED).code });
    logger.info(getBusinessSourceMessage(BusinessSourceMessageKey.BUSINESS_SOURCE_RETRIEVED).message);
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving BusinessSource with sourceName ${sourceName}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getBusinessSourceMessage(BusinessSourceMessageKey.FAILED_TO_RETRIEVE_BUSINESS_SOURCE).message, status: getBusinessSourceMessage(BusinessSourceMessageKey.FAILED_TO_RETRIEVE_BUSINESS_SOURCE).code });
    res.json(response);
  }
};
