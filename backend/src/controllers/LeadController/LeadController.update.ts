import { Request, Response } from 'express';
import Lead from '../../models/Lead/Lead.model';
import User from '../../models/User/User.model';
import logger from '../../utils/logger';
import { createApiResponse } from '../../utils/response';
import { ApiResponse } from '../../types/Response.interface';
import { ILeadAttributesRequestAttributes } from '../../models/Lead/Lead.interface';
import { LeadMessageKey, getLeadMessage } from '../../models/Lead/Lead.messages';
import { UserMessageKey, getUserMessage } from '../../models/User/User.messages';
import { LeadSchema, createLeadErrorResponse } from '../../models/Lead/Lead.validator';

export const updateLead = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { error, value: validatedData } = LeadSchema.validate(req.body, { abortEarly: false });
  const { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId } = validatedData as ILeadAttributesRequestAttributes;

  try {
    if (error) {
      const errorResponse = createLeadErrorResponse(error);
      const response: ApiResponse<null> = createApiResponse({
        error: errorResponse.error,
        status: errorResponse.status,
      });
      return res.json(response);
    }

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
