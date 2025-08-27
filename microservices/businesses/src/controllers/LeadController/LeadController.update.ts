import { LeadMessageKey, getLeadMessage, UserMessageKey, getUserMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type ApiResponse, createApiResponse, type ILeadAttributes, type ILeadFetchByIdRequestAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';

import { Lead, User } from '../../models';

export const updateLead = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params as ILeadFetchByIdRequestAttributes;
  const { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount } = req.body as ILeadAttributes;

  try {
    const user = await User.findByPk(userId);
    if (user == null) {
      logger.warn(`User with ID ${userId} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.USER_NOT_FOUND).message, status: getUserMessage(UserMessageKey.USER_NOT_FOUND).code });
      return res.json(response);
    }
    const lead = await Lead.findOne({ where: { id } });
    if (lead == null) {
      logger.warn(`Lead with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.LEAD_NOT_FOUND).message, status: getLeadMessage(LeadMessageKey.LEAD_NOT_FOUND).code });
      return res.json(response);
    }

    await lead.update({ userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount });

    const response: ApiResponse<Lead> = createApiResponse({ success: true, data: lead, message: getLeadMessage(LeadMessageKey.LEAD_UPDATED).message, status: getLeadMessage(LeadMessageKey.LEAD_UPDATED).code });
    return res.json(response);
  } catch (error) {
    logger.error(`Error while updating lead with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.FAILED_TO_UPDATE_LEAD).message, status: getLeadMessage(LeadMessageKey.FAILED_TO_UPDATE_LEAD).code });
    return res.json(response);
  }
};
