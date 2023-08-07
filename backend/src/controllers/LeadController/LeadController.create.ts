import { Request, Response } from 'express';
import Lead from '../../models/Lead/Lead.model';
import Business from '../../models/Business/Business.model';
import LeadBusiness from '../../models/LeadBusiness/LeadBusiness.model';
import { createApiResponse } from '../../utils/response';
import { ApiResponse } from '../../types/Response.interface';
import { ILeadAttributesRequestAttributes, ILeadAttributesResponseAttributes } from '../../models/Lead/Lead.interface';
import { getBusinessesByQuery, getBusinessesByQueryingIds } from '../../utils/business';
import { LeadMessageKey, getLeadMessage } from '../../models/Lead/Lead.messages';
import { LeadSchema, createLeadErrorResponse } from '../../models/Lead/Lead.validator';
import { v4 as uuidv4 } from 'uuid';

export const createLead = async (req: Request, res: Response) => {
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

    const requestData: ILeadAttributesResponseAttributes = { id: uuidv4(), userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId };
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
