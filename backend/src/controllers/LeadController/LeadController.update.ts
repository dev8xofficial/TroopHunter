import { Request, Response } from 'express';
import Lead from '../../models/Lead';
import User from '../../models/User';
import logger from '../../utils/logger';
import { createApiResponse } from 'common/utils/response';
import { ApiResponse } from 'common/interfaces/Response';
import { ILeadAttributesRequestAttributes } from 'common/interfaces/Lead';
import { LeadMessageKey, getLeadMessage } from '../../messages/Lead';
import { UserMessageKey, getUserMessage } from '../../messages/User';

export const updateLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId }: ILeadAttributesRequestAttributes = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.USER_NOT_FOUND).message, status: getUserMessage(UserMessageKey.USER_NOT_FOUND).code });
      return res.json(response);
    }
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      logger.warn(`Lead with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.LEAD_NOT_FOUND).message, status: getLeadMessage(LeadMessageKey.LEAD_NOT_FOUND).code });
      return res.json(response);
    }

    await lead.update({ userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId });

    const response: ApiResponse<Lead> = createApiResponse({ success: true, data: lead, message: getLeadMessage(LeadMessageKey.LEAD_UPDATED).message, status: getLeadMessage(LeadMessageKey.LEAD_UPDATED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while updating lead with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.FAILED_TO_UPDATE_LEAD).message, status: getLeadMessage(LeadMessageKey.FAILED_TO_UPDATE_LEAD).code });
    res.json(response);
  }
};
