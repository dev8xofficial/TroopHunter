import { LeadMessageKey, getLeadMessage } from '@repo/messages';
import { type ApiResponse, createApiResponse, type ILeadAttributes } from '@repo/validator';
import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { type Business, Lead, LeadBusiness } from '../../models';
import { getBusinessesByQuery, getBusinessesByQueryingIds } from '../../utils';

export const createLead = async (req: Request, res: Response): Promise<Response> => {
  const { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount } = req.body as ILeadAttributes;

  try {
    const requestData: ILeadAttributes = { id: uuidv4(), userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount };
    const lead = await Lead.create(requestData);

    let businesses: Business[] | undefined = [];

    if (Array.isArray(businessIds) && businessIds.length > 0) businesses = await getBusinessesByQueryingIds({ ids: businessIds });
    else businesses = await getBusinessesByQuery({ name: search, businessDomain, categoryId, address, cityId, stateId, countryId, phoneId: phone, email, website, sponsoredAd });

    if (Array.isArray(businesses) && businesses.length > 0) {
      const associations = businesses.map((business) => ({
        leadId: `${lead.id}`,
        businessId: `${business.id}`,
      }));

      await LeadBusiness.bulkCreate(associations);
    } else {
      // Implement the exception
    }

    const response: ApiResponse<Lead> = createApiResponse({ success: true, data: lead, message: getLeadMessage(LeadMessageKey.LEAD_CREATED).message, status: getLeadMessage(LeadMessageKey.LEAD_CREATED).code });
    return res.json(response);
  } catch (error) {
    console.error('Error while creating lead:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.FAILED_TO_CREATE_LEAD).message, status: getLeadMessage(LeadMessageKey.FAILED_TO_CREATE_LEAD).code });
    return res.json(response);
  }
};
