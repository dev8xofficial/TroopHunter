import { Request, Response } from 'express';
import LeadBusiness from '../../models/LeadBusiness';
import logger from '../../utils/logger';
import { createApiResponse } from 'common/utils/response';
import { ApiResponse } from 'common/interfaces/Response';
import { LeadBusinessMessageKey, getLeadBusinessMessage } from '../../messages/LeadBusiness';
import { LeadBusinessSchema } from 'common/validators/LeadBusiness';
import { LeadBusinessAttributes } from 'common/interfaces/LeadBusiness';

export const updateLeadBusiness = async (req: Request, res: Response) => {
  const { value: validatedOldData } = LeadBusinessSchema.validate(req.params, { abortEarly: false });
  const { leadId, businessId } = validatedOldData as LeadBusinessAttributes;

  const { value: validatedNewData } = LeadBusinessSchema.validate(req.body, { abortEarly: false });
  const { leadId: newLeadId, businessId: newBusinessId } = validatedNewData as LeadBusinessAttributes;
  try {
    const leadBusiness = await LeadBusiness.findOne({ where: { leadId, businessId } });

    if (leadBusiness) {
      const updatedLeadBusiness = await leadBusiness.update({ leadId: newLeadId, businessId: newBusinessId });

      const response: ApiResponse<LeadBusiness> = createApiResponse({ success: true, data: updatedLeadBusiness, message: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_UPDATED).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_UPDATED).code });
      res.json(response);
      logger.info(`Updated LeadBusiness with leadId ${leadId} and businessId ${businessId}.`);
    } else {
      const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_NOT_FOUND).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.LEAD_BUSINESS_NOT_FOUND).code });
      res.json(response);
      logger.warn(`LeadBusiness with leadId ${leadId} and businessId ${businessId} not found.`);
    }
  } catch (error) {
    logger.error('Error while updating LeadBusiness:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_UPDATE_LEAD_BUSINESS).message, status: getLeadBusinessMessage(LeadBusinessMessageKey.FAILED_TO_UPDATE_LEAD_BUSINESS).code });
    res.json(response);
  }
};
