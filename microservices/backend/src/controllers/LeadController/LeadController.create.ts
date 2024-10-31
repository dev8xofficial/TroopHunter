import { Request, Response } from 'express';
import Lead from '../../models/Lead';
import Business from '../../models/Business';
import LeadBusiness from '../../models/LeadBusiness';
import { createApiResponse } from '@repo/validator';
import { ApiResponse } from '@repo/validator';
import { ILeadAttributes } from '@repo/validator';
import { getBusinessesByQuery, getBusinessesByQueryingIds } from '../../utils/business';
import { LeadMessageKey, getLeadMessage } from '../../messages/Lead';
import { v4 as uuidv4 } from 'uuid';

export const createLead = async (req: Request, res: Response) => {
  const { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount }: ILeadAttributes = req.body;

  try {
    const requestData: ILeadAttributes = { id: uuidv4(), userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount };
    const lead = await Lead.create(requestData);

    let businesses: Business[] | undefined = [];

    if (Array.isArray(businessIds) && businessIds.length > 0) businesses = await getBusinessesByQueryingIds({ ids: businessIds });
    else businesses = await getBusinessesByQuery({ name: search, businessDomain, categoryId, address, cityId, stateId, countryId, phone, email, website, sponsoredAd });

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
    res.json(response);
  } catch (error) {
    console.error('Error while creating lead:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage(LeadMessageKey.FAILED_TO_CREATE_LEAD).message, status: getLeadMessage(LeadMessageKey.FAILED_TO_CREATE_LEAD).code });
    res.json(response);
  }
};
