import { Request, Response } from 'express';
import Lead from '../models/Lead/Lead.model';
import User from '../models/User/User.model';
import logger from '../utils/logger';
import Business from '../models/Business/Business.model';
import LeadBusiness from '../models/LeadBusiness/LeadBusiness.model';
import { createApiResponse } from '../utils/response';
import { ApiResponse } from '../types/Response.interface';
import { getBusinessesByQuery, getBusinessesByQueryingIds } from '../utils/business';
import { LeadAttributes } from '../models/Lead/Lead.interface';
import { getLeadMessage } from '../models/Lead/Lead.messages';
import { getUserMessage } from '../models/User/User.messages';
import { LeadSchema, createLeadErrorResponse } from '../models/Lead/Lead.schema';

export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.findAll();
    logger.info('Successfully retrieved leads');

    const response: ApiResponse<Lead[]> = createApiResponse({ success: true, data: leads, message: getLeadMessage('LEAD_RETRIEVED').message, status: getLeadMessage('LEAD_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while retrieving leads:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage('FAILED_TO_RETRIEVE_LEADS').message, status: getLeadMessage('FAILED_TO_RETRIEVE_LEADS').code });
    res.json(response);
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      logger.warn(`Lead with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage('LEAD_NOT_FOUND').message, status: getLeadMessage('LEAD_NOT_FOUND').code });
      return res.json(response);
    }

    logger.info(`Successfully retrieved lead with ID ${id}`);
    const response: ApiResponse<Lead> = createApiResponse({ success: true, data: lead, message: getLeadMessage('LEAD_RETRIEVED').message, status: getLeadMessage('LEAD_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while retrieving lead with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage('FAILED_TO_RETRIEVE_LEAD').message, status: getLeadMessage('FAILED_TO_RETRIEVE_LEAD').code });
    res.json(response);
  }
};

export const createLead = async (req: Request, res: Response) => {
  try {
    const { error, value: validatedData } = LeadSchema.validate(req.body, { abortEarly: false });
    const { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId } = validatedData as LeadAttributes;

    if (error) {
      const errorResponse = createLeadErrorResponse(error);
      const response: ApiResponse<null> = createApiResponse({
        error: errorResponse.error,
        status: errorResponse.status,
      });
      return res.json(response);
    }

    const lead = await Lead.create({ userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId });

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

    const response: ApiResponse<Lead> = createApiResponse({ success: true, data: lead, message: getLeadMessage('LEAD_CREATED').message, status: getLeadMessage('LEAD_CREATED').code });
    res.json(response);
  } catch (error) {
    console.error('Error while creating lead:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage('FAILED_TO_CREATE_LEAD').message, status: getLeadMessage('FAILED_TO_CREATE_LEAD').code });
    res.json(response);
  }
};

export const getLeadWithBusinesses = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Retrieve the lead with associated businesses
    const lead = await Lead.findByPk(id, { include: Business });

    if (!lead) {
      const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage('LEAD_NOT_FOUND').message, status: getLeadMessage('LEAD_NOT_FOUND').code });
      return res.json(response);
    }

    const response: ApiResponse<Lead> = createApiResponse({ success: true, data: lead, message: getLeadMessage('LEAD_RETRIEVED').message, status: getLeadMessage('LEAD_RETRIEVED').code });
    res.json(response);
  } catch (error) {
    console.error('Error while retrieving lead:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage('FAILED_TO_RETRIEVE_LEAD').message, status: getLeadMessage('FAILED_TO_RETRIEVE_LEAD').code });
    res.json(response);
  }
};

export const updateLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId } = req.body as LeadAttributes;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage('USER_NOT_FOUND').message, status: getUserMessage('USER_NOT_FOUND').code });
      return res.json(response);
    }
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      logger.warn(`Lead with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage('LEAD_NOT_FOUND').message, status: getLeadMessage('LEAD_NOT_FOUND').code });
      return res.json(response);
    }
    await lead.update({ userId, businessIds, title, search, businessDomain, categoryId, address, cityId, stateId, countryId, postalCodeId, phone, email, website, ratingId, reviews, timezoneId, sponsoredAd, businessCount, openingHourId, closingHourId });

    const response: ApiResponse<Lead> = createApiResponse({ success: true, data: lead, message: getLeadMessage('LEAD_UPDATED').message, status: getLeadMessage('LEAD_UPDATED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while updating lead with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage('FAILED_TO_UPDATE_LEAD').message, status: getLeadMessage('FAILED_TO_UPDATE_LEAD').code });
    res.json(response);
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      logger.warn(`Lead with ID ${id} not found`);
      const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage('LEAD_NOT_FOUND').message, status: getLeadMessage('LEAD_NOT_FOUND').code });
      return res.json(response);
    }
    await lead.destroy();

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getLeadMessage('LEAD_DELETED').message, status: getLeadMessage('LEAD_DELETED').code });
    res.json(response);
  } catch (error) {
    logger.error(`Error while deleting lead with ID ${id}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage('FAILED_TO_DELETE_LEAD').message, status: getLeadMessage('FAILED_TO_DELETE_LEAD').code });
    res.json(response);
  }
};

export const deleteLeads = async (req: Request, res: Response) => {
  const { ids } = req.body; // Assuming that the array of lead IDs is sent in the request body

  try {
    const leads = await Lead.findAll({ where: { id: ids } });

    if (!leads || leads.length === 0) {
      logger.warn('No leads found with the given IDs');
      const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage('LEADS_NOT_FOUND').message, status: getLeadMessage('LEADS_NOT_FOUND').code });
      return res.json(response);
    }

    // Deleting leads one by one
    const deletePromises = leads.map((lead) => lead.destroy());
    await Promise.all(deletePromises);

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getLeadMessage('LEADS_DELETED').message, status: getLeadMessage('LEADS_DELETED').code });
    res.json(response);
  } catch (error) {
    logger.error('Error while deleting leads:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getLeadMessage('FAILED_TO_DELETE_LEADS').message, status: getLeadMessage('FAILED_TO_DELETE_LEADS').code });
    res.json(response);
  }
};
